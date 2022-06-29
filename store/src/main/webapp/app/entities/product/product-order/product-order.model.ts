import dayjs from 'dayjs/esm';
import { IOrderItem } from 'app/entities/product/order-item/order-item.model';
import { OrderStatus } from 'app/entities/enumerations/order-status.model';

export interface IProductOrder {
  id?: number;
  placedDate?: dayjs.Dayjs;
  status?: OrderStatus;
  code?: string;
  invoiceId?: number | null;
  customer?: string;
  orderItems?: IOrderItem[] | null;
}

export class ProductOrder implements IProductOrder {
  constructor(
    public id?: number,
    public placedDate?: dayjs.Dayjs,
    public status?: OrderStatus,
    public code?: string,
    public invoiceId?: number | null,
    public customer?: string,
    public orderItems?: IOrderItem[] | null
  ) {}
}

export function getProductOrderIdentifier(productOrder: IProductOrder): number | undefined {
  return productOrder.id;
}
