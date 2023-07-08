import React from "react";
import { TextField, FormControl, InputLabel, MenuItem, Select, Container, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { setOpen, setClosed, getIsOpen } from "../../slices/customModalSlice";
import { archiveList, addList } from "../../slices/listsSlice";

import { addListToBoard, editBoard, fetchBoards, changeBoardColumns } from "../../slices/boardsSlice";
import { deleteList } from "../../slices/listsSlice";

export const EditBoard = ({ board, lists }) => {
  const dispatch = useDispatch();

  const [newBoardName, setNewBoardName] = useState("");

  const listNames = lists.map((list) => list.name);
  const [columnText, setColumnText] = useState(listNames);
  const addColumn = () => {
    setColumnText([...columnText, ""]);
  };

  const deleteColumn = (i) => {
    let copy = [...columnText];
    copy.splice(i, 1);
    setColumnText(copy);
  };

  const changeColumnText = (column, e) => {
    let copy = [...columnText];
    copy[column] = e.target.value;
    setColumnText(copy);
  };

  const handleChangeColumns = () => {
    // console.log(lists);
    // for (let i = 0; i < columnText[i].length; i++) {
    //   if (lists[i].name !== columnText[i]) {
    //     dispatch(archiveList(lists[i].id));
    //     // dispatch(addList([columnText[i],board.id]))
    //   }
    // }
  };

  const handleEditBoard = () => {
    dispatch(setClosed());
    // columnText.map(column => {
    //   if (lists.find(list => list.name === column)) {}

    // })
    // lists.map(list => {
    //   if (columnText.filter(columnItem => columnItem === list.name).length > 0) {
    //     console.log("Do nothing, condition is fulfilled, list already exists")
    //   }
    //   else if (columnText.filter(columnItem => columnItem === list.name).length === 0) {

    //   }
    //   // else {
    //   //   console.log("Create list to add here");
    //   // }
    // })

    // if (columnText.length >= lists.length) {
    columnText.map((column) => {
      if (lists.filter((list) => list.name === column).length > 0) {
        console.log("nothing to do here");
      }
      if (lists.filter((list) => list.name === column).length === 0) {
        console.log("add the new column here from 'column'");
        console.log(column);
        dispatch(addListToBoard([board.id, column]));
      }
    });
    lists.map((list) => {
      if (columnText.filter((column) => column === list.name).length === 0) {
        dispatch(deleteList(list.id));
      }
    });

    if (newBoardName) {
      dispatch(editBoard([board.id, newBoardName])).then(() => dispatch(fetchBoards()));
    }
    dispatch(fetchBoards());
  };

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        fontWeight={"700"}
      >
        Edit Board
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 2, mb: 1 }}
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
        defaultValue={board.name}
        onChange={(e) => setNewBoardName(e.target.value)}
        size="small"
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
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {columnText.map((column, i) => {
          return (
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <>
                <TextField
                  fullWidth
                  value={column}
                  size="small"
                  onChange={(e) => changeColumnText(i, e)}
                />
                <CloseIcon
                  sx={{ color: "secondary.dark" }}
                  onClick={() => deleteColumn(i)}
                />
              </>
            </Box>
          );
        })}
      </Box>

      <Box sx={{ mt: "10px", mb: "20px" }}>
        <Button
          variant="contained"
          id="basic-button"
          fullWidth
          onClick={() => addColumn()}
        >
          + Add New Column
        </Button>
      </Box>

      <Button
        variant="contained"
        id="basic-button"
        fullWidth
        onClick={() => handleEditBoard()}
      >
        Save Changes
      </Button>
    </>
  );
};
