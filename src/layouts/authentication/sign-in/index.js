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

import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "store/components/auth/authSlice";

function Basic() {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const errorMessage = useSelector((state) => state.auth.error);
  const [userData, setUserData] = useState({ userEmail: "", userPassword: "" });
  const navigate = useNavigate();

  const handleInputFormChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    await dispatch(userLogin(userData));
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/notowania/online", { replace: true });
    }
  }, [isLogged]);

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Zaloguj się
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Wpisz swój email oraz hasło
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                variant="standard"
                type="email"
                label="Email"
                fullWidth
                value={userData.userEmail}
                onChange={(e) => handleInputFormChange("userEmail", e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                variant="standard"
                type="password"
                label="Hasło"
                fullWidth
                value={userData.userPassword}
                onChange={(e) => handleInputFormChange("userPassword", e.target.value)}
              />
            </MDBox>
            <MDBox mt={4}>
              {errorMessage && (
                <MDTypography textAlign="center" color="error" fontSize="1rem" fontWeight="bold">
                  {errorMessage.error}
                </MDTypography>
              )}
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={handleUserLogin}>
                Zaloguj się
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Nie masz konta?{" "}
                <MDTypography
                  component={Link}
                  to="/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Zarejestuj się
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Basic;
