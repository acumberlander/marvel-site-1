import { HomePage } from "./../../Components/HomePage/HomePage";
import { DetailsPage } from "./../../Components/DetailsPage/DetailsPage";
import { ProfilePage } from "./../../Components/ProfilePage/ProfilePage";

const routes = [
  {
    path: "/",
    exact: true,
    authed: false,
    component: HomePage,
    user: {},
  },
  {
    path: "/home",
    authed: false,
    component: HomePage,
    user: {},
  },
  {
    path: "/details/:id",
    authed: false,
    component: DetailsPage,
    user: {},
  },
  {
    path: "/profile",
    authed: false,
    component: ProfilePage,
    user: {},
  },
];

export default routes;
