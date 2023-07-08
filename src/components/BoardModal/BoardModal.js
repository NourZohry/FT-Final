import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClosed, getIsOpen } from "../../slices/boardModalSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TextField, FormControl, InputLabel, MenuItem, Select, Container, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import { fetchCards } from "../../slices/cardsSlice";
import { fetchLists } from "../../slices/listsSlice";
import CloseIcon from "@mui/icons-material/Close";


const MODAL_HEIGHT = 450;

export const BoardModal = ({ board, lists, page }) => {
  const dispatch = useDispatch();

  // const open = useSelector(getIsOpen);
  // React.useEffect(() => {
  //   setOpen(false);
  // }, [board]);

  // React.useEffect(() => {
  //   setOpen(true);
  // }, [page]);

  // const [open, setOpen] = useState(page);

  const open = useSelector(getIsOpen);

  const [boardTitle, setBoardTitle] = useState(board.name);
  const handleTitleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  return (
    <>
      {
        <Modal
          open={open}
          onClose={() => dispatch(setClosed())}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          // sx={{width: "fit-content", marginX: "auto", verticalAlign: "middle"}}
          // sx={{width: "480px", position: "absolute", marginX :"auto"}}
          // sx={{width: "fit-content", marginX: "auto"}}
          sx={{ position: "fixed", marginX: "auto", width: "fit-content", top: MODAL_HEIGHT / 5 }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Box
              p={3}
              sx={{ backgroundColor: "background.default" }}
              // maxWidth={"50%"}
              width="450px"
              height={MODAL_HEIGHT}
              // width= "40vw"
              // height="70vh"
              // minWidth="400px"
              // minHeight="300px"
            >
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
                defaultValue={board.name}
                variant="outlined"
                onChange={(e) => handleTitleChange(e)}
              />

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                color={"secondary.dark"}
                fontSize={"12px"}
                fontWeight={"700"}
              >
                Board Columns
              </Typography>
              {lists &&
                lists.map((list, i) => {
                  return (
                    <>
                        <Box
                          key={i}
                          sx={{ display: "flex", alignItems: "center" }}
                        >
                          <TextField
                            fullWidth
                            // onChange={(e) => handleColumnChange(column, e)}
                            defaultValue={list.name}
                          />
                          {/* <CloseIcon onClick={() => deleteColumn(column, i)} /> */}
                          <CloseIcon />
                        </Box>
                    </>
                  );
                })}
                            <Button
              variant="contained"
              id="basic-button"
              fullWidth
              // onClick={() => addColumn()}
            >
              + Add New Column
            </Button>
            <Button
              variant="contained"
              id="basic-button"
              fullWidth
              // onClick={() => addBoard()}
            >
              Save Changes
            </Button>
            </Box>
          </Box>
        </Modal>
      }
    </>
  );
};

{
  /* <FormControl fullWidth>
<InputLabel id="demo-simple-select-label">{list.name}</InputLabel>
<Select
labelId="demo-simple-select-label"
id="demo-simple-select"
value={age}
label="Age"
onChange={handleChange}
>
<MenuItem value={10}>Ten</MenuItem>
<MenuItem value={20}>Twenty</MenuItem>
<MenuItem value={30}>Thirty</MenuItem>
</Select>
</FormControl> */
}
