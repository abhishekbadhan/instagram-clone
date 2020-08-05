import React, {useState, useEffect} from 'react';
import {db} from './firebase';
import firebase from 'firebase';
import './Replies.css'

function Replies(props) {
    const [comment, setcomment] = useState('')
    const [display, setdisplay] = useState([])

    const posting_comment = (comment_id) => {
        db.collection("details").doc(comment_id).collection("comments").add({
            comments:comment,
            username:props.username,
            timestamp : firebase.firestore.FieldValue.serverTimestamp()
        })
        setcomment('')
        console.log('this is posted',comment_id)
    }
    
    useEffect(() => {
        db
        .collection("details")
        .doc(props.id)
        .collection("comments")
        .orderBy("timestamp","desc")
        .onSnapshot((snap) => {
            setdisplay(snap.docs.map(dta => ({all_data : dta.data()})))
        })
    },[comment])
    return (
        <div className="comments" >
            {display.length != 0 ? <div className="comments__title" >COMMENTS :</div> : <div className="comments__title" >WE THE FIRST TO COMMENT </div>}
            {display.map(dsc => <div className="comments__posts" key={dsc.all_data.comments} ><strong>{dsc.all_data.username}</strong> {dsc.all_data.comments}  </div> )}


            {props.username ? <div className="comments__box" ><input className="comments__box__input" placeholder="Comment..." value={comment} onChange={event => setcomment(event.target.value)} />
            <button type="submit" onClick={() =>  posting_comment( props.id)}>POST</button></div> : <h5>FIRST LOGIN TO DO POST</h5> }
        </div>
    )
}

export default Replies
