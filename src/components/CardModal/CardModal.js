import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setClosed, getIsOpen } from "../../slices/modalSlice";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { FormControl, InputLabel, MenuItem, Select, Container, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";

const MODAL_HEIGHT = 450;

export const CardModal = () => {
  const dispatch = useDispatch();

  const card = useSelector((state) => state.cards.selected);
  const open = useSelector(getIsOpen);


  const [status, setStatus] = React.useState('');
  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const lists = useSelector((state) => state.lists.contents);
  // console.log(lists);

  const [listOfCard, setListOfCard] = React.useState()

  React.useEffect(() => {
    if (card)
    fetch("https://api.trello.com/1/cards/"+card.id+"/list?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6")
      .then((res) => res.json())
      .then((data) => setListOfCard(data));
  }, [card]);


  return (
    <>
      {card && (
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
                Current Status
              </Typography>
              <FormControl fullWidth>
                <InputLabel shrink={false} sx={{opacity: status ? 0 : 100}}>{listOfCard.name}</InputLabel>
                <Select
                  value={status}
                  defaultValue={listOfCard && listOfCard.name}                  
                  onChange={handleChange}
                >
                  {lists && listOfCard && lists.filter(list => list.boardId === listOfCard.boardId).map(list => {
                    return <MenuItem value={list}>{list.name}</MenuItem>
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Modal>
      )}
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
