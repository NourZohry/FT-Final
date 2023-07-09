import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, TextField, FormControl, InputLabel, MenuItem, Select, Container, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import { editCardList, fetchCards } from "../../slices/cardsSlice";
import { setClosed, getIsOpen, setModal, setData } from "../../slices/customModalSlice";
import { fetchLists } from "../../slices/listsSlice";
import { fetchBoards } from "../../slices/boardsSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const ShowTask = ({ card }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.contents);

  const [selectedStatus, setSelectedStatus] = React.useState("");
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  React.useEffect(() => {
    if (selectedStatus != "") handleUpdate();
  }, [selectedStatus]);

  const handleUpdate = () => {
    dispatch(setClosed());
    dispatch(editCardList([card.id, selectedStatus])).then(dispatch(fetchBoards()));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          fontSize={"18px"}
          fontWeight={"700"}
        >
          {card.name}
        </Typography>

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
              dispatch(setModal("EditTask"));
            }}
            sx={{color: "secondary.dark", fontSize: "13px"}}
          >
            Edit Task
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleCloseMenu();
              dispatch(setModal("DeleteTask"));
            }}
            sx={{color: "error.main", fontSize: "13px"}}
          >
            Delete Task
          </MenuItem>
        </Menu>

        <MoreVertIcon
          onClick={handleClick}
          sx={{ color: "secondary.dark","&:hover": {cursor: "pointer"} }}
        />
      </Box>
      <Typography
        fontSize={"12px"}
        mt={2}
        color={"secondary.dark"}
      >
        {card.desc}
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 2 }}
        color={"secondary.dark"}
        fontSize={"12px"}
        fontWeight={"700"}
      >
        Current Status
      </Typography>

      {lists && (
        <Select
          fullWidth
          value={selectedStatus}
          //   defaultValue={lists[0].name}
          onChange={(e) => handleStatusChange(e)}
          size={"small"}
          defaultValue={selectedStatus}
        >
          {lists.map((list, i) => {
            return (
              <MenuItem
                key={i}
                value={list.id}
                selected={true}
              >
                {list.name}
              </MenuItem>
            );
          })}
        </Select>
      )}
    </>
  );
};
