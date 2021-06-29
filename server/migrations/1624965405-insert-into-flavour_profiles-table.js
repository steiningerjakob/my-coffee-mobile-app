const flavourProfiles = [{}];

exports.up = async function up(sql) {
  await sql`
		INSERT INTO flavour_profiles ${sql(flavourProfiles, 'body', 'fruit', 'acidity')}
	`;
};

exports.down = async function up(sql) {
  await sql`
		DELETE FROM flavour_profiles
	`;
};
