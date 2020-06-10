const { Model } = require("objection");

const User = require("./User.js");

class Character extends Model {
  static get tableName() {
    return "tCharacter";
  }

  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "tCharacter.user_id",
          to: "tUser.id"
        }
      }
    };
  }
}

module.exports = Character;
