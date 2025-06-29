import { Card, CircularProgress, Tab, Tabs } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFuelPrices } from "store/features/onlineSlice";
import pricesTable from "./pricesTable";

export default function LastPricesTable() {
  const dispatch = useDispatch();
  const fuelPrices = useSelector((state) => state.online.fuelData);
  const loading = useSelector((state) => state.online.loading);
  const [activeTab, setActiveTab] = useState(null);
  const [fuelPricesHistory, setFuelPricesHistory] = useState([]);
  const { columns, rows } = pricesTable({
    priceProp: fuelPricesHistory.map((item) => item.price),
    dateProp: fuelPricesHistory.map((item) => item.date),
  });

  useEffect(() => {
    dispatch(getFuelPrices());
  }, [dispatch]);

  useEffect(() => {
    const handleChoseFuelPrices = () => {
      if (!fuelPrices.last15DaysONPrice) return;
      let fuelData = [];

      if (activeTab === "ON") {
        fuelData = fuelPrices.last15DaysONPrice.map((item) => ({
          date: item.rcp_data.split(" ")[0].split("-").reverse().join("."),
          price: item.rcp_cena_m + "zł",
        }));
      } else if (activeTab === "PB95") {
        fuelData = fuelPrices.last15DaysPB95Price.map((item) => ({
          date: item.rcp_data.split(" ")[0].split("-").reverse().join("."),
          price: item.rcp_cena_m + "zł",
        }));
      } else if (activeTab === "HVO") {
        fuelData = fuelPrices.last15DaysHVOPrice.map((item) => ({
          date: item.rcp_data.split(" ")[0].split("-").reverse().join("."),
          price: item.rcp_cena_m + "zł",
        }));
      }

      setFuelPricesHistory(fuelData);
    };

    handleChoseFuelPrices();
  }, [fuelPrices, activeTab]);

  const handleOpenTab = (event, newTabValue) => {
    setActiveTab(newTabValue);
  };

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
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
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
              Tabela z archiwalnymi cenami
            </MDTypography>
          </MDBox>

          <MDBox pt={6} pb={3} pl={2} pr={2}>
            <Tabs value={activeTab} onChange={handleOpenTab}>
              <Tab label="ON" value={"ON"} />
              <Tab label="PB95" value={"PB95"} />
              <Tab label="HVO" value={"HVO"} />
            </Tabs>
          </MDBox>

          {activeTab && (
            <DataTable
              table={{ columns, rows }}
              entriesPerPage={false}
              showTotalEntries={false}
              noEndBorder
            />
          )}
        </Card>
      </MDBox>
    </DashboardLayout>
  );
}
