import {Component, Input, OnInit} from '@angular/core';
import {ICompany} from "../interfaces/ICompany";
import {DataService} from "../data.service";
import {IContact} from "../interfaces/IContact";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  @Input() company!: ICompany;
  name!: string;
  location!: string;
  contactList: IContact[] = [];
  isUpdating: boolean = false;

  sub: Subscription;

  constructor(private data: DataService) {
    this.contactList = this.data.getContactList();
    this.sub = this.data.$contactList.subscribe((contacts) => {
      this.contactList = contacts;
    });
  }

  ngOnInit(): void {
    this.name = this.company.name;
    this.location = this.company.location;
  }

  deleteCompany(){
    this.data.deleteCompany(this.company.id);
  }

  updateCompany() {
    let updatedCompany:ICompany = {
      id: this.company.id,
      name: this.name,
      location: this.location,
      employees: this.company.employees,
    }
    this.data.updateCompany(this.company.id,updatedCompany)
  }

  addContact() {
    let contact: IContact = {
      id: this.contactList.length + 1,
      firstName: "pengmong",
      lastName: "thao",
      displayName: "Peng Mong Thao",
      email: "pengmnt@gmail.com"
    }
    this.contactList.push(contact);
    this.data.addContact(contact);
  }
}
