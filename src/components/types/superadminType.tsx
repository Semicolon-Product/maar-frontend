// types/Teacher.ts

export interface Teacher {
  name: string;
  department: string;
  userId: string;
  password: string;
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
export type YearlyActivityList = Activity[];