module.exports = (sequelize, Sequelize) => {
    const Agents = sequelize.define("agents", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.NUMBER
      }
    });
  
    return Agents;
  };