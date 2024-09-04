import { Button } from "@mui/joy";

const CancelButton = (prop) => {
  return (
    <Button
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
      Cancel
    </Button>
  );
};

export default CancelButton;
