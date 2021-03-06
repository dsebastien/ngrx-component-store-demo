import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LessonComponent } from './components/lesson/lesson.component';
import { LessonsCatalogComponent } from './lessons-catalog/lessons-catalog.component';
import { ReactiveComponentModule } from "@ngrx/component";

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveComponentModule],
  declarations: [ AppComponent, LessonComponent, LessonsCatalogComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
