import { Icon } from "@mui/material";
import MDButton from "components/MDButton";

export default function VehicleTableData() {
  return {
    columns: [
      { Header: "marka", accessor: "marka", align: "left" },
      { Header: "model", accessor: "model", align: "left" },
      { Header: "rejestracja", accessor: "rejestracja", align: "left" },
      { Header: "gps", accessor: "gps", align: "center" },
    ],
    rows: [
      {
        marka: "das",
        model: "das",
        rejestracja: "dsa",
        gps: (
          <MDButton color="light">
            <Icon fontSize="medium">directions_car</Icon>
          </MDButton>
        ),
      },
    ],
  };
}
