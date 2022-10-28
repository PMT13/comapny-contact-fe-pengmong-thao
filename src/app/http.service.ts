import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ICompany} from "./interfaces/ICompany";
import {Observable} from "rxjs";
import {IContact} from "./interfaces/IContact";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) { }

  getCompanies(){
    return this.httpClient.get('http://localhost:3000/company/all') as Observable<ICompany[]>;
  }
  addCompany(company: ICompany){
    return this.httpClient.post('http://localhost:3000/company/add',company) as Observable<ICompany[]>;
  }
  deleteCompany(id: number){
    return this.httpClient.delete('http://localhost:3000/company/delete/' + id);
  }

  updateCompany(id: number, updatedCompany: ICompany) {
    return this.httpClient.put('http://localhost:3000/company/update/' + id,updatedCompany);
  }

  getContacts() {
    return this.httpClient.get('http://localhost:3000/contact/all') as Observable<IContact[]>;
  }

  addContact(contact: IContact){
    return this.httpClient.post('http://localhost:3000/contact/add',contact) as Observable<IContact[]>;
  }

  addContactToCompany(){

  }
}
