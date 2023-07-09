import React from "react";
import { TextField, FormControl, InputLabel, MenuItem, Select, Container, Modal, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpen, setClosed, getIsOpen } from "../../slices/customModalSlice";
import { AddNewBoard } from "../Modals/AddNewBoard";
import { DeleteBoard } from "../Modals/DeleteBoard";
import { EditBoard } from "../Modals/EditBoard";
import { AddTask } from "../Modals/AddTask";
import { EditTask } from "../Modals/EditTask";
import { ShowTask } from "../Modals/ShowTask";
import { DeleteTask } from "../Modals/DeleteTask";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 430,
  bgcolor: "background.default",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "6px",
};

export const CustomModal = () => {
  const dispatch = useDispatch();
  const content = useSelector((state) => state.custommodal.content);
  const open = useSelector((state) => state.custommodal.isOpen);
  const data = useSelector((state) => state.custommodal.data);

  const didMountRef = React.useRef(false);
  React.useEffect(() => {
    if (didMountRef.current) dispatch(setOpen(true));
    didMountRef.current = true;
  }, [content]);

  const renderSwitch = (key) => {
    // console.log(data);
    switch (key) {
      case "AddNewBoard":
        return <AddNewBoard />;
      case "DeleteBoard":
        return <DeleteBoard board={data} />;
      case "EditBoard":
        return (
          <EditBoard
            board={data[0]}
            lists={data[1]}
          />
        );
      case "AddTask":
        return (
          <AddTask
            board={data[0]}
            lists={data[1]}
          />
        );
      case "EditTask":
        return <EditTask card={data} />;
      case "ShowTask":
        return <ShowTask card={data} />;
      case "EditTask":
        return <EditTask card={data} />;
      case "DeleteTask":
        return <DeleteTask card={data} />;

      default:
        break;
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => dispatch(setClosed())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>{renderSwitch(content)}</Box>
    </Modal>
  );
};
