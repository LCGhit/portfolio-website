<?php
session_start();
?>
<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="???">
        <meta name="keywords" content="rss, portfolio">
        <meta name="author" content="Luís">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="css/main.css" rel="stylesheet">
        <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
        <script src="https://kit.fontawesome.com/2996c63a72.js" crossorigin="anonymous"></script>
    </head>
    <body>
        <div class="container">
            <nav class="first">
                <label for="hideShow" class="hideShow">Menu</label>
                <input type="checkbox" role="button" id="hideShow">
                <ul class="menu-grid">
                    <li><a href="#" id="home">Home</a></li>
                    <li><a href="#formOrc">Pedir Orçamento</a></li>
                    <li><a href="#" id="portfolio">Portfolio</a></li>
                    <li><a href="contactos.php" target="_self">Contactos</a></li>
                    <li><a id="login" href="#">Login/Registo</a></li>
                </ul>
            </nav>

            <div class="second">
                <ul id="banner">
                    <li>#Um website único</li>
                    <li>#Estimativa imediata</li>
                    <li>#Portólio para inspiração</li>
                    <li>#Reunião em pessoa</li>
                </ul>
                <img alt="" src="images/banner.png"/>
            </div>

            <div class="third">
                <div class="news">
                    <div class="rss">
                        <h3 id="rssTitle">notícias</h3>
                        <a href="#" onclick="dbNews(0)"></a>
                        <a href="#" onclick="dbNews(1)"></a>
                        <a href="#" onclick="dbNews(2)"></a>
                        <a href="#" onclick="dbNews(3)"></a>
                        <a href="#" onclick="dbNews(4)"></a>
                    </div>
                    <div id="box"></div>
                    <div class="info">
                        <ul>
                            <li>Múltiplas opções para separadores</li>
                            <li>Cada separador a 400€</li>
                            <li>Confirmação de orçamento em 48h</li>
                        </ul>
                    </div>
                </div>

                <div class="galleryContainer" id="gallery">
                    <div class="subcontainer" id="subcontainer">
                        <div class="grid" id="grid">
                            <?php
                            include "users_tab/portfolio_images.php";
                            ?>
                        </div>
                    </div>
                </div>

            </div>

            <div class="fourth" id="formOrc">
                <form name="orcamento" method="POST" id="orcamento">
                    <h4>Dados</h4>
                    Nome: <input name="nome" type="text" value=""/><br/>
                    Apelido: <input name="apelido" type="text" value=""/><br/>
                    Telemóvel: <input name="telemovel" type="text" value=""/><br/>

                    <h4>Pedido de Orçamento</h4>
                    Tipo de página: <select id="" name="base">
                        <option value="200">Basic</option>
                        <option value="250">Total</option>
                        <option value="300">Plus</option>
                        <option value="350">Premium</option>
                    </select><br/>
                    Prazo em meses: <input name="prazo" type="text" value=""/><br/>

                    <h5>Separadores desejados</h5>
                    Quem somos <input name="quemSomos" type="checkbox" value=""/>
                    Onde estamos <input name="ondeEstamos" type="checkbox" value=""/><br/>
                    Galeria <input name="galeria" type="checkbox" value=""/>
                    eCommerce <input name="eCommerce" type="checkbox" value=""/><br/>
                    Gestão Interna<input name="gestaoInterna" type="checkbox" value=""/>
                    Notícias <input name="noticias" type="checkbox" value=""/><br/>
                    Redes Sociais <input name="redesSociais" type="checkbox" value=""/>

                    <h5>Estimativa<br>(valor indicativo)</h5>
                    <input name="estimativa" type="text" value="" disabled id="estimativa"/><br/>
                    <input name="enviar" type="button" value="Enviar"/>
                </form>
            </div>

            <footer class="fifth">
                <a href="https://www.facebook.com" target="blank"><i class="fa-brands fa-facebook"></i></a>

                <a href="https://www.instagram.com" target="blank"><i class="fa-brands fa-square-instagram"></i></a>
                <a href="https://twitter.com" target="blank"><i class="fa-brands fa-twitter"></i></a>
            </footer>
        </div>
        </div>

        <!-- ////////////////////USERS TAB//////////////////// -->
        <div id="tabs">
            <span id="fechar">Fechar</span>
            <div id="warning">
                <?php
                if($_SESSION['warning']) {
                    echo $_SESSION['warning'];
                    $_SESSION['warning'] = '';
                ?>
                    <script>
                     document.getElementById("tabs").style.display = "block";
                    </script>
                <?php
                }
                ?>
            </div>
            <div>
                <?php
                if(isset($_SESSION['key_id'])){
                    include "users_tab/edit_client.php";
                ?>
            </div>
            <script>
             document.getElementById("login").innerHTML = 'Perfil';
            </script>
                <?php
                } elseif($_POST['registo']) {
                    include "users_tab/registo.php";
                ?>
                <script>
                 document.getElementById("tabs").style.display = 'block';
                </script>
                <?php
                } else {
                ?>
                    <div id="usersTab">
                        <form name="loginform" action="users_tab/verify.php" method="POST" id="loginform">
                            <h3>Sign In</h3>
                            Username: <input name="username" type="text" placeholder="admin || userX  /* X<=3 */"/><br/>
                            Password: <input name="pass" type="password" placeholder="adminpass || userXpass"/><br/>
                            <input class="submit" type="submit" id="logbutton"/>
                        </form>
                        <label for="logbutton" class="button">Submit</label>
                        <form name="registo" method="POST" action="index.php">
                            <input class="submit" type="submit" name="registo" id="criarconta" value="sign up"/>
                        </form>
                        <label for="criarconta" class="button">Sign Up</label>
                    </div>
                <?php
                }
                ?>
        </div>
        <!-- ////////////////////USERS TAB//////////////////// -->
        <script type="text/javascript" src="javascript/rss.js"></script>
    </body>

</html>
