
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetLocation, ReportData, UserData, ApiResponse, CaseData, DashboardCount, DashboardTable, NewCaseData } from 'src/utils/data';
@Injectable({
  providedIn: 'root',
})

export class ServiceData {
  constructor(private http: HttpClient) {}

  public getReport(): Observable<ReportData[]> {
    return this.http.get<ReportData[]>(
      environment.apiUrl + '/getReport'
    )
  }

  public deleteReport(id): Observable<string> {
    return this.http.delete<string>(environment.apiUrl + '/deleteReport/'+id)
  }

  public deleteCase(id): Observable<string> {
    return this.http.delete<string>(environment.apiUrl + '/deleteCase/'+id)
  }

  public addReport(data: ReportData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + '/newReport',data)
  }

  public updateReport(data: ReportData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + '/updateReport',data)
  }

  public getLocationReport(): Observable<GetLocation[]> {
    return this.http.get<GetLocation[]>(environment.apiUrl + '/getLocationReport')
  }

  public getCase(): Observable<NewCaseData[]> {
    return this.http.get<NewCaseData[]>(environment.apiUrl + '/getCase')
  }

  public addCase(data: NewCaseData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + '/newCase', data)
  }

  public updateCase(data: NewCaseData): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(environment.apiUrl + '/updateCase', data)
  }

  public getLocationCase(): Observable<GetLocation[]> {
    return this.http.get<GetLocation[]>(environment.apiUrl + '/getLocationCase')
  }

  public getCount(): Observable<DashboardCount> {
    return this.http.get<DashboardCount>(environment.apiUrl + '/getCount')
  }

  public getUser(): Observable<UserData[]> {
    return this.http.get<UserData[]>(environment.apiUrl + '/getUser')
  }

  public getDashboard(): Observable<DashboardTable[]> {
    return this.http.get<DashboardTable[]>(environment.apiUrl + '/getDashboard')
  }
}
