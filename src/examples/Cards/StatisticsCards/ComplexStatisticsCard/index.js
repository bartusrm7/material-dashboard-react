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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function ComplexStatisticsCard({ color, title, quotes, date, time }) {
  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" pt={1} px={2}>
        <MDBox
          variant="gradient"
          bgColor={color}
          color={color === "light" ? "dark" : "white"}
          coloredShadow={color}
          borderRadius="xl"
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="4rem"
          height="4rem"
          mt={-3}
        ></MDBox>
        <MDBox textAlign="right" lineHeight={1.25} display="flex" flexDirection="column">
          <MDTypography variant="button" fontWeight="bold" color="text">
            {title}
          </MDTypography>
          <MDTypography component="span" color="secondary">
            <span style={{ fontWeight: "bold" }}>Kurs: </span>
            {quotes}
          </MDTypography>
        </MDBox>
      </MDBox>
      <Divider />
      <MDBox pb={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography component="span" variant="button">
          Aktualizacja:
        </MDTypography>
        <MDBox display="flex" flexDirection="column" alignItems="end">
          <MDTypography component="span" variant="button">
            <span style={{ fontWeight: "bold" }}>Data: </span>
            {date}
          </MDTypography>
          <MDTypography component="span" variant="button">
            <span style={{ fontWeight: "bold" }}>Godzina: </span>
            {time}
          </MDTypography>
        </MDBox>
      </MDBox>
    </Card>
  );
}

// Setting default values for the props of ComplexStatisticsCard
ComplexStatisticsCard.defaultProps = {
  color: "info",
};

// Typechecking props for the ComplexStatisticsCard
ComplexStatisticsCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  quotes: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default ComplexStatisticsCard;
