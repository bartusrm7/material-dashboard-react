import { Card, CircularProgress, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useSelector } from "react-redux";

export default function GPS() {
  const { loading } = useSelector((state) => state.vehicles);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {loading ? (
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </MDBox>
      ) : (
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
                  GPS
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </MDBox>
      )}
    </DashboardLayout>
  );
}
