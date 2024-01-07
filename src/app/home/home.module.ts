import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomedashboardComponent } from './homedashboard/homedashboard.component';
import { HomemapComponent } from './homemap/homemap.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
@NgModule({
  declarations: [
    HomedashboardComponent,
    HomemapComponent,
    HomeComponent,
    LoginDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    LeafletModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    FormsModule,
    MatTabsModule,
    MatIconModule
  ]
})
export class HomeModule { }
