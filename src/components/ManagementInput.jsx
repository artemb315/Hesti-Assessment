import { Input } from "@mui/joy";

const ManagementInput = ({ type, ...rest }) => {
  const focusStyle = {
    "&::before": {
      display: "none",
    },
    "&:focus-within": {
      outline: "2px solid #57167E",
    },
  };
  const styles = {
    name: { ...focusStyle, color: "#253057" },
    number: {
      ...focusStyle,
      color: "#D5D6E3",
      "&:focus-within": {
        outline: "2px solid #57167E",
        color: "#253057",
      },
    },
  };

  return <Input sx={styles[type]} {...rest} />;
};

export default ManagementInput;
