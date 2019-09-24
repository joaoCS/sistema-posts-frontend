import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';
import firebase from '../../services/firebase';

import * as UserActions from '../../store/actions/user';

import './style.css';

function Post ({ history, user, assignUser }) {

    const [postText, setPostText] = useState('');
    const [postImage, setPostImage] = useState(null);
    
    if(localStorage.authToken === '' ) {
        history.replace('/');
    }

    async function handleFile(e) {
        if (e.target.files[0]) {
            if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg') {
                setPostImage(e.target.files[0]);
            }
        }
    }

    async function handlePost (event) {
        event.preventDefault();

        if (postText !== '' && postImage !== null) {

            //console.log(postImage.name);

            const uploadTask = await firebase.storage.ref(`images/${postImage.name}`).put(postImage);

            let url = await firebase.storage.ref('images').child(postImage.name).getDownloadURL();

            if (url !== '') {
                try{
                    await api.post('/post', {
                        title: postText,
                        image: url,
                        image_name: postImage.name
                    }, {
                        headers: {
                            authorization: 'Bearer ' + localStorage.authToken
                        }
                    });
                }
                catch(err) {

                }
            }

            history.replace('/');
        }
    }

    return (
        <div id="post-form-container">
            <h2>Criar Post</h2>
            <form id="post-form" onSubmit={handlePost}>
            
                <textarea placeholder="Digite um texto para o post" 
                        value={postText} onChange={(e) => setPostText(e.target.value)}
                />

                <input type="file" onChange={handleFile}/>

                <input type="submit" value="Criar post"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Post);