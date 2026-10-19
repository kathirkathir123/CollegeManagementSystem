import React from 'react';
import DashboardOutlined from '@mui/icons-material/DashboardOutlined';
import PeopleAltOutlined from '@mui/icons-material/PeopleAltOutlined';
import MenuBookOutlined from '@mui/icons-material/MenuBookOutlined';
import AssignmentTurnedInOutlined from '@mui/icons-material/AssignmentTurnedInOutlined';
import EventAvailableOutlined from '@mui/icons-material/EventAvailableOutlined';
import PaymentsOutlined from '@mui/icons-material/PaymentsOutlined';
import TuneOutlined from '@mui/icons-material/TuneOutlined';

export const mainNav = [
    { text: 'Dashboard', icon: <DashboardOutlined fontSize="small" />, path: '/' },
    { text: 'Students', icon: <PeopleAltOutlined fontSize="small" />, path: '/students' },
    { text: 'Courses', icon: <MenuBookOutlined fontSize="small" />, path: '/courses' },
    { text: 'Enrollments', icon: <AssignmentTurnedInOutlined fontSize="small" />, path: '/enrollments' },
    { text: 'Attendance', icon: <EventAvailableOutlined fontSize="small" />, path: '/attendance' },
    { text: 'Fees', icon: <PaymentsOutlined fontSize="small" />, path: '/fees' },
];

export const settingsNav = {
    text: 'Settings',
    icon: <TuneOutlined fontSize="small" />,
    path: '/settings',
};
