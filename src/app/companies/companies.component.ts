import { Component, OnInit } from '@angular/core';
import {ICompany} from "../interfaces/ICompany";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import {IContact} from "../interfaces/IContact";

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companyList!: ICompany[];
  sub!: Subscription;
  name!: string;
  location!: string;

  constructor(private data: DataService) {
    this.companyList = this.data.getCompanyList();
    this.sub = this.data.$companyList.subscribe((companies) => {
      this.companyList = companies;
    });
  }

  ngOnInit(): void {
  }

  addCompany(){
    let company:ICompany = {
      id: this.companyList.length + 1,
      name: this.name,
      location: this.location,
      employees: 0
    }
    this.data.addCompany(company);
    this.name = "";
    this.location = "";
  }
}
