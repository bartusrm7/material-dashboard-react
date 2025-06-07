/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Quotes from "layouts/quotes";
import Online from "layouts/quotes/components/Online";
import Analysis from "layouts/analysis";
import GPS from "layouts/gps";

import SignIn from "layouts/authentication/sign-in/index";
import SignUp from "layouts/authentication/sign-up/index";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Notowania",
    key: "quotes",
    icon: <Icon fontSize="medium">price_change</Icon>,
    route: "/quotes",
    component: <Quotes />,
    // collapse: [
    //   {
    //     type: "collapse",
    //     name: "Online",
    //     key: "online",
    //     icon: <Icon fontSize="medium">price_change</Icon>,
    //     route: "/quotes/online",
    //     component: <Online />,
    //   },
    //   {
    //     name: "History data",
    //     key: "History data",
    //     icon: <Icon fontSize="medium">price_change</Icon>,
    //     route: "/history-data",
    //     component: <HistoryData />,
    //   },
    // ],
  },
  {
    type: "collapse",
    name: "Analizy",
    key: "analysis",
    icon: <Icon fontSize="medium">equalizer</Icon>,
    route: "/analysis",
    component: <Analysis />,
  },
  {
    type: "collapse",
    name: "GPS",
    key: "gps",
    icon: <Icon fontSize="medium">location_on</Icon>,
    route: "/gps",
    component: <GPS />,
  },
  {
    name: "Sign In",
    key: "sign-in",
    route: "/sign-in",
    component: <SignIn />,
  },
  {
    name: "Sign Up",
    key: "sign-up",
    route: "/sign-up",
    component: <SignUp />,
  },
];

export default routes;
