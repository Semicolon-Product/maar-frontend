import React from 'react';
import Navbar from '@/components/Administrator/Navbar';
import Sidebar from '@/components/Administrator/Sidebar'; // Adjust path as needed
import { useState } from 'react';
import SuperAdmin from './Tabs/SuperAdmin';
import Institutes from './Tabs/Institutes';
import Departments from './Tabs/Departments';
import Teachers from './Tabs/Teachers';
import Students from './Tabs/Students';
import StudentActivities from './Tabs/StudentActivities';
import PaymentPlans from './Tabs/PaymentPlans';
import Payments from './Tabs/Payments';
const Index = () => {
  const [selectedSection, setSelectedSection] = useState('SuperAdmins');
   const renderSection = () => {
    switch (selectedSection) {
      case 'SuperAdmins':
        return <SuperAdmin />;
      case 'Institutes':
        return <Institutes />;
      case 'Departments':
        return <Departments />;
      case 'Teachers':
        return <Teachers />;
      case 'Students':
        return <Students/>;
      case 'Student Activities':
        return <StudentActivities />;
      case 'Payments':
        return <Payments />;
      case 'Payment Plans':
        return <PaymentPlans />;
      default:
        return <div>Select a section</div>;
    }
  };
  return (
    
    <div className="min-h-screen bg-gray-100">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-16">
        <Navbar />
      </div>

      {/* Sidebar */}
      <Sidebar onSelect={setSelectedSection} />

      {/* Content Area */}
      <div className="pt-16 pl-64 transition-all duration-300">
        <div className="p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Index;
