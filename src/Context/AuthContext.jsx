import { createContext, useContext, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import {auth} from '../FireBase/config'
import { useState } from 'react';
import { doc,getDoc,setDoc} from 'firebase/firestore';
import { db } from '../FireBase/config'
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
        //console.log(auth.currentUser);
        setLoading(false);
      })
    }, [])
    
    const signup = async (email,password) =>  {
        const credentials = await createUserWithEmailAndPassword(auth, email, password);
        const decks = {};
        const newUser = {email, decks}
        await setDoc(doc(db, "users", credentials.user.uid), {...newUser});
        setUserID(credentials.user.uid);
        return credentials;
    }

    const loginWithGoogle = async () =>{
        const googleProvider = new GoogleAuthProvider();
        let currentUser;
        let flag = await signInWithPopup(auth,googleProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            currentUser = result.user
            // IdP data available using getAdditionalUserInfo(result)
            // ...
          }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
          
          try
          {
            const docRef = doc(db, "users", currentUser.uid);
            const docSnap = await getDoc(docRef);
            setUserID(currentUser.uid);
            if(!docSnap.data()){
                let email = currentUser.email;
                const decks = {};
                const newUser = {email, decks}
                await setDoc(doc(db, "users", currentUser.uid), {...newUser});
            }
          }
          catch(error)
          {
            console.log(error.message);
          }
    }
    

    const updateUserData = (userName, urlPicture) => updateProfile(auth.currentUser, {
    displayName: userName, photoURL: urlPicture
    }).then(() => {

    }).catch((error) => {
        
    });

    function setUserID(ID){
      sessionStorage.setItem('userUid', ID);
      console.log(sessionStorage.getItem('userUid'));
    }

    const updateUserProfilePicture = (urlPicture) => updateProfile(auth.currentUser, {photoURL:urlPicture});

    const login = async (email,password) => {
      let result  = await signInWithEmailAndPassword(auth,email,password)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        currentUser = result.user
        setUserID(currentUser.uid)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
      return result
    }

    const closeSession = () => signOut(auth);

    return(
        <authContext.Provider value={{signup, login, user, loading, closeSession,loginWithGoogle, updateUserProfilePicture}}>
            {children}
        </authContext.Provider>
    )
}