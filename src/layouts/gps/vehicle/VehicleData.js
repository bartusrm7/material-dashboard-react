import { Card, CircularProgress, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import VehicleTableData from "./VehicleTableData";
import { useEffect, useState } from "react";
import { getVehiclesLocalizationByRegistrationThunk } from "store/features/vehiclesSlice";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";

export default function VehicleData() {
  const dispatch = useDispatch();
  const { locationData, isLoading } = useSelector((state) => state.vehicles);
  const [carMapToggle, setCarMapToggle] = useState(false);
  const [vehicleLocalization, setVehicleLocalization] = useState({ lat: null, lng: null });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleOpenCarMap = async (registration) => {
    await dispatch(getVehiclesLocalizationByRegistrationThunk(registration));
    setCarMapToggle(!carMapToggle);
  };
  const { columns, rows } = VehicleTableData(handleOpenCarMap);

  useEffect(() => {
    if (locationData.latitude && locationData.longitude) {
      setVehicleLocalization({ lat: locationData.latitude, lng: locationData.longitude });
    }
  }, [locationData]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {isLoading ? (
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
                  Tablica z dostępnymi pojazdami
                </MDTypography>
              </MDBox>
              <MDBox pt={3} pb={3} pl={3} pr={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
                {carMapToggle && isLoaded && (
                  <GoogleMap
                    center={vehicleLocalization}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "50vh", borderRadius: "8px" }}
                  >
                    <Marker position={vehicleLocalization} />
                  </GoogleMap>
                )}
              </MDBox>
            </Card>
          </Grid>
        </MDBox>
      )}
    </DashboardLayout>
  );
}
