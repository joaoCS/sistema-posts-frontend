import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import './style.css';

import api from '../../services/api';

import * as UserActions from '../../store/actions/user';

function Header ({ user, assignUser }) {
   
    useEffect(()=>{

        if (localStorage.authToken === undefined) {
            localStorage.authToken = '';
            console.log('Entrei aqui');
        }
        
        async function handleAuthorization () {
            if (localStorage.authToken !== '') {
                try {
                    const response = await api.get('/checktoken', {
                        headers: { 
                            authorization: 'Bearer ' +  localStorage.authToken
                        }
                    });

                    assignUser(response.data)
                }
                catch(err) {
                    console.log(err.response);
                    localStorage.setItem('authToken', '');
                } 
            }
            
        }

        handleAuthorization();

    }, [assignUser]);

    return (
        <header className="headerContainer">
            <div className="content">
            
            <span id="app-name"><a href="/">Sistema de posts</a></span>

            { user.name ? (<a href="/post">Criar post</a>) : (<div></div>)}

            { user.name ? (<span>{user.name} &nbsp; &nbsp;&nbsp;<a href="/logout">Sair</a></span>) : (<div><a href="register">Registrar-se</a> <a href="/login">Entrar</a></div> )}
            
            </div>
        </header>
    );
}


const mapStateToProps = state => ({
    user: state.user.userData
});

const mapDispatchToProps = dispatch => ({
    assignUser: (user) => dispatch(UserActions.assignUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);