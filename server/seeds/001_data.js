exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tUser")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("tUser").insert([
        { id: 1, username: "Elias", email: "eli1@eli.dk", password: "123" },
        {
          id: 2,
          username: "Rasmus",
          email: "morten@morten.dk",
          password: "321"
        }
      ]);
    })
    .then(function () {
      return knex("tCharacter").del().then(function () {
        return knex("tCharacter").insert([
          { id: 1, name: "Elias", species: "Human", status: "Alive", user_id: 1 },
          { id: 2, name: "Rasmus", species: "Human", status: "Dead", user_id: 1 }
        ]);
      });
    });
};
