<?php
session_start();
include "users_tab/connect.php";
?>
<div id="portfolio_tab">
    <div id="projetos_grid">
        <?php
        if($conn) {
            if(mysqli_select_db($conn, $db) === TRUE) {
                $query = mysqli_query($conn, "select * from projetos");
                while($row = mysqli_fetch_array($query)) {
                    echo "<form method='post' action='users_tab/change_portfolio.php'>";
                    echo "<input name='id' type='hidden' value='".$row['ID']."'/><br/>";
                    echo "ID <br/><input name='' type='text' value='".$row['ID']."' disabled/><br/>";
                    echo "Imagem <br/><input name='image' type='text' value='".$row['image']."'/><br/>";
                    echo "Prazo (dias) <br/><input name='timeframe' type='text' value='".$row['timeframe']."'/><br/>";
                    echo "Informação <br/><textarea cols='20' name='info' rows='5'>".$row['info']."</textarea><br/>";
                    echo "Tecnologia <br/><textarea cols='20' name='technology' rows='5'>".$row['technology']."</textarea><br/>";
                    echo "<input name='' type='submit' value='Alterar projeto' id='".$row['ID']."' class='cancelAppoint'/>";
                    echo "<label for='".$row['ID']."' class='delete_news_label'>Alterar&nbspprojeto</label>";
                    echo "<hr/></form>";
                }
            }
        }
        ?>
    </div>
</div>
