import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { DiscountInfoComponent } from './pages/discount-info/discount-info.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

import { AdminComponent } from './admin/admin.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminArticlesComponent } from './admin/admin-articles/admin-articles.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'discounts', component: DiscountsComponent },
  { path: 'discount/:id', component: DiscountInfoComponent },
  { path: 'product-category/:category', component: ProductCategoryComponent },
  { path: 'delivery', component: DeliveryComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: 'categories', component: AdminCategoriesComponent },
    { path: 'articles', component: AdminArticlesComponent },
    { path: 'discounts', component: AdminDiscountsComponent },
    { path: 'order', component: AdminOrderComponent },
    { path: '', pathMatch: 'full', redirectTo: 'discounts' }
  ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
