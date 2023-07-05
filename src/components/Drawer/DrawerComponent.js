import { useTheme, Fab, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Box, Drawer, Switch } from "@mui/material";
import React, { useState } from "react";
// import KanbanLogo from "../../assets/kanban-logo.svg";
import KanbanLight from "../../assets/kanban-lightmode.svg";
import KanbanDark from "../../assets/kanban-darkmode.svg";

import BoardIcon from "../../assets/board-icon.svg";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { PageContent } from "../PageContent/PageContent";

import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../../slices/themeSlice";

export const DrawerComponent = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  const theme = useTheme();

  const [selectedBoard, setSelectedBoard] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // const [testBoards, setTestBoards] = useState<any[]>([])
  const [testBoards, setTestBoards] = useState([]);
  React.useEffect(() => {
    fetch("https://api.trello.com/1/members/me/boards?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6")
      .then((res) => res.json())
      .then((data) => setTestBoards(data));
  }, []);

  return (
    <>
      <Box sx={{ display: isDrawerOpen ? "flex" : "" }}>
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
                        <ListItem disablePadding key={i}>
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
                      <ListItemText primary="+ Create New Board" />
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

        <Box sx={{ flexGrow: 1 }}>
          {/* Page Content Here */}
          <PageContent board={selectedBoard}/>
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
