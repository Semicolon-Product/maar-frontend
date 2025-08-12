'use client';
import React, { useState } from 'react';
import {
  Users,
  Building2,
  Layers,
  BookOpenCheck,
  GraduationCap,
  Activity,
  DollarSign,
  ClipboardList,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const navItems = [
  { name: 'SuperAdmins', icon: Users },
  { name: 'Institutes', icon: Building2 },
  { name: 'Departments', icon: Layers },
  { name: 'Teachers', icon: BookOpenCheck },
  { name: 'Students', icon: GraduationCap },
  { name: 'Student Activities', icon: Activity },
  { name: 'Payments', icon: DollarSign },
  { name: 'Payment Plans', icon: ClipboardList },
];

type SidebarProps = {
  onSelect: (selectedItem: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ onSelect }) => {
  const [active, setActive] = useState('SuperAdmins');
  const [collapsed, setCollapsed] = useState(false);

  const handleSelect = (name: string) => {
    setActive(name);
    onSelect(name); // pass to parent
  };

  return (
    <div className={`bg-gray-900 text-white h-[calc(100vh-4rem)] fixed top-16 left-0 z-40 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'} flex flex-col justify-between shadow-md`}>
      <ul className="space-y-1 px-2 mt-4">
        {navItems.map(({ name, icon: Icon }) => (
          <li
            key={name}
            onClick={() => handleSelect(name)}
            className={`group flex items-center gap-3 cursor-pointer px-4 py-2 rounded-lg transition-colors duration-300
              ${active === name ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}
            `}
          >
            <Icon size={20} className="transition-colors duration-300 group-hover:text-white" />
            {!collapsed && <span className="transition-colors duration-300">{name}</span>}
          </li>
        ))}
      </ul>

      <div className="p-3 border-t border-gray-800 flex justify-end">
        <button className="text-gray-400 hover:text-white" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

