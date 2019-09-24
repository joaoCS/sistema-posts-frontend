import React, { useState } from 'react';
import api from '../../services/api';
import './style.css';

import { connect } from 'react-redux';

import * as UserActions from '../../store/actions/user';

 function Login ({user, assignUser, history}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    if (user.name)
      history.replace('/');

    async function handleLogin(e) {
        e.preventDefault();
        
        if (email !== '' && password !== '') {
            try {
                const res = await api.post('/authenticate', {
                    email, 
                    password
                });

                localStorage.setItem('authToken', res.data.token);

                assignUser(res.data.user);

                setErrorMessage('');

                history.push('/');
            }
            catch(err) {
                 
                setErrorMessage('Email ou senha inválidos');
            }
        }
    }

    return (
        <div id="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin} id="login-form">
                <label>Email:</label>
                <input type="text" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="Digite seu email"/>
                <label>Senha:</label>
                <input type="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder="Digite sua senha"/>
                <input type="submit" value="Entrar"/>

                <br/>

                Ainda não possui uma conta? 
                
                <div className="footer">
                    <a href="/register">Registrar-se</a>

                    <a href="/forgotpassword" >Esqueci minha senha</a>    
                </div>

                {errorMessage !== '' ? (
                    <div id="error-message">
                        {errorMessage}
                    </div>)
                :
                    <div></div>}
            </form>
        </div>
     
    );
}


const mapStateToProps = state => ({
    user: state.user.userData
});

const mapDispatchToProps = dispatch => ({
    assignUser: (user) => dispatch(UserActions.assignUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);