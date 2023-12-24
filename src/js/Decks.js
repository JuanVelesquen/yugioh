import { db } from '../FireBase/config'
import { doc,getDoc} from 'firebase/firestore';
import { useState,useEffect } from "react";
import { useAuthContext } from '../Context/AuthContext';

export const useFirebaseDecks = () =>{
  
    const {user, loading} = useAuthContext();
    const [decks,setDecks] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchDecks = async() =>{
        try{
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            setDecks(docSnap.data().decks);
            setIsLoading(false)
        }
        catch(error){
          console.error();
        }
  }

  useEffect(() =>{
    if(!loading){
        fetchDecks();
    }
  },[loading])

  return {
    decks,
    isLoading
  }
}