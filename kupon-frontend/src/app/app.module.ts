import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { AboutComponent } from './components/about/about.component';
import { CouponHistoryComponent } from './components/coupon-history/coupon-history.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    CompaniesComponent,
    CouponsComponent,
    AboutComponent,
    CouponHistoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  exports: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
