import { IProductCategory } from 'app/entities/product/product-category/product-category.model';
import { Type } from 'app/entities/enumerations/type.model';

export interface IProduct {
  id?: number;
  name?: string;
  description?: string | null;
  price?: number;
  type?: Type;
  imageContentType?: string | null;
  image?: string | null;
  productCategory?: IProductCategory | null;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public price?: number,
    public type?: Type,
    public imageContentType?: string | null,
    public image?: string | null,
    public productCategory?: IProductCategory | null
  ) {}
}

export function getProductIdentifier(product: IProduct): number | undefined {
  return product.id;
}
