import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import classes from "./NavigationItem.module.css";

const NavigationItem = props => {
  return (
    <li className={classes.NavigationItem}>
      <Link href={props.link}>
        <a>{props.children}</a>
      </Link>
    </li>
  );
};

NavigationItem.propTypes = {
  link: PropTypes.string,
  exact: PropTypes.bool
};

export default NavigationItem;
