const { Scorecard,User } = require('../db');
const { Op } = require('sequelize');


const createScorecard = async (req, res) => {
  try {
    const { date_range, userid, week_number, score } = req.body;

    // Check if a scorecard with the same combination already exists
    const existingScorecard = await Scorecard.findOne({
      where: {
        date_range,
        userid,
        week_number,
      },
    });

    if (existingScorecard) {
      return res.status(400).json({ error: 'Duplicate entry. This combination already exists.' });
    }

    // Check if a user with the specified userid exists
    const existingUser = await User.findOne({
        where: { userid },
    });

    if (!existingUser) {
        return res.status(400).json({ error: 'User not found.' });
    }

    // Create a new scorecard if no duplicate entry found
    const scorecard = await Scorecard.create({
      date_range,
      userid,
      week_number,
      score, 
    });

    res.status(200).json({ scorecard });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const { startOfWeek, endOfWeek, getISOWeek, startOfMonth, endOfMonth } = require('date-fns');

const getWeekNumber = (date) => {
  return getISOWeek(date);
};

const getScore = async (req, res) => {
  try {
    const { userid, month, year } = req.body; // Assume month is 1-12 for January-December

    // Calculate start and end dates of the month
    const startDate = startOfMonth(new Date(year, month - 1, 1));
    const endDate = endOfMonth(new Date(year, month - 1, 1));

    // Calculate week numbers
    const startweeknumber = getWeekNumber(startOfWeek(startDate, { weekStartsOn: 1 }));
    const endweeknumber = getWeekNumber(endOfWeek(endDate, { weekStartsOn: 1 }));

    console.log("userid", userid);
    console.log("startweeknumber", startweeknumber);
    console.log("endweeknumber", endweeknumber);

    // Fetch scorecards for the specified user and week range
    const scorecards = await Scorecard.findAll({
      where: {
        userid,
        week_number: {
          [Op.between]: [startweeknumber, endweeknumber],
        },
        date_range: {
          [Op.substring]: `${year}`
        },
      },
      order: [['week_number', 'ASC']], // Order by week_number in ascending order
    });

    // Extract relevant information and format the response
    const response = scorecards.map((scorecard) => ({
      score: scorecard.score,
      date_range: scorecard.date_range,
      week_number: scorecard.week_number,
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// const totalScore = async (req, res) => {
//   try {
//     const { userid, startDate } = req.body;

//     // Calculate the week number for the provided start date
//     console.log("start_date", startDate);
//     const startWeekNumber = getWeekNumber(new Date(startDate));

//     console.log("userid", userid);
//     console.log("startWeekNumber", startWeekNumber);

//     // Fetch scorecards for the specified user and weeks before the provided start date
//     const scorecards = await Scorecard.findAll({
//       where: {
//         userid,
//         week_number: {
//           [Op.lt]: startWeekNumber,
//         },
//       },
//       order: [['week_number', 'ASC']], // Order by week_number in ascending order
//     });

//     // Calculate the total score from the fetched scorecards
//     const totalScore = scorecards.reduce((acc, scorecard) => acc + scorecard.score, 0);

//     res.status(200).json({ totalScore });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


const getDateRange = async (req, res) => {
  try {
    const { userid } = req.body;

    // Calculate the week number for the provided start date
    //const startWeekNumber = getWeekNumber(new Date(start_date));

    console.log("userid", userid);
    //console.log("startWeekNumber", startWeekNumber);

    // Fetch scorecards for the specified user and weeks before the provided start date
    const scorecards = await Scorecard.findAll({
      where: {
        userid,
        // week_number: {
        //   [Op.lt]: startWeekNumber,
        // },
      },
      //order: [['week_number', 'ASC']], // Order by week_number in ascending order
    });

    // Extract date ranges from the fetched scorecards
    let dateRanges = scorecards.map((scorecard) => scorecard.date_range);
    dateRanges = dateRanges.sort((a, b) => new Date(a.split(' - ')[0]) - new Date(b.split(' - ')[0]));
    
    res.status(200).json({ dateRanges });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = { createScorecard, getScore, getDateRange };