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

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

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

//
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "store/components/auth/registerSlice";

function Cover() {
  const dispatch = useDispatch();
  const isRegistered = useSelector((state) => state.register.isRegistered);
  const errorMessage = useSelector((state) => state.register.error);
  const [userData, setUserData] = useState({ userName: "", userEmail: "", userPassword: "" });

  const navigate = useNavigate();

  const handleInputFormChange = (key, value) => {
    setUserData((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    await dispatch(userRegister(userData));
  };

  useEffect(() => {
    if (isRegistered) {
      navigate("/post-register");
    }
  }, [isRegistered, navigate]);

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Dołącz do nas dzisiaj
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Wpisz swoje imie, email oraz hasło
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Imie"
                variant="standard"
                value={userData.userName}
                onChange={(e) => handleInputFormChange("userName", e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                variant="standard"
                value={userData.userEmail}
                onChange={(e) => handleInputFormChange("userEmail", e.target.value)}
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Hasło"
                variant="standard"
                value={userData.userPassword}
                onChange={(e) => handleInputFormChange("userPassword", e.target.value)}
                fullWidth
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
              <MDButton onClick={handleUserRegistration} variant="gradient" color="info" fullWidth>
                Zarejestuj się
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Masz już konto?{" "}
                <MDTypography
                  component={Link}
                  to="/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Zaloguj się
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
