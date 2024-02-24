const { Timelog, User } = require('../db');
const { Op } = require('sequelize');


const createTimelog = async (req, res) => {
  try {
    const { userid, date, task, duration, status } = req.body;

    // Check if a user with the specified userid exists
    const existingUser = await User.findOne({
      where: { userid },
    });

    if (!existingUser) {
      return res.status(400).json({ error: 'User not found.' });
    }

    // Check if a timelog with the same combination already exists
    let existingTimelog = await Timelog.findOne({
      where: {
        userid,
        date,
        task,
      },
    });

    if (existingTimelog) {
      // If timelog exists, update the duration and status
      existingTimelog.duration = parseFloat(duration);
      existingTimelog.status = status;
      await existingTimelog.save();

      return res.status(200).json({ timelog: existingTimelog, message: 'Timelog updated successfully.' });
    }    

    // Create a new timelog if no duplicate entry found and user exists
    const timelog = await Timelog.create({
      userid,
      date,
      task,
      duration: parseFloat(duration), // Convert to decimal before saving
      status,
    });

    res.status(200).json({ timelog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteTimelogs = async (req, res) => {
  try {
    const { userid, task, startDate, endDate } = req.body;


    // Delete all timelogs with the specified task, startDate, and endDate
    const deletedTimelogs = await Timelog.destroy({
      where: {
        userid,
        task,
        date: {
          [Op.gte]: startDate, // Greater than or equal to startDate
          [Op.lte]: endDate,   // Less than or equal to endDate
        },
      },
    });

    res.status(200).json({ deletedTimelogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getTaskDetails = async (req, res) => {
  try {
    const { userid, startDate, endDate } = req.body;

    // Retrieve task details between startDate and endDate
    const taskDetails = await Timelog.findAll({
      attributes: ['task', 'duration', 'date'],
      where: {
        userid,
        date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
    });

    res.status(200).json({ taskDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createTimelog, deleteTimelogs, getTaskDetails };

