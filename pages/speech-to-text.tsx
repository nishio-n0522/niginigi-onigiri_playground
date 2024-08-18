import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

function SpeechToText() {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ width: "100vw" }}
    >
      <Typography
        variant="h5"
        color={grey[400]}
        fontFamily="__Concert_One_252401"
      >
        Speech to text
      </Typography>
    </Stack>
  );
}
export default SpeechToText;
