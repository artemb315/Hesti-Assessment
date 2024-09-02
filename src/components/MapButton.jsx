import { Button } from "@mui/joy";

const MapButton = ({ type, text, ...rest }) => {
  const styles = {
    normal: {
      color: "#253057",
      backgroundColor: "white",
      "&:hover": {
        color: "#1A2238",
        backgroundColor: "#F0F4FF",
      },
    },
    save: {
      color: "#57167E",
      backgroundColor: "#F1DAFF",
      "&:hover": {
        color: "#450E63",
        backgroundColor: "#E9C7FF",
      },
    },
    cancel: {
      color: "#57167E",
      backgroundColor: "white",
      "&:hover": {
        color: "#450E63",
        backgroundColor: "#F7F7F7",
      },
    },
  };

  return (
    <Button sx={styles[type]} {...rest}>
      {text}
    </Button>
  );
};

export default MapButton;
