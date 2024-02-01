import React from 'react'
import { useState} from 'react';
import { doc,setDoc, getDoc } from 'firebase/firestore';
import { db } from '../FireBase/config'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../Context/AuthContext';
import { useEffect } from 'react';
import '../Style/SignIn.css'
import googleLogo from '../Recursos/Imagenes/GoogleLogo.png'
import Swal from 'sweetalert2'

const SingIn = () => {
    const {login, user, loading, loginWithGoogle} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if(user){navigate('/Home');}
    }, [loading, user])
      
    const [valores, setValores] = useState({
        email:"",
        password:""
    })
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(valores.email,valores.password);
            navigate('/Home');
        } catch (error) {
            let str = '';
            switch(error.code){
                case 'auth/missing-email':
                    str = "Missing email";
                    break;
                case 'auth/invalid-email':
                    str = "Invalid email";
                    break;
                case 'auth/missing-password':
                    str = "Missing password";
                    break;   
                case 'auth/email-already-in-use':
                    str = "Email is already in use";
                    break;
                case 'auth/weak-password':
                    str = " Password should be at least 6 characters ";
                    break;
                case 'auth/invalid-credential':
                    str = "Invalid email or password";
                    break;
                default:
                    str = error.message.substring(10);
                    break;
            }

            Swal.fire({
                title: 'Error!',
                text: str,
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
        //Agregar informacion a la base de datos
        /*console.log("Enviado..",{valores});
        const usuarioRef = collection(db,"Usuarios");
        addDoc(usuarioRef,valores);*/

        //Recuperar informacion de la base de datos con una simple Query
        /*const usuarioRef = collection(db,'Usuarios');
        if (valores.email){
            console.log(valores.email)
            const q = query(usuarioRef,where('email', '==',valores.email));
            getDocs(q)
            .then((response) => {
                    response.docs.map( (resp) => {
                        console.log(resp.data())
                    })
                }
            )
        }*/
        
    }

    const handleGoogleEvent = async () => {
        const user = await loginWithGoogle();
        //await getDoc(doc(db,'users'))
        
        navigate('/Home');
    }
    

    const handleValores = (e) => {
        setValores(
            {
                ...valores,
                [e.target.name] : e.target.value
            }
        )
    }

  return (
    <form className="m-5">
        <div className="mb-3 sgIn">
            <input
            type="email"
            name='email' 
            placeholder='Email'
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            value={valores.email}
            onChange={handleValores} 
            autoComplete='email'
            />
        </div>
        <div className="mb-3 sgIn">
            <input
            type="password"
            name='password' 
            placeholder='Password'
            className="form-control" 
            id="exampleInputPassword1"
            value={valores.password}
            onChange={handleValores}
            autoComplete='current-password'
            />
        </div>
            <button onClick={handleSubmit} type="button" className="btn btn-primary btn-SignIn">Sign in</button>
            <button onClick={handleGoogleEvent} type="button" className="btn btn-primary btn-SignIn google">
                Sign in with
                <img className='google-logo' src={googleLogo} alt="" />
            </button>
    </form>
  )
}

export default SingIn
