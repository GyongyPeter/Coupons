import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './components/companies/companies.component';
import { CouponHistoryComponent } from './components/coupon-history/coupon-history.component';
import { CouponsComponent } from './components/coupons/coupons.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'coupons', component: CouponsComponent },
  { path: 'history', component: CouponHistoryComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
