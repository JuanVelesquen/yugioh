import React from 'react'
import { useState } from 'react';
/*import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../FireBase/config'*/
import { useAuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import '../Style/Register.css'
import Swal from 'sweetalert2'

const RegisterAccount = () => {

    const {signup} = useAuthContext();
    const navigate = useNavigate();

    const [valores, setValores] = useState({
        email:"",
        password:"",
        name:""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(valores.email,valores.password);
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
        <div className="mb-3 rg" >
            <input
            type="email"
            name='email' 
            placeholder='Email'
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            value={valores.email}
            onChange={handleValores} 
            autoComplete="email"
            />
        </div>
        <div className="mb-3 rg" >
            <input
            type="password"
            name='password' 
            placeholder='Password'
            className="form-control" 
            id="exampleInputPassword1"
            value={valores.password}
            onChange={handleValores}
            autoComplete='new-password'
            />
        </div>
        <button type="button" onClick={handleSubmit} className="btn btn-primary btn-Signup">Sign up</button>
    </form>
  )
}

export default RegisterAccount

/*        
    <div className="mb-3">
    <input
    type="text"
    name='name' 
    placeholder='Name'
    className="form-control" 
    id="name" 
    value={valores.name}
    onChange={handleValores} 
    />
    </div>
*/