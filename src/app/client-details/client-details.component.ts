import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Client } from '../Models/client';
import { Router } from "@angular/router";
import { Configuration } from '../Models/configuration';
import { PostService } from '../services/post.service';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Label } from '../Models/labels';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css'],
})
export class ClientDetailsComponent implements OnInit {

  filter: string = "";
  client: Client = AppComponent.selectedClient;

  constructor(private router: Router, private service: PostService, public dialog: MatDialog) {
  }


  //get
  config!: Configuration[];
  filterConfig!: Configuration[];
  configlist!: Configuration[];
  startIndex: number = 0;
  endIndex: number = 2;
  displayedColumns = ['ID', 'IDClient', 'IDConfiguration', 'Delete'];

  ngOnInit(): void {
    if (AppComponent.selectedClient == null) {
      this.router.navigateByUrl("/client");
    }

    this.service.GetConfigs(this.client.id)
      .subscribe(response => {
        console.log(response);
        this.config = response;
        this.configlist = response;

        this.configlist = this.config.slice(0, 2);
      });
  }

  OnPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if (this.endIndex > this.config.length) {
      this.endIndex = this.config.length;
    }
    this.configlist = this.config.slice(this.startIndex, this.endIndex);
  }

  //delete config
  delete(labelid: string) {
    console.log("Componente borrado");

    this.service.DeleteConfig(this.client.id, labelid)

      .subscribe(() => {
        this.service.GetConfigs(this.client.id)
          .subscribe(response => {
            console.log(response);
            this.config = response;
            this.configlist = response;

            this.configlist = this.config.slice(this.startIndex, this.endIndex);
          });
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.service.GetConfigs(this.client.id)
        .subscribe(response => {
          console.log(response);
          this.config = response;
          this.configlist = response;
          this.filter = "";
          this.configlist = this.config.slice(this.startIndex, this.endIndex);
        });
    });
  }

  //Filter
  applyFilter() {
    if (this.filter != null || this.filter != "") {
      let filter = this.filter.trim(); // Remove whitespace
      console.log(filter);
      filter = filter.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.filterConfig = this.config.filter((conf) => conf.discriminator.toLowerCase().includes(filter));
      console.log(this.filterConfig);

      this.configlist = this.filterConfig.slice(this.startIndex, this.endIndex);
      //elsif
    } else {
      this.service.GetConfigs(this.client.id)
        .subscribe(response => {
          this.config = response
          this.configlist = response

          this.configlist = this.config.slice(this.startIndex, this.endIndex);

        });
    }
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./client-details.component.css'],
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, FormsModule, MatDialogModule, MatInputModule, MatFormFieldModule]
})
export class DialogContentExampleDialog implements OnInit {

  constructor(private service: PostService) {
  }

  client: Client = AppComponent.selectedClient;
  filter: string = "";

  label!: Label[];
  filterLabel!: Label[];
  labellist!: Label[];
  startIndex: number = 0;
  endIndex: number = 2;
  displayedColumns = ['ID', 'Template', 'LabelType', 'DPI', 'Add'];

    ngOnInit(): void {
      this.service.getLabelsNoConfig(this.client.id)
        .subscribe(response => {
          console.log(response);
          this.label = response;
          this.labellist = response;
          this.labellist = this.label.slice(0, 2);
        });
    }

  OnPageChange(event: PageEvent) {
    this.startIndex = event.pageIndex * event.pageSize;
    this.endIndex = this.startIndex + event.pageSize;
    if (this.endIndex > this.label.length) {
      this.endIndex = this.label.length;
    }
    this.labellist = this.label.slice(this.startIndex, this.endIndex);
  }

  addConfig(labelid: string) {
    this.service.AddConfig(this.client.id, labelid)
      .subscribe(() => {
          this.service.getLabelsNoConfig(this.client.id)
            .subscribe(response => {
              console.log(response);
              this.label = response;
              this.labellist = response;
              this.filter = "";
              this.labellist = this.label.slice(this.startIndex, this.endIndex);
            });
      });
  }

  //Filter
  applyFilter() {
    if (this.filter != null || this.filter != "") {
      let filter = this.filter.trim(); // Remove whitespace
      console.log(filter);
      filter = filter.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.filterLabel = this.label.filter((label) => label.template.toLowerCase().includes(filter));
      console.log(this.filterLabel);

      this.labellist = this.filterLabel.slice(this.startIndex, this.endIndex);
      //elsif
    } else {
      this.service.getLabelsNoConfig(this.client.id)
        .subscribe(response => {
          this.label = response
          this.labellist = response

          this.labellist = this.label.slice(this.startIndex, this.endIndex);

        });
    }
  }
}



