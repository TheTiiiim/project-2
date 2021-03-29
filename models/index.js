const User = require('./User');
const Gallery = require('./Gallery');
const Exhibit = require('./Exhibit');

User.hasMany(Exhibit, { foreignKey: 'user_id' });

Exhibit.belongsTo(User, { foreignKey: 'user_id' });

User.belongsToMany(Gallery, {
  through: {
    model: Exhibit,
    unique: false
  },
  // Alias for when data is retrieved:
  as: 'users_exhibit'
});

Gallery.belongsToMany(User, {
  through: {
    model: Exhibit,
    unique: false
  },
  // Alias for when data is retrieved
  as: 'users_gallery'
});

Gallery.hasMany(Exhibit, { foreignKey: user_id });

module.exports = { User, Gallery, Exhibit };
