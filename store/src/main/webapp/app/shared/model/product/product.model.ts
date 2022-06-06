import { IProductCategory } from 'app/shared/model/product/product-category.model';
import { Type } from 'app/shared/model/enumerations/type.model';

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

export const defaultValue: Readonly<IProduct> = {};
