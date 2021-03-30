// Dependencies
// =============================================================
const User = require('./User');
const Exhibit = require('./Exhibit');

// Joins
// =============================================================
// A user can have many shortstacks but a shortstack can only have one user
User.hasMany(Exhibit, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Exhibit.belongsTo(User, {
  foreignKey: 'user_id'
});

// Export
// =============================================================
module.exports = { User, Exhibit };