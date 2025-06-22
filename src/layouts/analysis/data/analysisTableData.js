import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFuelPrices } from "store/features/onlineSlice";

export default function AnalysisTableData() {
  const dispatch = useDispatch();
  const { fuelData, loading } = useSelector((state) => state.online);
  const [fuelLast15DaysData, setFuelLast15DaysData] = useState({
    dateLabels: [],
    onPrice: [],
    pb95Price: [],
    hvoPrice: [],
  });

  useEffect(() => {
    dispatch(getFuelPrices());
  }, [dispatch]);

  useEffect(() => {
    if (
      !fuelData ||
      !fuelData.last15DaysONPrice ||
      !fuelData.last15DaysPB95Price ||
      !fuelData.last15DaysHVOPrice
    )
      return;

    const dateLabels = fuelData.last15DaysONPrice
      .map((item) => item.rcp_data.split(" ")[0].split("-").reverse().join(".").split(".2025"))
      .reverse();
    const onPrice = fuelData.last15DaysONPrice.map((item) => item.rcp_cena_l).reverse();
    const pb95Price = fuelData.last15DaysPB95Price.map((item) => item.rcp_cena_l).reverse();
    const hvoPrice = fuelData.last15DaysHVOPrice.map((item) => item.rcp_cena_l).reverse();

    setFuelLast15DaysData({ dateLabels, onPrice, pb95Price, hvoPrice });
  }, [fuelData]);

  if (loading) return;

  return (
    <DefaultLineChart
      chart={{
        labels: fuelLast15DaysData.dateLabels,
        datasets: [
          {
            label: "ON",
            color: "info",
            data: fuelLast15DaysData.onPrice,
          },
          {
            label: "PB95",
            color: "dark",
            data: fuelLast15DaysData.pb95Price,
          },
          {
            label: "HVO",
            color: "primary",
            data: fuelLast15DaysData.hvoPrice,
          },
        ],
      }}
    />
  );
}
