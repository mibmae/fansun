import React, { useRef, useEffect, useState } from 'react';
import './styles.scss';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import swal from 'sweetalert';
import { useNavigate, Link, Navigate } from "react-router-dom";
import store from 'src/store';

function Login({ login, setAdmin, setUserInfos }) {
    const formLogin = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [error, setError] = useState(0);

    const onSubmit = (e) => {
        let datas = [];
        datas.push(document.getElementById('user').value)
        datas.push(document.getElementById('password').value)
        e.preventDefault();
        fetch(`https://serveur.fansun.webmg.eu/auth/signin`, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
        },
      }).then((response) => {
        response.json().then((res) => {
          if (response.status === 200) {
          if (res.user.admin === 'true') {
            setUserInfos(res.user)
            localStorage.setItem('token_fansun_admin', res.token)
            swal({
              title: 'Connexion en cours',
              icon: 'success',
              buttons: false,
              timer: 3000,
            });
            setTimeout(() => {
              window.location.href = "/account"; 
            }, 4000); 
          } else {
            setUserInfos(res.user)
          localStorage.setItem('token_fansun', res.token)
          swal({
            title: 'Connexion en cours',
            icon: 'success',
            buttons: false,
            timer: 3000,
          });
          
          setTimeout(() => {

            window.location.href = "/account"; 
          }, 4000); 
          }
        }
        if (response.status !== 200) {
          swal({
            title: 'Utilisateur ou mot de passe incorrect',
            icon: 'error',
            // showConfirmButton: false,
            timer: 5000,
          });
          let errornb = error;
          const newerror = errornb + 1
          setError(newerror)
          if (newerror > 2) {
            document.getElementById('forgotmsg').innerHTML = 'Si vous avez oublié votre mot de passe, cliquez sur "Mot de passe oublié".'
          }
          document.getElementById('password').value = "";
        }
        });
      });
    }
useEffect(() => {
 window.scrollTo({
  top: 0,
  left: 0,
  behavior: "smooth",
 })
}, [])

useEffect(() => {

}, [error])



  return (
<>
{store.getState().User.logged !== true ? (
<div className="wrapperlogin">
        <div className="login_title">Se connecter</div>
  <form className="logine" ref={formLogin} id="login_form" onSubmit={(e) => onSubmit(e)}>
    
    <input type="text" id="user" placeholder="Nom d'utilisateur" autoFocus />
    <i className="fa fa-user"></i>
    <input type="password" id="password" placeholder="Mot de passe" />
    <i className="fa fa-key"></i>
    <Link to="/lost">Mot de passe oublié ?</Link> <div id="forgotmsg"></div>
    <button>
      <i className="spinner"></i>
      <span className="state">S'identifier</span>
    </button>
  </form>
  <Link to="/register"><div className="create_login">Pas de compte ? Créez en un !</div></Link>
</div>
) : (
  <Navigate replace to="/account" />
)}
</>
 );
}


Login.propTypes = {
    login: PropTypes.func,
    setAdmin: PropTypes.func,
  };
  
  Login.defaultProps = {
    login: () => {},
    setAdmin: () => {},
  };

export default Login;
