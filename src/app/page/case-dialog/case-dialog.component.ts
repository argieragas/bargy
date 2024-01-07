
import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ServiceData } from 'src/app/client/servicedata.client';
import { CaseData } from 'src/utils/data';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { MapDialogComponent } from '../map-dialog/map-dialog.component';

export interface CaseTitle {
  title: string;
  value: string[];
}

@Component({
  selector: 'app-case-dialog',
  templateUrl: './case-dialog.component.html',
  styleUrls: ['./case-dialog.component.scss']
})
export class CaseDialogComponent {
  title = ''
  @ViewChild('fname') _fname: ElementRef
  @ViewChild('details') _details: ElementRef
  form: FormGroup;
  cities: string[] = [];
  barangays: string[] = [];


  caseType = [
    'Economic Offence',
    'Offence against a person',
    'Offence against chastity',
    'Offence against honor',
    'Offence against property',
    'Offence against public order',
    'Offence against the family and children'
  ]

  caseTitle: CaseTitle[] = [{
      title: 'Economic Offence',
      value: ['Issuing checks without sufficient funds']
    },{
      title: 'Offence against a person',
      value: [
        'Physical Injuries inflicted in a Tumultuous affray',
        'Giving assistance to consummated suicide',
        'Responsibility of paticipants in a duel if only physical injuries are inflicted or no phycial injuries have been inflicted',
        'Less serious physical injuries'
      ]
    },{
      title: 'Offence against chastity',
      value: [
        'Simple seduction',
        'Acts of lasciviousness with the consent of the offended party'
      ]
    },{
      title: 'Offence against honor',
      value: [
        'Threatening to publish and offer to prevent such publication for compensation',
        'Prohibiting publication of acts referred to in the course of official proceedings',
        'Incriminating innocent persons',
        'intriguing against honor'
      ]
    },{
      title: 'Offence against property',
      value: [
        'Qualified trespass to dwelling (without the use of violence and intimidation)',
        'Other forms of trespass',
        'Theft (if the value of the property stolen does not exceed ₱50.00)',
        'Qualified theft (if the amount does not exceed ₱50.00)',
        'Occupation of real property or usurpation of real rights in property',
        'Altering Boundaries or landmakrs',
        'Swindling or estafa (if the amount does not exceed ₱200.00)',
        'Other forms of swindling',
        'Swindling in a minor',
        'Other deceits',
        'Removal, Sale, or Pledge of mortgaged property',
        'Special cases of malicious mischief (if the value of the damaged property does not exceed ₱1,000.00)',
        'Other mischiefs (if the value of the damaged property does not exceed ₱1,000.00)',
        'Fencing of stolen properties if the property involved is not more than ₱50.00'
      ]
    },{
      title: 'Offence against public order',
      value: [
        'Unlawful use of means of publication and unlawful utterances',
        'Alarms and scandals',
        'Using false certificates',
        'Using fictitious names and concealing true names',
        'Illegal use of uniforms and insignias'
      ]
    },{
      title: 'Offence against the family and children',
      value: [
        'Inducing a minor to abandon his/her home',
        `Abandonment of a person in danger and abandonment of One's Own victim`,
        'Abandoning a minor (a child under seven[7] years old)',
        'Abandonment of a minor by persons entrusted with his/her custody; indifference of parents.'
      ]
    }
  ]


  selectedType = this.caseType[0]
  selectedTypeValue: string[]
  selectedTitle = ''
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<CaseDialogComponent>,
    private serviceData: ServiceData,
    private fb: FormBuilder
  ) {}

  caseData: CaseData = {
    id: 0,
    title: '',
    type: '',
    complainantfName: '',
    complainantmName: '',
    complainantlName: '',
    complainantAddress: '',
    complainantLatLng: '',
    complaintfName: '',
    complaintmName: '',
    complaintlName: '',
    complaintAddress: '',
    complaintLatLng: '',
    schedule: '',
    status: 'Pending',
    remark: 'on Settle',
    location: '',
    locationLatLng: '',
    details: ''
  }


  changeType() {
    this.caseTitle.forEach(type=>{
      if(type.title == this.caseData.type){
        console.log(type.title, type.value)
        this.selectedTypeValue = type.value
        this.caseData.title = type.value[0]
      }
    })
  }

  ngOnInit() {
    this.title = this.data.dataType
    if(this.data.dataType == 'Update Case'){
      this.caseData = this.data.id
    }else{
      this.caseData.id = this.data.id
    }
  }

  submit(){
    // if(this.title == 'Add Case'){
    //   this.serviceData.addCase(this.caseData).subscribe(
    //     (response)=>{
    //       this.showAlert('success', response.title, response.message)
    //       this.dialogRef.close()
    //     },
    //     (error)=>{
    //       this.showAlert('error', 'You most need to complete the text field', '')
    //     }
    //   )
    // }else{
    //   this.serviceData.updateCase(this.caseData).subscribe(
    //     (response)=>{
    //       this.showAlert('success', response.title, response.message)
    //       this.dialogRef.close()
    //     },
    //     (error)=>{
    //       this.showAlert('error', 'You most need to complete the text field', '')
    //     }
    //   )
    // }
  }

  private showAlert(icon: SweetAlertOptions['icon'], title?: string, text?: string): void {
    Swal.fire({
      icon,
      title,
      text,
    });
  }

  openMap(type: string){
    const dialogRef = this.dialog.open(MapDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, type, result)
      if(type == 'complaint'){
        console.log('if')
        this.caseData.complaintAddress = result.location
        this.caseData.complaintLatLng = result.latlng
        this._details.nativeElement.focus()
      }else if(type == 'complainant'){
        this.caseData.complainantAddress = result.location
        this.caseData.complainantLatLng = result.latlng
        this._fname.nativeElement.focus()
      }else{
        this.caseData.location = result.location
        this.caseData.locationLatLng = result.latlng
        console.log(result.latlng, this.caseData.locationLatLng)
        this._fname.nativeElement.focus()
      }
    });
  }
}
