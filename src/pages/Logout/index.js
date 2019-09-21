import React from 'react';

import { connect } from 'react-redux';
import * as UserActions from '../../store/actions/user';


function Logout ({ user, assignUser, history }) {
    
    localStorage.setItem('authToken', '');
    assignUser({});
    history.replace('/');
    return (
      <div></div>
    );
}


const mapStateToProps = state => ({
  user: state.user.userData
});

const mapDispatchToProps = dispatch => ({
  assignUser: (user) => dispatch(UserActions.assignUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);