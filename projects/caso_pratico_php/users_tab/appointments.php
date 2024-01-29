<?php
session_start();
function timeTillAppoint($requested) {
    $hoursToAppoint = (strtotime($requested) - time())/3600;
    return round($hoursToAppoint, 1);
}
if($_SESSION['logArray']['usertype'] === 'admin') {
    $_SESSION['getUser'] = $_SESSION['clientArray']['username'];
} else {
    $_SESSION['getUser'] = $_SESSION['logArray']['username'];
}
include "connect.php";
if($conn) {
    if(mysqli_select_db($conn, $db) === TRUE) {
        $query = mysqli_query($conn, sprintf("select * from consultas where username='%s';", $_SESSION['getUser']));
        echo "<div id='consultas'>";
        if(mysqli_num_rows($query) !== 0) {
            echo "<h3>Consultas marcadas</h3>";
        }
        while($row1 = mysqli_fetch_assoc($query)) {
            $checkDate = timeTillAppoint($row1['date']);
            if($checkDate <= 0) {
                /* DELETE IF PAST DUE */
                mysqli_query($conn, "delete from consultas where date='".$row1['date']."';");
            }  else {
                /* FETCH IF ACTIVE */
?>
    <form method="POST" action="" class="change_cancel">
        <?php echo $row1['date'] ?>
        - Dentro de <?php echo $checkDate ?> horas.
        <?php
        if(!($checkDate < 72)) {
            $theName = $row1['date'];
        ?>
            <input name="<?php echo $theName;?>" type="datetime-local" value=""/>
            <input name="Reagendar" type="submit" value="Reagendar" class="reagendarAppoint" id="<?php echo $row1['date'] ?>2" />
            <label for="<?php echo $row1['date'] ?>2" class="delete_news_label">Reagendar</label>
            <input name="cancelar" type="checkbox" class="cancelAppoint" value="<?php  echo $row1['date'];?>" id="<?php echo $row1['date'] ?>" />
            <label for="<?php echo $row1['date'] ?>" class="delete_news_label">Cancelar</label>
            <!-- end of form -->
    <?php
    /* CANCEL/SET NEW DATE*/
    if($_POST[$theName]) {
        mysqli_query($conn, "update consultas set date='".$_POST[$theName]."' where date='".$row1['date']."';");
        unset($_POST[$theName]);
        $_SESSION['warning'] = 'Alterado com sucesso ';
    ?>
        <script>location.reload();</script>
                <?php
                } elseif($_POST['cancelar'] === $row1['date']) {
                    mysqli_query($conn, "delete from consultas where date='".$_POST['cancelar']."';");
                    unset($_POST['cancelar']);
                    $_SESSION['warning'] = 'Alterado com sucesso ';
                ?>
            <script>location.reload();</script>
    <?php
    }
    } else {
        echo "<button class='reagendarAppoint' id='disabledBtn' disabled>Reagendar </button>";
        echo "<label for='disabledBtn'>Reagendar</label>";
    }
    echo "</form><br/>";
    echo "</br>";
    }
    }

    ?>
    <h3>Marcar nova consulta</h3>
    <!-- Browser was showing the resubmission alert for this form, so the Post/Redirect/Get pattern was used instead -->
    <form name="consulta_form" method="POST" action="users_tab/new_appointment.php">
        <input name="consulta" type="datetime-local" value=""/><br/>
        <textarea name="comentario" rows="4" columns="40" placeholder="Observações"></textarea><br/>
        <input name="marcar" type="submit" id="marcar_consulta" />
        <label for="marcar_consulta" class="delete_news_label">Marcar</label>
    </form>
    <?php
    echo "</div>";
    }
    }
    ?>
<script type="text/javascript" src="javascript/appointments.js"></script>
