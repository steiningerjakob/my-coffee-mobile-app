const sellers = [
  {
    seller_name: 'TasteIt',
    seller_description: 'TasteIt Espresso',
    seller_address: 'Wollzeile 27, 1010 Wien',
    latitude: 48.2082256289159,
    longitude: 16.37746061317212,
    website: 'http://www.tasteit-shop.at/',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1626161898/sellers/tasteit_q513e8.jpg',
    rating: 4.4,
    reviews: 164,
  },
  {
    seller_name: 'Süssmund',
    seller_description: 'Süssmund Kaffee',
    seller_address: 'Zieglergasse 68/1, 1070 Wien',
    latitude: 48.204092839788565,
    longitude: 16.345239811319768,
    website: 'https://www.suessmund.at/',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1626161898/sellers/suessmund_ttthda.jpg',
    rating: 4.8,
    reviews: 73,
  },
  {
    seller_name: 'Caffe Vettore',
    seller_description: 'Vettore | italienischer Kaffee & Kaffeemaschinen',
    seller_address: 'Liechtensteinstraße 15, 1090 Wien',
    latitude: 48.21771891168569,
    longitude: 16.36196026899238,
    website: 'https://www.vettore.at/',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1626161898/sellers/vettore_igxdd2.jpg',
    rating: 4.7,
    reviews: 101,
  },
  {
    seller_name: 'Espresso Perfetto',
    seller_description: 'Espresso Perfetto Wien',
    seller_address: 'Kaiserstraße 76, 1070 Wien',
    latitude: 48.20502714621143,
    longitude: 16.340105493732164,
    website: 'http://espressoperfetto.at/',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1626161898/sellers/perfetto_espresso_wk6cpx.jpg',
    rating: 4.9,
    reviews: 16,
  },
  {
    seller_name: 'Coffee Pirates',
    seller_description: 'Coffee Pirates - Vienna Coffee Roasters',
    seller_address: 'Spitalgasse 17, 1090 Wien',
    latitude: 48.217484560800315,
    longitude: 16.351223142061997,
    website: 'http://www.coffeepirates.at/',
    uri: 'https://res.cloudinary.com/my-coffee-mobile-app/image/upload/v1626190363/sellers/coffee_pirates_jqfjoh.jpg',
    rating: 4.7,
    reviews: 1286,
  },
];

exports.up = async function up(sql) {
  await sql`
		INSERT INTO sellers ${sql(
      sellers,
      'seller_name',
      'seller_description',
      'seller_address',
      'latitude',
      'longitude',
      'website',
      'uri',
      'rating',
      'reviews',
    )}
	`;
};

exports.down = async function up(sql) {
  await sql`
		DELETE FROM sellers
	`;
};
