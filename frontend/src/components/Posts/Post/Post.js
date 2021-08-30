/** @format */

import React from "react";
import useStyles from "./styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/PostAction";

const Post = ({ post, setcurrentId }) => {
  const { selectedFile, name, createdAt, title, likes, tags, message, _id } =
    post;

  const tagValues = tags[0].split(",");
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile} title={title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "white" }}
          size='small'
          onClick={() => setcurrentId(_id)}>
          <MoreHorizIcon fontSize='small' />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {tagValues.map((tag) => `#${tag} `)}
        </Typography>
      </div>
      <Typography className={classes.title} variant='h6' gutterBottom>
        {title}
      </Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary'>
          {message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            dispatch(likePost(_id));
            console.log(_id);
          }}>
          <ThumbUpAltIcon fontSize='small' />
          {`  Like ${likes.length}`}
        </Button>
        <Button
          size='small'
          color='secondary'
          onClick={() => {
            dispatch(deletePost(_id));
          }}>
          <DeleteIcon fontSize='small' />
          {" Delete"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
