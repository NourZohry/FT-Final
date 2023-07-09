import { Box, Drawer, Fab, List, ListItem, ListItemButton, ListItemText, Switch, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
// import KanbanLogo from "../../assets/kanban-logo.svg";
import KanbanDark from "../../assets/kanban-darkmode.svg";
import KanbanLight from "../../assets/kanban-lightmode.svg";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import BoardIcon from "../../assets/board-icon.svg";

import { PageContent } from "../PageContent/PageContent";

import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../slices/themeSlice";
import { CustomModal } from "../CustomModal/CustomModal";

import { setModal } from "../../slices/customModalSlice";

import { fetchBoards, setSelectedBoard } from "../../slices/boardsSlice";


export const DrawerComponent = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // const [selectedBoard, setSelectedBoard] = useState();
  const selectedBoard = useSelector((state) => state.boards.selectedBoard);


  const boards = useSelector((state) => state.boards.contents);

  React.useEffect(() => {
    dispatch(fetchBoards());
  }, []);

  return (
    <>
      <CustomModal />

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
            pt={3}
            textAlign="left"
            sx={{ display: "flex", flexDirection: "column", minHeight: "100vh", justifyContent: "space-between",
            // backgroundColor: "red", height: "fit-content" }}
        }}
          >
            <Box>
              {/* Drawer Content Here */}
              <Box
                component="img"
                alt="Kanban"
                src={theme.palette.mode === "light" ? KanbanLight : KanbanDark}
                ml={3}
                height={"22px"}
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
                  ALL BOARDS ({boards.length})
                </Typography>
                <List sx={{ pt: 0, mr: 1.2 }}>
                  {boards &&
                    boards.length !== 0 &&
                    boards.map((testBoard, i) => {
                      return (
                        <ListItem
                          disablePadding
                          key={i}
                        >
                          <ListItemButton
                            disableRipple
                            // onClick={() => setSelectedBoard(testBoard)}
                            onClick={() => dispatch(setSelectedBoard(testBoard))}
                            selected={selectedBoard && selectedBoard.id === testBoard.id ? true : false}
                            sx={{ pt: 0.6, pb: 0.6, mb: 0 }}
                          >
                            <Box
                              component="img"
                              alt="Kanban"
                              src={BoardIcon}
                              mr={1}
                              pl={1}
                            />
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
                      <Box
                        component="img"
                        alt="Kanban"
                        src={BoardIcon}
                        mr={1}
                        pl={1}
                      />
                      <ListItemText
                        onClick={() => dispatch(setModal("AddNewBoard"))}
                        primary="+ Create New Board"
                      />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "secondary.main", padding: "3px 45px", borderRadius: "3px", gap: "5px" }}>
                <LightModeIcon sx={{ color: "secondary.dark" }} />
                <Switch
                  defaultChecked = {theme.palette.mode === "dark"}
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
          {/* {console.log(boards.filter(boardItem => boardItem === selectedBoard))} */}
          <PageContent isDrawerOpen={isDrawerOpen} board={boards && selectedBoard ? boards.find(boardItem => boardItem.id === selectedBoard.id) : ""} />
        </Box>
      </Box>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setIsDrawerOpen(true)}
        // sx={{
        //   position: "fixed",
        //   bottom: "20px",
        //   // left: "-10px",
        //   borderTopLeftRadius: "0px",
        //   borderBottomLeftRadius: "0px",
        //   "&:hover": {
        //     backgroundColor: ""
        //   }
        // }}
      >
        <VisibilityIcon />
      </Fab>

      {/* <Box sx={{display: 'absolute', top: "0px"}}>
                  <VisibilityIcon />
      </Box> */}
    </>
  );
};
