import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const [user, setUser] = useState(null);

    const registerUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password )
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        return signOut(auth);
    }

    const googleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }

    const githubSignIn = () => {
        return signInWithPopup(auth, githubProvider)
    }

    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            console.log('activated again and again', currentUser);
        })
        return () => {
            unSubscribe();
        }
    },[])

    const authInfo = { user, registerUser, signInUser, logOut, googleSignIn, githubSignIn }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;