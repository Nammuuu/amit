const { Op } = require('sequelize');
const { Orders } = require('../models');
const cron = require('node-cron');

const cronCalled = async () => {
  const twelveMinutesAgo = new Date(new Date() - 12 * 60 * 1000);
  console.log('check 12 minutes-------------------------------------', twelveMinutesAgo);
  //   const currentTime = new Date();
  //   console.log('currentTime=============================================', currentTime.toISOString());
  //   const timestamp1 = new Date('2024-01-18T06:52:41.196Z');
  //   const timestamp2 = new Date('2024-01-18T07:04:41.198Z');

  //   const timeDifferenceInMilliseconds = Math.abs(timestamp2 - timestamp1);
  //   const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

  //   console.log(timeDifferenceInMinutes);

  Orders.findAll({
    where: {
      createdAt: {
        [Op.lte]: twelveMinutesAgo
      },
      orderStatus: 'In Process'
    }
  })
    .then((result) => {
      console.log('check result ------------------------------------------', result);
      result.map(async (item) => {
        await Orders.update({ orderStatus: 'Payment Failed' }, { where: { id: item.dataValues.id } });
      });
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};

// cron.schedule('*/10 * * * *', () => {
//   console.log('Task executed every 1 minute.//////////////////////////////////');
//   cronCalled();
// });

module.exports = cronCalled;
