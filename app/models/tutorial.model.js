module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("colaboradores", {
      nome: {
        type: Sequelize.STRING
      },
      telefone: {
        type: Sequelize.STRING
      },
      empresa: {
        type: Sequelize.STRING
      },
      setor: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      cargo: {
        type: Sequelize.STRING
      }
    });
  
    return Tutorial;
  };