import { Component } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-annual',
  templateUrl: './annual.component.html',
  styleUrls: ['./annual.component.scss']
})
export class AnnualComponent {

  generatePDF() {
    let docDefinition: any = {
      content: [
        {
          text: 'Reported Cases in Barangay Dahican',
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
    pdfMake.createPdf(docDefinition).download(`Case file ${formatDate(new Date(), 'yyyy/MM/dd', 'en')}`)
  }

  table(){
    return {

    }
  }

}
