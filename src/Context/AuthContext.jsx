import { createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import {auth} from '../FireBase/config'
import { useState } from 'react';
export const authContext = createContext();

export const useAuthContext = () => {
    const context = useContext(authContext);
    if(!context)throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

export function AuthProvider({children}){

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        console.log(auth.currentUser);
        setLoading(false);
      })
    }, [])
    
    const signup = (email,password) => createUserWithEmailAndPassword(auth, email, password) 

    const loginWithGoogle = () =>{
        const googleProvider = new GoogleAuthProvider()
        signInWithPopup(auth,googleProvider);
    }
    

    const updateUserData = (userName, urlPicture) => updateProfile(auth.currentUser, {
    displayName: userName, photoURL: urlPicture
    }).then(() => {

    }).catch((error) => {
        
    });

    const updateUserProfilePicture = (urlPicture) => updateProfile(auth.currentUser, {photoURL:urlPicture});

    const login = (email,password) => signInWithEmailAndPassword(auth,email,password);

    const closeSession = () => signOut(auth);

    return(
        <authContext.Provider value={{signup, login, user, loading, closeSession,loginWithGoogle, updateUserProfilePicture}}>
            {children}
        </authContext.Provider>
    )
}