exports.up = async (sql) => {
  await sql`
    ALTER TABLE flavour_profiles
    RENAME COLUMN fruit TO intensity
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE flavour_profiles
    RENAME COLUMN intensity TO fruit
  `;
};
