<?php
session_start();
if($_POST['selectClient']) {
    include "connect.php";
    if($conn) {
        if(mysqli_select_db($conn,$db) === TRUE) {
            $login = mysqli_query($conn, sprintf("SELECT * FROM utilizadores WHERE username='%s';", mysqli_real_escape_string($conn,$_POST['selectClient'])));
            $_SESSION['clientInfo'] = md5(session_id());
            $clientArray = mysqli_fetch_array($login);
            $_SESSION['clientArray'] = $clientArray;
            $_SESSION['warning'] = "Cliente encontrado";
            header('Location: ../index.php');
        }
        mysqli_close($conn);
    } else {
        echo "Falha na conexão";
        sleep(3);
        header("Location: ../index.php");
    }
} else {
    $_SESSION['warning'] = 'Username vazio';
    sleep(3);
    header("Location: ../index.php");
}
?>
