import { Drawer } from "@mui/material";
import MDBox from "components/MDBox";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

export default function Analysis() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox>
        <DefaultLineChart
          chart={{
            labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
              {
                label: "Organic Search",
                color: "info",
                data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
              },
              {
                label: "Referral",
                color: "dark",
                data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
              },
              {
                label: "Direct",
                color: "primary",
                data: [40, 80, 70, 90, 30, 90, 140, 130, 200],
              },
            ],
          }}
        />
      </MDBox>
    </DashboardLayout>
  );
}
