import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientTableComponent } from './client-table/client-table.component';
import { ClientViewComponent } from './client-view/client-view.component';
import { LabelViewComponent } from './label-view/label-view.component';
import { FormsModule } from '@angular/forms'

//MAT
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatDialogModule } from '@angular/material/dialog'

//API
import { HttpClientModule } from '@angular/common/http';
import { ClientDetailsComponent } from './client-details/client-details.component';
import { AddConfigurationComponent } from './add-configuration/add-configuration.component';
import { LabelDetailsComponent } from './label-details/label-details.component';
import { PrintPopupComponent } from './print-popup/print-popup.component';



@NgModule({
  declarations: [
    AppComponent,
    ClientTableComponent,
    ClientViewComponent,
    LabelViewComponent,
    ClientDetailsComponent,
    AddConfigurationComponent,
    LabelDetailsComponent,
    PrintPopupComponent,
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    AppRoutingModule,
    RouterModule.forRoot([
      { path: 'client', component: ClientViewComponent },
      { path: 'label', component: LabelViewComponent },
      { path: 'label/detail', component: LabelDetailsComponent },
      { path: 'client/detail', component: ClientDetailsComponent },
      { path: 'client/detail/addConfiguration', component: AddConfigurationComponent },
    ])
  ],
  exports: [
  ],
  providers: [MatIconRegistry, MatSort],
  bootstrap: [AppComponent]
})
export class AppModule { }
