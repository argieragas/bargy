import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import { OfficerComponent } from './officer/officer.component';
import { CasesComponent } from './cases/cases.component';
import { ReportComponent } from './report/report.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import { CaseDialogComponent } from './case-dialog/case-dialog.component';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import { OfficerDialogComponent } from './officer-dialog/officer-dialog.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { MapDialogComponent } from '../page/map-dialog/map-dialog.component';
import { UpdateComponent } from './update/update.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { AnnualComponent } from './annual/annual.component';
import { NewCaseDialogComponent } from './new-case-dialog/new-case-dialog.component';

@NgModule({
  declarations: [
    PageComponent,
    DashboardComponent,
    OfficerComponent,
    CasesComponent,
    ReportComponent,
    CaseDialogComponent,
    OfficerDialogComponent,
    MapComponent,
    ReportDialogComponent,
    MapDialogComponent,
    UpdateComponent,
    AnnualComponent,
    NewCaseDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    FormsModule,
    MatSelectModule,
    LeafletModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class PageModule { }
