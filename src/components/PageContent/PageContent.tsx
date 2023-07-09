import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, Divider, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setModal } from "../../slices/customModalSlice";
import { fetchLists } from "../../slices/listsSlice";
import { ListCard } from "../ListCard/ListCard";

import KanbanDark from "../../assets/kanban-darkmode.svg";
import KanbanLight from "../../assets/kanban-lightmode.svg";
import { AppDispatch } from "../../app/store";

import useMediaQuery from '@mui/material/useMediaQuery';


function calculateCardCountForList(cards: any, listId: string) {
  return Object.keys(cards).map((key, it) => {
    if (key === listId) {
      return cards[key].filter((card: any) => card.idList === listId).length;
    }
    return null;
  });
}

interface PageContentProps {
  isDrawerOpen: boolean;
  board: any;
}

export const PageContent: React.FC<PageContentProps> = ({ isDrawerOpen, board }) => {
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    if (board && board.id) {
      dispatch(fetchLists(board.id));
    }
  }, [dispatch, board]);

  const contents = useSelector((state: any) => state.lists.contents);
  const isLoading = useSelector((state: any) => state.lists.isLoading);
  // const error = useSelector((state) => state.lists.error)

  const cards = useSelector((state: any) => state.cards.contents);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.SetStateAction<any>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();

  const matches = useMediaQuery('(min-width:400px)');


  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Box
          sx={{  display: "flex", justifyContent: "space-between", alignItems: "center", border: theme.palette.mode === "light" ? "1px solid #E4EBFA" : "1px solid #3E3F4E", backgroundColor: "info.light" }}
          p={2}
        >
          <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {isDrawerOpen === false && (
              <>
                {" "}
                <Box
                  component="img"
                  alt="Kanban"
                  src={theme.palette.mode === "light" ? KanbanLight : KanbanDark}
                  // ml={3}
                  height={"22px"}
                />
                <Divider
                  orientation="vertical"
                  flexItem
                />
              </>
            )}
            <Typography
              fontWeight="700"
              fontSize="20px"
            >
              {board && board.name}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Button
              variant="contained"
              // onClick={() => setShowModal(true)}
              disabled={board && isLoading === false && contents.length === 0 ? true : false}
              onClick={() => {
                dispatch(setData([board, contents]));
                dispatch(setModal("AddTask"));
              }}
            >
              {!matches && "+"}
              {matches && "+ Add New Task"}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  dispatch(setData([board, contents]));
                  dispatch(setModal("EditBoard"));
                }}
                sx={{ color: "secondary.dark", fontSize: "13px" }}
              >
                Edit Board
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  dispatch(setData(board));
                  dispatch(setModal("DeleteBoard"));
                }}
                sx={{ color: "error.main", fontSize: "13px" }}
              >
                Delete Board
              </MenuItem>
            </Menu>
            <MoreVertIcon
              onClick={handleClick}
              sx={{ color: "secondary.dark", "&:hover": { cursor: "pointer" } }}
            />
          </Box>
        </Box>

        {isLoading === true && (
          <Box sx={{ flexGrow: 1, backgroundColor: "secondary.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
            <Typography
              sx={{ color: "secondary.dark" }}
              fontWeight="600"
            >
              Loading...
            </Typography>
          </Box>
        )}

        {board && isLoading === false && contents.length === 0 && (
          <Box sx={{ flexGrow: 1, backgroundColor: "secondary.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
            <Typography
              sx={{ color: "secondary.dark" }}
              fontWeight="600"
            >
              This board is empty. Create a new column to get started.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(setData([board, contents]));
                dispatch(setModal("EditBoard"));
              }}
            >
              + Add New Column
            </Button>
          </Box>
        )}

        {/* {console.log(Object.keys(cards))} */}
        {isLoading === false && contents.length !== 0 && (
          <Box sx={{ flexGrow: 1, backgroundColor: "secondary.main", display: "flex", gap: "10px", minWidth: "fit-content" }}>
            {contents.map((list: any, i: number) => {
              return (
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                  p={1}
                  key={i}
                >
                  <Box sx={{ display: "flex", alignItems: "start", justifyContent: "start", gap: "5px" }}>
                    <Box sx={{ width: "10px", height: "10px", backgroundColor: "#49C4E5", borderRadius: "50%", flexShrink: 0, marginTop: "5px" }}></Box>

                    <Typography
                      sx={{ textTransform: "uppercase", color: "secondary.dark" }}
                      fontSize="12px"
                      letterSpacing={"1px"}
                      key={i}
                      display="inline"
                    >
                      {list.name} {"("}
                      {cards && calculateCardCountForList(cards, list.id)}
                      {")"}
                    </Typography>
                  </Box>
                  <ListCard list={list} />
                </Box>
              );
            })}
            <Box
              mt={4.5}
              mb={3}
              mr={2}
              sx={{ borderRadius: "6px", width: "200px", maxWidth: "200px", flexGrow: 1, backgroundColor: "primary.light", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "secondary.dark", "&:hover": { cursor: "pointer", color: "primary.main" } }}
              onClick={() => {
                dispatch(setData([board, contents]));
                dispatch(setModal("EditBoard"));
              }}
            >
              <Typography
                // sx={{ }}
                fontWeight="600"
              >
                + New Column
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
