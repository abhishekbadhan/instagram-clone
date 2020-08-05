import React, { useState,useEffect } from 'react';
import './Post.css'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {db} from './firebase'
import Replies from  './Replies'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { deepOrange, deepPurple } from '@material-ui/core/colors'


function Post(props) {
    const [details, setdetails] = useState([])

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
      button: {
        margin: theme.spacing(1),
      },
      orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
    }));


useEffect(() => {
    db.collection('details').orderBy("timestamp","desc").onSnapshot((snap) => {
        setdetails(snap.docs.map(doc => ({id:doc.id, all_data :doc.data()})))
    })
  },[])



    const deletingpost = (post_id) => {
      db.collection('details').doc(post_id).delete();
    }
    
    const classes = useStyles();
    return (
        details.map(det =>(

            <div className="Post" >
            <div className="Post__header" >


              <div className="Post__header__inside" >
                <div className="avatar">
                  <Avatar className={classes.orange} alt ={det.all_data.username} />
                  </div>
                  <div>
                    <b>{det.all_data.username}</b>
                  </div>
              </div>
              {props.username === det.all_data.username ?<div>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<DeleteIcon />}
                  onClick={() => deletingpost(det.id)}
                >
                  Delete
                </Button>
              </div>:''}


            </div>
            <div className="Post__image">
                <img src={det.all_data.image_url} width="100%" />
            </div>
            <div className="Post__caption">
                 <div>{det.all_data.image_caption}</div>
            </div>
            {props.username? <Replies id={det.id} username={props.username} /> : <Replies id ={det.id} /> }
            </div>
         ) )
        
    )
}

export default Post
