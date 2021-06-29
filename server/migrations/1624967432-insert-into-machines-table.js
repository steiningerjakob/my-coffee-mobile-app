const machines = [
  {
    machine_name: 'Bezzera Mitica',
    manufacturer: 'Bezzera',
    price: '1,900.00',
    img: 'produktbild-102-1613902267-bild-450.jpg',
  },
  {
    machine_name: 'Bezzera Galatea Domus II',
    manufacturer: 'Bezzera',
    price: '1,550.00',
    img: 'produktbild-103-1606477402-bild-450.jpg',
  },
  {
    machine_name: 'Bezzera Unica',
    manufacturer: 'Bezzera',
    price: '1,015.00',
    img: 'produktbild-104-1542385154-bild-450.jpg',
  },
  {
    machine_name: 'Bezzera BZ10',
    manufacturer: 'Bezzera',
    price: '1,100.00',
    img: 'produktbild-105-1604440175-bild-450.png',
  },
  {
    machine_name: 'Bezzera Strega S Hebelmaschine',
    manufacturer: 'Bezzera',
    price: '1,630.00',
    img: 'produktbild-107-1604440118-bild-450.png',
  },
  {
    machine_name: 'ECM Classika II PID Einkreis',
    manufacturer: 'ECM',
    price: '1,299.00',
    img: 'produktbild-112-1607444545-bild-450.jpg',
  },
  {
    machine_name: 'ECM Mechanika Profi WT/WA Rota',
    manufacturer: 'ECM',
    price: '2,199.00',
    img: 'produktbild-116-1499377518-bild-450.jpg',
  },
  {
    machine_name: 'Profitec Pro300',
    manufacturer: 'Profitec',
    price: '1,380.00',
    img: 'produktbild-119-1499806977-bild-450.jpg',
  },
  {
    machine_name: 'Rocket Mozzafiato V Cronometro PID',
    manufacturer: 'Rocket',
    price: '1,650.00',
    img: 'produktbild-179-1612871288-bild-450.jpg',
  },
  {
    machine_name: 'Rocket Giotto R Cronometro PID',
    manufacturer: 'Rocket',
    price: '1,900.00',
    img: 'produktbild-181-1499847677-bild-450.jpg',
  },
  {
    machine_name: 'ECM Elektronika Profi II',
    manufacturer: 'ECM',
    price: '2,399.00',
    img: 'produktbild-289-1614614330-bild-450.jpg',
  },
  {
    machine_name: 'Rocket Espresso R60 Dualboiler',
    manufacturer: 'Rocket',
    price: '3,500.00',
    img: 'produktbild-308-1499849240-bild-450.jpg',
  },
  {
    machine_name: 'Rocket Appartamento',
    manufacturer: 'Rocket',
    price: '1,250.00',
    img: 'produktbild-324-1499811535-bild-450.jpg',
  },
  {
    machine_name: 'ECM Synchronika Dualboiler',
    manufacturer: 'ECM',
    price: '2,899.00',
    img: 'produktbild-339-1612776323-bild-450.jpg',
  },
  {
    machine_name: 'ECM Mechanika Slim',
    manufacturer: 'ECM',
    price: '1,899.00',
    img: 'produktbild-534-1612781534-bild-450.jpg',
  },
  {
    machine_name: 'Profitec Pro500 PID',
    manufacturer: 'Profitec',
    price: '1,699.00',
    img: 'produktbild-545-1554480432-bild-450.jpg',
  },
  {
    machine_name: 'Profitec Pro600 PID',
    manufacturer: 'Profitec',
    price: '1,899.00',
    img: 'produktbild-620-1530802353-bild-450.png',
  },
  {
    machine_name: 'Rocket Espresso Porta Via',
    manufacturer: 'Rocket',
    price: '1,990.00',
    img: 'produktbild-634-1532621073-bild-450.jpg',
  },
  {
    machine_name: 'Futura KIKKA PID',
    manufacturer: 'Futura',
    price: '1,399.00',
    img: 'produktbild-731-1593249562-bild-450.png',
  },
  {
    machine_name: 'Rocket Giotto V Cronometro PID Olive',
    manufacturer: 'Rocket',
    price: '1,900.00',
    img: 'produktbild-884-1594208141-bild-450.png',
  },
  {
    machine_name: 'ACM Homey Shottimer',
    manufacturer: 'ACM',
    price: '1,150.00',
    img: 'produktbild-927-1602687710-bild-450.jpg',
  },
];

exports.up = async function up(sql) {
  await sql`
		INSERT INTO machines ${sql(
      machines,
      'machine_name',
      'manufacturer',
      'price',
      'img',
    )}
	`;
};

exports.down = async function up(sql) {
  await sql`
		DELETE FROM machines
	`;
};
