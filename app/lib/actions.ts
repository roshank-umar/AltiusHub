'use server';
import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
 
const FormSchema = z.object({
  gstinNumber: z.string({
    invalid_type_error: 'Please Enter a GST Number.',
  }),
  invoiceNumber: z.string(),
  customerName: z.string({
    invalid_type_error: 'Please Enter a customer Name.',
  }),
  billingAddress: z.string({
    invalid_type_error: 'Please Enter a Billing Address.',
  }),
  shippingAddress: z.string({
    invalid_type_error: 'Please Enter a Shipping Address.',
  }),
  totalAmount: z.coerce
  .number()
  .gt(0, { message: 'Please enter an amount greater than $0.' }),
  
  date: z.string(),
});
 
export type State = {
    items: any;
    errors?: {
      customerName?: string[];
      amount?: string[];
    };
    message?: string | null;
  };
  const CreateInvoice = FormSchema.omit({ id: true, date: true });
export async function createInvoice(prevState: State, formData: FormData) {
    const {customerName,invoiceNumber,gstinNumber,billingAddress,shippingAddress,totalAmount} = CreateInvoice.parse({
      customerName: formData.get('customerName'),
      invoiceNumber: formData.get('invoiceNumber'),
      gstinNumber: formData.get('gstinNumber'),
      billingAddress: formData.get('billingAddress'),
      shippingAddress: formData.get('shippingAddress'),
      totalAmount: formData.get('amount')
    });

    const date = new Date().toISOString().split('T')[0];
   
    try {
      await sql`
        INSERT INTO invoicesData (CustomerName, InvoiceNumber, GSTIN, BillingAddress, ShippingAddress,TotalAmount,Date)
        VALUES (${customerName}, ${invoiceNumber},${gstinNumber},${billingAddress},${shippingAddress},${totalAmount},${date})
      `;
    } catch (error) {
      return {
        message: 'Database Error: Failed to Create Invoice.',
      };
    }
   
    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
  }

  const UpdateInvoice = FormSchema.omit({ id: true, date: true });
 
 
export async function updateInvoice(id: string, formData: FormData) {
  const { customerName,gstinNumber,billingAddress,shippingAddress,totalAmount } = UpdateInvoice.parse({
    customerName: formData.get('customerName'),
      gstinNumber: formData.get('gstinNumber'),
      billingAddress: formData.get('billingAddress'),
      shippingAddress: formData.get('shippingAddress'),
      totalAmount: formData.get('amount')
  });
 
 
  await sql`
    UPDATE invoicesData
    SET CustomerName = ${customerName},GSTIN = ${gstinNumber},BillingAddress = ${billingAddress},ShippingAddress = ${shippingAddress}, TotalAmount = ${totalAmount}
    WHERE Id = ${id}
  `;
 
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
    try {
      await sql`DELETE FROM invoicesData WHERE Id = ${id}`;
      revalidatePath('/dashboard/invoices');
      return { message: 'Deleted Invoice.' };
    } catch (error) {
      return { message: 'Database Error: Failed to Delete Invoice.' };
    }
  }