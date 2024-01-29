<?php
session_start();
include "connect.php";
if($conn) {
    if(mysqli_select_db($conn, $db) === TRUE) {
        if($_POST['consulta'] && $_POST['comentario']) {
            mysqli_query($conn, sprintf("insert into consultas (date, comment, username) values('%s', '%s', '%s');", $_POST['consulta'], mysqli_real_escape_string($conn, $_POST['comentario']), $_SESSION['getUser']));
            /* unset($_POST['consulta']);
             * unset($_POST['comentario']); */
            $_SESSION['warning'] = 'Consulta marcada';
            header("Location: ../index.php");
        } else {
            $_SESSION['warning'] = 'Dados em falta';
            header("Location: ../index.php");
        }
    } else {
        $_SESSION['warning'] = 'Erro na seleção da base de dados';
        header("Location: ../index.php");
    }
} else {
    $_SESSION['warning'] = 'Erro na conexão';
    header("Location: ../index.php");
}
?>
