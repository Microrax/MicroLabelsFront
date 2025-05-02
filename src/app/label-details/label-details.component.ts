import { Component, OnInit } from '@angular/core';
import { ChangeEvent, ChangeEventHandler } from 'react';
import { AppComponent } from '../app.component';
import { Client } from '../Models/client';
import { Label } from '../Models/labels';
import { Router } from "@angular/router";
import { PostService } from '../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { PrintPopupComponent } from '../print-popup/print-popup.component';


@Component({
  selector: 'app-label-details',
  templateUrl: './label-details.component.html',
  styleUrls: ['./label-details.component.css']
})
export class LabelDetailsComponent implements OnInit {

  filter!: string;

  constructor(private router: Router, private service: PostService, public dialog: MatDialog, public dialogprint: MatDialog) {
  }

  label: Label = AppComponent.selectedLabel;

  ngOnInit(): void {
    if (AppComponent.selectedLabel == null) {
        this.router.navigateByUrl("/label");
      }
    }

  putLabel() {
    this.service.putLabel(this.label)
      .subscribe(response => {
        console.log(response);
      });
  }

  previewLabel() {
    this.dialog.open(DialogContentExampleDialog);
  }

  printLabel() {
    this.dialogprint.open(PrintPopupComponent);

  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
  styleUrls: ['./label-details.component.css'],
  standalone: true,
})
export class DialogContentExampleDialog implements OnInit {

  constructor(private service: PostService) {
  }

  label: Label = AppComponent.selectedLabel;


  ngOnInit(): void {
    this.init()
  }

  async init() {
    const response = fetch(
      'http://api.labelary.com/v1/printers/8dpmm/labels/5x5/0/',
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify(this.label.zpl),
      }
    );
    console.log(response);
    const responseBlob = await (await response).blob()
    const img = document.createElement('img');
    img.src = URL.createObjectURL(responseBlob);
    return document.querySelector(`#container`)!.append(img);
  }
}


