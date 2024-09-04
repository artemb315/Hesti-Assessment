import { IconButton } from "@mui/joy";
import CheckIcon from "@mui/icons-material/Check";

const CheckIconButton = (prop) => {
  return (
    <IconButton
      variant="solid"
      size="sm"
      sx={{
        color: "white",
        backgroundColor: "#57167E",
        "&:hover": {
          backgroundColor: "#6B1E94",
        },
      }}
      {...prop}
    >
      <CheckIcon />
    </IconButton>
  );
};

export default CheckIconButton;
