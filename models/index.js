// Dependencies
// =============================================================
const User = require('./User');
const ShortStack = require('./ShortStack');
const Exhibit = require('./Exhibit');

// Joins
// =============================================================
// A user can have many shortstacks but a shortstack can only have one user
User.hasMany(ShortStack, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

ShortStack.belongsTo(User, {
  foreignKey: 'user_id'
});

// A shortstack can have many (3) artworks but an artwork can only have one shortstack
ShortStack.hasMany(Exhibit, {
  foreignKey: 'shortStack_id',
  onDelete: 'CASCADE'
});

Exhibit.belongsTo(ShortStack, {
  foreignKey: 'shortStack_id'
});

// Export
// =============================================================
module.exports = { User, ShortStack, Exhibit };