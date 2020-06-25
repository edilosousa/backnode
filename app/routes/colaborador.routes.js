module.exports = app => {
    const colaboradores = require("../controllers/colaborador.controller.js");
  
    var router = require("express").Router();
  
    // Rota para Criar um novo colaborador
    router.post("/", colaboradores.create);
  
    // Rota para listar todos os colaboradores
    router.get("/", colaboradores.findAll);

    // Rota para listar apenas um colaborador
    router.get("/:id", colaboradores.findOne);

    // Rota de alteração do colaborador
    router.put("/:id", colaboradores.update);

    // Rota para deletar o colaborador
    router.delete("/:id", colaboradores.delete);

    app.use('/api/colaboradores', router);
  };