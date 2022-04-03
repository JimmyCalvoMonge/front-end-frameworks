import React from 'react';
import axios from 'axios';

class Login extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {error: false};
    }

    handleSubmit = (event) => {
        
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

        
            //Cambiamos el LoginOk a true en el componente App, padre, después de 2 segundos.
            var that = this;
            setTimeout(function() {
                that.props.onLoginComplete(true);  
            }, 2000);

            //La tarjeta de error se oculta, o no se muestra al cambiar error a false.
            this.setState({
                error:false,
            })

        })
        .catch(error => {

            // Si hay un error mostramos una tarjeta que lo señala.
            // Esta tarjeta se muestra solo si error=true

            console.log("Error (status):", error.response.status);
            this.setState({
                error:true,
            });
        })
        
    };

    render(){

        return (

            <div className="center-div">

                <h1>Login to your Account</h1>

                {this.state.error===true && 
                <div className="card text-white bg-danger mb-3">
                <div className="card-header">Invalid email or password</div>
                </div>}

                <form onSubmit={this.handleSubmit}>

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
        
        
    }

}

export default Login;