import { Component } from '@angular/core';
import { Client } from './Models/client';
import { Label } from './Models/labels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'LogisLabelFront';

  public static selectedClient: Client;
  public static selectedLabel: Label;
}
