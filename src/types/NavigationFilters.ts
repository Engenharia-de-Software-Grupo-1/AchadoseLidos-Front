export interface Filters {
  field: string;
  operator: string;
  value: string;
}
  
export interface Orders {
  field: string;
  order: string;
}

export interface FilterOrders {
  filters: Filters[];
  orders: Orders[];
}