<?php
session_start();
include "../users_tab/connect.php";
if($conn) {
    if(mysqli_select_db($conn, $db) === TRUE) {
        if($_POST["present_form"]) {
            $_SESSION['warning'] = 'Notícia alterada com sucesso';
            mysqli_query($conn, sprintf("update noticias set title='%s', body='%s', date='%s' where title='%s';", mysqli_real_escape_string($conn, $_POST['title']), mysqli_real_escape_string($conn, $_POST['body']), $_POST['date'], $_POST["present_form"]));
            unset($_POST['present_form']);
            unset($news_title);
            unset($news_body);
            unset($news_date);
            unset($_POST['title']);
            unset($_POST['body']);
            unset($_POST['date']);
            unset($_POST['present_form']);
            header("Location: ../index.php");
        }

        if($_POST['nova_noticia']) {
            if($_POST['new_title'] && $_POST['new_body'] && $_POST['new_date']) {
                mysqli_query($conn, sprintf("insert into noticias values ('%s', '%s', '%s');", $_POST['new_title'], $_POST['new_body'], $_POST['new_date']));
                $_SESSION['warning'] = 'Notícia criada com sucesso';
            } else {
                $_SESSION['warning'] = "Não criou a notícia. </br>Campos por preencher.";
            }
            header("Location: ../index.php");
        }
    }
}
?>
