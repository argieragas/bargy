export interface Login {
  email: string;
  password: string;
}

export interface Register {
  name: string;
  address: string;
  position: string;
  committee: string;
  email: string;
  password: string;
  code: string;
  confirmpass: string;
}


export interface ReportData {
  id: number;
  involved: String;
  incident: String;
  location: String;
  latlng: String;
  date: String;
}

export interface LocationData {
  location: string;
  latlng: string;
}

export interface ApiResponse {
  title: string;
  message: string;
}

export interface GetLocation {
  lat: number;
  lng: number;
  icon: string;
  label: string;
  content: string;
}


export interface CaseData {
  id: number;
  title: string;
  type: string;
  complainantfName: string;
  complainantmName: string;
  complainantlName: string;
  complainantAddress: string;
  complainantLatLng: string;
  complaintfName: string;
  complaintmName: string;
  complaintlName: string;
  complaintAddress: string;
  complaintLatLng: string;
  schedule: string;
  status: string;
  remark: string;
  location: string;
  locationLatLng: string;
  details: string;
}

export interface UserData {
  id: number;
  name: string;
  address: string;
  position: string;
  committee: string;
  email: string;
  email_verified_at: string;
  password: string;
  remember_token: string;
  created_at: string;
  updated_at: string;
}

export interface DashboardCount {
  user: number;
  case: number;
  report: number;
}

export interface DashboardTable {
  year: number;
  case: number;
  report: number;
}

export interface HeatLayer {
  lat: number,
  lng: number;
  value: number;
}

export interface NewCaseData {
  id: number;
  case_number: string;
  reference: string;
  date_of_filing: string;
  official_receipt: string;
  complainant: string;
  complainantAddress: string;
  respondent: string;
  respondentAddress: string;
  title: string;
  nature: string;
  date_summons: string;
  first_hearing: string;
  final_hearing: string;
  action: string;
  execution: string;
  location: string;
  locationLatLng: string;
  date_of_action: string;
  date_of_filing_motion: string;
  date_of_hearing_motion: string;
  date_of_issuance: string;
  date_of_agreement: string;
  status: string;
  remark: string;
}
