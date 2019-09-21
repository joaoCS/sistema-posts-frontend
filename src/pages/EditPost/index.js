import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';


import * as UserActions from '../../store/actions/user';

function EditPost ({ history, user, assignUser, match }) {

    const [postText, setPostText] = useState(match.params.title);
    const [postImage, setPostImage] = useState(decodeURIComponent(match.params.image));
    
    if(localStorage.authToken === '' ) {
        history.replace('/');
    }

    async function handlePost (event) {
        event.preventDefault();

        if (postText !== '' && postImage !== '') {
            try{
                await api.put(`/post/${match.params.postId}`, {
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

            <input type="submit" value="Salvar alterações"/>
        </form>
    );
}

const mapStateToProps = state => ({
    user: state.user.userData
});

const mapDispatchToProps = dispatch => ({
    assignUser: (user) => dispatch(UserActions.assignUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);