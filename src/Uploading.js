import React, {useState} from 'react';
import firebase from 'firebase';
import {storage, db} from './firebase';
import {Card} from '@material-ui/core';
import './Uploading.css'


function Uploading(props) {
    console.log('this is uploading',props)
    const [image, setimage] = useState(null)
    const [caption , setcaption] = useState('')
    const [ progress, setprogress] = useState(0)
    console.log('this is progress',progress)

    const handlePhoto = (event) => {
        console.log(event.target.files[0])
        if (event.target.files[0]){
            setimage(event.target.files[0])
        }
    }


    const handleuploading = () => {
        if (image){
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        const beforehtml = document.getElementById("anmie").innerHTML

        // ADDING GIF TO LOADING
        document.getElementById("anmie").innerHTML = ``



        // ADDING A PROGRESS BAR
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
                setprogress(progress)
            },
            (error) => {
                alert(error.message)
            },
            () => {
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then((url) => {
                    db.collection('details').add({
                        image_caption : caption,
                        image_url : url,
                        username:props.username,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    })
                })
                setprogress(0)
                setcaption('')
                setimage(null)
                document.getElementById("anmie").innerHTML = beforehtml
            }
        )
        }
    }


    return (
        <Card className="innercard" >
            <progress className="innercard__progress" value={progress} max="100">{progress}%</progress>
            
            <div id="anmie">
                <input className="innercard__input" value={caption} placeholder="Your photo caption..." onChange = {(e) => setcaption(e.target.value)} />

                <div className="innercard__file" >
                    <input type='file' accept="image/*" onChange={handlePhoto} />
                </div>
                <div className="innercard__button" >
                    <button disabled={image === null }  onClick={handleuploading} >upload</button>
                </div>
            </div>
        </Card>
    )
}

export default Uploading
