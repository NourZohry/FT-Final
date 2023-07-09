import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Menu, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBoards } from "../../slices/boardsSlice";
import { editCardList } from "../../slices/cardsSlice";
import { setClosed, setModal } from "../../slices/customModalSlice";
import { AppDispatch } from "../../app/store";

interface ShowTaskProps {
  card: any;
}

export const ShowTask: React.FC<ShowTaskProps> = ({ card }) => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector((state:any) => state.lists.contents);

  const [selectedStatus, setSelectedStatus] = React.useState("");
  const handleStatusChange = (e:React.SetStateAction<any>) => {
    setSelectedStatus(e.target.value);
  };

  React.useEffect(() => {
    if (selectedStatus !== "") {handleUpdate()};
  }, [selectedStatus]);

  const handleUpdate = () => {
    dispatch(setClosed());
    dispatch(editCardList([card.id, selectedStatus]));
    dispatch(fetchBoards());
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.SetStateAction<any>) => {
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
          {lists.map((list:any, i:number) => {
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
