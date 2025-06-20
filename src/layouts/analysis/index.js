import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import AnalysisTableData from "./data/analysisTableData";

export default function Analysis() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <Grid>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Wykres zmieniających się cen
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              <AnalysisTableData />
            </MDBox>
          </Card>
        </Grid>
      </MDBox>

      <MDBox>
        <Card></Card>
      </MDBox>
    </DashboardLayout>
  );
}
