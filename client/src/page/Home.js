import React from "react";
import { isAuthenticated } from "../apicall";
import Base from "../core/Base";

const Home = () => {
  return (
    <Base>
      {console.log(isAuthenticated())}
      <h1>test</h1>
    </Base>
  );
};

export default Home;
