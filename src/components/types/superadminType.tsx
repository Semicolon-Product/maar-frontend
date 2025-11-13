// types/Teacher.ts

/* export interface Teacher {
  name: string;
  department: string;
  userId: string;
  password: string;
  id?: number;
  mobile_no?: string;
} */

export interface CollegeInfo {
  college_name: string;
  college_code: string;
}

export interface GetAllTeachersResponse {
  teachers: Teacher[];
  totalTeachers: number;
  college: CollegeInfo;
}
export interface StudentActivityFormData {
  moocs12Weeks: number;
  moocs12WeeksFile: File | null;
  moocs8Weeks: number;
  moocs8WeeksFile: File | null;
  moocs4Weeks: number;
  moocs4WeeksFile: File | null;
  moocs2Weeks: number;
  moocs2WeeksFile: File | null;
  techFestOrganizer: number;
  techFestOrganizerFile: File | null;
  techFestParticipant: number;
  techFestParticipantFile: File | null;
  ruralReporting: number;
  ruralReportingFile: File | null;
  treePlantation: number;
  treePlantationFile: File | null;
  reliefFundCollection: number;
  reliefFundCollectionFile: File | null;
  reliefWorkTeam: number;
  reliefWorkTeamFile: File | null;
  participationInArts: number;
  participationInArtsFile: File | null;
  publication: number;
  publicationFile: File | null;
  researchPublication: number;
  researchPublicationFile: File | null;
  innovativeProjects: number;
  innovativeProjectsFile: File | null;
  bloodDonation: number;
  bloodDonationFile: File | null;
  bloodDonationCampOrganization: number;
  bloodDonationCampOrganizationFile: File | null;
  sportsPersonal: number;
  sportsPersonalFile: File | null;
  sportsCollege: number;
  sportsCollegeFile: File | null;
  sportsUniversity: number;
  sportsUniversityFile: File | null;
  sportsDistrict: number;
  sportsDistrictFile: File | null;
  sportsState: number;
  sportsStateFile: File | null;
  sportsNationalInternational: number;
  sportsNationalInternationalFile: File | null;
  professionalSocietyActivities: number;
  professionalSocietyActivitiesFile: File | null;
  industryVisit: number;
  industryVisitFile: File | null;
  communityService: number;
  communityServiceFile: File | null;
  entrepreneurshipOrganize: number;
  entrepreneurshipOrganizeFile: File | null;
  entrepreneurshipParticipate: number;
  entrepreneurshipParticipateFile: File | null;
  entrepreneurshipVideo: number;
  entrepreneurshipVideoFile: File | null;
  entrepreneurshipBusinessPlan: number;
  entrepreneurshipBusinessPlanFile: File | null;
  entrepreneurshipWorkForStartup: number;
  entrepreneurshipWorkForStartupFile: File | null;
}

export const initialStudentActivityFormData: StudentActivityFormData = {
  moocs12Weeks: 0,
  moocs12WeeksFile: null,
  moocs8Weeks: 0,
  moocs8WeeksFile: null,
  moocs4Weeks: 0,
  moocs4WeeksFile: null,
  moocs2Weeks: 0,
  moocs2WeeksFile: null,
  techFestOrganizer: 0,
  techFestOrganizerFile: null,
  techFestParticipant: 0,
  techFestParticipantFile: null,
  ruralReporting: 0,
  ruralReportingFile: null,
  treePlantation: 0,
  treePlantationFile: null,
  reliefFundCollection: 0,
  reliefFundCollectionFile: null,
  reliefWorkTeam: 0,
  reliefWorkTeamFile: null,
  participationInArts: 0,
  participationInArtsFile: null,
  publication: 0,
  publicationFile: null,
  researchPublication: 0,
  researchPublicationFile: null,
  innovativeProjects: 0,
  innovativeProjectsFile: null,
  bloodDonation: 0,
  bloodDonationFile: null,
  bloodDonationCampOrganization: 0,
  bloodDonationCampOrganizationFile: null,
  sportsPersonal: 0,
  sportsPersonalFile: null,
  sportsCollege: 0,
  sportsCollegeFile: null,
  sportsUniversity: 0,
  sportsUniversityFile: null,
  sportsDistrict: 0,
  sportsDistrictFile: null,
  sportsState: 0,
  sportsStateFile: null,
  sportsNationalInternational: 0,
  sportsNationalInternationalFile: null,
  professionalSocietyActivities: 0,
  professionalSocietyActivitiesFile: null,
  industryVisit: 0,
  industryVisitFile: null,
  communityService: 0,
  communityServiceFile: null,
  entrepreneurshipOrganize: 0,
  entrepreneurshipOrganizeFile: null,
  entrepreneurshipParticipate: 0,
  entrepreneurshipParticipateFile: null,
  entrepreneurshipVideo: 0,
  entrepreneurshipVideoFile: null,
  entrepreneurshipBusinessPlan: 0,
  entrepreneurshipBusinessPlanFile: null,
  entrepreneurshipWorkForStartup: 0,
  entrepreneurshipWorkForStartupFile: null,
};

// Subpoint definition
export interface Subpoint {
  name: string;
  point_per_activity: number;
  max?: number;
  remain?: number;
  already_acquired?: number;
}

// Main activity definition
export interface Activity {
  name: string;
  point_per_activity?: number;
  max?: number;
  remain?: number;
  already_acquired?: number;
  subpoints?: Subpoint[];
}
export interface StudentYearlyDetailsProps {
  data: any; // Replace `any` with a proper type if available
  currentyear?: number;
  year: number;
  student: any;
}
export interface IndividualActivity {
  id: number;
  student_id: number;
  academic_year: number;
  activity_serial_no: string;
  activity_name: string;
  activity_date: string | null;
  document_url: string | null;
  uploaded_at: string;
  is_active: boolean;
  is_verified: boolean;
  point: number;
}

export interface Student {
  id: number;
  name: string;
  roll_no: string;
  mobile_no: string;
  signature: string | null;
  email: string;
  admission_year: number;
  activities: IndividualActivity[];
  status: boolean;
}

export interface YearStats {
  totalStudents: number;
  totalSubmitted: number;
  totalNotSubmitted: number;
  totalFullyVerified: number;
  totalNotVerified: number;
}

export interface YearData {
  students: Student[];
  stats: YearStats;
}
export interface BackendStudentDetails {
  firstYear: YearData;
  secondYear: YearData;
  thirdYear: YearData;
  fourthYear: YearData;
  teacherSignature: string;
}

export interface TeacherVerifyTableProps {
  data?: YearData;
  signature?: string | null;
}

export interface SuperAdminSignupFormData {
  email: string;
  password: string;
  collegeName: string;
  collegeCode: string;
}

export interface SuperAdminSignupApiPayload {
  email: string;
  password: string;
  college_name: string;
  college_code: string;
}

export interface SuperAdminLoginForm {
  email?: string;
  password?: string;
}
export interface TeacherCreatePayload {
  name: string;
  dept: string;
  userId: string;
  password: string;
}

export interface SuperAdminSignupFormData {
  name: string;
  email: string;
  password: string;
  collegeName: string;
  collegeCode: string;
}
export type SuperAdminFormErrors = {
  name?: string;
  email?: string;
  password?: string;
  collegeName?: string;
  collegeCode?: string;
  roll?: string;
};

export interface loginError {
  roll?: string;
  password?: string;
  email?: string;
  name?: string;
  collegeName?: string;
  collegeCode?: string;
}
export type Department = {
  id: number;
  dept_code: string;
  name: string;
  created_at: string; // ISO string
};

export interface AllDetails {
  superadmin: SuperAdmin;
  institute: Institute;
  payment: Payment[];
  teachers: Teacher[];
}

export interface SuperAdmin {
  id: number;
  name: string;
  email: string;
  hashed_password: string;
}

export interface Institute {
  id: number;
  name: string;
  superadmin_id: number;
  created_at: string; // ISO date string
  institute_code: string;
}

export interface Payment {
  id: number;
  institute_id: number;
  amount_paid: number;
  email: string | null;
  student_quota: number;
  students_registered: number;
  paid_on: string; // ISO date string
  valid_until: string; // ISO date string
  is_approve: boolean;
  created_at: string;
  updated_at: string;
}

export interface Teacher {
  id?: number;
  name: string;
  email: string;
  mobile_no: string | null;
  password_hash: string;
  signature: string | null;
  superadmin_id: number;
  department: string;
  password: string;
}
export type TeachersResponse = {
  teachers: Teacher[];
};

export type StudentYearData = {
  year: string; // e.g. "1st Year", "2nd Year", etc.
  count: number; // total activities or points
  submit: number; // submitted count
  remain: number; // remaining count
};
export type StudentYearDataArray = StudentYearData[];

export type StudentBasicInfo = {
  id: number;
  name: string;
  roll_no: string;
  email: string;
  admission_year: number;
  mobile_no: string;
  created_at: string; // ISO timestamp format
};

export type YearlyStudentData = {
  [year: string]: StudentBasicInfo[];
};
export interface TeacherSideBarProps {
  id: number;
  name: string;
  email: string;
  mobile_no: string;
  department: string;
  password_hash: string;
  signature: string | null;
  superadmin_id: number;
}

export type teacherGetDetails = {
  teacher: TeacherSideBarProps;
  studentData: StudentYearDataArray;
};
export interface SuperadminSidebarData {
  id?: number;
  name?: string;
  email?: string;
}

export type StudentPointData = {
  uploaded: number;
  approved: number;
};

export type StudentData = {
  name: string;
  roll_no: string;
  mobile_no: string;
  signature: string | null;
  admission_year: number;
  email: string;
  current_year: number;
  points: {
    "1st Year": StudentPointData;
    "2nd Year": StudentPointData;
    "3rd Year": StudentPointData;
    "4th Year": StudentPointData;
  };
};

export type StudentResponseofGetDetails = {
  name: string;
  roll_no: string;
  current_year: number;
  data: StudentData;
};

// Subpoint inside an activity (if any)
export interface ActivitySubpoint {
  name: string;
  point_per_activity: number;
  max?: number;
  remain?: number;
  already_acquired?: number;
}

// Activity definition for each year
export interface YearActivity {
  name: string;
  point_per_activity?: number;
  max?: number;
  remain?: number;
  already_acquired?: number;
  subpoints?: ActivitySubpoint[];
}

// Structure holding all four years
export interface YearWiseActivityStructure {
  firstyear: YearActivity[];
  secondyear: YearActivity[];
  thirdyear: YearActivity[];
  fourthyear: YearActivity[];
}
