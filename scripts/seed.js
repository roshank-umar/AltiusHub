const { db } = require('@vercel/postgres');
const {
  invoices,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedInvoices(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    // Create the "invoices" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoicesData (
      Id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      Date DATE NOT NULL,
      InvoiceNumber INT NOT NULL,
      CustomerName VARCHAR(255) NOT NULL,
      BillingAddress VARCHAR(255) NOT NULL,
      ShippingAddress VARCHAR(255) NOT NULL,
      GSTIN VARCHAR(255) NOT NULL,
      TotalAmount INT NOT NULL
  );
`;

    console.log(`Created "invoicesData" table`);

    // Insert data into the "invoices" table
    const insertedInvoices = await Promise.all(
      invoices.map(
        (invoice) => client.sql`
        INSERT INTO invoicesData (Date,InvoiceNumber,CustomerName,BillingAddress,ShippingAddress,GSTIN, TotalAmount)
        VALUES (${invoice.Date}, ${invoice.InvoiceNumber}, ${invoice.CustomerName}, ${invoice.BillingAddress},${invoice.ShippingAddress},${invoice.GSTIN},${invoice.TotalAmount})
      `,
      ),
    );

    console.log(`Seeded ${insertedInvoices.length} invoices`);

    return {
      createTable,
      invoices: insertedInvoices,
    };
  } catch (error) {
    console.error('Error seeding invoices:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();
  await seedInvoices(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
