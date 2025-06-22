import { Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

function Vehicle({ manufacturer, model, registration, date, handleSelectDate, showMap }) {
  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
    >
      <MDBox lineHeight={1.125}>
        <MDTypography variant="button" fontWeight="medium" fontSize="medium">
          {manufacturer}{" "}
        </MDTypography>
        <MDTypography variant="button" fontWeight="medium" fontSize="medium">
          {model}{" "}
        </MDTypography>
        <MDTypography variant="button" fontWeight="regular" color="text">
          {registration}
        </MDTypography>
      </MDBox>

      <MDBox
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        lineHeight={1}
        ml={3}
        sx={{ cursor: "pointer" }}
      >
        <MDInput type="date" value={date} onChange={(e) => handleSelectDate(e.target.value)} />
        <MDButton color="light" onClick={() => showMap(registration, date)}>
          <Icon fontSize="medium">directions_car</Icon>
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

Vehicle.propTypes = {
  manufacturer: PropTypes.string,
  model: PropTypes.string,
  registration: PropTypes.string,
  date: PropTypes.string,
  handleSelectDate: PropTypes.func,
  showMap: PropTypes.func,
};

export default Vehicle;
