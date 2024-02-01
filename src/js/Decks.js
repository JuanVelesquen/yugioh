import { db } from '../FireBase/config'
import { doc,getDoc, setDoc} from 'firebase/firestore';
import { useState,useEffect } from "react";

export const useFirebaseDecks = () =>{
    const [decks,setDecks] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchDecks = async() =>{
        try{
            const docRef = doc(db, "users", sessionStorage.getItem('userUid'));
            const docSnap = await getDoc(docRef);
            setDecks(docSnap.data().decks);
            setIsLoading(false)
        }
        catch(error){
          console.error();
        }
  }

  useEffect(() =>{
        fetchDecks();
  },[])

  return {
    decks,
    isLoading
  }
}

export const postDeck = async (deck) =>{
  const ID = sessionStorage.getItem('userUid');
  const deckLength = sessionStorage.getItem('currentDeck');
  const docRef = doc(db, "users", ID);
  const docSnap = await getDoc(docRef);
  const user = docSnap.data();
  
  if(user){
      const email = user.email;
      const decks = user.decks;
      const currentDeckLength = Object.keys(decks).length;
      let array = [];
      deck.map((card) => 
      {
      array.push({id: card.id, img: card.img, pos:card.pos})
      })
      decks[deckLength-1] = array;
      const currentUser = {email, decks}
      try{
        await setDoc(doc(db, "users", ID), currentUser);
      }
      catch(error){
        return error;
      }
      return true;
      
  }
}