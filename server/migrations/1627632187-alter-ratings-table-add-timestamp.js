exports.up = async (sql) => {
  await sql`
    ALTER TABLE ratings
    ADD COLUMN rating_date timestamp DEFAULT CURRENT_TIMESTAMP
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE ratings
    DROP COLUMN rating_date
  `;
};
