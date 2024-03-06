const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Scorecard = sequelize.define('Scorecard', {
    date_range: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users', // Name of the User table
        key: 'userid', // Name of the referenced attribute in the User table
      },
    },
    week_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },{
    indexes: [
      // Unique constraint on the combination of userid, task, date, and duration
      {
        unique: true,
        fields: ['date_range', 'userid', 'week_number'],
      },
    ],
  });

    Scorecard.belongsTo(sequelize.models.Users, { foreignKey: 'userid' });

  return Scorecard;
};
