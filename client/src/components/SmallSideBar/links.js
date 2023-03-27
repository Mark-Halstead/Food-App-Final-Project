import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
// Remember to import icons up here for each navlink when styling!

const links = [
    {
        id: 1,
        text: "Overview",
        path: "/dashboard",
    },
    {
        id: 2,
        text: "Plan",
        path: "/dashboard/plan",
    },
    {
        id: 3,
        text: "Profile",
        path: "/dashboard/profile",
    },
    {
        id: 4,
        text: "Diary",
        path: "/dashboard/diary",
    },
    {
        id: 4,
        text: "Chat",
        path: "/dashboard/chat",
    },
    {
        id: 5,
        text: "BarcodeScanner",
        path: "/dashboard/barcode",
    },
];

export default links;
