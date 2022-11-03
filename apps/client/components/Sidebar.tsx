import React from 'react';
import { ChartBarIcon, HomeIcon, UsersIcon, FolderIcon, InboxIcon, CalendarIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
   {/* Current: "bg-gray-100 text-gray-900", Default: "text-gray-600 hover:bg-gray-50 hover:text-gray-900"  */}
  <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md" aria-current="page">
      {/* Current: "text-gray-500", Default: "text-gray-400 group-hover:text-gray-500" */}
    <HomeIcon  className="text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6 fill-none stroke-current" />
    <span className="truncate">Dashboard</span>
  </a>

  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
   <UsersIcon className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6 fill-none stroke-current" />
    <span className="truncate">Team</span>
  </a>

  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
    <FolderIcon className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6 fill-none stroke-current" />
    <span className="truncate">Projects</span>
  </a>

  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
    <CalendarIcon className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6 fill-none stroke-current" />
    <span className="truncate">Calendar</span>
  </a>

  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
    <InboxIcon className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6 fill-none stroke-current" />
    <span className="truncate">Documents</span>
  </a>

  <a href="#" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md">
    <ChartBarIcon  className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6 fill-none stroke-current" />
    <span className="truncate">Reports</span>
  </a>
</nav>

  )
}

export default Sidebar;