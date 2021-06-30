const grinders = [
  {
    grinder_name: 'Bezzera B005 Timer',
    manufacturer: 'Bezzera',
    price: '310',
    img: 'produktbild-108-1500070415-bild-450.jpg',
  },
  {
    grinder_name: 'Macap M2M',
    manufacturer: 'Macap',
    price: '349',
    img: 'produktbild-354-1520268893-bild-450.jpg',
  },
  {
    grinder_name: 'Eureka Silenzio 16 cr',
    manufacturer: 'Eureka',
    price: '399',
    img: 'produktbild-982-1612430869-bild-450.png',
  },
  {
    grinder_name: 'Profitec Manuale 54',
    manufacturer: 'Profitec',
    price: '450',
    img: 'produktbild-109-1607441357-bild-450.jpg',
  },
  {
    grinder_name: 'Rocket Faustino',
    manufacturer: 'Rocket',
    price: '480',
    img: 'produktbild-749-1555160553-bild-450.jpg',
  },
  {
    grinder_name: 'Eureka Perfetto',
    manufacturer: 'Eureka',
    price: '449',
    img: 'produktbild-615-1620039558-bild-450.png',
  },
  {
    grinder_name: 'Eureka Barista',
    manufacturer: 'Eureka',
    price: '399',
    img: 'produktbild-982-1612430869-bild-450.png',
  },
  {
    grinder_name: 'Quamar M80Elektronik',
    manufacturer: 'Quamar',
    price: '499',
    img: 'produktbild-599-1542801238-bild-450.jpg',
  },
  {
    grinder_name: 'ECM S64 Manuale',
    manufacturer: 'ECM',
    price: '599',
    img: 'produktbild-533-1607440667-bild-450.jpg',
  },
  {
    grinder_name: 'Eureka Helios 65',
    manufacturer: 'Eureka',
    price: '850',
    img: 'produktbild-919-1612428891-bild-450.png',
  },
  {
    grinder_name: 'Eureka Atom',
    manufacturer: 'Eureka',
    price: '695',
    img: 'produktbild-643-1612429110-bild-450.png',
  },
  {
    grinder_name: 'ECM V-Titan',
    manufacturer: 'ECM',
    price: '1149',
    img: 'produktbild-340-1613145644-bild-450.png',
  },
  {
    grinder_name: 'Rocket Fausto',
    manufacturer: 'Rocket',
    price: '799',
    img: 'produktbild-935-1603962432-bild-450.jpg',
  },
];

exports.up = async function up(sql) {
  await sql`
		INSERT INTO grinders ${sql(
      grinders,
      'grinder_name',
      'manufacturer',
      'price',
      'img',
    )}
	`;
};

exports.down = async function up(sql) {
  await sql`
		DELETE FROM grinders
	`;
};
