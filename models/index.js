const User = require('./User');
const Gallery = require('./Gallery');
const Exhibit = require('./Exhibit');

//
User.hasOne(Gallery, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
//   through: {
//     model: Exhibit,
//     unique: false
//   },
  // Define an alias for when data is retrieved
//   as: 'pieces'
});

Gallery.belongsTo(User, {
    foreignKey: 'gallery_id'
//   through: {
//     model: Exhibit,
//     unique: false
//   },
//   // Define an alias for when data is retrieved
//   as: 'studio'
});

User.hasMany(Exhibit, { foreignKey: 'user_id' });

Exhibit.belongsTo(User, { foreignKey: 'user_id' });

module.exports = { User, Gallery, Exhibit };
