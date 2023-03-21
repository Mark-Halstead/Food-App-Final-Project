import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';
// Remember to import icons up here for each navlink when styling!

const navLinks = [
  {
    id: 1,
    text: 'Overview',
    path: '/',
  },
  {
    id: 2,
    text: 'Plan',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'Profile',
    path: 'add-job',
    icon: <ImProfile />,
  },
  {
    id: 4,
    text: 'Other links',
    path: 'profile',
    icon: <FaWpforms />,
  },
];

export default navLinks;
