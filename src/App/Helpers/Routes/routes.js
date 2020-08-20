import { HomePage } from "../../Components/HomePage/HomePage";
import { DetailsPage } from "../../Components/DetailsPage/DetailsPage";
import { ProfilePage } from "../../Components/ProfilePage/ProfilePage";

const routes = [
  {
    key: 1,
    path: "/",
    exact: true,
    authed: false,
    component: HomePage,
    user: {},
  },
  {
    key: 2,
    path: "/home",
    authed: false,
    component: HomePage,
    user: {},
  },
  {
    key: 3,
    path: "/details/:id",
    authed: false,
    component: DetailsPage,
    user: {},
  },
  {
    key: 4,
    path: "/profile",
    authed: false,
    component: ProfilePage,
    user: {},
  },
];

export default routes;
