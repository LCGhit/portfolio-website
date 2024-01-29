<?php
session_start();
if($_POST['username']) {
    include "connect.php";
    if($conn) {
        if(mysqli_select_db($conn,$db) === TRUE) {
            $login = mysqli_query($conn, sprintf("SELECT * FROM utilizadores WHERE username='%s';", mysqli_real_escape_string($conn,$_POST['username'])));
            $searchHash = mysqli_fetch_array($login);
            $hash = $searchHash['pass'];
            if(password_verify(mysqli_real_escape_string($conn,$_POST['pass']),$hash)){
                $_SESSION['key_id'] = md5(session_id());
                mysqli_select_db($conn,$db);
                $login = mysqli_query($conn, sprintf("SELECT * FROM utilizadores WHERE username='%s';", mysqli_real_escape_string($conn,$_POST['username'])));
                $logArray = mysqli_fetch_array($login);
                $_SESSION['username'] = $logArray['username'];
                $_SESSION['logArray'] = $logArray;
                $_SESSION['warning'] = 'Login bem-sucedido!';

                header('Location: ../index.php');
            } else {
                $_SESSION['warning'] = 'Username e/ou password errados';
                echo $_SESSION['warning'];
                sleep(3);
                header("Location: ../index.php");
            }
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
