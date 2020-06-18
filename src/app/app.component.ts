import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent  {
  catalogs: string[] = ["Default"];

  addCatalog() {
    this.catalogs.push(new Date().toISOString());
  }
}
