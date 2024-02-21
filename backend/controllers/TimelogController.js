const { Timelog, User } = require('../db');
const { Op } = require('sequelize');


const createTimelog = async (req, res) => {
  try {
    const { userid, date, task, duration, status } = req.body;

    // Check if a timelog with the same combination already exists
    const existingTimelog = await Timelog.findOne({
      where: {
        userid,
        date,
        task,
        duration: parseFloat(duration), // Convert to decimal for matching
      },
    });

    if (existingTimelog) {
      return res.status(400).json({ error: 'Duplicate entry. This combination already exists.' });
    }

    // Check if a user with the specified userid exists
    const existingUser = await User.findOne({
      where: { userid },
    });

    if (!existingUser) {
      return res.status(400).json({ error: 'User not found.' });
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

const updateTimelog = async (req, res) => {
  try {
    const { userid, date, task, newDuration } = req.body;


    // Find the timelog to update
    const timelogToUpdate = await Timelog.findOne({
      where: {
        userid,
        date,
        task,
      },
    });

    if (!timelogToUpdate) {
      return res.status(400).json({ error: 'Timelog not found for the specified user, date, and task.' });
    }

    // Update the duration of the timelog
    timelogToUpdate.duration = parseFloat(newDuration); // Convert to decimal before saving
    await timelogToUpdate.save();

    res.status(200).json({ timelogToUpdate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { createTimelog, deleteTimelogs, updateTimelog };