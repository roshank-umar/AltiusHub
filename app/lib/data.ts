import { sql } from '@vercel/postgres';
import {
  Invoice,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchLatestInvoices() {
  noStore();
  try {
    const data = await sql<Invoice>`
      SELECT invoicesData.TotalAmount, invoicesData.CustomerName, invoicesData.InvoiceNumber,invoicesData.Date, invoicesData.Id
      FROM invoicesData
      ORDER BY invoicesData.Date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      TotalAmount: invoice.totalamount,
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}


const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<Invoice>`
      SELECT
        invoicesData.Id,
        invoicesData.TotalAmount,
        invoicesData.Date,
        invoicesData.CustomerName,
        invoicesData.InvoiceNumber

      FROM invoicesData
      WHERE
        invoicesData.CustomerName ILIKE ${`%${query}%`}
      ORDER BY invoicesData.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;
    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  noStore();
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoicesData
    WHERE
      invoicesData.CustomerName::text ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  noStore();
  try {
    const data = await sql<Invoice>`
      SELECT
        invoicesData.Id,
        invoicesData.CustomerName,
        invoicesData.TotalAmount,
        invoicesData.InvoiceNumber,
        invoicesData.BillingAddress,
        invoicesData.ShippingAddress,
        invoicesData.GSTIN
      FROM invoicesData
      WHERE invoicesData.Id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.totalamount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

