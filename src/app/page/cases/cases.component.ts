import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { NewCaseData } from 'src/utils/data';
import Swal from 'sweetalert2';
import { ServiceData } from 'src/app/client/servicedata.client';
import {formatDate} from '@angular/common';
import { NewCaseDialogComponent } from '../new-case-dialog/new-case-dialog.component';

export interface PeriodicElement {
  no: number;
  title: String;
  complainant: String;
  complaint: String;
  schedule: String;
  status: String;
  remarks: String
}
@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})
export class CasesComponent {
  caseData: NewCaseData[] = []
  dataSource: any
  data = JSON.parse(localStorage.getItem('token'))
  displayedColumns: string[] = []

  ngOnInit(){
    if(this.data.user.position == 'unknown'){
      this.displayedColumns = [
        'no',
        'reference',
        'date_of_filing',
        'official_receipt',
        'complainant',
        'respondent',
        'title',
        'nature',
        'date_summons',
        'first_hearing',
        'final_hearing',
        'action',
        'date_of_action',
        'voluntary',
        'barangaylocation',
        'date_filing_motion',
        'date_hearing_motion',
        'date_issuance',
        'date_agreement',
        'remarks',
        'action'
      ]
    }else{
      this.displayedColumns = [
        'no',
        'reference',
        'date_of_filing',
        'official_receipt',
        'complainant',
        'respondent',
        'title',
        'nature',
        'date_summons',
        'first_hearing',
        'final_hearing',
        'action',
        'date_of_action',
        'voluntary',
        'barangaylocation',
        'date_filing_motion',
        'date_hearing_motion',
        'date_issuance',
        'date_agreement',
        'remarks']
    }
    this.getCase()
  }
  @ViewChild(MatPaginator) paginator: any;

  constructor(public dialog: MatDialog, private serviceData: ServiceData) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  getCase(){
    this.serviceData.getCase().subscribe(
      (data)=>{
        this.caseData = data
        this.dataSource = new MatTableDataSource<NewCaseData>(data)
        this.dataSource.paginator = this.paginator
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  delete(id){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.serviceData.deleteCase(id).subscribe(
          ()=>{
            this.getCase()
          },
          (error)=>{
            console.log(error)
          }
        )
      }
    })
  }

  generatePDF() {
    let docDefinition: any = {
      pageSize: { width: 800, height: 1300 },
      content: [
        {
          text: 'Reported Cases in Barangay Dahican',
          bold: true,
          fontSize: 14,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },
          this.table()
      ],
      pageOrientation: 'landscape',
      info: {
        title: 'Case Data',
        auhor: 'Brgy. Dahican',
        subject: 'Case',
        keywords: 'Cases report'
      },
      styles:{
        tableHeader: {
          bold: true,
          alignment: 'center',
          fontSize: 10
        }
      }
    }
    pdfMake.createPdf(docDefinition).download(`Case file ${formatDate(new Date(), 'yyyy/MM/dd', 'en')}`)
  }

  table(){
    return {
      table: {
        // keepWithHeaderRows: 1,
        autoSize : true,
        printHeaders : true,
        fontSize: 9,
        body: [
          [
            {
              text: 'Case number',
              style: 'tableHeader'
            },
            {
              text: 'Reference',
              style: 'tableHeader'
            },
            {
              text: 'Date of filing',
              style: 'tableHeader'
            },
            {
              text: 'Official receipt number',
              style: 'tableHeader'
            },
            {
              text: 'Complainant',
              style: 'tableHeader'
            },
            {
              text: 'Respondent',
              style: 'tableHeader'
            },
            {
              text: 'Case title',
              style: 'tableHeader'
            },
            {
              text: 'Nature',
              style: 'tableHeader'
            },
            {
              text: 'Date summons issued',
              style: 'tableHeader'
            },
            {
              text: 'Date of first hearing',
              style: 'tableHeader'
            },
            {
              text: 'Date of final hearing',
              style: 'tableHeader'
            },
            {
              text: 'Action taken',
              style: 'tableHeader'
            },
            {
              text: 'Date of action taken',
              style: 'tableHeader'
            },
            {
              text: 'Execution',
              style: 'tableHeader'
            },
            {
              text: 'Date of agreement or award compliance',
              style: 'tableHeader'
            },
            {
              text: 'Remarks',
              style: 'tableHeader'
            }
          ],
          ...this.caseData.map(ed => [
            {text: ed.case_number, fontSize: 9},
            {text: ed.reference, fontSize: 9},
            {text: ed.date_of_filing, fontSize: 9},
            {text: ed.official_receipt, fontSize: 9},
            {text: ed.complainant, fontSize: 9},
            {text: ed.respondent, fontSize: 9},
            {text: ed.title, fontSize: 9},
            {text: ed.nature, fontSize: 9},
            {text: ed.date_summons, fontSize: 9},
            {text: ed.first_hearing, fontSize: 9},
            {text: ed.final_hearing, fontSize: 9},
            {text: ed.action, fontSize: 9},
            {text: ed.date_of_action, fontSize: 9},
            {text: ed.execution, fontSize: 9},
            {text: ed.date_of_agreement, fontSize: 9},
            {text: ed.remark, fontSize: 9}
          ])
        ]
      }
    }
  }

  openDialog(type, id) {
    const dialogRef = this.dialog.open(NewCaseDialogComponent,{
      width: '800px',
      data: {dataType: type, id: id}
    });
    console.log(`Dialog result: `);
    dialogRef.afterClosed().subscribe(result => {
      this.getCase()
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
