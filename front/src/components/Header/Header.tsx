import React, { useEffect, useState } from "react";

import "./header.scss";

import StaycationLogo from "./StaycationLogo";
import { getUser } from "../../api/users";
import { User } from "../../types/users";

const Header = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(1)
      .then((user) => setUser(user))
      .catch((e) => console.warn("Error: ", e));
  }, []);

  return (
    <div className="header">
      <StaycationLogo />
      {user && <div className="header__user">Welcome, {user.firstName}!</div>}
    </div>
  );
};

export default Header;
