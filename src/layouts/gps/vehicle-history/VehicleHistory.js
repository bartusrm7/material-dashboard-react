import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Vehicle from "./Vehicle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesDataAPIThunk } from "store/features/vehiclesSlice";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function VehicleHistory() {
  const dispatch = useDispatch();
  const vehiclesData = useSelector((state) => state.vehicles.vehiclesData);
  const locationData = useSelector((state) => state.vehicles.locationData);
  const [toggleChoseCarLocation, setToggleChoseCarLocation] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date().toISOString().slice(0, 10));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleSelectLocationByDate = () => {
    setToggleChoseCarLocation(!toggleChoseCarLocation);
  };

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
                Historia wszystkich pojazdów
              </MDTypography>
            </MDBox>

            <MDBox pt={3} pb={3} pl={3} pr={3}>
              <Vehicle
                manufacturer={vehiclesData.manufacturer}
                model={vehiclesData.model}
                registration={vehiclesData.registration}
                date={chosenDate}
                handleSelectDate={setChosenDate}
                showMap={handleSelectLocationByDate}
              />
              {toggleChoseCarLocation && isLoaded && (
                <GoogleMap
                  center={locationData}
                  zoom={15}
                  mapContainerStyle={{ width: "100%", height: "50vh", borderRadius: "8px" }}
                >
                  <Marker position={locationData} />
                </GoogleMap>
              )}
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
