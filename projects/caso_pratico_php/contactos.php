<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <title>Document</title>
        <link href="css/contactos.css" rel="stylesheet"/>
        <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJ4UYojA3LduldgOlizCQJjjpNCjHkvn4&callback=myMap"></script>

    </head>
    <body>
        <div class="contactos">
            <div class="menu"><a href="index.php" id="link">Voltar</a></div>
            <div id="mapa"></div>
            <div id="rota"><hr/></div>
            <div class="direcoes">
                <h2>Direções</h2>
                Para: <input name="destino" id="destino" type="textbox" value="O nosso escritório" disabled/><br/>
                A partir de: <input name="origem" type="textbox" value="" id="origem" />
                <input name="" type="button" value="Ver rota" onclick="calculateRoute()" />
            </div>

            <div class="dados">
                <form name="dadosContacto" method="POST" id="dadosContacto">
                    Primeiro nome:<input name="contactNome" type="text" value="" id="contactNome" /><br/>
                    Apelido:<input name="contactApelido" type="text" value=""/><br/>
                    Telemóvel:<input name="contactTelemovel" type="text" value=""/><br/>
                    Email:<input name="contactEmail" type="text" value=""/><br/>
                    Data:<input name="contactData" type="text" value="" placeholder="dd/mm" /><br/>
                    Motivo do contacto para reunião: <br/>
                    <textarea cols="30" id="" name="contactMotivo" rows="10" placeholder="Escreva aqui"></textarea> <br/>
                </form>
                <input name="contactEnviar" type="button" value="Enviar" id="contactEnviar" />
            </div>
        </div>
        <div class="footer">
            <ul>
                <li>WebNow&#xae; - Serviços Web</li>
                <li>Tel: 222 222 222</li>
                <li>Rua da Liberdade, 33033, 33.º direito</li>
            </ul>
        </div>
        </div>
        <script type="text/javascript" src="javascript/contactos.js"></script>
    </body>
</html>
