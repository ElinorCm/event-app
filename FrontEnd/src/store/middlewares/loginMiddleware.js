import axios from 'axios';
import { submitLoginSuccess, submitLoginError, getEvents, getUsers, LOGOUT} from '../actions';
import { SUBMIT_LOGIN, } from '../actions';

const loginMiddleware = (store) => (next) => (action) => {
  
  if (action.type === SUBMIT_LOGIN) {

    console.log('loginMiddleware');
    next(action);

    const state = store.getState();

    const config = {   
      method: 'post',
      url: 'https://sonow.herokuapp.com/api/user/login', 
      headers: { 
        'content-type': 'application/json; charset=utf-8', 
        'Access-Control-Allow-Origin': '*'
      }, 
      data: {
        email: state.login.emailInput,
        password:  state.login.passwordInput
      }
    }

    axios(config)
      .then((response) => {
        console.log(`submit login success ${response.data}`);
        store.dispatch(submitLoginSuccess(response.data.accessToken, response.data.refreshToken, response.data.user));
        localStorage.setItem('accessToken', `${response.data.accessToken}`);
        localStorage.setItem('refreshToken', `${response.data.refreshToken}`);
        store.dispatch(getEvents());
        store.dispatch(getUsers());
      })
      .catch(() => {
        store.dispatch(submitLoginError());
      });
  
    } else if (action.type === LOGOUT) {
    
    console.log('logoutMiddleware');
    next(action);

    const config = {   
      method: 'get',
      url: 'https://sonow.herokuapp.com/api/user/logout', 
      headers: { 
        'content-type': 'application/json; charset=utf-8', 
        'Access-Control-Allow-Origin': '*'
      }, 
    }

    axios(config)
      .then(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        console.log(`submit logout`);
      })
      .catch((error) => {
        console.log(error);
      });

  } else {
    next(action);
  }
};

export default loginMiddleware;