<?php
session_start();
include "connect.php";
mysqli_select_db($conn, $db);
/* if($conn) {
 *     if(mysqli_select_db($conn,$db) === TRUE) { */
$query = mysqli_query($conn, "select ID, technology, timeframe, info from projetos;");
while($row = mysqli_fetch_assoc($query)) {

    $stuff = json_encode($row).";";
    $stuff2 = str_replace("\\n", "<br/>", $stuff);
    echo $stuff2;
}
/* }
   } */
?>
