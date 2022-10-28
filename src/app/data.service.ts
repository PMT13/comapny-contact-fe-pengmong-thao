import { Injectable } from '@angular/core';
import {HttpService} from "./http.service";
import {ICompany} from "./interfaces/ICompany";
import {first, Subject} from "rxjs";
import {IContact} from "./interfaces/IContact";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private companyList!: ICompany[];
  $companyList: Subject<ICompany[]> = new Subject<ICompany[]>;

  private contactList!: IContact[];
  $contactList: Subject<IContact[]> = new Subject<IContact[]>;

  constructor(private httpService: HttpService) {
    this.getCompanies();
    this.getContacts();
  }


  getCompanyList(): ICompany[] {
    return this.companyList;
  }

  getContactList(): IContact[]{
    return this.contactList;
  }

  getCompanies(){
    this.httpService.getCompanies().pipe(first()).subscribe({
      next: data => {
        this.companyList = data;
        this.$companyList.next(this.companyList);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addCompany(company: ICompany){
    this.httpService.addCompany(company).pipe(first()).subscribe({
      next: () => {
        this.companyList.push(company);
        this.$companyList.next(this.companyList);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  deleteCompany(id:number){
    this.httpService.deleteCompany(id).pipe(first()).subscribe({
      next: () => {
        this.companyList = this.companyList.filter(company => company.id !== id);
        this.$companyList.next(this.companyList);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateCompany(id: number, updatedCompany: ICompany) {
    this.httpService.updateCompany(id,updatedCompany).pipe(first()).subscribe({
      next: () => {
        this.companyList = this.companyList.filter(company => company.id !== id);
        this.companyList.push(updatedCompany);
        this.$companyList.next(this.companyList);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getContacts() {
    this.httpService.getContacts().pipe(first()).subscribe({
      next: (data) => {
        this.contactList = data;
        this.$contactList.next(this.contactList);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addContact(contact: any) {
    this.httpService.addContact(contact).pipe(first()).subscribe({
      next: () => {
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
