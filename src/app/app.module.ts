import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BottomMenuComponent } from './components/bottom-menu/bottom-menu.component';
import { HomeComponent } from './pages/home/home.component';
import { DiscountsComponent } from './pages/discounts/discounts.component';
import { ProductCategoryComponent } from './pages/product-category/product-category.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { OfertaComponent } from './pages/oferta/oferta.component';

import { AdminComponent } from './admin/admin.component';
import { AdminDiscountsComponent } from './admin/admin-discounts/admin-discounts.component';
import { AdminCategoriesComponent } from './admin/admin-categories/admin-categories.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminArticlesComponent } from './admin/admin-articles/admin-articles.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage,getStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BottomMenuComponent,
    HomeComponent,
    DiscountsComponent,
    ProductCategoryComponent,
    DeliveryComponent,
    AboutUsComponent,
    AdminComponent,
    AdminDiscountsComponent,
    AdminCategoriesComponent,
    AdminOrderComponent,
    AdminArticlesComponent,
    OfertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
