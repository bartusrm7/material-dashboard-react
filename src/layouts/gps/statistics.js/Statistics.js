import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesDataAPIThunk } from "store/features/vehiclesSlice";
import StatisticsTableData from "./StatisticsTableData";

export default function Statistics() {
  const dispatch = useDispatch();
  const vehiclesData = useSelector((state) => state.vehicles.vehiclesData);

  useEffect(() => {
    dispatch(getVehiclesDataAPIThunk());
  }, [dispatch]);

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
                Statystyki z najważniejszymi danymi wszystkich pojazdów
              </MDTypography>
            </MDBox>

            <MDBox pt={6} pb={6} pl={3} pr={3}>
              <StatisticsTableData />
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
