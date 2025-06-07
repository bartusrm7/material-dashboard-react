import { Card } from "@mui/material";
import CoverLayout from "../components/CoverLayout";
import MDBox from "components/MDBox";

import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

export default function PostRegistration() {
  const navigate = useNavigate();
  const handleNavigate = () => navigate("/sign-in");

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox>
          <MDTypography>
            Zarejestrowałeś się poprawnie, kliknij w przycisk i zaloguj się
          </MDTypography>
        </MDBox>
        <MDBox>
          <MDButton onClick={handleNavigate}>Sign In</MDButton>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}
