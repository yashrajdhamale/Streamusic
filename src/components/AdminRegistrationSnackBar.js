import * as React from "react";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";

export default function PositionedSnackbar({ message, snackbarKey }) {
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  React.useEffect(() => {
    if (message) {
      setState({ vertical: "top", horizontal: "center", open: true });
    }
  }, [message, snackbarKey]);

  return (
    <Box sx={{ width: "100%" }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        autoHideDuration={3000} // optional: auto close after 3 seconds
      />
    </Box>
  );
}
