import React, { useState } from 'react';
import api from '../../services/api';
import './style.css';

import { connect } from 'react-redux';

function ResetPassword ({user, assignUser, history, match}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    if (user.name)
      history.replace('/');

    async function handleResetPassword(e) {
        e.preventDefault();
        
        if (email !== '' && password !== '') {
            try {
                const res = await api.post('/reset_password', {
                    email, 
                    password,
                    token: match.params.resetPasswordToken
                });

                setErrorMessage('');

                history.push('/');
            }
            catch(err) {
                 
                setErrorMessage(err.response.data.error);
            }
        }
    }

    return (
        <div>
            <h2>Redefinir senha</h2>
            <form onSubmit={handleResetPassword} id="login-form">
                <label>Email:</label>
                <input type="text" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="Digite seu email"/>
                <label>Senha:</label>
                <input type="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder="Digite sua senha"/>
                <input type="submit" value="Entrar"/>

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


export default connect(mapStateToProps)(ResetPassword);