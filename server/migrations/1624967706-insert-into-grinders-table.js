const grinders = [
  {
    grinder_name: 'Bezzera B005 Timer',
    manufacturer: 'Bezzera',
    price: '310',
    img: 'produktbild-108-1500070415-bild-450.jpg',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477530/grinders/produktbild-108-1500070415-bild-450_zm8iuo.jpg',
  },
  {
    grinder_name: 'Macap M2M',
    manufacturer: 'Macap',
    price: '349',
    img: 'produktbild-354-1520268893-bild-450.jpg',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477530/grinders/produktbild-354-1520268893-bild-450_l4p00i.jpg',
  },
  {
    grinder_name: 'Eureka Silenzio 16',
    manufacturer: 'Eureka',
    price: '399',
    img: 'produktbild-982-1612430869-bild-450.png',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477531/grinders/produktbild-982-1612430869-bild-450_k3wpcw.png',
  },
  {
    grinder_name: 'Profitec Manuale 54',
    manufacturer: 'Profitec',
    price: '450',
    img: 'produktbild-109-1607441357-bild-450.jpg',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477530/grinders/produktbild-533-1607440667-bild-450_xwufp7.jpg',
  },
  {
    grinder_name: 'Rocket Faustino',
    manufacturer: 'Rocket',
    price: '480',
    img: 'produktbild-749-1555160553-bild-450.jpg',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477530/grinders/produktbild-749-1555160553-bild-450_pbfufu.jpg',
  },
  {
    grinder_name: 'Eureka Mignon',
    manufacturer: 'Eureka',
    price: '449',
    img: 'produktbild-615-1620039558-bild-450.png',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477531/grinders/produktbild-615-1620039558-bild-450_jgxsc9.png',
  },
  {
    grinder_name: 'Eureka Barista',
    manufacturer: 'Eureka',
    price: '399',
    img: 'produktbild-982-1612430869-bild-450.png',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477531/grinders/produktbild-982-1612430869-bild-450_k3wpcw.png',
  },
  {
    grinder_name: 'ECM S64 Manuale',
    manufacturer: 'ECM',
    price: '599',
    img: 'produktbild-533-1607440667-bild-450.jpg',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477530/grinders/produktbild-109-1607441357-bild-450_eluuoh.jpg',
  },
  {
    grinder_name: 'Eureka Helios 65',
    manufacturer: 'Eureka',
    price: '850',
    img: 'produktbild-919-1612428891-bild-450.png',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477531/grinders/produktbild-919-1612428891-bild-450_n1jg7s.png',
  },
  {
    grinder_name: 'Eureka Atom',
    manufacturer: 'Eureka',
    price: '695',
    img: 'produktbild-643-1612429110-bild-450.png',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477531/grinders/produktbild-643-1612429110-bild-450_kont2e.png',
  },
  {
    grinder_name: 'ECM V-Titan',
    manufacturer: 'ECM',
    price: '1149',
    img: 'produktbild-340-1613145644-bild-450.png',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477530/grinders/produktbild-340-1613145644-bild-450_ow6nuk.png',
  },
  {
    grinder_name: 'Rocket Fausto',
    manufacturer: 'Rocket',
    price: '799',
    img: 'produktbild-935-1603962432-bild-450.jpg',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1625477531/grinders/produktbild-935-1603962432-bild-450_fneicz.jpg',
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
      'uri',
    )}
	`;
};

exports.down = async function up(sql) {
  await sql`
		DELETE FROM grinders
	`;
};
