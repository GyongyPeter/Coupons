import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Company } from '../models/company.model';
import * as config from '../../assets/config.json';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanies() {
    return this.http.get<Company>(`${config.baseUrl}company`);
  }

  getCouponByCompanyId(companyId: string) {
    return this.http.get<Company>(`${config.baseUrl}company/findCoupon/${companyId}`);
  }

}
