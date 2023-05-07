import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore"
import { AiFillLike, AiOutlineLike } from "react-icons/all"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"

/* eslint-disable react/prop-types */
export default function Post({ post }) {
    const [likes, setLikes] = useState(null)
    const [user] = useAuthState(auth)
    const likesRef = collection(db, "likes")

    const likesDoc = query(likesRef, where("postId", "==", post.id))

    const getLikes = async() => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map(doc => ({userId: doc.data().userId, likeId: doc.id})));
    }

    const likePost = async () => {
        try {
            const newDoc = await addDoc(likesRef, {
                userId: user?.uid,
                postId: post.id
            })
            if(user){
                setLikes(prev => prev ? [...prev, {userId: user?.uid, likeId: newDoc.id}] : [{userId: user?.uid, likeId: newDoc.id}])
            }}
        catch(error){
            console.log(error);
        }
    }

    const unLikePost = async () => {
        try {
            const unlikeDoc = query(
                likesRef, 
                where("postId", "==", post.id), 
                where("userId", "==", user?.uid)
            )

            const unLikeData = await getDocs(unlikeDoc)
            const unlike = doc(db, "likes", unLikeData.docs[0].id)

            await deleteDoc(unlike)
            if(user){
                setLikes(prev => prev && prev.filter(like => like.likeId !== unLikeData.docs[0].id))}
            }
        catch(error){
            console.log(error);
        }
    }

    const hasUserLiked = likes?.find(like => like.userId === user?.uid)

    useEffect(() => {
        getLikes()
    }, [])

    return (
        <div className="post">
            <div className="title">
                <h2>{post.title}</h2>
            </div>
            <div className="title">
                <p>{post.description}</p>
            </div>
            <div className="creator">
                <div className="likes">
                    <div onClick={hasUserLiked ? unLikePost : likePost}>
                        {!hasUserLiked ?
                        <AiOutlineLike className="like-btn" />
                        :
                        <AiFillLike className="like-btn" />
                        }
                    </div>
                    {likes && <span>{likes?.length}</span>}
                </div>
                <i>@{post.username}</i>
            </div>
        </div>
    )
}
