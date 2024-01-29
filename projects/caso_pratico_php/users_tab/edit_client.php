<?php
session_start();
if($_SESSION['logArray']['usertype'] === 'admin') {
?>
    <div id="tab_picking">
        <button id="pick_news" value="notícias"></button>
        <label class="pick_tab_label" for="pick_news" id="pick_news_label">NOTÍCIAS</label>
        <button id="pick_data" value="my data"></button>
        <label class="pick_tab_label" for="pick_data" id="pick_data_label">OS MEUS DADOS</label>
        <button id="pick_client" value="Cliente"></button>
        <label class="pick_tab_label" for="pick_client" id="pick_client_label">ALTERAR DADOS DE CLIENTES</label>
        <button id="pick_portfolio" value="Portfolio"></button>
        <label class="pick_tab_label" for="pick_portfolio" id="pick_portfolio_label">PORTFÓLIO</label>
        </div>
<?php
} else {
    echo "<div id='tab_picking'>";
    echo "<label class='pick_tab_label' for='pick_data'>OS MEUS DADOS</label>";
    echo "</div>";
}
?>
<div id="table_div">
    <table id="editTable">
        <h3 id="tabletitle">Os meus dados</h3>
        <tr>
            <th>Nome</th>
            <th>Apelido</th>
            <th>Username</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Password</th>
        </tr>
        <tr id="currentData">
            <td id="name"><?php echo $_SESSION['logArray']['nome']; ?></td>
            <td id="lastName"><?php echo $_SESSION['logArray']['apelido']; ?></td>
            <td id="username"><?php echo $_SESSION['logArray']['username']; ?></td>
            <td id="email"><?php echo $_SESSION['logArray']['email']; ?></td>
            <td id="phone"><?php echo $_SESSION['logArray']['telefone']; ?></td>
            <td id="pass">***</td>
        </tr>
        <tr id="change">
            <td><input placeholder="Mudar nome" id="changeName" type="text" value=""/></td>
            <td><input placeholder="Mudar apelido" id="changeLastname" type="text" value=""/></td>
            <td><input placeholder="Mudar username" id="changeUsername" type="text" value=""/></td>
            <td><input placeholder="Mudar email" id="changeEmail" type="text" value=""/></td>
            <td><input placeholder="Mudar telefone" id="changePhone" type="text" value=""/></td>
            <td><input placeholder="Mudar password" id="changePass" type="password" value=""/></td>
        </tr>
    </table>

    <button id="makeChange"></button>
    <label for="makeChange" class="button">Alterar</label>
    <a href="users_tab/logout.php" id="logout" class="button">Logout</a>
</div>
<?php
if($_SESSION['logArray']['usertype'] === 'admin') {
    include "noticias/noticias.php";
    include "users_tab/portfolio.php";
?>
    <div id="client">
        <div class="selectclient" id="select_client">
            <hr/>
            <h3>Alterar dados de cliente</h3>

            <form method="post" action="users_tab/verify_client.php" id="getClientInfo">
                <select name="selectClient" id="selectClient">
                    <option value="default" selected>Escolha um cliente</option>
                    <?php
                    include "connect.php";
                    if($conn) {
                        if(mysqli_select_db($conn, $db) === TRUE) {
                            $query = mysqli_query($conn, "select * from utilizadores except select * from utilizadores where username='".$_SESSION['logArray']['username']."';");
                            while($row = mysqli_fetch_assoc($query)) {
                                echo "<option name=".$row['username'].">".$row['username']."</option>";
                            }
                        }
                    }
                    ?>
                </select>
            </form>
        </div>
        <?php
        if($_SESSION['clientInfo']) {
        ?>
            <div id="clientInfo">
                <table id="editTable">
                    <h3 id="tabletitle"><?php echo $_SESSION['clientArray']['nome'] ?></h3>
                    <tr>
                        <th>Nome</th>
                        <th>Apelido</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Password</th>
                    </tr>
                    <tr id="clientCurrentData">
                        <td id="name"><?php echo $_SESSION['clientArray']['nome']; ?></td>
                        <td id="lastName"><?php echo $_SESSION['clientArray']['apelido']; ?></td>
                        <td id="username"><?php echo $_SESSION['clientArray']['username']; ?></td>
                        <td id="email"><?php echo $_SESSION['clientArray']['email']; ?></td>
                        <td id="phone"><?php echo $_SESSION['clientArray']['telefone']; ?></td>
                        <td id="pass">***</td>
                    </tr>
                    <tr id="change">
                        <td><input placeholder="Mudar nome" id="changeClientName" type="text" value=""/></td>
                        <td><input placeholder="Mudar apelido" id="changeClientLastname" type="text" value=""/></td>
                        <td><input placeholder="Mudar username" id="changeClientUsername" type="text" value=""/></td>
                        <td><input placeholder="Mudar email" id="changeClientEmail" type="text" value=""/></td>
                        <td><input placeholder="Mudar telefone" id="changeClientPhone" type="text" value=""/></td>
                        <td><input placeholder="Mudar password" id="changeClientPass" type="password" value=""/></td>
                    </tr>
                </table>
                <button id="makeClientChange"></button>
                <label for="makeClientChange" class="button">Alterar</label>
                <a href="users_tab/logout.php" id="logout" class="button">Logout</a>
            </div>
            <?php
            include "appointments.php";
            ?>
    </div>
        <?php
        }
        } else {
            include "appointments.php";
        }
        ?>
        <script src="javascript/edit_client.js"></script>
