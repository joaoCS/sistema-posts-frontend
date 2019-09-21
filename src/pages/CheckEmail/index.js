import React, { useState } from 'react';
import api from '../../services/api';
import './style.css';

import { connect } from 'react-redux';

 function CheckEmail ({user, history}) {
    if (user.name)
      history.replace('/');

    return (
        <h2>Confira seu email para redefinir sua senha</h2>
    );
}


const mapStateToProps = state => ({
    user: state.user.userData
});


export default connect(mapStateToProps)(CheckEmail);