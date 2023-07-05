import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClosed, getIsOpen } from "../../slices/modalSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { InputLabel, MenuItem, Select, Container, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";

export const CardModal = () => {
  const dispatch = useDispatch();

  const card = useSelector((state) => state.cards.selected);

  return (
    <Modal
      open={useSelector(getIsOpen)}
      onClose={() => dispatch(setClosed())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
      <Box
        p={3}
        sx={{ backgroundColor: "background.default" }}
        maxWidth={"50%"}
      >
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
          <Typography
            fontSize={"18px"}
            fontWeight={"700"}
          >
            {true && card.name}
          </Typography>
          <MoreVertIcon sx={{ color: "secondary.dark" }} />
        </Box>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          color={"secondary.dark"}
          fontSize={"13px"}
        >
          {true && card.desc}
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2 }}
          color={"secondary.dark"}
          fontSize={"12px"}
          fontWeight={"700"}
        >
          {true && "Current Status"}
        </Typography>

      </Box>
      </Box>
    </Modal>
  );
};

{/* <FormControl fullWidth>
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
</FormControl> */}