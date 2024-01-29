<?php
session_start();
if($_POST['registar']) {
    $host = 'localhost';
    $user = 'root';
    $pass = '';
    $db = 'masterd';
    $conn = mysqli_connect($host, $user, $pass);
    if($conn) {
        if(mysqli_select_db($conn, $db) === TRUE) {
            $search = mysqli_query($conn, sprintf("SELECT * FROM utilizadores WHERE username='%s';",mysqli_real_escape_string($conn,$_POST['username'])));
            $searchArray = mysqli_fetch_array($search);
            $arrayUsername = $searchArray['username'];
            if(!(isset($arrayUsername))) {
                $adduser = mysqli_query($conn, sprintf("INSERT INTO utilizadores (nome, apelido, username, email, telefone, pass) values ('%s','%s','%s','%s','%s','%s');", mysqli_real_escape_string($conn, $_POST['nome']),mysqli_real_escape_string($conn, $_POST['apelido']),mysqli_real_escape_string($conn, $_POST['username']),mysqli_real_escape_string($conn, $_POST['email']),mysqli_real_escape_string($conn, $_POST['telefone']),password_hash(mysqli_real_escape_string($conn, $_POST['pass']),PASSWORD_BCRYPT)));
                if($adduser) {
                    include "verify.php";
                } else {
                    echo "Erro no registo";
                }
            } else {
                $_SESSION['warning'] = "O username escolhido já existe";
                header("Location: ../index.php");
            }
        } else {
            echo "Erro na seleção da base de dados";
        }
        mysqli_close($conn);
    } else {
        echo "Conexão falhou";
    }
} elseif($_POST['login']) {
    header("Location: ../index.php");
} else {
?>
    <form method="POST" action="users_tab/registo.php" id="signupform">
        <h3>Sign Up</h3>
        Nome: <input name="nome" type="text" value=""/><br/>
        Apelido: <input name="apelido" type="text" value=""/><br/>
        Username: <input name="username" type="text" value=""/><br/>
        Email: <input name="email" type="text" value=""/><br/>
        Telefone: <input name="telefone" type="text" value=""/><br/>
        Pass: <input name="pass" type="password" value=""/><br/>
        <input class="submit" name="registar" type="submit" id="registar"/>
    </form>
    <form method="POST" action="../index.php">
        <input class="submit" name="login" type="submit" id="entrar"/>
    </form>
    <label for="registar" class="button">Submit</label>
    <label for="entrar" class="button">Sign In</label>
    <?php
    $_SESSION['warning'] = ' ';
    }
    ?>
