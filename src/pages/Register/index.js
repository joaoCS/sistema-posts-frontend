import React, { useState } from 'react';
import api from '../../services/api';
import './style.css';

import { connect } from 'react-redux';

import * as UserActions from '../../store/actions/user';

 function Register ({user, assignUser, history}) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    if (user.name)
      history.replace('/');

    async function handleRegister(e) {
        e.preventDefault();
        
        if (name !== '' && email !== '' && password !== '') {
            try {
                const res = await api.post('/register', {
                    name,
                    email, 
                    password
                });

                localStorage.setItem('authToken', res.data.token);

                assignUser(res.data.user);

                setErrorMessage('');

                history.push('/');
            }
            catch(err) {
                
                setErrorMessage(err.response.data.error);
            }
        }
    }

    return (
        <div id="register-container">
            <h2>Registrar-se</h2>
            <form onSubmit={handleRegister} id="register-form">
                <label>Nome:</label>
                <input type="text" value={name} onChange={(e)=> {setName(e.target.value)}} placeholder="Digite seu nome"/>
                <label>Email:</label>
                <input type="text" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="Digite seu email"/>
                <label>Senha:</label>
                <input type="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder="Digite sua senha"/>
                <input type="submit" value="Registrar-se"/>

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

export default connect(mapStateToProps, mapDispatchToProps)(Register);