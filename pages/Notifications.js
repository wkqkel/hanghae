import React from "react";
import { Grid, Text, Image } from "../elements";
import Card from "../components/Card";
const Notification = (props) => {
  let noti = [
    { user_name: "aaaa", post_id: "post1", image_url: "" },
    { user_name: "aaaa", post_id: "post2", image_url: "" },
    { user_name: "aaaa", post_id: "post3", image_url: "" },
    { user_name: "aada", post_id: "post4", image_url: "" },
  ];
  return (
    <>
      <Grid padding="16px 30%" bg="#EFF6FF" margin="8px 0px">
        {noti.map((n) => {
          return <Card key={n.post_id} {...n}></Card>;
        })}
      </Grid>
    </>
  );
};

export default Notification;
