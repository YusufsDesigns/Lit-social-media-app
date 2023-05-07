import { useForm } from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from "react-router-dom"



export default function CreateForm() {
    const navigate = useNavigate()
    const [user] = useAuthState(auth)
    const schema = yup.object().shape({
        title: yup.string().required('You must add a title'),
        description: yup.string().required('You must add a description')
    })

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts")

    const createPost = async (data) => {
        await addDoc(postsRef, {
            ...data,
            username: user?.displayName,
            userId: user?.uid
        })
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit(createPost)}>
            <div>
                <input type="text" placeholder="Title..." {...register('title')} />
                <div>{errors.title?.message}</div>
            </div>
            <div>
                <textarea type="text" placeholder="Description..." {...register('description')} />
                <div>{errors.description?.message}</div>
            </div>
            <input type="submit" className="submit" />
        </form>
    )
}

