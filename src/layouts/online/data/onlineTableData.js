/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFuelPrices } from "store/features/onlineSlice";

export default function data() {
  const dispatch = useDispatch();
  const fuelData = useSelector((state) => state.online.fuelData);

  useEffect(() => {
    dispatch(getFuelPrices());
  }, [dispatch]);

  return {
    columns: [
      { Header: "nazwa", accessor: "nazwa", align: "left" },
      { Header: "symbol", accessor: "symbol", align: "left" },
      { Header: "cena", accessor: "cena", align: "left" },
      { Header: "data", accessor: "data", align: "left" },
    ],

    rows: [
      {
        nazwa: "Benzyna",
        symbol: "PB95",
        cena: fuelData.pb95Price,
        data: fuelData.date,
      },
      {
        nazwa: "Diesel",
        symbol: "ON",
        cena: fuelData.dieselPrice,
        data: fuelData.date,
      },
      {
        nazwa: "Biopaliwo",
        symbol: "HVO",
        cena: fuelData.hvoPrice,
        data: fuelData.date,
      },
    ],
  };
}
