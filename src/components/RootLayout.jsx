import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from "firebase/auth";


export default function RootLayout() {
    const [user] = useAuthState(auth)
    const navigate = useNavigate()

    const signUserOut = async() => {
        await signOut(auth)
        navigate('/login')
    }
    return (
        <div>
            <div className="navbar">
                <NavLink to='/'>Home</NavLink>
                {!user ? 
                <NavLink to='/login'>Login</NavLink>
                :
                <NavLink to='/create-post'>Post</NavLink>
                }

                <div>
                    {user &&(
                        <>
                            <p className="name">{user?.displayName}</p>
                            <img src={user?.photoURL || ""} alt="" />
                            <button className="sign-out" onClick={signUserOut}>Log Out</button>
                        </>
                    )}
                </div>
            </div>
            <Outlet />
        </div>
    )
}
