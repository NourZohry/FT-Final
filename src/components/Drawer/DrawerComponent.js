import { TextField, useTheme, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Drawer, Switch } from "@mui/material";
import React, { useState } from "react";
// import KanbanLogo from "../../assets/kanban-logo.svg";
import KanbanLight from "../../assets/kanban-lightmode.svg";
import KanbanDark from "../../assets/kanban-darkmode.svg";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";

import BoardIcon from "../../assets/board-icon.svg";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { PageContent } from "../PageContent/PageContent";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../slices/themeSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const DrawerComponent = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const theme = useTheme();

  const [selectedBoard, setSelectedBoard] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const [boardName, setBoardName] = useState("");

  // const [testBoards, setTestBoards] = useState<any[]>([])
  const [testBoards, setTestBoards] = useState([]);

  const fetchBoards = () => {
    fetch("https://api.trello.com/1/members/me/boards?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6")
      .then((res) => res.json())
      .then((data) => setTestBoards(data));
  }

  React.useEffect(() => {
    fetchBoards()
  }, []);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newBoardColumns, setNewBoardColumns] = useState([]);
  const [newBoardColumnsCounter, setNewBoardColumnsCounter] = useState(0);

  const addColumn = () => {
    setNewBoardColumns([...newBoardColumns, { id: newBoardColumnsCounter, text: "", hide: false }]);
    setNewBoardColumnsCounter(newBoardColumnsCounter + 1);
  };

  const handleColumnChange = (column, e) => {
    // console.log(column);
    let copy = [...newBoardColumns];
    Object.keys(copy).filter((key) => {});
    // copy[column.id].text = e.target.value;
    // console.log(e.target.value);
    // console.log(copy);
    setNewBoardColumns(copy);
  };

  const deleteColumn = (column) => {
    // setNewBoardColumns(newBoardColumns.filter(col => col.id !== column.id))
    let copy = [...newBoardColumns];
    console.log(copy);
    copy[column.id].hide = true;
    setNewBoardColumns(copy);
  };

  const addBoard = () => {
    fetch("https://api.trello.com/1/boards/?name=" + boardName + "&key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6", {
      method: "POST",
    })
    .then(() => fetchBoards())
    // .then(() => addListsToBoard())
      // .then((response) => {
      //   console.log(`Response: ${response.status} ${response.statusText}`);
      //   return response.text();
      // })
      // .then((text) => console.log(text))
      // .catch((err) => console.error(err));
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
          >
            Add New Board
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            color={"secondary.dark"}
            fontSize={"12px"}
            fontWeight={"700"}
          >
            Name
          </Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            placeholder="e.g. Web Design"
            variant="outlined"
            onChange={(e) => setBoardName(e.target.value)}
          />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
            color={"secondary.dark"}
            fontSize={"12px"}
            fontWeight={"700"}
          >
            Columns
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {newBoardColumns &&
              newBoardColumns.map((column, i) => {
                return (
                  <>
                    {column.hide === false && (
                      <Box
                        key={i}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        {console.log(column)}
                        {console.log(i)}
                        <TextField
                          fullWidth
                          onChange={(e) => handleColumnChange(column, e)}
                        />
                        <CloseIcon onClick={() => deleteColumn(column, i)} />
                      </Box>
                    )}
                  </>
                );
              })}
            <Button
              variant="contained"
              id="basic-button"
              fullWidth
              onClick={() => addColumn()}
            >
              + Add New Column
            </Button>
            <Button
              variant="contained"
              id="basic-button"
              fullWidth
              onClick={() => addBoard()}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>

      <Box sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: 260,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 260,
              boxSizing: "border-box",
            },
          }}
          anchor="left"
          open={isDrawerOpen}
          variant="persistent"
        >
          <Box
            // p={1}
            pt={3}
            // pl={3}
            // width="200px"
            textAlign="left"
            sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between" }}
          >
            <Box>
              {/* Drawer Content Here */}
              <Box
                component="img"
                // sx={{
                //   height: 100,
                //   width: 100,
                // }}
                alt="Kanban"
                src={theme.palette.mode === "light" ? KanbanLight : KanbanDark}
                ml={3}
              />
              <Box>
                <Typography
                  ml={3}
                  mt={5}
                  mb={2}
                  sx={{ textTransform: "uppercase", color: "secondary.dark" }}
                  fontSize="12px"
                  letterSpacing={"1px"}
                >
                  ALL BOARDS ({testBoards.length})
                </Typography>
                <List sx={{ pt: 0, mr: 1.2 }}>
                  {/* {console.log(testBoards)} */}
                  {testBoards &&
                    testBoards.length !== 0 &&
                    testBoards.map((testBoard, i) => {
                      return (
                        <ListItem
                          disablePadding
                          key={i}
                        >
                          <ListItemButton
                            disableRipple
                            onClick={() => setSelectedBoard(testBoard)}
                            selected={selectedBoard.id === testBoard.id ? true : false}
                            sx={{ pt: 0.6, pb: 0.6, mb: 0 }}
                          >
                            {/* <ListItemIcon> */}
                            <Box
                              component="img"
                              alt="Kanban"
                              src={BoardIcon}
                              mr={1}
                              pl={1}
                            />
                            {/* <img src={BoardIcon} alt="" /> */}
                            {/* </ListItemIcon> */}
                            <ListItemText primary={testBoard.name} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  <ListItem disablePadding>
                    <ListItemButton
                      disableRipple
                      sx={{ pt: 0.6, pb: 0.6, mb: 0 }}
                    >
                      {/* <ListItemIcon> */}
                      <Box
                        component="img"
                        alt="Kanban"
                        src={BoardIcon}
                        mr={1}
                        pl={1}
                      />
                      {/* <img src={BoardIcon} alt="" /> */}
                      {/* </ListItemIcon> */}
                      <ListItemText
                        onClick={handleOpen}
                        primary="+ Create New Board"
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "secondary.light", padding: "3px 45px", borderRadius: "3px", gap: "5px" }}>
                <LightModeIcon sx={{ color: "secondary.dark" }} />
                <Switch
                  defaultChecked
                  onClick={() => dispatch(toggleTheme())}
                />
                <DarkModeIcon sx={{ color: "secondary.dark" }} />
              </Box>
              <Box
                onClick={() => setIsDrawerOpen(false)}
                sx={{ display: "flex", alignItems: "center", alignSelf: "start", pl: "30px", gap: "10px", mb: "30px", "&:hover": { cursor: "pointer" } }}
              >
                <VisibilityOffIcon sx={{ color: "secondary.dark" }} />
                <Typography sx={{ color: "secondary.dark" }}>Hide Sidebar</Typography>
              </Box>
            </Box>
          </Box>
        </Drawer>

        <Box sx={{ flexGrow: 1, marginLeft: isDrawerOpen ? 0 : "-260px" }}>
          {/* Page Content Here */}
          <PageContent board={selectedBoard} />
        </Box>
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setIsDrawerOpen(true)}
        sx={{
          position: "fixed",
          bottom: "20px",
          // left: "-10px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",
        }}
      >
        <VisibilityIcon />
      </Fab>

      {/* <Box sx={{display: 'absolute', top: "0px"}}>
                  <VisibilityIcon />
      </Box> */}
    </>
  );
};
