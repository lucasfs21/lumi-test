import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export default function MainListItems({setCurrentPage}) {
  return (
    <React.Fragment>
      <ListItemButton onClick={() => {setCurrentPage("Dashboard")}}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={() => {setCurrentPage("Biblioteca de Faturas")}}>
        <ListItemIcon>
          <InsertDriveFileIcon />
        </ListItemIcon>
        <ListItemText primary="Biblioteca de Faturas" />
      </ListItemButton>
    </React.Fragment>
  );
}
