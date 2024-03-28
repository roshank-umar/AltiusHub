'use client';

import { Invoice } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateInvoice } from '@/app/lib/actions';


export default function EditInvoiceForm({
  invoice,
}: {
  invoice: Invoice;
}) {
  const updateInvoiceWithId = updateInvoice.bind(null, invoice.id);
  return (
    <form action={updateInvoiceWithId}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">


      <div className="mb-4">
          <label htmlFor="invoiceNumber" className="mb-2 block text-sm font-medium">
            Invoice Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="invoiceNumber"
                name="invoiceNumber"
                type="Number"
                step="0.01"
                defaultValue={invoice.invoicenumber}
                disabled
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="gstinNumber" className="mb-2 block text-sm font-medium">
            Enter GSTIN Number
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="gstinNumber"
                name="gstinNumber"
                type="Text"
                step="0.01"
                defaultValue={invoice.gstin}
                placeholder="Enter GSTIN Number"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="customerName" className="mb-2 block text-sm font-medium">
            Enter Customer Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="customerName"
                name="customerName"
                type="Text"
                step="0.01"
                defaultValue={invoice.customername}
                placeholder="Enter Customer Name"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="billingAddress" className="mb-2 block text-sm font-medium">
            Enter Billing Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="billingAddress"
                name="billingAddress"
                type="Text"
                step="0.01"
                defaultValue={invoice.billingaddress}
                placeholder="Enter Billing Address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="shippingAddress" className="mb-2 block text-sm font-medium">
            Enter Shipping Address
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="shippingAddress"
                name="shippingAddress"
                type="Text"
                step="0.01"
                defaultValue={invoice.shippingaddress}
                placeholder="Enter Shiping Address"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Total Amount
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                defaultValue={invoice.totalamount}
                placeholder="Enter Total amount"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Edit Invoice</Button>
      </div>
    </form>
  );
}
