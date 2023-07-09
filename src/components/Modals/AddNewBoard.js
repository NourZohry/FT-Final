import React from "react";
import { useTheme, TextField, FormControl, InputLabel, MenuItem, Select, Container, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setClosed, getIsOpen } from "../../slices/customModalSlice";

import { addNewBoard, fetchBoards, addListToBoard } from "../../slices/boardsSlice";

export const AddNewBoard = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const [newBoardName, setNewBoardName] = useState("");

  const [columnText, setColumnText] = useState(["To Do", "Doing", "Done"]);
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

  const boards = useSelector((state) => state.boards.contents);
  const addBoard = () => {
    dispatch(setClosed());
    const response = dispatch(addNewBoard(newBoardName)).then((response) => {
      const boardId = response.payload.id;
      columnText.map((column) => {
        dispatch(addListToBoard([boardId, column]));
      });
      dispatch(fetchBoards());
    });
  };

  return (
    <>
      <Typography
        id="modal-modal-title"
        variant="h6"
        component="h2"
        fontWeight={"700"}
      >
        Add New Board
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 2, mb: 1 }}
        color={"primary.dark"}
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
        onChange={(e) => setNewBoardName(e.target.value)}
        size="small"
      />
      <Typography
        id="modal-modal-description"
        sx={{ mt: 2, mb: 1 }}
        color={"primary.dark"}
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
                  sx={{ color: "secondary.dark", "&:hover": {cursor: "pointer"} }}
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
          sx={{
            backgroundColor: theme.palette.mode === "light" ? "#635FC71A" : "#FFFFFF",
            color: "#635FC7",
            textTransform: "none",
            boxShadow: "none",
            borderRadius: "20px",
            "&:hover": {
              backgroundColor: theme.palette.mode === "light" ? "#635FC740" : "#FFFFFF",
              color: "#635FC7",
              textTransform: "none",
              boxShadow: "none",
              borderRadius: "20px",            } 
          }}
        >
          + Add New Column
        </Button>
      </Box>

      <Button
        variant="contained"
        id="basic-button"
        fullWidth
        onClick={() => addBoard()}
      >
        Create New Board
      </Button>
    </>
  );
};
