<?php
session_start();
$vc1 = $_REQUEST["vc1"]; /* first name */
$vc2 = $_REQUEST["vc2"]; /* last name */
$vc3 = $_REQUEST["vc3"]; /* username */
$vc4 = $_REQUEST["vc4"]; /* email */
$vc5 = $_REQUEST["vc5"]; /* phone */
$vc6 = $_REQUEST["vc6"]; /* pass */
if(isset($_SESSION['key_id'])){
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $db = 'masterd';
    $conn = mysqli_connect($host,$user,$pass);
    if($conn) {
        if(mysqli_select_db($conn,$db) === TRUE) {
            /* change name */
            if($vc1 !== 'undefined' && $vc1 !=='') {
                $new1 = mysqli_real_escape_string($conn,$vc1);
                $old1 = $_SESSION['clientArray']['username'];
                $change1 = mysqli_query($conn, sprintf("update utilizadores set nome='%s' where username='%s';", $new1, $old1));
                if($change1) {
                    echo $new1." ";
                }
            } else {
                echo $_SESSION['clientArray']['nome']." ";
            }
            /* change last name */
            if($vc2 !== 'undefined' && $vc2 !=='') {
                $new2 = mysqli_real_escape_string($conn,$vc2);
                $old2 = $_SESSION['clientArray']['username'];
                $change2 = mysqli_query($conn, sprintf("update utilizadores set apelido='%s' where username='%s';", $new2, $old2));
                if($change2) {
                    echo $new2." ";
                }
            } else {
                echo $_SESSION['clientArray']['apelido']." ";
            }

            /* change username */
            if($vc3 !== 'undefined' && $vc3 !=='') {
                $new3 = mysqli_real_escape_string($conn,$vc3);
                if(mysqli_query($conn, "select * from utilizadores where username='".$vc3."';")) {
                    $_SESSION['warning'] = "Username já existe";
                }
                $old3 = $_SESSION['clientArray']['username'];
                $change3 = mysqli_query($conn, sprintf("update utilizadores set username='%s' where username='%s';", $new3, $old3));
                if($change3) {
                    echo $new3." ";
                }
            } else {
                echo $_SESSION['clientArray']['username']." ";
            }
            /* change email */
            if($vc4 !== 'undefined' && $vc4 !=='') {
                $new4 = mysqli_real_escape_string($conn,$vc4);
                $old4 = $_SESSION['clientArray']['username'];
                $change4 = mysqli_query($conn, sprintf("update utilizadores set email='%s' where username='%s';", $new4, $old4));
                if($change4) {
                    echo $new4." ";
                }
            } else {
                echo $_SESSION['clientArray']['email']." ";
            }
            /* change phone */
            if($vc5 !== 'undefined' && $vc5 !=='') {
                $new5 = mysqli_real_escape_string($conn,$vc5);
                $old5 = $_SESSION['clientArray']['username'];
                $change5 = mysqli_query($conn, sprintf("update utilizadores set telefone='%s' where username='%s';", $new5, $old5));
                if($change5) {
                    echo $new5." ";
                }
            } else {
                echo $_SESSION['clientArray']['telefone']." ";
            }
            if($vc6 !== 'undefined' && $vc6 !== '') {
                $new6 = mysqli_real_escape_string($conn,$vc6);
                $old6 = $_SESSION['clientArray']['username'];
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
