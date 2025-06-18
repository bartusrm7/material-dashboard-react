import { Icon } from "@mui/material";
import MDButton from "components/MDButton";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVehiclesDataAPIThunk } from "store/features/vehiclesSlice";

export default function VehicleTableData(onOpenMap) {
  const dispatch = useDispatch();
  const vehiclesData = useSelector((state) => state.vehicles.vehiclesData);

  useEffect(() => {
    dispatch(getVehiclesDataAPIThunk());
  }, [dispatch]);

  return {
    columns: [
      { Header: "marka", accessor: "marka", align: "left" },
      { Header: "model", accessor: "model", align: "left" },
      { Header: "rejestracja", accessor: "rejestracja", align: "left" },
      { Header: "rocznik", accessor: "rocznik", align: "left" },
      { Header: "gps", accessor: "gps", align: "center" },
    ],
    rows: [
      {
        marka: vehiclesData.manufacturer,
        model: vehiclesData.model,
        rejestracja: vehiclesData.registration,
        rocznik: vehiclesData.model_year,
        gps: (
          <MDButton color="light" onClick={() => onOpenMap(vehiclesData.registration)}>
            <Icon fontSize="medium">directions_car</Icon>
          </MDButton>
        ),
      },
    ],
  };
}
