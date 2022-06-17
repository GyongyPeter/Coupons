import { Component, OnInit } from '@angular/core';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getCompanies().subscribe((ret: any) => {
      console.log(ret);
      this.companies = ret;
    });
  }

}
