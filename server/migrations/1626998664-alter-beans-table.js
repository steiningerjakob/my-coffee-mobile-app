exports.up = async (sql) => {
  await sql`
    ALTER TABLE beans
    RENAME COLUMN theme
		TO barcode_ean13
  `;
};

exports.down = async (sql) => {
  await sql`
    ALTER TABLE beans
    RENAME COLUMN barcode_ean13
		TO theme
  `;
};
