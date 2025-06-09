
export const superadminStyle = {
  headerStyle: {
    fontWeight: "bold",
    fontSize: "0.65em",
    color: "white",
    textAlign: "center",
    paddingX: "6px",
    paddingY: "0px",
    lineHeight: 1.2,
    borderRight: "1px solid #ccc",
  },

  cellStyle: {
    fontSize: "0.70em",
    textAlign: "center",
    color: "black",
    paddingX: "6px",
    paddingY: "0px",
    borderRight: "1px solid #ccc",
  },

  button: {
    fontSize: "0.6em",
    fontWeight: "bold",
    //marginX: "0.1em",
    padding: "0.4em 1em",
    // margin: "0.4em",
    borderRadius: "0",
    alignSelf: "center",
    backgroundColor: "#172e44",
    "&:hover": {
      backgroundColor: "red",
    },
    display: "flex",
    alignItems: "center",
    //gap: "0.5em",
    justifyContent: "center",
    fontFamily: "'Calibari',sans-serif",
    "& .MuiButton-startIcon>*:nth-of-type(1)": {
      fontSize: "2em"
    }

  },
}
export const teacherPageModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  height: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  outline: "none",
  borderRadius: 2,
  
};