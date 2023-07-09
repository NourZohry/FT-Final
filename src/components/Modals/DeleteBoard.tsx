import { Box, Button, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { setClosed } from "../../slices/customModalSlice";

import { deleteBoard, fetchBoards } from "../../slices/boardsSlice";
import { AppDispatch } from "../../app/store";


interface DeleteBoardProps {
  board: any;
}

export const DeleteBoard: React.FC<DeleteBoardProps> = ({ board }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = () => {
    dispatch(setClosed());
    dispatch(deleteBoard(board.id)).then(() => dispatch(fetchBoards()));
  };

  return (
    <>
      <Typography
        id="modal-modal-title"
        // variant="h6"
        // component="h2"
        fontSize={"18px"}
        fontWeight={"700"}
        color="error.main"
      >
        Delete this board?
      </Typography>
      <Typography
        id="modal-modal-description"
        sx={{ mt: 2, mb: 1 }}
        color={"secondary.dark"}
        fontSize={"12px"}
      >
        Are you sure you want to delete the '{board.name}' board? This action will remove all columns and tasks and cannot be reversed.
      </Typography>
      <Box sx={{ display: "flex", gap: "10px" }} mt={2}>
        <Button fullWidth sx={{borderRadius: "20px", textTransform: "none", color: "#FFFFFF", backgroundColor: "error.main", "&:hover": {backgroundColor:"error.light"} }} onClick={() => handleDelete()}>Delete</Button>
        <Button fullWidth sx={{borderRadius: "20px", textTransform: "none", color: "primary.main", backgroundColor: "info.main", "&:hover": {backgroundColor:"info.dark"} }} onClick={() => dispatch(setClosed())}>Cancel</Button>
      </Box>
    </>
  );
};
