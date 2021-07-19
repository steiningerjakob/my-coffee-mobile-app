const flavourProfiles = [
  {
    body: '1',
    intensity: '1',
    acidity: '1',
  },
  {
    body: '2',
    intensity: '1',
    acidity: '1',
  },
  {
    body: '3',
    intensity: '1',
    acidity: '1',
  },
  {
    body: '4',
    intensity: '1',
    acidity: '1',
  },
  {
    body: '5',
    intensity: '1',
    acidity: '1',
  },
  {
    body: '1',
    intensity: '2',
    acidity: '2',
  },
  {
    body: '2',
    intensity: '2',
    acidity: '2',
  },
  {
    body: '3',
    intensity: '2',
    acidity: '2',
  },
  {
    body: '4',
    intensity: '2',
    acidity: '2',
  },
  {
    body: '5',
    intensity: '2',
    acidity: '2',
  },
  {
    body: '1',
    intensity: '3',
    acidity: '3',
  },
  {
    body: '2',
    intensity: '3',
    acidity: '3',
  },
  {
    body: '3',
    intensity: '3',
    acidity: '3',
  },
  {
    body: '4',
    intensity: '3',
    acidity: '3',
  },
  {
    body: '5',
    intensity: '3',
    acidity: '3',
  },
  {
    body: '1',
    intensity: '4',
    acidity: '4',
  },
  {
    body: '2',
    intensity: '4',
    acidity: '4',
  },
  {
    body: '3',
    intensity: '4',
    acidity: '4',
  },
  {
    body: '4',
    intensity: '4',
    acidity: '4',
  },
  {
    body: '5',
    intensity: '4',
    acidity: '4',
  },
  {
    body: '1',
    intensity: '5',
    acidity: '5',
  },
  {
    body: '2',
    intensity: '5',
    acidity: '5',
  },
  {
    body: '3',
    intensity: '5',
    acidity: '5',
  },
  {
    body: '4',
    intensity: '5',
    acidity: '5',
  },
  {
    body: '5',
    intensity: '5',
    acidity: '5',
  },
  {
    body: '1',
    intensity: '2',
    acidity: '1',
  },
  {
    body: '1',
    intensity: '3',
    acidity: '1',
  },
  {
    body: '1',
    intensity: '4',
    acidity: '1',
  },
  {
    body: '1',
    intensity: '5',
    acidity: '1',
  },
  {
    body: '2',
    intensity: '1',
    acidity: '2',
  },
  {
    body: '2',
    intensity: '3',
    acidity: '2',
  },
  {
    body: '2',
    intensity: '4',
    acidity: '2',
  },
  {
    body: '2',
    intensity: '5',
    acidity: '2',
  },
  {
    body: '3',
    intensity: '1',
    acidity: '3',
  },
  {
    body: '3',
    intensity: '2',
    acidity: '3',
  },
  {
    body: '3',
    intensity: '4',
    acidity: '3',
  },
  {
    body: '3',
    intensity: '5',
    acidity: '3',
  },
  {
    body: '4',
    intensity: '1',
    acidity: '4',
  },
  {
    body: '4',
    intensity: '2',
    acidity: '4',
  },
  {
    body: '4',
    intensity: '3',
    acidity: '4',
  },
  {
    body: '4',
    intensity: '5',
    acidity: '4',
  },
  {
    body: '5',
    intensity: '1',
    acidity: '5',
  },
  {
    body: '5',
    intensity: '2',
    acidity: '5',
  },
  {
    body: '5',
    intensity: '3',
    acidity: '5',
  },
  {
    body: '5',
    intensity: '4',
    acidity: '5',
  },
  {
    body: '1',
    intensity: '1',
    acidity: '2',
  },
  {
    body: '1',
    intensity: '1',
    acidity: '3',
  },
  {
    body: '1',
    intensity: '1',
    acidity: '4',
  },
  {
    body: '1',
    intensity: '1',
    acidity: '5',
  },
  {
    body: '2',
    intensity: '2',
    acidity: '1',
  },
  {
    body: '2',
    intensity: '2',
    acidity: '3',
  },
  {
    body: '2',
    intensity: '2',
    acidity: '4',
  },
  {
    body: '2',
    intensity: '2',
    acidity: '5',
  },
  {
    body: '3',
    intensity: '3',
    acidity: '1',
  },
  {
    body: '3',
    intensity: '3',
    acidity: '2',
  },
  {
    body: '3',
    intensity: '3',
    acidity: '3',
  },
  {
    body: '3',
    intensity: '3',
    acidity: '5',
  },
  {
    body: '4',
    intensity: '4',
    acidity: '1',
  },
  {
    body: '4',
    intensity: '4',
    acidity: '2',
  },
  {
    body: '4',
    intensity: '4',
    acidity: '3',
  },
  {
    body: '4',
    intensity: '4',
    acidity: '5',
  },
  {
    body: '5',
    intensity: '5',
    acidity: '1',
  },
  {
    body: '5',
    intensity: '5',
    acidity: '2',
  },
  {
    body: '5',
    intensity: '5',
    acidity: '3',
  },
  {
    body: '5',
    intensity: '5',
    acidity: '4',
  },
];

exports.up = async function up(sql) {
  await sql`
		INSERT INTO flavour_profiles ${sql(
      flavourProfiles,
      'body',
      'intensity',
      'acidity',
    )}
	`;
};

exports.down = async function up(sql) {
  await sql`
		DELETE FROM flavour_profiles
	`;
};
