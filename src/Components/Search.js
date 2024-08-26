// src/Components/Search.js

import React from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import menu from "../Images/Buttons (1).png";

function SearchContainer({ setSearchTerm }) {
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Grid container spacing={0} className="p-3">
      <Grid item xs={10}>
        <TextField
          fullWidth
          placeholder="Search"
          className="border border-2 border-dark rounded-1"
          onChange={handleSearchChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Search"
                  style={{ backgroundColor: "#49B0AB" }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={2} style={{ alignSelf: "center" }}>
        <img src={menu} alt="Small Image" />
      </Grid>
    </Grid>
  );
}

export default SearchContainer;
