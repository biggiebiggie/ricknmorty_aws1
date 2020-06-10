const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "tUser";
  }
}

module.exports = User;
