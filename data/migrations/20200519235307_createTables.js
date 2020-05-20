exports.up = function (knex) {
  return (
    knex.schema
      .createTable("department", tbl => {
        tbl.increments();

        tbl.string("department_name", 228).notNullable().unique();
      })

      .createTable("users", tbl => {
        tbl.increments();

        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();

        tbl
          .integer("department_id")
          .unsigned()
          .references("department.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      })
  );
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("department").dropTableIfExists("users");
};
