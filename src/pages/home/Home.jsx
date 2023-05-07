import {getDocs, collection} from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useEffect, useState } from "react"
import Post from "./post"
import { useAuthState } from "react-firebase-hooks/auth"

export default function Home() {
    const [user] = useAuthState(auth)
    const [postsList, setPostLists] = useState()
    const postsRef = collection(db, "posts")

    const getPosts = async () => {
        const data = await getDocs(postsRef)
        setPostLists(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className="posts">
            {!user && <h1 className="ref">You need to login</h1>}
            {postsList?.map(post => (
                <Post key={post.id} post={post} />
            ))}
        </div>
    )
}
