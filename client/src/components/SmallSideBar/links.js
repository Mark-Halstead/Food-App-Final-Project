import {
    MdDashboard,
    MdSchedule,
    MdAccountCircle,
    MdBook,
    MdChat,
    MdCropFree,
    MdSmartToy,
} from "react-icons/md";

const links = [
    {
        id: 1,
        text: "Overview",
        path: "/dashboard",
        icon: MdDashboard,
    },
    {
        id: 2,
        text: "Find Nutritionist",
        path: "/dashboard/nutritionists",
        icon: MdSchedule,
    },
    {
        id: 3,
        text: "Profile",
        path: "/dashboard/profile",
        icon: MdAccountCircle,
    },
    {
        id: 4,
        text: "Diary",
        path: "/dashboard/diary",
        icon: MdBook,
    },
    {
        id: 5,
        text: "Chat",
        path: "/dashboard/chat",
        icon: MdChat,
    },
    {
        id: 7,
        text: "AI Nutrition",
        path: "/dashboard/gpt",
        icon: MdSmartToy,
    },
];

export default links;
