import React from "react";
import { isAuthenticated } from "../apicall";
import BarcodePrint from "../components/BarcodePrint";
import Base from "../core/Base";

const Home = () => {
  return <Base>{console.log(isAuthenticated())}</Base>;
};

export default Home;
