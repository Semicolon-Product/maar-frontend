// types/Teacher.ts

export interface Teacher {
  name: string;
  department: string;
  userId: string;
  password: string;
}
export interface StudentActivityFormData {
  moocs12Weeks: string;
  moocs12WeeksFile: File | null;
  moocs8Weeks: string;
  moocs8WeeksFile: File | null;
  moocs4Weeks: string;
  moocs4WeeksFile: File | null;
  moocs2Weeks: string;
  moocs2WeeksFile: File | null;
  techFestOrganizer: string;
  techFestOrganizerFile: File | null;
  techFestParticipant: string;
  techFestParticipantFile: File | null;
  ruralReporting: string;
  ruralReportingFile: File | null;
  treePlantation: string;
  treePlantationFile: File | null;
  reliefFundCollection: string;
  reliefFundCollectionFile: File | null;
  reliefWorkTeam: string;
  reliefWorkTeamFile: File | null;
  participationInArts: string;
  participationInArtsFile: File | null;
  publication: string;
  publicationFile: File | null;
  researchPublication: string;
  researchPublicationFile: File | null;
  innovativeProjects: string;
  innovativeProjectsFile: File | null;
  bloodDonation: string;
  bloodDonationFile: File | null;
  bloodDonationCampOrganization: string;
  bloodDonationCampOrganizationFile: File | null;
  sportsPersonal: string;
  sportsPersonalFile: File | null;
  sportsCollege: string;
  sportsCollegeFile: File | null;
  sportsUniversity: string;
  sportsUniversityFile: File | null;
  sportsDistrict: string;
  sportsDistrictFile: File | null;
  sportsState: string;
  sportsStateFile: File | null;
  sportsNationalInternational: string;
  sportsNationalInternationalFile: File | null;
  professionalSocietyActivities: string;
  professionalSocietyActivitiesFile: File | null;
  industryVisit: string;
  industryVisitFile: File | null;
  communityService: string;
  communityServiceFile: File | null;
  entrepreneurshipOrganize: string;
  entrepreneurshipOrganizeFile: File | null;
  entrepreneurshipParticipate: string;
  entrepreneurshipParticipateFile: File | null;
  entrepreneurshipVideo: string;
  entrepreneurshipVideoFile: File | null;
  entrepreneurshipBusinessPlan: string;
  entrepreneurshipBusinessPlanFile: File | null;
  entrepreneurshipWorkForStartup: string;
  entrepreneurshipWorkForStartupFile: File | null;
}

export const initialStudentActivityFormData: StudentActivityFormData = {
  moocs12Weeks: '',
  moocs12WeeksFile: null,
  moocs8Weeks: '',
  moocs8WeeksFile: null,
  moocs4Weeks: '',
  moocs4WeeksFile: null,
  moocs2Weeks: '',
  moocs2WeeksFile: null,
  techFestOrganizer: '',
  techFestOrganizerFile: null,
  techFestParticipant: '',
  techFestParticipantFile: null,
  ruralReporting: '',
  ruralReportingFile: null,
  treePlantation: '',
  treePlantationFile: null,
  reliefFundCollection: '',
  reliefFundCollectionFile: null,
  reliefWorkTeam: '',
  reliefWorkTeamFile: null,
  participationInArts: '',
  participationInArtsFile: null,
  publication: '',
  publicationFile: null,
  researchPublication: '',
  researchPublicationFile: null,
  innovativeProjects: '',
  innovativeProjectsFile: null,
  bloodDonation: '',
  bloodDonationFile: null,
  bloodDonationCampOrganization: '',
  bloodDonationCampOrganizationFile: null,
  sportsPersonal: '',
  sportsPersonalFile: null,
  sportsCollege: '',
  sportsCollegeFile: null,
  sportsUniversity: '',
  sportsUniversityFile: null,
  sportsDistrict: '',
  sportsDistrictFile: null,
  sportsState: '',
  sportsStateFile: null,
  sportsNationalInternational: '',
  sportsNationalInternationalFile: null,
  professionalSocietyActivities: '',
  professionalSocietyActivitiesFile: null,
  industryVisit: '',
  industryVisitFile: null,
  communityService: '',
  communityServiceFile: null,
  entrepreneurshipOrganize: '',
  entrepreneurshipOrganizeFile: null,
  entrepreneurshipParticipate: '',
  entrepreneurshipParticipateFile: null,
  entrepreneurshipVideo: '',
  entrepreneurshipVideoFile: null,
  entrepreneurshipBusinessPlan: '',
  entrepreneurshipBusinessPlanFile: null,
  entrepreneurshipWorkForStartup: '',
  entrepreneurshipWorkForStartupFile: null,
};