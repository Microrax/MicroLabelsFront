import { Component, OnInit, ViewChild } from '@angular/core';
import {  PageEvent } from '@angular/material/paginator';
import { Client } from 'src/app/Models/client'
import { PostService } from 'src/app/services/post.service';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css'],
})
export class ClientViewComponent implements OnInit {


  filter!: string;

  //GET
  clients!: Client[];
  filterList!: Client[];
  clientlist!: Client[];
  startIndex: number = 0;
  endIndex: number = 2;


  displayedColumns = ['Details', 'ID', 'ClientCode', 'Name', 'Eliminar'];

  constructor(private service: PostService) { }

  post() {
    this.service.getPosts()
      .subscribe(response => {
        this.filter = "";
        this.clients = response
        this.clientlist = response

        this.clientlist = this.clients.slice(this.startIndex, this.endIndex);

      });
  }

  ngOnInit() {
    this.service.getPosts()
      .subscribe(response => {
        console.log(response);
        this.clients = response;
        this.clientlist = response;

        this.clientlist = this.clients.slice(0, 2);
      });
  }

  OnPageChange(event: PageEvent) {
    if (this.filter == null || this.filter == "") {

      this.startIndex = event.pageIndex * event.pageSize;
      this.endIndex = this.startIndex + event.pageSize;
      if (this.endIndex > this.clients.length) {
        this.endIndex = this.clients.length;
      }
      this.clientlist = this.clients.slice(this.startIndex, this.endIndex);
    } else {
      this.startIndex = event.pageIndex * event.pageSize;
      this.endIndex = this.startIndex + event.pageSize;
      if (this.endIndex > this.clients.length) {
        this.endIndex = this.clients.length;
      }
      this.clientlist = this.filterList.slice(this.startIndex, this.endIndex);

    }
  }



  //delete item
  delete(id: string) {
    console.log("Componente borrado");
    this.service.deleteClient(id)
      .subscribe(() => {
        this.service.getPosts()
          .subscribe(response => {
            this.clients = response;
            this.clientlist = response;

            this.clientlist = this.clients.slice(this.startIndex, this.endIndex);
            this.filter = "";
          });
      });
  }

  //item detail
  detail(client: Client) {

    AppComponent.selectedClient = client;

  }
  //Filter
  applyFilter() {
    if (this.filter != null || this.filter != "") {
      let filter = this.filter.trim(); // Remove whitespace
      console.log(filter);
      filter = filter.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.filterList = this.clients.filter((client) => client.nombre.toLowerCase().includes(filter));
      console.log(this.filterList);

      this.clientlist = this.filterList.slice(this.startIndex, this.endIndex);
      //elsif
    } else {
      this.service.getPosts()
        .subscribe(response => {
          this.clients = response
          this.clientlist = response

          this.clientlist = this.clients.slice(this.startIndex, this.endIndex);

        });
    }
  }
}

