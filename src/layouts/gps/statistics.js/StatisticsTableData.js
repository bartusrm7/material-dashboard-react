import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesCuriousDataThunk } from "store/features/vehiclesSlice";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import MDBox from "components/MDBox";
import { CircularProgress } from "@mui/material";

export default function StatisticsTableData() {
  const dispatch = useDispatch();
  const curiousData = useSelector((state) => state.vehicles.curiousData);
  const loading = useSelector((state) => state.vehicles.loading);

  useEffect(() => {
    dispatch(getVehiclesCuriousDataThunk());
  }, [dispatch]);

  if (loading) {
    return (
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
    );
  }

  return (
    <>
      {curiousData[0] && (
        <>
          <HorizontalBarChart
            icon={{ color: "info", component: "leaderboard" }}
            title="Wykres statystyk pojazdów"
            description="Przebieg danego pojazdu w kilometrach"
            chart={{
              labels: [curiousData[0].registration],
              datasets: [
                {
                  color: "dark",
                  data: [Math.floor(curiousData[0].odometer / 1000)],
                },
              ],
            }}
          />
          <br />
          <br />
          <VerticalBarChart
            icon={{ color: "info", component: "leaderboard" }}
            title="Wykres statystyk pojazdów"
            description="Średnia prędkość pojazdów"
            chart={{
              labels: [curiousData[0].registration],
              datasets: [
                {
                  color: "dark",
                  data: [curiousData[0].speed],
                },
              ],
            }}
          />
        </>
      )}
    </>
  );
}
