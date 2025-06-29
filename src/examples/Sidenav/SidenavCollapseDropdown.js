import { useState } from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import Icon from "@mui/material/Icon";
import SidenavCollapse from "./SidenavCollapse";
import MDBox from "components/MDBox";

function SidenavCollapseDropdown({ icon, name, children, active }) {
  const [open, setOpen] = useState(false);

  const handleToggle = () => setOpen((prev) => !prev);

  return (
    <>
      <SidenavCollapse
        icon={icon}
        name={name}
        active={active}
        onClick={handleToggle}
        sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <Icon>{open ? "expand_less" : "expand_more"}</Icon>
      </SidenavCollapse>

      <MDBox pl={3}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List
            component="div"
            disablePadding
            sx={{
              "& > a > div": {
                display: "flex",
                alignItems: "center",
                padding: "8px 16px",
                minHeight: "48px",
                justifyContent: "flex-start",
                fontSize: "1rem",
                backgroundColor: "transparent",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                },
              },
            }}
          >
            {children}
          </List>
        </Collapse>
      </MDBox>
    </>
  );
}

SidenavCollapseDropdown.propTypes = {
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  children: PropTypes.node,
  active: PropTypes.bool,
};

export default SidenavCollapseDropdown;
