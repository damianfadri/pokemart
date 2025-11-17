import { Routes } from '@angular/router';
import { ProductComponent } from './product/product';
import { ProductsComponent } from './products/products';

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
        path: '**',
        redirectTo: 'products'
    }
];
