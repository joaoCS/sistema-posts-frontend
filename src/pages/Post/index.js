import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';


import * as UserActions from '../../store/actions/user';

function Post ({ history, user, assignUser }) {

    const [postText, setPostText] = useState('');
    const [postImage, setPostImage] = useState('');
    
    if(localStorage.authToken === '' ) {
        history.replace('/');
    }

    async function handlePost (event) {
        event.preventDefault();

        if (postText !== '' && postImage !== '') {
            try{
                await api.post('/post', {
                    title: postText,
                    image: postImage
                }, {
                    headers: {
                        authorization: 'Bearer ' + localStorage.authToken
                    }
                });
            }
            catch(err) {

            }

            history.replace('/');
        }
    }

    return (
        <form onSubmit={handlePost}>
            <textarea placeholder="Digite um texto para o post" 
                      value={postText} onChange={(e) => setPostText(e.target.value)}
            />

            <input type="text" placeholder="Entre com um endereço de uma imagem"
                   value={postImage} onChange={(e)=>setPostImage(e.target.value)}
            />

            <input type="submit" value="Criar post"/>
        </form>
    );
}

const mapStateToProps = state => ({
    user: state.user.userData
});

const mapDispatchToProps = dispatch => ({
    assignUser: (user) => dispatch(UserActions.assignUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);