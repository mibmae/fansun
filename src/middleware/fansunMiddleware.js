import {
    ADD_TO_CART,
    ADD_ALL_TO_CART,
    SIGNIN_BY_TOKEN,
    SIGNIN_BY_TOKEN_ADMIN,
  } from 'src/actions';
  import swal from 'sweetalert';
import { setUserInfos } from '../actions';

  const fansunMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
      case ADD_TO_CART: {
        if (localStorage.getItem('Cart') === null) {
            localStorage.setItem('Cart', '[]');
        }
        const founde = JSON.parse(localStorage.getItem('Cart')).find((item) => item.id === action.payload[0]);
        if (founde === undefined) {
          const new_data = {
            // action.payload[]
            // complete: g,
          };
          const old_data = JSON.parse(localStorage.getItem('Cart'));
          old_data.push(action.payload[0]);
          localStorage.setItem('Cart', JSON.stringify(old_data));
        }

        return next(action);
      };
      case ADD_ALL_TO_CART: {
        if (localStorage.getItem('Cart') === null) {
            localStorage.setItem('Cart', '[]');
        }
        action.payload.map((e) => {
           const founde = JSON.parse(localStorage.getItem('Cart')).find((item) => item.id === e.id);
          if (founde === undefined) {
            const new_data = {
              // action.payload[]
              // complete: g,
            };
            const old_data = JSON.parse(localStorage.getItem('Cart'));
            old_data.push(e);
            localStorage.setItem('Cart', JSON.stringify(old_data));
          }
        })
        

        return next(action);
      };

      case SIGNIN_BY_TOKEN: {
        const token = action.payload;
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        token: `${token}`,
      };

      fetch('https://serveur.fansun.webmg.eu/auth/signinbytoken', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
        }
        }).then((response) => {
          response.json().then((res) => {
            console.log(res)
            if (res.data.msg === 'ok') {     
              store.dispatch(setUserInfos(res.user[0]))
              if (res.data.newToken) {
              localStorage.setItem('token_fansun', res.data.newToken)
              }   
                 
                }
                else {
                  localStorage.removeItem('token_fansun');
                  // swal({
                  //   title: 'Session expirée',
                  //   icon: 'error',
                  //   showConfirmButton: false,
                  //   timer: 5000,
                  // });
                  setTimeout(() => {
                    window.location.href = '/';
                  }, 100);
                }
              });
          })
           
        return next(action);
      };
      case SIGNIN_BY_TOKEN_ADMIN: {
        const token = action.payload;
      const headers = { Authorization: `Bearer ${token}` };
      const body = {
        token: `${token}`,
      };

      fetch('https://serveur.fansun.webmg.eu/auth/signinbytokenadmin', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
        }
        }).then((response) => {
          response.json().then((res) => {
            console.log(res)
            console.log("res.msg", res.msg)
            if (res.msg === "Utilisateur non trouvé" || res.data.msg === 'TokenExpiredError' || res.data.msg === 'JsonWebTokenError' || res.data.msg === 'Token Invalid') {        
                  localStorage.removeItem('token_fansun_admin');
                  // swal({
                  //   title: 'Session expirée',
                  //   icon: 'error',
                  //   showConfirmButton: false,
                  //   timer: 5000,
                  // });
                  setTimeout(() => {
                    window.location.href = '/';
                  }, 2000);
                }
                else {
                  store.dispatch(setUserInfos(res.user[0]))
                  if (res.data.newToken) {
                  localStorage.setItem('token_fansun_admin', res.data.newToken)
                  }
                }
              });
          })
           
        return next(action);
      };


      
    }
    next(action);
  };
  
  export default fansunMiddleware;
  