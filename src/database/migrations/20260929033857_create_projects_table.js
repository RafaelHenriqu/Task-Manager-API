/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('projects', table => {
        table.increments('id').primary();
        table.integer('workspace_id').unsigned().notNullable()
            .references('id').inTable('workspaces').onDelete('CASCADE');
        table.string('name', 120).notNullable();
        table.text('description').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('projects');
};
