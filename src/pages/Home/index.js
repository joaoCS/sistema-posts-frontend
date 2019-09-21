import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import api from '../../services/api';
import './styles.css';

import * as UserActions from '../../store/actions/user';

const Home = ({ user, assignUser }) => {

    const [posts, setPosts] = useState([]);
    const [loadedCommentUsers, setLoadedCommentUsers] = useState(false);
    const [commentText, setCommentText] = useState('');
    
    useEffect(()=>{
        
        const  loadPosts = async () => {
            try {
                const obj = await api.get('/posts');

                const postsArray = obj.data;

               await Promise.all (postsArray.map(async post => {
                    await Promise.all(post.comments.map(async (comment) => {
                        let userId = comment.user;
                        let user = await api.get(`/user/${userId}`);
                        
                        comment.user = user.data;

                        
                    }));
                }));

                setLoadedCommentUsers(true);

                setPosts(postsArray);

            }
            catch(err) {
                console.error(err);
            }
        }

        loadPosts();
        
    }, []);

    function deletePost(postId){
        api.delete(`/post/${postId}`, {
            headers: {
                authorization: "Bearer " + localStorage.authToken
            }
        });


        let newPosts = posts.filter(post => {
            return post._id !== postId
        });

        setPosts(newPosts);
    }

    async function handleComment(event, postId) {
        event.preventDefault();

        if (commentText !== '') {
            const res = await api.post('/comment', {
                text: commentText,
                postId
            }, {
                headers: {
                    authorization: "Bearer " + localStorage.authToken
                }
            });

            const comment = res.data;

            const userId = String(comment.user)

            let user = await api.get(`/user/${userId}`);
                        
            comment.user = user.data;

            let postsArray = posts;

            postsArray.map(post => {
                if (post._id === postId) {
                    
                    post.comments.push(comment);

            
                }
            });

            setPosts(postsArray);
            setCommentText('');
        }
    }

    return (
        loadedCommentUsers ? 
        (<div className="container">
        {posts.map(post => {
            return (
                    <div className="post-body" key={post._id}>
                        <strong> {post.user.name} > {post.title}</strong>
                        { post.user._id === user._id ? (<a href={`/editpost/${post.title}/${encodeURIComponent(post.image)}/${post._id}`}>Editar</a>) : (<div></div>)}
                        
                        { post.user._id === user._id ? (<button onClick={()=> deletePost(post._id)}>Excluir</button>):(<div></div>)}
                        <img src={post.image} alt="Imagem do post"/>

                        <div className="comments">
                            Comentários: {post.comments.length}
                            {post.comments.map(comment => {
                                return (
                                    <div className="comment" key={comment._id}>
                                       <strong className="commentUser">{comment.user.name}</strong> {comment.text}
                                    </div>
                                );
                            })}

                            { user.name !== undefined ?
                             (<form onSubmit={(e) => handleComment(e, post._id)}>
                                <label>Fazer comentário:</label>
                                <textarea value={commentText} onChange={(e)=>setCommentText(e.target.value)} 
                                          type="text"  placeholder="Digite aqui seu comentário"
                                />
                                <input type="submit" value="Comentar"/>
                             </form>)
                                    : 
                                (<div></div>) }
                        </div>
                    </div>
            );
        })}
    </div>) 
    
    : 
     
    (<h1>Carregando...</h1>)

    );
};



const mapStateToProps = state => ({
    user: state.user.userData
});

const mapDispatchToProps = dispatch => ({
    assignUser: (user) => dispatch(UserActions.assignUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
