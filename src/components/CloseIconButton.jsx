import { IconButton } from "@mui/joy";
import CloseIcon from "@mui/icons-material/Close";

const CloseIconButton = (prop) => {
  return (
    <IconButton
      variant="outlined"
      size="sm"
      sx={{
        color: "#57167E",
        borderColor: "#57167E",
        "&:hover": {
          color: "#7A2DA7",
          borderColor: "#7A2DA7",
          backgroundColor: "transparent",
        },
      }}
      {...prop}
    >
      <CloseIcon />
    </IconButton>
  );
};

export default CloseIconButton;
