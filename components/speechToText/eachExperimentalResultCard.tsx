import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";

import { Schema } from "@/amplify/data/resource";
import {
  AudioFile,
  CheckCircle,
  Delete,
  Download,
  Loop,
  Pending,
  ReadMore,
  Science,
} from "@mui/icons-material";
import { Box, Chip, Stack } from "@mui/material";

interface EachExperimentalDataCardProps {
  eachExperimentData: Schema["ExperimentalData"]["type"];
}

export default function EachExperimentalDataCard({
  eachExperimentData,
}: EachExperimentalDataCardProps) {
  return (
    <Card sx={{ width: "100%", bgcolor: grey[100] }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: grey[800] }}>
            <Science />
          </Avatar>
        }
        title={eachExperimentData.experimentName}
        subheader={eachExperimentData.audioFileName}
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent sx={{ ml: 1, py: 0 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "middle", mb: 0.5 }}
        >
          {"Order: "}
          {eachExperimentData.experimentOrderDate}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "middle", mb: 0.5 }}
        >
          {"Completed: "}
          {eachExperimentData.experimentCompletedDate}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <ReadMore />
        </IconButton>
        <IconButton aria-label="share">
          <Download />
        </IconButton>
        <IconButton aria-label="delete">
          <Delete />
        </IconButton>
        <Chip
          label={eachExperimentData.status}
          variant="outlined"
          icon={
            eachExperimentData.status === "Pending" ? (
              <Pending />
            ) : eachExperimentData.status === "Processing" ? (
              <Loop />
            ) : (
              <CheckCircle />
            )
          }
          color={
            eachExperimentData.status === "Pending"
              ? "primary"
              : eachExperimentData.status === "Processing"
              ? "info"
              : "success"
          }
          size="small"
          sx={{ ml: "auto" }}
        />
      </CardActions>
    </Card>
  );
}
