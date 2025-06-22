import { Card, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Vehicle from "./Vehicle";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesDataAPIThunk } from "store/features/vehiclesSlice";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { getVehiclesLocalizationByRegistrationAndDateThunk } from "store/features/vehiclesSlice";

export default function VehicleHistory() {
  const dispatch = useDispatch();
  const { vehiclesData, locationData, loading } = useSelector((state) => state.vehicles);
  const [toggleChoseCarLocation, setToggleChoseCarLocation] = useState(false);
  const [chosenDate, setChosenDate] = useState(new Date().toISOString().slice(0, 10));
  const [vehicleLocalization, setVehicleLocalization] = useState({
    startLocation: { lat: null, lng: null },
    endLocation: { lat: null, lng: null },
  });
  const [routePathData, setRoutePathData] = useState([]);
  const [vehicleHasLocationData, setVehicleHasLocationData] = useState(false);
  const [currentPositionSlider, setCurrentPositionSlider] = useState(0);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const handleSelectLocationByDate = async (registration, date) => {
    const startDate = `${date} 00:00:00`;
    const endDate = `${date} 23:59:59`;

    await dispatch(
      getVehiclesLocalizationByRegistrationAndDateThunk({
        registration,
        start_timestamp: startDate,
        end_timestamp: endDate,
      })
    );
    setToggleChoseCarLocation(true);
  };

  const handleFindRoute = async (startLocation, endLocation) => {
    if (!startLocation || !endLocation) return;
    const directionsService = new window.google.maps.DirectionsService();

    try {
      const result = await new Promise((resolve, reject) => {
        directionsService.route(
          {
            origin: startLocation,
            destination: endLocation,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
              resolve(result);
            } else {
              reject(status);
            }
          }
        );
      });
      const routePath = result.routes[0].overview_path.map((point) => ({
        lat: point.lat(),
        lng: point.lng(),
      }));
      setRoutePathData(routePath);
    } catch (error) {
      console.error("Error during getting route:", error);
    }
  };

  const handleChangePositionSlider = (e) => {
    setCurrentPositionSlider(e.target.value);
  };

  useEffect(() => {
    dispatch(getVehiclesDataAPIThunk());
  }, [dispatch]);

  useEffect(() => {
    if (
      locationData?.start_coordinates?.latitude &&
      locationData?.start_coordinates?.longitude &&
      locationData?.end_coordinates?.latitude &&
      locationData?.end_coordinates?.longitude
    ) {
      const startLocation = {
        lat: locationData?.start_coordinates.latitude,
        lng: locationData?.start_coordinates.longitude,
      };
      const endLocation = {
        lat: locationData?.end_coordinates.latitude,
        lng: locationData?.end_coordinates.longitude,
      };
      setVehicleLocalization({ startLocation, endLocation });
      handleFindRoute(startLocation, endLocation);
      setVehicleHasLocationData(true);
    } else {
      setVehicleHasLocationData(false);
    }
  }, [locationData]);

  useEffect(() => {
    setVehicleHasLocationData(false);
  }, [chosenDate]);

  if (loading) return;

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

              {toggleChoseCarLocation && isLoaded && vehicleHasLocationData ? (
                <>
                  <input
                    type="range"
                    min="0"
                    max={routePathData.length}
                    value={currentPositionSlider}
                    onChange={handleChangePositionSlider}
                    style={{ width: "100%" }}
                  />
                  <GoogleMap
                    center={routePathData[currentPositionSlider]}
                    zoom={15}
                    mapContainerStyle={{ width: "100%", height: "50vh", borderRadius: "8px" }}
                  >
                    <Marker position={routePathData[currentPositionSlider]} />
                    <Polyline
                      path={routePathData}
                      options={{
                        strokeColor: "#4285F4",
                        strokeOpacity: 1.0,
                        strokeWeight: 5,
                      }}
                      geodesic
                    />
                  </GoogleMap>
                </>
              ) : (
                <MDTypography>Brak danych dla wybranego dnia</MDTypography>
              )}
            </MDBox>
          </Card>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}
