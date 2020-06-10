exports.up = function (knex) {
  return knex.schema
    .createTable("tUser", table => {
      table.increments("id");
      table.string("userName").notNullable();
      table.string("email");
      table.string("password");
    })
    .createTable("tCharacter", table => {
      table.increments("id");
      table.string("name").notNullable();
      table.string("species");
      table.string("status");
      table.string("image");
      table.integer("user_id").unsigned().notNullable();

      table
        .foreign("user_id")
        .references("id")
        .inTable("tuser")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tCharacter").dropTableIfExists("tUser");
};
