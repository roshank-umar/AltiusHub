
export type InvoiceItem = {
  Id: string;
  itemName: string;
  quantity: number;
  price: number;
  amount: number;
  };

export type InvoiceBillSundry =  {
  Id: string;
  billSundryName: string;
  amount: number;
};

export type Invoice =  {
  id: string;
  date: string;
  invoicenumber: number;
  customername: string;
  billingaddress: string;
  shippingaddress: string;
  gstin: string;
  items: InvoiceItem[];
  billsundrys: InvoiceBillSundry[];
  totalamount: number;
  }