<?php
session_start();
include "users_tab/connect.php";
if($conn) {
    if(mysqli_select_db($conn,$db) === TRUE) {
        $query = mysqli_query($conn, "select * from projetos");
        while($row = mysqli_fetch_array($query)) {
            echo "<img class='img' src='".$row['image']."'/>";
        }
    }
}
?>
