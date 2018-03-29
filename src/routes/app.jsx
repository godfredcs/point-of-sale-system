import DashboardPage from "views/Dashboard/Dashboard.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import Sales from "views/Sales/Sales.jsx";
import Items from "views/Items/Items.jsx";
import Football from "views/Football/Football.jsx";
import Jackpot from "views/Jackpot/Jackpot.jsx";
import MobileMoney from "views/MobileMoney/MobileMoney.jsx";
import CreditTransfers from "views/CreditTransfers/CreditTransfers.jsx";

import {
    Dashboard, Person, LocalDrink, LibraryBooks, BubbleChart, Notifications, PhoneIphone
} from 'material-ui-icons';

const appRoutes = [
    { path: "/dashboard", sidebarName: "Dashboard", navbarName: "Dashboard", icon: Dashboard, component: DashboardPage },
    { path: "/items", sidebarName: "Items", navbarName: "Items", icon: LocalDrink, component: Items },
    { path: "/sales", sidebarName: "Sales", navbarName: "Sales", icon: LocalDrink, component: Sales },
    { path: "/football", sidebarName: "Football", navbarName: "Football", icon: LibraryBooks, component: Football },
    { path: "/jackpot", sidebarName: "Jackpot", navbarName: "Jackpot", icon: BubbleChart, component: Jackpot },
    { path: "/mobile_money", sidebarName: "Mobile money", navbarName: "Mobile money", icon: PhoneIphone, component: MobileMoney },
    { path: "/credit_transfers", sidebarName: "Credit Transfer", navbarName: "Credit Transfer", icon: Notifications, component: CreditTransfers },
    { path: "/user", sidebarName: "User Profile", navbarName: "Profile", icon: Person, component: UserProfile },
    { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export default appRoutes;
