import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        data: { pageTitle: 'storeApp.customer.home.title' },
        loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule),
      },
      {
        path: 'invoice',
        data: { pageTitle: 'storeApp.invoiceInvoice.home.title' },
        loadChildren: () => import('./invoice/invoice/invoice.module').then(m => m.InvoiceInvoiceModule),
      },
      {
        path: 'notification',
        data: { pageTitle: 'storeApp.notificationNotification.home.title' },
        loadChildren: () => import('./notification/notification/notification.module').then(m => m.NotificationNotificationModule),
      },
      {
        path: 'order-item',
        data: { pageTitle: 'storeApp.productOrderItem.home.title' },
        loadChildren: () => import('./product/order-item/order-item.module').then(m => m.ProductOrderItemModule),
      },
      {
        path: 'product',
        data: { pageTitle: 'storeApp.productProduct.home.title' },
        loadChildren: () => import('./product/product/product.module').then(m => m.ProductProductModule),
      },
      {
        path: 'product-category',
        data: { pageTitle: 'storeApp.productProductCategory.home.title' },
        loadChildren: () => import('./product/product-category/product-category.module').then(m => m.ProductProductCategoryModule),
      },
      {
        path: 'product-order',
        data: { pageTitle: 'storeApp.productProductOrder.home.title' },
        loadChildren: () => import('./product/product-order/product-order.module').then(m => m.ProductProductOrderModule),
      },
      {
        path: 'shipment',
        data: { pageTitle: 'storeApp.invoiceShipment.home.title' },
        loadChildren: () => import('./invoice/shipment/shipment.module').then(m => m.InvoiceShipmentModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
