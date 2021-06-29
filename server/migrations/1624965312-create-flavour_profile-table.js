exports.up = async function up(sql) {
  await sql`
		CREATE TABLE flavour_profiles (
			id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			body integer NOT NULL,
			fruit integer NOT NULL,
			acidity integer NOT NULL
		)
	`;
};

exports.down = async function up(sql) {
  await sql`
		DROP TABLE flavour_profiles
	`;
};
