import React, { useState } from 'react';
import api from '../../services/api';
import './style.css';

import { connect } from 'react-redux';

import * as UserActions from '../../store/actions/user';

 function ForgotPassword ({user, assignUser, history}) {

    const [email, setEmail] = useState('');
    
    const [errorMessage, setErrorMessage] = useState('');

    async function handleSendEmail(e) {
        e.preventDefault();
        
        if (email !== '') {
            try {
                const res = await api.post('/forgot_password', {
                    email
                });

                setErrorMessage('');

                history.push('/checkemail');
            }
            catch(err) {
                
                setErrorMessage(err.response.data.error);
            }
        }
    }

    return (
        <div>
            <h2>Esqueci minha senha</h2>
            <form onSubmit={handleSendEmail} id="login-form">
                
                <label>Email</label>
                <input type="text" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="Digite seu e-mail"/>
                
                <input type="submit" value="Enviar email"/>

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

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);