import { CalendarClock, HandCoins, Home, NotebookText, UsersRound } from 'lucide-react';

export const listSuper = [
  { name: 'Home', url: '/', icon: <Home size={20} /> },
  { name: 'Data Karyawan', url: '/employees', icon: <UsersRound size={20} /> },
  {
    name: 'Presensi & Lembur',
    url: '/attendance',
    icon: <CalendarClock size={20} />,
  },
  {
    name: 'Tunjangan Potongan',
    url: '/tunjangan',
    icon: <NotebookText size={20} />,
  },
  { name: 'Girik', url: '/payroll', icon: <HandCoins size={20} /> },
];

export const baseClass = 'bg-main-grey text-white border-none flex gap-4 h-16';
