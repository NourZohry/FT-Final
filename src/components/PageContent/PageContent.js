import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { ListCard } from "../ListCard/ListCard";

// type BoardType = {
//   board: any;
// }

// type ListType = {
//   name: string
//   length: number
// }

export const PageContent = ({ board } /*: BoardType*/) => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState({});
  React.useEffect(() => {
    // console.log(board);
    if (board.id) {
    fetch("https://api.trello.com/1/boards/" + board.id + "/lists?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6")
      .then((res) => res.json())
      .then((data) => setLists(data))
    }
  }, [board]);

  // React.useEffect(() => {
  //   // let listData = [];
  //   let listData = {};
  //   lists.map(list => {
  //     // console.log(list.id)
  //     fetch("https://api.trello.com/1/lists/" + list.id + "/cards?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6")
  //     .then((res) => res.json())
  //     // .then((data) => console.log(data))
  //     // .then((data) => listData.push(data))
  //     .then((data) => listData[list.id] = data)
  //     // .then(() => console.log(listData))
  //   })
  //   console.log(listData);
  //   setCards(listData);

  // }, [lists])

  // React.useEffect(() => {
  //   fetch("https://api.trello.com/1/boards/" + board.id + "/lists?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6")
  //     .then((res) => res.json())
  //     .then((data) => setLists(data));
  // }, [board]);

  // https://api.trello.com/1/boards/{id}/cards?key=APIKey&token=APIToken

  return (
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

      {(!lists || lists.length === 0) && (
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
      {lists && lists.length !== 0 && (
        <Box sx={{ display: "flex", gap: "10px" }}>
          {lists.map((list, i) => {
            return (
              <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Typography
                  ml={3}
                  mt={5}
                  mb={2}
                  sx={{ textTransform: "uppercase", color: "secondary.dark" }}
                  fontSize="12px"
                  letterSpacing={"1px"}
                  key={i}
                >
                  {list.name} (num)
                </Typography>
                <ListCard list={list} />
                {/* {cards && <Typography>hellooo */}
                  {/* {console.log(cards['5f5f2b71c407125e4401dc48'])} */}
                {/* </Typography>} */}
              </Box>
            );
          })}
        </Box>
      )}
    </Box>
  );
};
