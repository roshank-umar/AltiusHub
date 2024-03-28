'use client';

import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import {createInvoice} from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useState } from 'react';
import { Princess_Sofia } from 'next/font/google';
import { Invoice } from '../../lib/definitions';

export default function Form({invoices}:{invoices: Invoice[]}) {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createInvoice, initialState);


  return (
    <form action={dispatch}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6 w-full">
        {/* Customer Name */}
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
                defaultValue=""
                placeholder="Enter Customer Name"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.customerName &&
                state.errors.customerName.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

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
                defaultValue="2"
                required
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
                defaultValue=""
                placeholder="Enter GSTIN Number"
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
                defaultValue=""
                placeholder="Enter Billing Address"
                required
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
                defaultValue=""
                placeholder="Enter Shiping Address"
                required
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
                placeholder="Enter total amount"
                required
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div id="customer-error" aria-live="polite" aria-atomic="true">
              {state.errors?.amount &&
                state.errors.amount.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
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
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
