// src/maxPointsConfig.ts

import type { StudentActivityFormData } from "./components/types/superadminType";

 // Import your form data interface

// Define a type for the max points configuration
export type MaxPointsConfig = {
  [K in keyof StudentActivityFormData]?: number; // Optional numeric value for each form data key
};

// Configuration for Max Permissible Points (Current Year for simplicity)
export const maxPointsPerActivity: MaxPointsConfig = {
  moocs12Weeks: 40, // Max for 12 weeks
  moocs8Weeks: 40,  // Max for 8 weeks (all MOOCS share a max of 40 current year)
  moocs4Weeks: 40,
  moocs2Weeks: 40,

  techFestOrganizer: 10,
  techFestParticipant: 6,

  ruralReporting: 10,
  treePlantation: 10,

  reliefFundCollection: 40,
  reliefWorkTeam: 40,

  participationInArts: 20,
  publication: 20,
  researchPublication: 30,
  innovativeProjects: 60,
  bloodDonation: 16,
  bloodDonationCampOrganization: 20,

  sportsPersonal: 20,
  sportsCollege: 10,
  sportsUniversity: 20,
  sportsDistrict: 24,
  sportsState: 30,
  sportsNationalInternational: 40,

  professionalSocietyActivities: 20,
  industryVisit: 20,
  communityService: 20,

  entrepreneurshipOrganize: 20,
  entrepreneurshipParticipate: 10,
  entrepreneurshipVideo: 20,
  entrepreneurshipBusinessPlan: 20,
  entrepreneurshipWorkForStartup: 40,
};