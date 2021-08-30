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
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/PostAction";

const Post = ({ post, setcurrentId }) => {
  const {
    selectedFile,
    creator,
    name,
    createdAt,
    title,
    likes,
    tags,
    message,
    _id,
  } = post;

  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === (user?.result?.googleId || user?.result?._id),
      ) ? (
        <>
          <ThumbUpAltIcon fontSize='small' />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize='small' />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize='small' />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={selectedFile} title={title} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{name}</Typography>
        <Typography variant='body2'>{moment(createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button
            style={{ color: "white" }}
            size='small'
            onClick={() => setcurrentId(_id)}>
            <MoreHorizIcon fontSize='small' />
          </Button>
        )}
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary'>
          {tags.map((tag) => `#${tag} `)}
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
          disabled={!user}
          onClick={() => {
            dispatch(likePost(_id));
            console.log(_id);
          }}>
          <Likes />
        </Button>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button
            size='small'
            color='secondary'
            onClick={() => {
              dispatch(deletePost(_id));
            }}>
            <DeleteIcon fontSize='small' />
            {" Delete"}
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
