import React from "react";
import {
  Grid,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Switch,
  IconButton
} from "@mui/material";
import sun from "../Images/Ellipse 483.png";
import cloud from "../Images/Group 2331.png";
import moon from "../Images/Ellipse 484.png";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NightlightIcon from '@mui/icons-material/Nightlight';

const RoutineCard = () => {
  return (
    <Box className="container shadow-sm p-3 bg-body rounded" sx={{ overflow: 'hidden', maxWidth: '100%' }}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item xs={6} sm={6}>
          <Typography variant="h6" className="routine-label">
            Morning Routine
          </Typography>
          <Card sx={{ backgroundColor: "#CFE4FF", display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent style={{ padding: "0", flex: 1 }}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <Typography gutterBottom variant="h6" component="div" style={{ color: "black" }}>
                    Weekdays <br /> 7:00 am
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="40"
                    image={sun}
                    alt="sun"
                    className="card_img"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <Switch />
                </Grid>
                <Grid
                  item
                  xs={4}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <IconButton>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6}>
          <Typography variant="h6" className="routine-label">
            Night Routine
          </Typography>
          <Card sx={{ backgroundColor: "#103C58", display: 'flex', flexDirection: 'column', height: '100%' }}>
            <CardContent style={{ padding: "0", flex: 1 }}>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <Typography gutterBottom variant="h6" component="div" style={{ color: "#FFFF" }}>
                    Everyday <br /> 9:00 am
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    height="40"
                    image={moon}
                    alt="moon"
                    className="card_img"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item xs={8}>
                  <Switch />
                </Grid>
                <Grid
                  item
                  xs={4}
                  justifyContent="flex-end"
                  alignItems="flex-end"
                >
                  <IconButton style={{ color: "#FFFF" }}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RoutineCard;
