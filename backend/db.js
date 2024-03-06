// This code is contributed by Surya
const { Sequelize } = require('sequelize');
require('dotenv').config();
//DB connection is established
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});
//
const User = require('./models/user')(sequelize);
const Timelog = require('./models/timelog')(sequelize);
const Scorecard = require('./models/scorecard')(sequelize);
//Foreign key relationship is declared here
User.hasMany(Timelog, { foreignKey: 'userid' });
Timelog.belongsTo(User, { foreignKey: 'userid' });

User.hasMany(Scorecard, { foreignKey: 'userid' });
Scorecard.belongsTo(User, { foreignKey: 'userid' });

module.exports = { sequelize, User, Timelog, Scorecard };





