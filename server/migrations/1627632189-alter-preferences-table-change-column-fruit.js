exports.up = async (sql) => {
  await sql`
    ALTER TABLE preferences
    RENAME COLUMN fruit TO intensity
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE preferences
    RENAME COLUMN intensity TO fruit
  `;
};
