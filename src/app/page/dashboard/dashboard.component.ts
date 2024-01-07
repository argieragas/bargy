import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { ServiceData } from 'src/app/client/servicedata.client';
import { DashboardCount, DashboardTable } from 'src/utils/data';

export interface PeriodicElement{
  year: number;
  cases: number;
  killed: number;
  injured: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
  displayedColumns: string[] = ['year', 'cases', 'report'];

  tableData: DashboardTable[] = []
  dc: DashboardCount = {
    user: 0,
    case: 0,
    report: 0
  }
  dataSource: any

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  constructor(private serviceData: ServiceData){

  }

  ngOnInit(){
    this.serviceData.getCount().subscribe(
      (response)=>{
        this.dc = response
      }
    )

    this.serviceData.getDashboard().subscribe(
      (response)=>{
        this.tableData = response
        this.dataSource = new MatTableDataSource<DashboardTable>(this.tableData)
      }
    )
  }
}
