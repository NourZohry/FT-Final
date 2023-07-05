import React from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Button, Typography, Box, Drawer, Switch } from "@mui/material";
import { useState } from "react";

export const ListCard = ({ list }) => {
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    fetch("https://api.trello.com/1/lists/" + list.id + "/cards?key=c7402336c002e9d44024966d4591bd29&token=ATTA859fe62b508ce78f6c665b7ca8298d724597956bcedb673e4ffc1bac284faeb8F9C234F6")
      .then((res) => res.json())
      // .then((data) => console.log(data))
      // .then((data) => listData.push(data))
      .then((data) => setCards(data));
  }, [list]);

  return <>{cards && cards.map(card => {
    return <Typography>{card.name}</Typography>
  })}</>;
};
