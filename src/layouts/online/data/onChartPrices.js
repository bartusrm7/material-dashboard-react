import VerticalBarChart from "examples/Charts/BarCharts/VerticalBarChart";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFuelPrices } from "store/features/onlineSlice";

export default function ONChartPrices() {
  const dispatch = useDispatch();
  const onPrices = useSelector((state) => state.online.fuelData);
  const loading = useSelector((state) => state.online.loading);

  useEffect(() => {
    dispatch(getFuelPrices());
  }, [dispatch]);

  if (loading) return null;

  const formatDate =
    onPrices.last15DaysONPrice?.slice(0, 5).map((onDate) => onDate.rcp_data.split(" ")[0]) || [];
  const formattedDate = formatDate.map((date) => date.split("-").reverse().join("."));
  const last5ONPrice = onPrices.last15DaysONPrice?.slice(0, 5).map((onDate) => onDate.rcp_cena_l);

  return (
    <>
      <VerticalBarChart
        icon={{ color: "info", component: "leaderboard" }}
        title="Wykres cen paliwa"
        description="Ostatnie 5 cen paliwa ON"
        chart={{
          labels: formattedDate?.reverse(),
          datasets: [
            {
              color: "dark",
              data: last5ONPrice?.reverse(),
            },
          ],
        }}
      />
    </>
  );
}
