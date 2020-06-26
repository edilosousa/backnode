const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

//usamos o express para criação de nossa API
const app = express();

//criando nossa origem de nossa aplicação no rotemento.
var corsOptions = {
    origin: "http://localhost:4200" 
};
//usando o cors para que a nossas solicitações ajax fiquem definida na origem definida.
app.use(cors(corsOptions));
//converter nosso corpo de requisição em formato jSON.
app.use(bodyParser.json());
//dados codificados em URL com a querystring
app.use(bodyParser.urlencoded({extended: true}));

//ao iniciar o servidor tentamos criar a table caso não exista.
const db = require('./app/models');
db.sequelize.sync();

//rotas existente para a inicialização.
require("./app/routes/colaborador.routes")(app);

//definindo uma porta de conexão.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server iniciado na porta ${PORT}.`);
});