import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesCuriousDataThunk } from "store/features/vehiclesSlice";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";

export default function StatisticsTableData() {
  const dispatch = useDispatch();
  const curiousData = useSelector((state) => state.vehicles.curiousData);
  const loading = useSelector((state) => state.vehicles.loading);

  useEffect(() => {
    dispatch(getVehiclesCuriousDataThunk());
  }, [dispatch]);

  if (loading) return;

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
                  data: [curiousData[0].odometer],
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
                  data: [curiousData[0].road_speed],
                },
              ],
            }}
          />
        </>
      )}
    </>
  );
}
