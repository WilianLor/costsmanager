import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackRoutes from "./stack.routes";
import AuthRoutes from "./auth.routes";

import useAuth from "../hooks/useAuth";

const Routes = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <AuthRoutes /> : <StackRoutes />}
    </NavigationContainer>
  );
};

export default Routes;
