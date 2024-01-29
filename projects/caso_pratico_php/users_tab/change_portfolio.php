<?php
session_start();
include "connect.php";
if($conn) {
    if(mysqli_select_db($conn,$db) === TRUE) {
        if($_POST['image']) {
            $query = mysqli_query($conn, sprintf("update projetos set image='%s', info='%s', technology='%s', timeframe='%s' where ID='%s';", mysqli_real_escape_string($conn, $_POST['image']), mysqli_real_escape_string($conn, $_POST['info']), mysqli_real_escape_string($conn, $_POST['technology']), mysqli_real_escape_string($conn, $_POST['timeframe']), $_POST['id']));
            if($query) {
                $_SESSION['warning'] = "Portfólio alterado";
            } else {
                $_SESSION['warning'] = "A alteração falhou";
            }
        }
    }
}
header("Location: ../index.php");
?>
