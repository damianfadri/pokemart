import { Routes } from '@angular/router';
import { ProductComponent } from './product/product';
import { ProductsComponent } from './products/products';
import { CheckoutComponent } from './checkout/checkout';

export const routes: Routes = [
    {
        path: 'products', 
        component: ProductsComponent
    },
    {
        path: 'products/:name',
        component: ProductComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
