<?php
session_start();
include "users_tab/connect.php";
if($conn) {
    if(mysqli_select_db($conn, $db) === TRUE) {
        $query = mysqli_query($conn, "select * from noticias;");
        if(mysqli_num_rows($query) !== 0) {
            echo "<div id='noticias'>";
            echo "<h3>Notícias</h3>";
            $query = mysqli_query($conn, "select * from noticias order by date;");
            while($row = mysqli_fetch_assoc($query)) {
                echo "<div class='news_inner'>";
                $news_title = $row['title'];
                $news_body = $row['body'];
                $news_date = $row['date'];
?>
    <form method="POST" action="noticias/update_create_news.php" class="noticias_form">
        <input name="present_form" type="hidden" value="<?php echo $row['title'] ?>"/>
        <input name="title" type="text" value="<?php echo $news_title;?>"/>
        <textarea cols="50" rows="1" name="body"><?php echo $news_body;?></textarea>
        <input name="date" type="datetime-local" value="<?php echo $news_date;?>"/>
        <input name="send_this_form" id="<?php echo $row['title'] ?>1" type="submit" value="Modificar notícia"/>
        <label for="<?php echo $row['title'] ?>1" class="delete_news_label">Modificar&nbspnotícia</label>&nbsp
    </form>

    <form method="POST" action="" class="eliminar_noticia_form">
        <input name="delete_news" id="<?php echo $row['title'] ?>" class="delete_news" type="checkbox" value="<?php echo $row['title']; ?>"/>
        <label for="<?php echo $row['title'] ?>" class="delete_news_label">Eliminar&nbsp;notícia</label>
    </form>
    <?php
    /* erased stuff */

    if($_POST['delete_news'] === $row['title']) {
        mysqli_query($conn, sprintf("delete from noticias where title='%s';", $row['title']));
        $_SESSION['warning'] = 'Notícia eliminada ';
    ?>
        <script>location.reload();</script>
    <?php
    }
    echo "</div>";
    }
    ?>
    <h3>Criar nova notícia</h3>
    <form method="POST" action="noticias/update_create_news.php">
        <input name="nova_noticia" type="hidden" value="nova"/>
        <input name="new_title" type="text" placeholder="título" value=""/>
        <input name="new_body" type="textarea" placeholder="corpo do texto" rows="4" columns="40" value=""/>
        <input name="new_date" type="datetime-local" value=""/>
        <input name="submeter_noticia" type="submit" class="cancelAppoint" id="create_news_button" value="Criar nova notícia"/>
        <label for="create_news_button" class="delete_news_label">Criar&nbspnova&nbspnotícia</label>
    </form>
    <?php
    /* erased stuff */
    echo "<a href='users_tab/logout.php' id='logout' class='button'>Logout</a>";
    echo "</div>";
    }
    }
    } else {
        echo "could not connect";
    }
    ?>
    <script>
     var delForm = document.getElementsByClassName("delete_news");
     for(const form of delForm) {
         form.addEventListener("change", function() {
             if(this.checked) {
                 this.parentElement.submit();
             }
         });
     }
    </script>
