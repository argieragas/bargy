import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceData } from 'src/app/client/servicedata.client';
import { NewCaseData } from 'src/utils/data';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-new-case-dialog',
  templateUrl: './new-case-dialog.component.html',
  styleUrls: ['./new-case-dialog.component.scss'],
  providers: [DatePipe],
})
export class NewCaseDialogComponent {
  dialog_title = ''

  ngOnInit() {
    this.dialog_title = this.data.dataType
    if(this.data.dataType == 'Update Case'){
      this.caseData = this.data.id
    }else{
      this.caseData.id = this.data.id
    }
    console.log("ng on init", this.data.dataType+" "+this.dialog_title)
  }
  referenceType = ['personal','court']
  actionType = [
    'mediated',
    'conciliated',
    'arbitrated',
    'repudiated',
    'certified'
  ]
  execution = [
    'Voluntary',
    'none'
  ]
  nature = [
    'criminal',
    'civil',
    'other'
  ]
  status = [
    'pending',
    'settled'
  ]
  caseData: NewCaseData = {
    id: 0,
    case_number: '',
    reference: '',
    date_of_filing: '',
    official_receipt: '',
    complainant: '',
    complainantAddress: '',
    respondent: '',
    respondentAddress: '',
    title: '',
    nature: '',
    date_summons: '',
    first_hearing: '',
    final_hearing: '',
    action: '',
    execution: '',
    location: '',
    locationLatLng: '',
    date_of_action: '',
    date_of_filing_motion: '',
    date_of_hearing_motion: '',
    date_of_issuance: '',
    date_of_agreement: '',
    status: '',
    remark: 'unsettle'
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<NewCaseDialogComponent>,
    private serviceData: ServiceData,
    public datePipe: DatePipe,
    private fb: FormBuilder
  ) {}
  @ViewChild('title') _title: ElementRef

  openMap(){
    const dialogRef = this.dialog.open(MapDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.caseData.location = result.location
      this.caseData.locationLatLng = result.latlng
      this._title.nativeElement.focus()
    });
  }

  submit(){
    let date_of_filing = new Date(this.caseData.date_of_filing)
    this.caseData.date_of_filing = this.datePipe.transform(date_of_filing, 'MM/dd/yyyy')
    let date_summons = new Date(this.caseData.date_summons)
    this.caseData.date_summons = this.datePipe.transform(date_summons, 'MM/dd/yyyy')
    let first_hearing = new Date(this.caseData.first_hearing)
    this.caseData.first_hearing = this.datePipe.transform(first_hearing, 'MM/dd/yyyy')
    let final_hearing = new Date(this.caseData.final_hearing)
    this.caseData.final_hearing = this.datePipe.transform(final_hearing, 'MM/dd/yyyy')
    let date_of_action = new Date(this.caseData.date_of_action)
    this.caseData.date_of_action = this.datePipe.transform(date_of_action, 'MM/dd/yyyy')
    let date_of_filing_motion = new Date(this.caseData.date_of_filing_motion)
    this.caseData.date_of_filing_motion = this.datePipe.transform(date_of_filing_motion, 'MM/dd/yyyy')
    let date_of_hearing_motion = new Date(this.caseData.date_of_hearing_motion)
    this.caseData.date_of_hearing_motion = this.datePipe.transform(date_of_hearing_motion, 'MM/dd/yyyy')
    let date_of_issuance = new Date(this.caseData.date_of_issuance)
    this.caseData.date_of_issuance = this.datePipe.transform(date_of_issuance, 'MM/dd/yyyy')
    let date_of_agreement = new Date(this.caseData.date_of_agreement)
    this.caseData.date_of_agreement = this.datePipe.transform(date_of_agreement, 'MM/dd/yyyy')
    if(this.dialog_title == 'Add Case'){
      this.serviceData.addCase(this.caseData).subscribe(
        (response)=>{
          this.showAlert('success', response.title, response.message)
          this.dialogRef.close()
        },
        (error)=>{
          this.showAlert('error', 'You most need to complete the text field', '')
        }
      )
    }else{
      this.serviceData.updateCase(this.caseData).subscribe(
        (response)=>{
          this.showAlert('success', response.title, response.message)
          this.dialogRef.close()
        },
        (error)=>{
          this.showAlert('error', 'You most need to complete the text field', '')
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
}
