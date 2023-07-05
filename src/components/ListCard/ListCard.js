import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../slices/cardsSlice";

export const ListCard = ({ list }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (list.id) dispatch(fetchCards(list.id));
  }, [dispatch, list]);

  const cards = useSelector((state) => state.cards.contents);
  // const isLoading = useSelector((state) => state.cards.isLoading)
  // const error = useSelector((state) => state.cards.error)

  // console.log(cards);
  return (
    <Box sx={{width: "200px"}}>
      {cards &&
        Object.keys(cards).map((key) => {
          return (
            <>
              {cards[key].filter(card => card.idList === list.id).length > 0 && cards[key].map((card) => {
                // return <Typography>{card.idList === list.id && card.name}</Typography>;
                return (
                  <Box sx={{backgroundColor:"background.default", width: "200px", borderRadius: "8px", boxShadow: "0px 4px 6px 0px rgba(54, 78, 126, 0.10)"}} p={2} mb={2}>
                    <Typography fontWeight={"700"} fontSize={"14px"}>{card.idList === list.id && card.name}</Typography>
                  </Box>
                );
              })}
            </>
          );
        })}
    </Box>
  );
};
