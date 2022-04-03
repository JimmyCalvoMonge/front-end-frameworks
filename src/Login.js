import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from 'axios';

// La componente Login ahora es funcional, utilizando Hooks.

/* Aclaración: He utilizado useNavigate de react-router-dom
para que cuando el usuario se autentica entonces me redirija a la página de los posts */


function Login ({onLoginComplete}){

    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function handleSubmit (event) {

        event.preventDefault()

        const body = {
            username: event.target.email.value,
            password: event.target.password.value,
        }

        const headers = {
            'Content-Type': 'application/json',
        };

        axios.post("https://three-points.herokuapp.com/api/login", body, {headers}, {withCredentials:true}).then(response => {
            
            console.log("Success (status):", response.status);

            //Tenemos un éxito (200) en nuestra post request, 
            //así que guardamos el token en el localStorage
            //del navegador.

            localStorage.setItem('token', response.data.token);
            //También voy a guardar el username.
            localStorage.setItem('username', event.target.email.value);

            //Ejecutamos la función onLoginComplete que será utilizada por el componente padre
            setTimeout(function() {
                onLoginComplete(); 
                //Enviamos al usuario a la página de inicio donde se encuentran los posts.
                navigate("/"); 
            }, 2000);

            //La tarjeta de error se oculta, o no se muestra al cambiar error a false.
            setError(false)

        })
        .catch(error => {

            // Si hay un error mostramos una tarjeta que lo señala.
            // Esta tarjeta se muestra solo si error=true
            console.log("Error (status):", error.response.status);
            setError(true)
        })

    };

    return (

        <div className="center-div">

                <h1>Login to your Account</h1>

                {error===true && 
                <div className="card text-white bg-danger mb-3">
                <div className="card-header">Invalid email or password</div>
                </div>}

                <form onSubmit={handleSubmit}>

                <div className='row w-50 mx-auto pt-5'>
                    <label>Email</label>
                    <input type="text" placeholder="User email" name="email"></input>
                </div>

                <div className='row w-50 mx-auto pb-5'>
                    <label>Password</label> 
                    <input type="password" placeholder="Password" name="password"></input>
                </div>

                    <button className="btn btn-primary btn-block" type="submit">Login</button>
                </form>
        </div>
    
    )

};

export default Login;