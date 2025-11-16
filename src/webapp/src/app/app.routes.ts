import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { ProductComponent } from './products/product/product';

export const routes: Routes = [
    {
        path: 'products', 
        component: HomeComponent
    },
    {
        path: 'products/:id',
        component: ProductComponent
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
