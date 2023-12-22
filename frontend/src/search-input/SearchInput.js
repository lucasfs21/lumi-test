import * as React from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

export default function SearchInput({ onSearch }) {
  const [searchQuery, setSearchQuery] = React.useState("");

  return (
    <Grid item xs={12} md={12} lg={12}>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          height: 80,
        }}
      >
        <div>
          <TextField
            id="search-bar"
            className="text"
            onInput={(e) => {
              setSearchQuery(e.target.value);
            }}
            label="Nº do cliente"
            variant="outlined"
            size="small"
          />
          <IconButton
            onClick={() => {
              onSearch(searchQuery);
            }}
            aria-label="search"
          >
            <SearchIcon style={{ fill: "#0088FE" }} />
          </IconButton>
        </div>
      </Paper>
    </Grid>
  );
}
