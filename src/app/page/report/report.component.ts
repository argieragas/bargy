import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { ReportDialogComponent } from '../report-dialog/report-dialog.component';
import { ServiceData } from 'src/app/client/servicedata.client';
import { NewCaseData } from 'src/utils/data';
import Swal from 'sweetalert2';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent {
  reportData: NewCaseData[] = []
  dataSource: any
  data = JSON.parse(localStorage.getItem('token'))
  displayedColumns = ['no', 'complainant', 'respondent', 'title', 'action_taken']

  ngOnInit(){
    this.getReport()
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
        this.serviceData.deleteReport(id).subscribe(
          ()=>{
            this.getReport()
          },
          (error)=>{
            console.log(error)
          }
        )
      }
    })
  }

  getReport(){
    this.serviceData.getCase().subscribe(
      (data)=>{
        this.reportData = data
        this.dataSource = new MatTableDataSource<NewCaseData>(data)
        this.dataSource.paginator = this.paginator
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  @ViewChild(MatPaginator) paginator: any;

  constructor(public dialog: MatDialog, private serviceData: ServiceData) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(type, id) {
    const dialogRef = this.dialog.open(ReportDialogComponent,{
      data: {dataType: type, id: id}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getReport()
    });
  }

  generatePDF(){
    let docDefinition: any = {
      content: [
        {
          text: 'List of Barangay Officers',
          bold: true,
          fontSize: 15,
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
          alignment: 'center'
        },
      }
    }
    pdfMake.createPdf(docDefinition).download(`Report file ${formatDate(new Date(), 'yyyy/MM/dd', 'en')}`)
  }

  table(){
    return {
      table: {
        widths: ['20%', '20%', '20%', '20%', '20%'],
        body:[
          [
            {
              text: 'Case number',
              style: 'tableHeader'
            },
            {
              text: 'Complainant',
              style: 'tableHeader'
            },
            {
              text: 'Respondent',
              style: 'tableHeader'
            },{
              text: 'Case Title',
              style: 'tableHeader'
            },{
              text: 'Action taken',
              style: 'tableHeader'
            }
          ],
          ...this.reportData.map(ed => {
            return [
              ed.case_number,
              ed.complainant,
              ed.respondent,
              ed.title,
              ed.action
            ]
          })
        ]
      }
    }

  }
}
