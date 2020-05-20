exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const department = [
    {
      department_name: "sales", // will get id 1
    },
    {
      department_name: "marketing", // will get id 2
    },
  ];

  return knex("department")
    .insert(department)
    .then(() => console.log("\n== Seed data for roles table added. ==\n"));
};
