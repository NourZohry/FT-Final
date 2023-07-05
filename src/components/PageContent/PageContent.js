import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { ListCard } from "../ListCard/ListCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchLists, getLists } from "../../slices/listsSlice";
import { CardModal } from "../CardModal/CardModal";

// type BoardType = {
//   board: any;
// }

// type ListType = {
//   name: string
//   length: number
// }

function calculateCardCountForList(cards, listId) {
  return Object.keys(cards).map((key, it) => {
    if (key === listId) {
      return cards[key].filter((card) => card.idList === listId).length;
    }
  });
}

export const PageContent = ({ board } /*: BoardType*/) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (board.id) dispatch(fetchLists(board.id));
  }, [dispatch, board]);

  const contents = useSelector((state) => state.lists.contents);
  const isLoading = useSelector((state) => state.lists.isLoading);
  // const error = useSelector((state) => state.lists.error)

  const cards = useSelector((state) => state.cards.contents);

  return (
    <>
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #E4EBFA", backgroundColor: "background.default" }}
        p={2}
      >
        <Box>
          <Typography
            fontWeight="700"
            fontSize="20px"
          >
            {board.name}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Button variant="contained">+ Add New Task</Button>
          <MoreVertIcon sx={{ color: "secondary.dark" }} />
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

      {isLoading === false && contents.length === 0 && (
        <Box sx={{ flexGrow: 1, backgroundColor: "secondary.main", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}>
          <Typography
            sx={{ color: "secondary.dark" }}
            fontWeight="600"
          >
            This board is empty. Create a new column to get started.
          </Typography>
          <Button variant="contained">+ Add New Column</Button>
        </Box>
      )}

      {/* {console.log(Object.keys(cards))} */}
      {isLoading === false && contents.length !== 0 && (
        <Box sx={{ flexGrow: 1, backgroundColor: "secondary.main", display: "flex", gap: "10px" }}>
          {contents.map((list, i) => {
            return (
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                p={1}
              >
                <Box sx={{ display: "flex", alignItems: "start", justifyContent: "start", gap: "5px" }}>
                  <Box sx={{ width: "10px", height: "10px", backgroundColor: "red", borderRadius: "50%", flexShrink: 0, marginTop: "5px" }}></Box>

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
          <Box mt={4.5} mb={4} mr={2} sx={{ borderRadius: "6px", width: "200px", maxWidth: "200px", flexGrow: 1, backgroundColor: "lightgreen", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography
              sx={{ color: "secondary.dark" }}
              fontWeight="600"
            >
              + New Column
            </Typography>
          </Box>
        </Box>
      )}
    </Box>


    <CardModal />
    </>
  );
};
