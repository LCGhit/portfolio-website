<?php
include "../users_tab/connect.php";

if($conn) {
    if(mysqli_select_db($conn, $db) === TRUE) {
        $query = mysqli_query($conn, "select * from noticias order by date;");
        while($row = mysqli_fetch_assoc($query)) {
            $news[] = $row;

        }
    }
}
$data = json_encode($news);
$edited = str_replace("\\n", "<br/>", $data);
echo $edited;
?>
