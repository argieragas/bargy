
import { Component, ViewChild, ElementRef, Inject } from '@angular/core';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ReportData } from 'src/utils/data';
import { ServiceData } from 'src/app/client/servicedata.client';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss'],
  providers: [DatePipe],
})
export class ReportDialogComponent {
  @ViewChild('involved') _involved: ElementRef;
  title = ''
  reportData: ReportData = {
    id: 0,
    involved: '',
    incident: '',
    location: '',
    latlng: '',
    date: ''
  }
    dateString: string = '2023-01-01'; // Replace this with your actual date string
    convertedDate: Date;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private serviceData: ServiceData,
    private datePipe: DatePipe,
    private dialogRef: MatDialogRef<ReportDialogComponent>) {
      // this.convertedDate = this.datePipe.transform(this.dateString, 'yyyy-MM-dd') as Date;
  }

  ngOnInit() {
    this.title = this.data.dataType
    if(this.data.dataType == 'Update Report'){
      this.reportData = this.data.id
    }else{
      this.reportData.id = this.data.id
    }
  }

  submit(){
    let newDate = new Date(this.reportData.date.toString());
    this.reportData.date = this.datePipe.transform(newDate, 'MM/dd/yyyy')
    console.log(this.reportData.date)
    if(this.title == 'Add Report'){
      this.serviceData.addReport(this.reportData).subscribe(
        (response)=>{
          this.showAlert('success', response.title, response.message)
          this.dialogRef.close()
        },
        (error)=>{
          this.showAlert('warning', error, '')
        }
      )
    }else{
      this.serviceData.updateReport(this.reportData).subscribe(
        (response)=>{
          this.showAlert('success', response.title, response.message)
          this.dialogRef.close()
        },
        (error)=>{
          this.showAlert('warning', error, '')
        }
      )
    }
  }

  private showAlert(icon: SweetAlertOptions['icon'], title?: string, text?: string): void {
    Swal.fire({
      icon,
      title,
      text,
    });
  }

  openMap(){
    const dialogRef = this.dialog.open(MapDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.reportData.location = result.location
      this.reportData.latlng = result.latlng
      this._involved.nativeElement.focus()
    });
  }
}
