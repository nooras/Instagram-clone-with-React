import React, {useState, useEffect} from 'react';
import './Post.css';
import Avatar from "@material-ui/core/Avatar"
import {db} from './firebase'
import firebase from "firebase"

function Post({ postId, user, username, caption, imageURL}){

    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState("");

    useEffect(() => {
        let unsubscribe;

        if(postId){
            unsubscribe = db.collection("posts")
            .doc(postId)
            .collection("comments")
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => {
                setComments(snapshot.docs.map((doc)=> doc.data()));
            });
        }

        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event) => {
        event.preventDefault();
        db.collection("posts").doc(postId).collection("comments").add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        setComment("");
    }

    return (
        <div className="post">
            <div className="post_header">
                <Avatar className="post_avatar" alt={username} src="/static/images/avatar/1.jpg" />
                <h3>{username}</h3>
                
            </div>
            <img 
                    className="post_image"
                    src={imageURL}
                    alt="post_image"
                />
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
            {comments.map((comment) => (
            <div className="post_comments">
                 
                     <p>
                         <b>{comment.username}</b> {comment.text}
                     </p>
            </div>
            ))}

            {user && (
                <form className="post_comment">
                <input
                    className="post_input"
                    type="text"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    disabled={!comment}
                    className="post_button"
                    type="submit"
                    onClick={postComment}
                >
                    Post
                </button>
            </form>
            )}

        </div>
    )
}

export default Post;

// import React from 'react';

// function Post(){
//     return (
//         <div>
//         </div>
//     )
// }

// export default Post;