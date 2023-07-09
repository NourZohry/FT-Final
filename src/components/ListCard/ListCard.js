import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../slices/cardsSlice";
import { setData, setModal } from "../../slices/customModalSlice";


export const ListCard = ({ list }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (list.id) dispatch(fetchCards(list.id));
  }, [dispatch, list]);

  const cards = useSelector((state) => state.cards.contents);
  // const selected = useSelector((state) => state.cards.selected);
  // const isLoading = useSelector((state) => state.cards.isLoading)
  // const error = useSelector((state) => state.cards.error)

  // console.log(cards);

  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const [selectedCard, setSelectedCard] = useState();
  return (
    <>
      <Box sx={{ width: "200px" }}>
        {cards &&
          Object.keys(cards).map((key, i) => {
            return (
              <Box key={i}>
                {cards[key].filter((card) => card.idList === list.id).length > 0 &&
                  cards[key].map((card, j) => {
                    // return <Typography>{card.idList === list.id && card.name}</Typography>;
                    return (
                      <Box
                        key={j}
                        onClick={() => {
                          dispatch(setData(card));
                          dispatch(setModal("ShowTask"));
                        }}
                        sx={{ backgroundColor: "info.light", width: "200px", borderRadius: "8px", boxShadow: "0px 4px 6px 0px rgba(54, 78, 126, 0.10)" }}
                        p={2}
                        mb={2}
                      >
                        <Typography
                          fontWeight={"700"}
                          fontSize={"14px"}
                        >
                          {card.idList === list.id && card.name}
                        </Typography>
                      </Box>
                    );
                  })}
              </Box>
            );
          })}
      </Box>
    </>
  );
};
