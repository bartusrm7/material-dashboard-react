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
          <List component="div" disablePadding>
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
