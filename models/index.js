const User = require('./User');
const UserInfo = require('./UserInfo');
const Exhibit = require('./Exhibit');

User.hasMany(Exhibit, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Exhibit.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasOne(UserInfo, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

UserInfo.belongsTo(User, {
  foreignKey: 'user_id',
});


module.exports = { User, UserInfo, Exhibit };
