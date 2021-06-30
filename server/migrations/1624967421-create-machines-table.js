exports.up = async function up(sql) {
  await sql`
		CREATE TABLE machines (
			id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
			machine_name varchar(40) NOT NULL,
			manufacturer varchar(40) NOT NULL,
			price numeric NOT NULL,
			img varchar(100) NOT NULL
		)
	`;
};

exports.down = async function up(sql) {
  await sql`
		DROP TABLE machines
	`;
};
