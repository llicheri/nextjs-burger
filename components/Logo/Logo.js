import React from "react";

import classes from "./Logo.module.css";

const Logo = props => {
  return (
    <div className={classes.Logo}>
      <img src="/burger-logo.png" alt="Burger logo" />
    </div>
  );
};

export default Logo;
