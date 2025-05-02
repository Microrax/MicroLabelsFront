import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { Client } from '../Models/client';
import { Label } from '../Models/labels';
import { PostService } from '../services/post.service';


@Component({
  selector: 'app-PrintPopup-print',
  templateUrl: './print-popup.component.html',
  styleUrls: ['./print-popup.component.css']
})
export class PrintPopupComponent implements OnInit {

  impresion: string = "LogisLabel";
  sku: string = "ITEM1";
  label: Label = AppComponent.selectedLabel;
  filter: string = "";
  clientSelected!: Client;

  constructor(private service: PostService) { }

  //GET
  clients!: Client[];
  filterClients!: Client[];
  clientList!: Client[];
  isSelected: boolean = false;
  startIndex: number = 0;
  endIndex: number = 2;
  icon: string = "visibility_off";

  displayedColumns = ['Select', 'ID', 'ClientCode', 'Name'];

  ngOnInit(): void {
    this.service.getClientsYesConfig(AppComponent.selectedLabel.id)
      .subscribe(response => {
        console.log(response);
        this.clients = response;
        this.clientList = response;

        this.clientList = this.clients.slice(0, 2);
      });
  }

  OnPageChange(event: PageEvent) {
    if (!this.isSelected) {
      return;
    }
    if (this.filter == null || this.filter == "") {

      this.startIndex = event.pageIndex * event.pageSize;
      this.endIndex = this.startIndex + event.pageSize;
      if (this.endIndex > this.clients.length) {
        this.endIndex = this.clients.length;
      }
      this.clientList = this.clients.slice(this.startIndex, this.endIndex);
    } else {
      this.startIndex = event.pageIndex * event.pageSize;
      this.endIndex = this.startIndex + event.pageSize;
      if (this.endIndex > this.clients.length) {
        this.endIndex = this.clients.length;
      }
      this.clientList = this.filterClients.slice(this.startIndex, this.endIndex);

    }
  }


  SelectClient(client: Client) {

    this.clientSelected = client;

    if (this.isSelected == false) {

      this.clientList = this.clients.slice(0, 0);
      this.clientList[0] = client;
      this.isSelected = true;
      this.icon = "visibility";
    } else {

      this.clientList = this.clients.slice(this.startIndex, this.endIndex);
      this.isSelected = false;
      this.icon = "visibility_off";
      this.filter = "";
    }
  }

  printLabel() {

    console.log(this.impresion, this.sku, this.label.id, this.clientSelected.id);
    if (this.isSelected == true) {


      this.service.printLabel(this.impresion, this.sku, this.label.id, this.clientSelected.id)
        .subscribe(response => {
          console.log(response);

        });
    }
  }

  //Filter
  applyFilter() {
    if (this.isSelected == false) {
      if (this.filter != null || this.filter != "") {
        let filter = this.filter.trim(); // Remove whitespace
        console.log(filter);
        filter = filter.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.filterClients = this.clients.filter((client) => client.nombre.toLowerCase().includes(filter));
        console.log(this.filterClients);

        this.clientList = this.filterClients.slice(this.startIndex, this.endIndex);
        //elsif
      } else {
        this.service.getPosts()
          .subscribe(response => {
            this.clients = response
            this.clientList = response

            this.clientList = this.clients.slice(this.startIndex, this.endIndex);

          });
      }
    }
  }
}
