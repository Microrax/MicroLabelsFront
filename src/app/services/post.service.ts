import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../Models/client';
import { Configuration } from '../Models/configuration';
import { Label } from '../Models/labels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  //CLIENTES
  private urlclients = 'http://localhost:5020/api/v1/clients';
  private urlconfigs = 'http://localhost:5020/api/v1/labels/configuration';
  private urllabelnoconfig = 'http://localhost:5020/api/v1/labels/noconfig';
  private urllabelyesconfig = 'http://localhost:5020/api/v1/clients/yesconfig';
  private urllabel = 'http://localhost:5020/api/v1/labels';
  private urlprint = 'http://localhost:5020/api/v1/labels/print';

  JsonObject!: JSON;

  constructor(private httpClient: HttpClient) { }


  // CONFIG
  DeleteConfig(clientid: string, labelid: string) {

    return this.httpClient.delete(this.urlconfigs + '/' + clientid + '/' + labelid);

  }

  AddConfig(clientid: string, labelid: string) {

    return this.httpClient.post(this.urlconfigs + '/' + clientid + '/' + labelid, this.JsonObject);

  }

  GetConfigs(id: string) {

    return this.httpClient.get<Configuration[]>(this.urlconfigs + '/' + id);

  }

  //CLIENTS
  getPosts() {
    return this.httpClient.get<Client[]>(this.urlclients);
  }

  deleteClient(id: string) {

    return this.httpClient.delete(this.urlclients + '/' + id);

  }

  getClientsYesConfig(id: string) {

    return this.httpClient.get<Client[]>(this.urllabelyesconfig + '/' + id);
  }
  //LABELS

  getLabelsNoConfig(id: string) {

    return this.httpClient.get<Label[]>(this.urllabelnoconfig + '/' + id);
  }

  getLabels() {

    return this.httpClient.get<Label[]>(this.urllabel);
  }

  deleteLabel(id: string) {

    return this.httpClient.delete(this.urllabel + '/' + id);
  }

  putLabel(label: Label) {

      const json = {

        id: label.id,
        LabelType: label.labelType,
        Template: label.template,
        Zpl: label.zpl,
        Dpi: label.dpi,
        Sql: label.sql

    }

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    return this.httpClient.put(this.urllabel, JSON.stringify(json), options);
  }

  printLabel(workstation:string, itemSku:string, labelID:string, clientID:string) {

    const json = {

      workstationCode: workstation,
      itemId: itemSku,
      labelId: labelID,
      clientCode: clientID

    }

    const options = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }

    return this.httpClient.post(this.urlprint, JSON.stringify(json), options);
  }
 }

