<?php
session_start();
$v1 = $_REQUEST["v1"]; /* first name */
$v2 = $_REQUEST["v2"]; /* last name */
$v3 = $_REQUEST["v3"]; /* username */
$v4 = $_REQUEST["v4"]; /* email */
$v5 = $_REQUEST["v5"]; /* phone */
$v6 = $_REQUEST["v6"]; /* pass */
if(isset($_SESSION['key_id'])){
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $db = 'masterd';
    $conn = mysqli_connect($host,$user,$pass);
    if($conn) {
        if(mysqli_select_db($conn,$db) === TRUE) {
            /* change name */
            if($v1 !== 'undefined' && $v1 !=='') {
                $new1 = mysqli_real_escape_string($conn,$v1);
                $old1 = $_SESSION['logArray']['username'];
                $change1 = mysqli_query($conn, sprintf("update utilizadores set nome='%s' where username='%s';", $new1, $old1));
                if($change1) {
                    echo $new1." ";
                }
            } else {
                echo $_SESSION['logArray']['nome']." ";
            }
            /* change last name */
            if($v2 !== 'undefined' && $v2 !=='') {
                $new2 = mysqli_real_escape_string($conn,$v2);
                $old2 = $_SESSION['logArray']['username'];
                $change2 = mysqli_query($conn, sprintf("update utilizadores set apelido='%s' where username='%s';", $new2, $old2));
                if($change2) {
                    echo $new2." ";
                }
            } else {
                echo $_SESSION['logArray']['apelido']." ";
            }

            /* change username */
            if($v3 !== 'undefined' && $v3 !=='') {
                $new3 = mysqli_real_escape_string($conn,$v3);
                if(mysqli_query($conn, "select * from utilizadores where username='".$v3."';")) {
                    $_SESSION['warning'] = "Username já existe";
                }
                $old3 = $_SESSION['logArray']['username'];
                $change3 = mysqli_query($conn, sprintf("update utilizadores set username='%s' where username='%s';", $new3, $old3));
                if($change3) {
                    echo $new3." ";
                }
            } else {
                echo $_SESSION['logArray']['username']." ";
            }
            /* change email */
            if($v4 !== 'undefined' && $v4 !=='') {
                $new4 = mysqli_real_escape_string($conn,$v4);
                $old4 = $_SESSION['logArray']['username'];
                $change4 = mysqli_query($conn, sprintf("update utilizadores set email='%s' where username='%s';", $new4, $old4));
                if($change4) {
                    echo $new4." ";
                }
            } else {
                echo $_SESSION['logArray']['email']." ";
            }
            /* change phone */
            if($v5 !== 'undefined' && $v5 !=='') {
                $new5 = mysqli_real_escape_string($conn,$v5);
                $old5 = $_SESSION['logArray']['username'];
                $change5 = mysqli_query($conn, sprintf("update utilizadores set telefone='%s' where username='%s';", $new5, $old5));
                if($change5) {
                    echo $new5." ";
                }
            } else {
                echo $_SESSION['logArray']['telefone']." ";
            }
            if($v6 !== 'undefined' && $v6 !== '') {
                $new6 = mysqli_real_escape_string($conn,$v6);
                $old6 = $_SESSION['logArray']['username'];
                $change6 = mysqli_query($conn, sprintf("update utilizadores set pass='%s' where username='%s';", password_hash($new6,PASSWORD_BCRYPT),$old6));
                if($change6) {
                    echo "***";
                }
            } else {
                echo "***";
            }

        }
        else {
            echo "connection not working";
        }
        mysqli_close($conn);
    } else {
        echo "Session not set";
    }
}
?>
