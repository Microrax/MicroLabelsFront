import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { AppComponent } from 'src/app/app.component';
import { Client } from '../Models/client';
import { Label } from '../Models/labels';
import { PrintPopupComponent } from '../print-popup/print-popup.component';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-label-view',
  templateUrl: './label-view.component.html',
  styleUrls: ['./label-view.component.css']
})
export class LabelViewComponent implements OnInit {

  filter: string = "";

  //GET
  labels!: Label[];
  filterList!: Label[];
  labellist!: Label[];
  startIndex: number = 0;
  endIndex: number = 2;

  displayedColumns = ['Details', 'ID', 'Template', 'LabelType', 'DPI', 'Imprimir', 'Eliminar'];

  constructor(private service: PostService, public dialogprint: MatDialog) { }

  post() {
    this.service.getLabels()
      .subscribe(response => {
        this.labels = response
        this.labellist = response

        this.labellist = this.labels.slice(this.startIndex, this.endIndex);
      });
  }

  ngOnInit() {
    this.service.getLabels()
      .subscribe(response => {
        console.log(response);
        this.labels = response;
        this.labellist = response;

        this.labellist = this.labels.slice(0, 2);
      });
  }

  OnPageChange(event: PageEvent) {
    if (this.filter == null || this.filter == "") {

      this.startIndex = event.pageIndex * event.pageSize;
      this.endIndex = this.startIndex + event.pageSize;
      if (this.endIndex > this.labels.length) {
        this.endIndex = this.labels.length;
      }
      this.labellist = this.labels.slice(this.startIndex, this.endIndex);
    } else {
      this.startIndex = event.pageIndex * event.pageSize;
      this.endIndex = this.startIndex + event.pageSize;
      if (this.endIndex > this.labels.length) {
        this.endIndex = this.labels.length;
      }
      this.labellist = this.filterList.slice(this.startIndex, this.endIndex);

    }
  }

  //delete item
  delete(id: string) {
    console.log("Componente borrado");

    this.service.deleteLabel(id)

      .subscribe(() => {
        this.service.getLabels()
          .subscribe(response => {
            console.log(response);
            this.labels = response;
            this.labellist = response;

            this.labellist = this.labels.slice(this.startIndex, this.endIndex);
            this.filter = "";
          });
      });
  }

  //item detail
  detail(label: Label) {

    AppComponent.selectedLabel = label;
  }

  printLabel(label: Label) {
    AppComponent.selectedLabel = label;
    this.dialogprint.open(PrintPopupComponent);

  }

  //Filter
  applyFilter() {
    if (this.filter != null || this.filter != "") {
      let filter = this.filter.trim(); // Remove whitespace
      console.log(filter);
      filter = filter.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      this.filterList = this.labels.filter((label) => label.template.toLowerCase().includes(filter));
      console.log(this.filterList);

      this.labellist = this.filterList.slice(this.startIndex, this.endIndex);
      //elsif
    } else {
      this.service.getLabels()
        .subscribe(response => {
          this.labels = response
          this.labellist = response

          this.labellist = this.labels.slice(this.startIndex, this.endIndex);

        });
    }
  }
}
