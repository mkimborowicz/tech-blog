
const sequelize = require('../config/connection');
const { User, Posts, Comments  } = require('../models');

const userData = require('./userData.json');
const postsData = require('./postsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  
  await Challenge.bulkCreate(postsData, {
    returning: true,
  })

  process.exit(0);
};



seedDatabase();