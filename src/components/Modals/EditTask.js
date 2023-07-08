import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClosed, getIsOpen } from "../../slices/customModalSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField, FormControl, InputLabel, MenuItem, Select, Container, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import { fetchCards } from "../../slices/cardsSlice";
import { updateCard } from "../../slices/cardsSlice";
import { fetchBoards } from "../../slices/boardsSlice";
import { fetchLists } from "../../slices/listsSlice";

export const EditTask = ({ card }) => {
  const dispatch = useDispatch();

  console.log(card);

  const board = useSelector((state) => state.boards.selectedBoard);
  const lists = useSelector((state) => state.lists.contents);

  const [selectedStatus, setSelectedStatus] = React.useState(card.idList);
  const handleStatusChange = (e) => {
    console.log(e.target.value);
    setSelectedStatus(e.target.value);
  };

  const [name, setName] = React.useState(card.name);
  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [description, setDescription] = React.useState(card.desc);
  const handleDescriptionChange = (e) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleUpdate = () => {
    dispatch(setClosed());
    dispatch(updateCard({ status: selectedStatus, name: name, desc: description, cardId: card.id })).then(dispatch(fetchBoards()));
  };

  return (
    <>
      <Typography
        fontSize={"18px"}
        fontWeight={"700"}
      >
        Edit Task
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 2 }}
        color={"secondary.dark"}
        fontSize={"12px"}
        fontWeight={"700"}
      >
        Title
      </Typography>
      <TextField
        fullWidth
        id="outlined-basic"
        // defaultValue={card.name}
        variant="outlined"
        placeholder="e.g. Take a coffee break"
        size={"small"}
        onChange={handleNameChange}
        defaultValue={card.name}
      />

      <Typography
        id="modal-modal-description"
        sx={{ mt: 2 }}
        color={"secondary.dark"}
        fontSize={"12px"}
        fontWeight={"700"}
      >
        Description
      </Typography>
      <TextField
        fullWidth
        // InputLabelProps={{ shrink: false, sx: { opacity: status ? 100 : 100 } }}
        id="outlined-basic"
        // defaultValue={card.desc}
        placeholder="e.g. It's always good to take a break. This 15 minute break will recharge the batteries a little."
        variant="outlined"
        onChange={handleDescriptionChange}
        multiline
        rows={4}
        defaultValue={card.desc}
      />

      <Typography
        id="modal-modal-description"
        sx={{ mt: 2 }}
        color={"secondary.dark"}
        fontSize={"12px"}
        fontWeight={"700"}
      >
        Status
      </Typography>

      {board && lists && (
        <Select
          fullWidth
          value={selectedStatus}
          defaultValue={lists[0].name}
          onChange={(e) => handleStatusChange(e)}
          size={"small"}
          // onChange={handleChange}
        >
          {lists.map((list, i) => {
            return (
              <MenuItem
                key={i}
                value={list.id}
              >
                {list.name}
              </MenuItem>
            );
          })}
        </Select>
      )}

      {/* <FormControl fullWidth>
        <InputLabel
          shrink={false}
          sx={{ opacity: status ? 0 : 100 }}
        >
          {listOfCard && listOfCard.name}
        </InputLabel>
        <Select
          value={status}
          defaultValue={listOfCard && listOfCard.name}
          onChange={handleChange}
        >
          {lists &&
            listOfCard &&
            lists
              .filter((list) => list.boardId === listOfCard.boardId)
              .map((list) => {
                return <MenuItem value={list}>{list.name}</MenuItem>;
              })}
        </Select>
      </FormControl> */}

      <Box mt={2}>
        <Button
          variant="contained"
          id="basic-button"
          fullWidth
          onClick={() => handleUpdate()}
        >
          Save Changes
        </Button>
      </Box>
    </>
  );
};
