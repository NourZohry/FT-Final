import { SelectChangeEvent, Box, Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../../slices/cardsSlice";
import { setClosed } from "../../slices/customModalSlice";
import { fetchLists } from "../../slices/listsSlice";
import { AppDispatch } from "../../app/store";

interface AddTaskProps {
  board: any;
  lists: any[];
}

export const AddTask: React.FC<AddTaskProps>  = ({ board, lists }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedStatus, setSelectedStatus] = React.useState("");
  const handleStatusChange = (e:SelectChangeEvent<any>) => {
    console.log(e.target.value);
    setSelectedStatus(e.target.value);
  };

  const [name, setName] = React.useState("");
  const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [description, setDescription] = React.useState("");
  const handleDescriptionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setDescription(e.target.value);
  };

  const handleUpdate = () => {
    dispatch(setClosed());
    dispatch(addCard({ status: selectedStatus, name: name, desc: description }))
    dispatch(fetchLists(board.id));
  };

  return (
    <>
      <Typography
        fontSize={"18px"}
        fontWeight={"700"}
      >
        Add New Task
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 2 }}
        color={"primary.dark"}
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
      />

      <Typography
        id="modal-modal-description"
        sx={{ mt: 2 }}
        color={"primary.dark"}
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
      />

      <Typography
        id="modal-modal-description"
        sx={{ mt: 2 }}
        color={"primary.dark"}
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
          {lists.map((list:any, i:number) => {
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


      <Box mt={2}>
        <Button
          variant="contained"
          id="basic-button"
          fullWidth
          onClick={() => handleUpdate()}
        >
          Create Task
        </Button>
      </Box>
    </>
  );
};
