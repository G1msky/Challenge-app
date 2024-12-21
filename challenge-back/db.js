const { Sequelize } = require("sequelize");
const config = require("./config/config.json");
// Подключение к базе данных
const db = new Sequelize(config.production);

(async () => {
  try {
    // Задержка перед подключением
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    await db.authenticate();
    console.log(
      "Connection to the database has been established successfully."
    );
    // await db.sync({ force: true }); // TO RESET DATABASE
    await db.sync();
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
