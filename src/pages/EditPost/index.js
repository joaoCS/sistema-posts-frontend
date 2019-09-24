import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';
import firebase from '../../services/firebase';

import './styles.css';

import * as UserActions from '../../store/actions/user';

function EditPost ({ history, user, assignUser, match }) {

    const [postText, setPostText] = useState(match.params.title);
    const [postImage, setPostImage] = useState('');


    
    async function getImageUrl() {
        let image_url = await firebase.storage.ref('images').child(decodeURIComponent(match.params.image_name)).getDownloadURL();
        setPostImage(image_url);
    }

    getImageUrl();
    

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
        <div id="edit-form-container">
            <h2>Editar Post</h2>
            <form onSubmit={handlePost}>
                <textarea placeholder="Digite um texto para o post" 
                        value={postText} onChange={(e) => setPostText(e.target.value)}
                />

                <img src={postImage} alt="Capa do post"/>

                <input type="submit" value="Salvar alterações"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);