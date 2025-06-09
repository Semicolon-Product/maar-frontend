import type { YearlyActivityList } from "../types/superadminType";

export const teachers = [
  { name: "Dr. Rajeev", department: "CSE", userId: "T001", password: "pass123" },
  { name: "Ms. Ananya", department: "ECE", userId: "T002", password: "123456" },
  { name: "Mr. Suresh", department: "ME", userId: "T003", password: "mech2024" },
  { name: "Dr. Meena", department: "CSE", userId: "T004", password: "meenaCSE" },
  { name: "Mr. Arjun", department: "EEE", userId: "T005", password: "arjuneee" },
  { name: "Ms. Kavya", department: "IT", userId: "T006", password: "kavya789" },
  { name: "Dr. Nikhil", department: "CIVIL", userId: "T007", password: "civilnik" },
  { name: "Ms. Priya", department: "CSE", userId: "T008", password: "priya456" },
  { name: "Mr. Manoj", department: "ECE", userId: "T009", password: "ecemanoj" },
  { name: "Dr. Rekha", department: "ME", userId: "T010", password: "rekhaME" },
  { name: "Ms. Shruti", department: "IT", userId: "T011", password: "shru321" },
  { name: "Mr. Vikas", department: "EEE", userId: "T012", password: "vikasEEE" },
  { name: "Dr. Farhan", department: "CSE", userId: "T013", password: "farhan@123" },
  { name: "Ms. Aisha", department: "ECE", userId: "T014", password: "aisha234" },
  { name: "Mr. Rohan", department: "CIVIL", userId: "T015", password: "rohan2025" },
  { name: "Dr. Neha", department: "CSE", userId: "T016", password: "nehaCSE!" },
  { name: "Mr. Karthik", department: "ME", userId: "T017", password: "karthik@me" },
  { name: "Ms. Sneha", department: "EEE", userId: "T018", password: "sneha_eee" },
  { name: "Dr. Ajay", department: "IT", userId: "T019", password: "ajayITpass" },
  { name: "Ms. Bhavana", department: "ECE", userId: "T020", password: "bhav234" },
  { name: "Mr. Harish", department: "CIVIL", userId: "T021", password: "harishCVL" },
  { name: "Dr. Shalini", department: "CSE", userId: "T022", password: "shalini@cse" },
  { name: "Ms. Tanya", department: "IT", userId: "T023", password: "tanyaIT123" },
  { name: "Mr. Dinesh", department: "ME", userId: "T024", password: "dinesh456" },
  { name: "Dr. Swathi", department: "ECE", userId: "T025", password: "swathieee" }
];

export const students = [
  {
    name: "Amit Kumar", rollNo: "23CS001", points: 85, verified: false, activities: [
      {
        serialNo: 1,
        name: "Python Workshop",
        date: "2025-01-15",
        points: 10,
        docs: "python_workshop_cert.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
        
        
      },
      {
        serialNo: 2,
        name: "AI Bootcamp",
        date: "2025-02-10",
        points: 15,
        docs: "ai_bootcamp_proof.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 3,
        name: "National Hackathon",
        date: "2025-03-05",
        points: 20,
        docs: "hackathon_certificate.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 4,
        name: "Online Course (NPTEL - DBMS)",
        date: "2025-03-25",
        points: 10,
        docs: "nptel_dbms_cert.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 5,
        name: "IEEE Paper Presentation",
        date: "2025-04-08",
        points: 25,
        docs: "ieee_paper.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 6,
        name: "Soft Skills Training",
        date: "2025-05-01",
        points: 5,
        docs: "soft_skills.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      }
    ]
  },
  {
    name: "Sara Mehta", rollNo: "23CS002", points: 90, verified: false, activities:
      [
        {
          serialNo: 1,
          name: "Web Development Seminar",
          date: "2025-01-20",
          points: 12,
          docs: "web_dev_seminar.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
          status: false
        },
        {
          serialNo: 2,
          name: "Cloud Computing Workshop",
          date: "2025-02-12",
          points: 18,
          docs: "cloud_computing_workshop.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
          status: false
        },
        {
          serialNo: 3,
          name: "Cybersecurity Training",
          date: "2025-03-07",
          points: 20,
          docs: "cybersecurity_training.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
          status: false
        },
        {
          serialNo: 4,
          name: "Machine Learning Webinar",
          date: "2025-03-28",
          points: 10,
          docs: "ml_webinar_cert.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
          status: false
        },
        {
          serialNo: 5,
          name: "Startup Ideation Challenge",
          date: "2025-04-12",
          points: 22,
          docs: "startup_challenge.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
          status: false
        },
        {
          serialNo: 6,
          name: "Advanced Excel Certification",
          date: "2025-05-03",
          points: 8,
          docs: "excel_cert.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
          status: false
        }
      ]

  },
  {
    name: "Ravi Sharma", rollNo: "23CS003", points: 76, verified: false, activities: [
      {
        serialNo: 1,
        name: "Python Workshop",
        date: "2025-01-15",
        points: 10,
        docs: "python_workshop_cert.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=", status: false
      },
      {
        serialNo: 2,
        name: "AI Bootcamp",
        date: "2025-02-10",
        points: 15,
        docs: "ai_bootcamp_proof.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 3,
        name: "National Hackathon",
        date: "2025-03-05",
        points: 20,
        docs: "hackathon_certificate.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 4,
        name: "Online Course (NPTEL - DBMS)",
        date: "2025-03-25",
        points: 10,
        docs: "nptel_dbms_cert.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 5,
        name: "IEEE Paper Presentation",
        date: "2025-04-08",
        points: 25,
        docs: "ieee_paper.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 6,
        name: "Soft Skills Training",
        date: "2025-05-01",
        points: 5,
        docs: "soft_skills.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      }
    ]
  },
  {
    name: "Priya Verma", rollNo: "23CS004", points: 92, verified: false, activities: [
      {
        serialNo: 1,
        name: "Python Workshop",
        date: "2025-01-15",
        points: 10,
        docs: "python_workshop_cert.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=", status: false
      },
      {
        serialNo: 2,
        name: "AI Bootcamp",
        date: "2025-02-10",
        points: 15,
        docs: "ai_bootcamp_proof.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 3,
        name: "National Hackathon",
        date: "2025-03-05",
        points: 20,
        docs: "hackathon_certificate.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 4,
        name: "Online Course (NPTEL - DBMS)",
        date: "2025-03-25",
        points: 10,
        docs: "nptel_dbms_cert.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 5,
        name: "IEEE Paper Presentation",
        date: "2025-04-08",
        points: 25,
        docs: "ieee_paper.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      },
      {
        serialNo: 6,
        name: "Soft Skills Training",
        date: "2025-05-01",
        points: 5,
        docs: "soft_skills.pdf",link:"https://media.istockphoto.com/id/943910534/photo/human-crowd-forming-an-arrow-shape-map-finance-concept.jpg?s=2048x2048&w=is&k=20&c=Tk6S2jeovqVbITf3miDtSIrRgS93PBr0NeJgkRwigyo=",
      }
    ]
  },

  { name: "Tarun Arora", rollNo: "23CS017", points: 79, verified: false },
  { name: "Megha Nair", rollNo: "23CS018", points: 82, verified: false },
  { name: "Abhishek Rana", rollNo: "23CS019", points: 70, verified: false },
  { name: "Ritika Bansal", rollNo: "23CS020", points: 95, verified: false },
  { name: "Nikhil Dubey", rollNo: "23CS021", points: 89, verified: false },
  { name: "Isha Rawat", rollNo: "23CS022", points: 77, verified: false },
  { name: "Sandeep Goyal", rollNo: "23CS023", points: 73, verified: false },
  { name: "Anjali Sharma", rollNo: "23CS024", points: 66, verified: false },
  { name: "Deepak Negi", rollNo: "23CS025", points: 84, verified: false },
  { name: "Payal Taneja", rollNo: "23CS026", points: 71, verified: false },
  { name: "Rahul Chauhan", rollNo: "23CS027", points: 64, verified: false },
  { name: "Kritika Saxena", rollNo: "23CS028", points: 96, verified: false },
  { name: "Arun Kumar", rollNo: "23CS029", points: 63, verified: false },
  { name: "Monika Thakur", rollNo: "23CS030", points: 82, verified: false },
  { name: "Aditya Singh", rollNo: "23CS031", points: 88, verified: false },
  { name: "Simran Kaur", rollNo: "23CS032", points: 67, verified: false },
  { name: "Jatin Grover", rollNo: "23CS033", points: 90, verified: false },
  { name: "Lavanya Pillai", rollNo: "23CS034", points: 85, verified: false },
  { name: "Dev Sharma", rollNo: "23CS035", points: 78, verified: false },
  { name: "Rani Das", rollNo: "23CS036", points: 60, verified: false },
  { name: "Nitin Kapoor", rollNo: "23CS037", points: 62, verified: false },
  { name: "Geeta Soni", rollNo: "23CS038", points: 87, verified: false },
  { name: "Rajeev Singh", rollNo: "23CS039", points: 74, verified: false },
  { name: "Aishwarya Jain", rollNo: "23CS040", points: 93, verified: false },
  { name: "Harshit Bansal", rollNo: "23CS041", points: 89, verified: false },
  { name: "Meena Kumari", rollNo: "23CS042", points: 76, verified: false },
  { name: "Sourav Joshi", rollNo: "23CS043", points: 91, verified: false },
  { name: "Bhavna Yadav", rollNo: "23CS044", points: 66, verified: false },
  { name: "Akshay Rana", rollNo: "23CS045", points: 82, verified: false },
  { name: "Namrata Paul", rollNo: "23CS046", points: 80, verified: false },
  { name: "Sahil Bhardwaj", rollNo: "23CS047", points: 75, verified: false },
  { name: "Reena Sahu", rollNo: "23CS048", points: 92, verified: false },
  { name: "Yogesh Chhabra", rollNo: "23CS049", points: 69, verified: false },
  { name: "Tanvi Rawat", rollNo: "23CS050", points: 70, verified: false },
  { name: "Anurag Tyagi", rollNo: "23CS051", points: 61, verified: false },
  { name: "Pritam Paul", rollNo: "23CS052", points: 64, verified: false },
  { name: "Deeksha Sinha", rollNo: "23CS053", points: 77, verified: false },
  { name: "Raghav Malhotra", rollNo: "23CS054", points: 83, verified: false },
  { name: "Ishita Kapoor", rollNo: "23CS055", points: 81, verified: false },
  { name: "Vipul Saxena", rollNo: "23CS056", points: 86, verified: false },
  { name: "Naina Singh", rollNo: "23CS057", points: 72, verified: false },
  { name: "Manoj Khanna", rollNo: "23CS058", points: 90, verified: false },
  { name: "Asmita Ghosh", rollNo: "23CS059", points: 88, verified: false },
  { name: "Ramesh Verma", rollNo: "23CS060", points: 68, verified: false },
];


export const activity=[
  {
    "max": "40",
    "moocs12Weeks": { "points": 20, "alreadyAcquired": 0 },
    "moocs8Weeks": { "points": 15, "alreadyAcquired": 0 },
    "moocs4Weeks": { "points": 10, "alreadyAcquired": 0 },
    "moocs2Weeks": { "points": 5, "alreadyAcquired": 0 }
  },
  {
    "max": "10",
    "techFestOrganizer": { "points": 5, "alreadyAcquired": 0 }
  },
  {
    "max": "6",
    "techFestParticipant": { "points": 3, "alreadyAcquired": 0 }
  },
  {
    "max": "10",
    "ruralReporting": { "points": 5, "alreadyAcquired": 0 }
  },
  {
    "max": "10",
    "treePlantation": { "points": 1, "alreadyAcquired": 0 }
  },
  {
    "max": "40",
    "reliefFundCollection": { "points": 5, "alreadyAcquired": 0 },
    "reliefWorkTeam": { "points": 20, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "participationInArts": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "publication": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "30",
    "researchPublication": { "points": 15, "alreadyAcquired": 0 }
  },
  {
    "max": "60",
    "innovativeProjects": { "points": 30, "alreadyAcquired": 0 }
  },
  {
    "max": "16",
    "bloodDonation": { "points": 8, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "bloodDonationCampOrganization": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "sportsPersonal": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "10",
    "sportsCollege": { "points": 5, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "sportsUniversity": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "24",
    "sportsDistrict": { "points": 12, "alreadyAcquired": 0 }
  },
  {
    "max": "30",
    "sportsState": { "points": 15, "alreadyAcquired": 0 }
  },
  {
    "max": "40",
    "sportsNationalInternational": { "points": 20, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "professionalSocietyActivities": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "industryVisit": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "communityService": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "entrepreneurshipOrganize": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "10",
    "entrepreneurshipParticipate": { "points": 5, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "entrepreneurshipVideo": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "20",
    "entrepreneurshipBusinessPlan": { "points": 10, "alreadyAcquired": 0 }
  },
  {
    "max": "40",
    "entrepreneurshipWorkForStartup": { "points": 20, "alreadyAcquired": 0 }
  }
]


export const firstYear =
 [
  {
    name: "MOOCS",
    max: 40,
    remain: 40,
    already_acquired: 0,
    subpoints: [
      { name: "10 weeks", point_per_activity: 20 },
      { name: "8 weeks", point_per_activity: 15 },
      { name: "4 weeks", point_per_activity: 10 },
      { name: "2 weeks", point_per_activity: 5 }
    ]
  },
  {
    name: "Tech Fest",
    subpoints: [
      {
        name: "Organizer",
        point_per_activity: 5,
        max: 10,
        remain: 10,
        already_acquired: 0
      },
      {
        name: "Participant",
        point_per_activity: 3,
        max: 6,
        remain: 6,
        already_acquired: 0
      }
    ]
  },
  {
    name: "Rural Reporting",
    point_per_activity: 5,
    max: 10,
    remain: 10,
    already_acquired: 0
  },
  {
    name: "Tree Plantation",
    point_per_activity: 1,
    max: 10,
    remain: 10,
    already_acquired: 0
  },
  {
    name: "Relief & Charitable Activities",
    max: 40,
    remain: 40,
    already_acquired: 0,
    subpoints: [
      {
        name: "Collection of Fund",
        point_per_activity: 5
      },
      {
        name: "Relief Work Team",
        point_per_activity: 20
      }
    ]
  },
  {
    name: "Participation in Debate",
    point_per_activity: 10,
    max: 20,
    remain: 20,
    already_acquired: 0
  },
  {
    name: "Publication",
    point_per_activity: 10,
    max: 20,
    remain: 20,
    already_acquired: 0
  },
  {
    name: "Research Publication",
    point_per_activity: 15,
    max: 30,
    remain: 30,
    already_acquired: 0
  },
  {
    name: "Innovation Project",
    point_per_activity: 30,
    max: 60,
    remain: 60,
    already_acquired: 0
  },
  {
    name: "Blood Donation",
    subpoints: [
      {
        name: "Donate Blood",
        point_per_activity: 8,
        max: 16,
        remain: 16,
        already_acquired: 0
      },
      {
        name: "Organize Blood Donation Camp",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      }
    ]
  },
  {
    name: "Sports",
    subpoints: [
      {
        name: "Personal",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "College",
        point_per_activity: 5,
        max: 10,
        remain: 10,
        already_acquired: 0
      },
      {
        name: "University",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "District",
        point_per_activity: 12,
        max: 24,
        remain: 24,
        already_acquired: 0
      },
      {
        name: "Other",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "National",
        point_per_activity: 20,
        max: 40,
        remain: 40,
        already_acquired: 0
      }
    ]
  },
  {
    name: "Activities in a Professional Society/Student Chapter",
    point_per_activity: 10,
    max: 20,
    remain: 20,
    already_acquired: 0
  },
  {
    name: "Relevant Industry Visit & Report",
    point_per_activity: 10,
    max: 20,
    remain: 20,
    already_acquired: 0
  },
  {
    name: "Community Service & Allied Activities",
    point_per_activity: 10,
    max: 20,
    remain: 20,
    already_acquired: 0
  },
  {
    name: "Self-Entrepreneurship",
    subpoints: [
      {
        name: "Organise Entrepreneurship Programmes",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "Take Part in Entrepreneurship",
        point_per_activity: 5,
        max: 10,
        remain: 10,
        already_acquired: 0
      },
      {
        name: "Film Making",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "Submit Business Plan",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "Work for Start-up",
        point_per_activity: 20,
        max: 40,
        remain: 40,
        already_acquired: 0
      }
    ]
  }
];

export const secondYear = 
 [
  {
    name: "MOOCS",
    max: 40,
    remain: 25,
    already_acquired: 15,
    subpoints: [
      { name: "10 weeks", point_per_activity: 20 },
      { name: "8 weeks", point_per_activity: 15 },
      { name: "4 weeks", point_per_activity: 10 },
      { name: "2 weeks", point_per_activity: 5 }
    ]
  },
  {
    name: "Tech Fest",
    subpoints: [
      {
        name: "Organizer",
        point_per_activity: 5,
        max: 10,
        remain: 5,
        already_acquired: 5
      },
      {
        name: "Participant",
        point_per_activity: 3,
        max: 6,
        remain: 3,
        already_acquired: 3
      }
    ]
  },
  {
    name: "Rural Reporting",
    point_per_activity: 5,
    max: 10,
    remain: 5,
    already_acquired: 5
  },
  {
    name: "Tree Plantation",
    point_per_activity: 1,
    max: 10,
    remain: 7,
    already_acquired: 3
  },
  {
    name: "Relief & Charitable Activities",
    max: 40,
    remain: 30,
    already_acquired: 10,
    subpoints: [
      {
        name: "Collection of Fund",
        point_per_activity: 5
      },
      {
        name: "Relief Work Team",
        point_per_activity: 20
      }
    ]
  },
  {
    name: "Participation in Debate",
    point_per_activity: 10,
    max: 20,
    remain: 10,
    already_acquired: 10
  },
  {
    name: "Publication",
    point_per_activity: 10,
    max: 20,
    remain: 10,
    already_acquired: 10
  },
  {
    name: "Research Publication",
    point_per_activity: 15,
    max: 30,
    remain: 15,
    already_acquired: 15
  },
  {
    name: "Innovation Project",
    point_per_activity: 30,
    max: 60,
    remain: 30,
    already_acquired: 30
  },
  {
    name: "Blood Donation",
    subpoints: [
      {
        name: "Donate Blood",
        point_per_activity: 8,
        max: 16,
        remain: 8,
        already_acquired: 8
      },
      {
        name: "Organize Blood Donation Camp",
        point_per_activity: 10,
        max: 20,
        remain: 10,
        already_acquired: 10
      }
    ]
  },
  {
    name: "Sports",
    subpoints: [
      {
        name: "Personal",
        point_per_activity: 10,
        max: 20,
        remain: 10,
        already_acquired: 10
      },
      {
        name: "College",
        point_per_activity: 5,
        max: 10,
        remain: 5,
        already_acquired: 5
      },
      {
        name: "University",
        point_per_activity: 10,
        max: 20,
        remain: 10,
        already_acquired: 10
      },
      {
        name: "District",
        point_per_activity: 12,
        max: 24,
        remain: 12,
        already_acquired: 12
      },
      {
        name: "Other",
        point_per_activity: 15,
        max: 30,
        remain: 15,
        already_acquired: 15
      },
      {
        name: "National",
        point_per_activity: 20,
        max: 40,
        remain: 20,
        already_acquired: 20
      }
    ]
  },
  {
    name: "Activities in a Professional Society/Student Chapter",
    point_per_activity: 10,
    max: 20,
    remain: 20,
    already_acquired: 0
  },
  {
    name: "Relevant Industry Visit & Report",
    point_per_activity: 10,
    max: 20,
    remain: 20,
    already_acquired: 0
  },
  {
    name: "Community Service & Allied Activities",
    point_per_activity: 10,
    max: 20,
    remain: 20,
    already_acquired: 0
  },
  {
    name: "Self-Entrepreneurship",
    subpoints: [
      {
        name: "Organise Entrepreneurship Programmes",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "Take Part in Entrepreneurship",
        point_per_activity: 5,
        max: 10,
        remain: 10,
        already_acquired: 0
      },
      {
        name: "Film Making",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "Submit Business Plan",
        point_per_activity: 10,
        max: 20,
        remain: 20,
        already_acquired: 0
      },
      {
        name: "Work for Start-up",
        point_per_activity: 20,
        max: 40,
        remain: 40,
        already_acquired: 0
      }
    ]
  }
];