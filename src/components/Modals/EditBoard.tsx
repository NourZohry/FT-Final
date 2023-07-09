import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setClosed } from "../../slices/customModalSlice";

import { addListToBoard, editBoard, fetchBoards } from "../../slices/boardsSlice";
import { deleteList } from "../../slices/listsSlice";
import { AppDispatch } from "../../app/store";

interface EditBoardProps {
  board: {
    name: string,
    id: string
  };
  lists: any[];
}

export const EditBoard: React.FC<EditBoardProps> = ({ board, lists }) => {
  const dispatch = useDispatch<AppDispatch>();

  const theme = useTheme();

  const [newBoardName, setNewBoardName] = useState("");

  const listNames = lists.map((list) => list.name);
  const [columnText, setColumnText] = useState(listNames);
  const addColumn = () => {
    setColumnText([...columnText, ""]);
  };

  const deleteColumn = (i: number) => {
    let copy = [...columnText];
    copy.splice(i, 1);
    setColumnText(copy);
  };

  const changeColumnText = (column: number, e: React.ChangeEvent<HTMLInputElement>) => {
    let copy = [...columnText];
    copy[column] = e.target.value;
    setColumnText(copy);
  };

  const handleEditBoard = () => {
    dispatch(setClosed());

    columnText.map((column: string) => {
      if (lists.filter((list) => list.name === column).length > 0) {
        // console.log("nothing to do here");
      }
      if (lists.filter((list) => list.name === column).length === 0) {
        // console.log("add the new column here from 'column'");
        // console.log(column);
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
        defaultValue={board.name}
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
                  onChange={(e:React.ChangeEvent<HTMLInputElement>) => changeColumnText(i, e)}
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
        onClick={() => handleEditBoard()}
      >
        Save Changes
      </Button>
    </>
  );
};
