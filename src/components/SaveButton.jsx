import { Button } from "@mui/joy";

const SaveButton = (prop) => {
  return (
    <Button
      variant="solid"
      sx={{
        color: "white",
        backgroundColor: "#57167E",
        "&:hover": {
          backgroundColor: "#6B1E94",
        },
      }}
      {...prop}
    >
      Save and apply
    </Button>
  );
};

export default SaveButton;
