import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ChangeDetectionComponent, ChangeDetectionOnPushComponent } from './change-detection/change-detection.component';
import { ChangeDetectionPageComponent } from './change-detection-page/change-detection-page.component';
import { ZonesComponent } from './zones/zones.component';
import { ZonesPageComponent } from './zones-page/zones-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ChangeDetectionComponent,
    ChangeDetectionOnPushComponent,
    ChangeDetectionPageComponent,
    ZonesComponent,
    ZonesPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
