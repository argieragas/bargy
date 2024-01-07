import { Component, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { UserData } from 'src/utils/data';
import { ServiceData } from 'src/app/client/servicedata.client';

@Component({
  selector: 'app-officer',
  templateUrl: './officer.component.html',
  styleUrls: ['./officer.component.scss']
})
export class OfficerComponent {
  userData: UserData[] = []

  displayedColumns: string[] = ['name', 'address', 'position', 'committee'];
  dataSource: any

  ngOnInit(){
    this.getUser()
  }

  getUser(){
    this.serviceData.getUser().subscribe(
      (data)=>{
        this.userData = data
        this.dataSource = new MatTableDataSource<UserData>(data)
        this.dataSource.paginator = this.paginator
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
    pdfMake.createPdf(docDefinition).download();
  }

  table(){
    return {
      table: {
        widths: ['25%', '40%', '10%', '25%'],
        body:[
          [
            {
              text: 'Name',
              style: 'tableHeader'
            },
            {
              text: 'Address',
              style: 'tableHeader'
            },
            {
              text: 'Position',
              style: 'tableHeader'
            },{
              text: 'Committee',
              style: 'tableHeader'
            }
          ],
          ...this.userData.map(ed => {
            return [
              ed.name,
              ed.address,
              ed.position,
              ed.committee
            ]
          })
        ]
      }
    }

  }
}
