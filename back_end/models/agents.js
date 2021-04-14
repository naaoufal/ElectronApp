module.exports = (sequelize,DataTypes) => {
  const Agent = sequelize.define('Agents',{
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.NUMBER
  });
  return Agent;
}
