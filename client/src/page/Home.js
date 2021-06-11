import React from "react";
import { isAuthenticated } from "../apicall";
import BillPrint from "../components/BillPrint";

import Base from "../core/Base";

const Home = () => {
  return (
    <Base>
      {console.log(isAuthenticated())}
      {/* <BillPrint /> */}
    </Base>
  );
};

export default Home;
