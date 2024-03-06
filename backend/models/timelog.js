const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Timelog = sequelize.define('Timelogs', {
    userid: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Users', // Name of the User table
        key: 'userid', // Name of the referenced attribute in the User table
      },
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      get: function() {
        // Ensure only the date part is returned without the timestamp
        return this.getDataValue('date');
      },
      set: function(value) {
        // Parse the incoming value as a date without the timestamp
        this.setDataValue('date', value);
      },
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.DECIMAL(10, 2), // 10 total digits, 2 decimal places
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['save', 'submit']],
      },
    },
  }, {
    indexes: [
      // Unique constraint on the combination of userid, task, date, and duration
      {
        unique: true,
        fields: ['userid', 'task', 'date', 'duration'],
      },
    ],
  });

  Timelog.belongsTo(sequelize.models.Users, { foreignKey: 'userid' });

  return Timelog;
};
