const User = require('./User');
const Gallery = require('./Gallery');
const Exhibit = require('./Exhibit');

//
User.belongsTo(Gallery, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Exhibit,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'pieces'
});

Gallery.belongsTo(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: Exhibit,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'studio'
});

module.exports = { User, Gallery, Exhibit };
