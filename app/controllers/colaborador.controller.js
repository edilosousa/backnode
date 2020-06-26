const db = require("../models");
const Sequelize = require("sequelize");
const Colaborador = db.colaborador;
const Op = db.Sequelize.Op;

// Criamos um novo registro no banco de um colaborador
exports.create = (req, res) => {
    // Valida a requisição.
    if (!req.body.nome) {
        res.status(400).send({
            message: "Nome não pode ser vazio!"
        });
        return;
    }
    const colaborador = {
        nome: req.body.nome,
        telefone: req.body.telefone,
        empresa: req.body.empresa,
        setor: req.body.setor,
        email: req.body.email,
        cargo: req.body.cargo
    };
    Colaborador.create(colaborador)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro ao criar um novo registro"
            });
        });
};

// Recupera todos os registros no banco de dados.
exports.findAll = (req, res) => {
    const nome = req.query.nome;
    var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

    Colaborador.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro ao buscar os registro"
            });
        });
};

// Recupera registros agrupados
exports.findAllByColaboradorGroupCargo = (req, res) => {
    Colaborador.findAll({ 
        group: ['cargo'],
        attributes: ['cargo', [Sequelize.fn('COUNT', 'cargo'), 'count']],
        order: [[Sequelize.literal('count'), 'DESC']],
        raw: true
     })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Erro ao buscar os registro"
            });
        });
};

// Buscar apenas um registro no corpo da requisição por um parametro
exports.findOne = (req, res) => {
    const id = req.params.id;

    Colaborador.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error ao buscar com o id=" + id
            });
        });
};

// Altera um registro no banco de dados.
exports.update = (req, res) => {
    const id = req.params.id;

    Colaborador.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Deleta um registro no banco de dados
exports.delete = (req, res) => {
    const id = req.params.id;

    Colaborador.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Colaborador deletado com sucesso"
                });
            } else {
                res.send({
                    message: `Não foi possivel delatar o colaborador com o id=${id}!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Não é possivel deletar esse registro de id=" + id
            });
        });
};