import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../models/coupon.model';
import { ActivatedCoupon } from '../models/activatedCoupon.model';
import * as config from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http: HttpClient) { }

  getCoupons() {
    return this.http.get<Coupon>(`${config.baseUrl}coupon`);
  }

  saveActivatedCoupon(coupon: Coupon) {
    let headers = { 'Content-Type': 'application/json' };
    const body = { activatedCouponId: coupon._id, companyId: coupon.companyId, couponCode: coupon.couponCode }
    return this.http.post<any>(`${config.baseUrl}coupon/save`, body, { headers }).toPromise();
  }

  getCouponHistory() {
    return this.http.get<ActivatedCoupon>(`${config.baseUrl}coupon/history`);
  }

  getLastActivatedSameCoupon(coupon: Coupon) {
    return this.http.get<ActivatedCoupon>(`${config.baseUrl}coupon/lastActivatedSameCoupon/${coupon._id}`);
  }

}
