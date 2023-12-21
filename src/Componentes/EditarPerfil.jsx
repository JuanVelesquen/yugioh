import React from 'react'
import { useAuthContext } from '../Context/AuthContext'
import profilePhotoDefault from '../Recursos/Imagenes/ProfilePictures/Profile0.jpg'
import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import '../Style/EditarPerfil.css'

const EditarPerfil = () => {

    const {user, loading, updateUserProfilePicture} = useAuthContext()
    const [valores, setValores] = useState({
        name:"",
        password:""
    })

    useEffect(() => {
        if(!loading){

        }
    }, [loading,user])
    const handleSaveChanges = async () => {
        
    }

    const handleChangeAvatar = async () => {
        const { value: profilePicture } = await Swal.fire({
            title: "Select a profile picture",
            input: "select",
            inputOptions: {
              Pictures:{
                1 : "Profile 1",
                2 : "Profile 2",
                3 : "Profile 3",
                4 : "Profile 4",
                5 : "Profile 5",
                6 : "Profile 6",
                7 : "Profile 7",
                8 : "Profile 8",
                9 : "Profile 9",
                10 : "Profile 10",
                11 : "Profile 11",
                12 : "Profile 12"
              }
            },
            showCancelButton: true
            })
            
            let str = '../Recursos/Imagenes/ProfilePictures/Profile'+String(profilePicture).trim()+'.jpg';
            if(profilePicture){
                try
                {
                    await updateUserProfilePicture(str);
                    Swal.fire({
                        icon: "success",
                        title: "Your profile picture has been updated",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }catch(error)
                {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: error.message,
                        footer: '<a href="#">Why do I have this issue?</a>'
                      });
                }
            }
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
    <>
    {loading ?
    <h2>Is Loading...</h2>
:
<>
<div className='editContainer container-xxl'>
<h2 className='titleEditProfile'>Edit Profile</h2>
        <div className='avatarPictureContainer'>
            <h5 className='titleAvatarPicture'>Avatar</h5>
            {user.photoURL ?
            <img className='avatarPicture' src={user.photoURL} alt="" />
            :
            <img className='avatarPicture' src={profilePhotoDefault} alt="" />
            }
            
        </div>
        <div className='btnSaveAvatarContainer'>
        <button onClick={handleChangeAvatar} className='btn-Save Avatar'>Change avatar</button>
            <p className='btnDescription'>Change your profile picture to any of the photos we provide.</p>
        </div>
        <input
        type="text"
        name='name' 
        placeholder='Username'
        className="inputNameDisplay" 
        id="name" 
        value={valores.name}
        onChange={handleValores} 
        />
    <button onClick={handleSaveChanges} type="button" className="btn btn-primary btn-Save Changes">Save changes</button>

</div>
</>
}
   
    </>
  )
}

export default EditarPerfil