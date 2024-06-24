import React, { useRef, useState } from 'react';
import './styles.scss';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { signinByToken } from 'src/actions/';
import { useNavigate, Link } from "react-router-dom";
import store from 'src/store';
import { FaCity, FaBirthdayCake } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import swal from 'sweetalert';

function Register() {
     const formRegister = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorUser, setErrorUser] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    function checkPassword(password) {
        const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        const valid = regularExpression.test(password);
        if (!valid) {
          document.querySelector('#password').classList.add('invalid');
        }
        if (valid) {
          document.querySelector('#password').classList.remove('invalid');
          document.querySelector('#password').classList.add('valid');
        }
        // }
      }

      const checkUsername = (username) => {
        fetch(`https://serveur.fansun.webmg.eu//auth/checkusername/${username}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          response.json().then((user) => {
            if (user.status === 401) {
              setErrorUser(true);
              document.getElementById('user').classList.add('invalid')
            } else {
              document.getElementById('user').classList.remove('invalid')
              setErrorUser(false);
            }
          })
      })
    }
      const checkEmail = (email) => {
        if (isValidEmail(email)) {
        fetch(`https://serveur.fansun.webmg.eu//auth/checkemail/${email}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => {
          response.json().then((user) => {
            if (user.status === 401) {
              setErrorEmail(true);
              document.getElementById('email').classList.add('invalid')
            } else {
              document.getElementById('email').classList.remove('invalid')
              setErrorEmail(false);
            }
          })
      })
    } else {
      document.getElementById('email').classList.add('invalid')
    }
    }

    const isValidEmail = email =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

    const onSubmit = (data, event) => {
        event.preventDefault();
        const formC = document.getElementById('register_form');
        const datas = Object.fromEntries(new FormData(formC).entries());
          if (errorEmail === false && errorUser === false) {
        fetch('https://serveur.fansun.webmg.eu/auth/register', {
          method: 'POST',
          body: JSON.stringify(datas),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).then((response) => {
            
          response.json().then((account) => {
            if (account.status === 200) {
              swal({
                title: 'Votre compte à bien été créé',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              setTimeout(() => {
                window.location.href = "/login"; 
              }, 2000);
            }
            if (account.status === 401) {
              swal({
                title: 'Un utilisateur existe déjà avec cette adresse mail ou ce pseudo',
                icon: 'error',
                showConfirmButton: false,
              });
            }
        })
    })
  } else {
    swal({
      title: 'Un utilisateur existe déjà avec cette adresse mail ou ce pseudo',
      icon: 'error',
      showConfirmButton: false,
    });
  }
    }
  return (
    <div className="wrapper">
        <div className="formations_title">S'inscrire</div>
        {/* <form ref={formRegCon} id="form_chauffeur" className="register_form chauffeur" name="form_chauffeur" onSubmit={handleSubmit(regChauffeur)}></form> */}
    <form className="registere" ref={formRegister} id="register_form" name="register_form" onSubmit={handleSubmit(onSubmit)}>
      {/* <p className="title">Créer un compte</p> */}
      <div className="register_container">
        <div className="first">
      <input type="text" id="user" placeholder="Nom d'utilisateur" onInput={(e) => checkUsername(e.target.value)} autoFocus {...register('user', { required: "Veuillez entrer votre nom d'utilisateur" })}
 />
      <i className="fa fa-user"></i>
      <input type="text" id="email" onInput={(e) => checkEmail(e.target.value)} placeholder="E-mail" {...register('email', { required: 'Veuillez entrer votre e-mail' })} />
      <i className="fa fa-envelope"></i>
      <input 
        type="password"
        id="password"
        autoComplete="false"
        name="password"
        placeholder="Mot de passe"
        onInput={(e) => checkPassword(e.target.value)}
        {...register('password', { required: 'Veuillez entrer un mot de passe' })} />
      <i className="fa fa-key"></i>
      <input type="text" id="lastname" placeholder="Nom" {...register('lastname', { required: 'Veuillez entrer votre nom de famille' })} />
      <i className="fa fa-user"></i>
      <input type="text" id="firstname" placeholder="Prénom" {...register('firstname', { required: 'Veuillez entrer votre prénom' })} />
      <i className="fa fa-user"></i>
      {/* <label htmlFor="birthday">Votre date de naissance</label> */}
      
      </div>
      <div className="second">
      <input type="date" id="birthday" placeholder="Date de naissance" {...register('birthday', { required: 'Veuillez entrer votre date de naissance' })} />
      <i className="fa"><FaBirthdayCake /></i>
      <input type="text" id="address" placeholder="Adresse" {...register('address', { required: 'Veuillez entrer votre addresse' })} />
      <i className="fa"><FaCity /></i>
      <input type="text" id="cp" placeholder="Code postal" {...register('cp', { required: 'Veuillez entrer votre code postal' })} />
      <i className="fa"><FaCity /></i>
      <input type="text" id="city" placeholder="Ville" {...register('ville', { required: 'Veuillez entrer votre ville' })} />
      <i className="fa"><FaCity /></i>
      <input type="text" id="phone" placeholder="Téléphone" {...register('phone', { required: 'Veuillez entrer votre numéro de téléphone' })} />
      <i className="fa"><BsFillTelephoneFill /></i>
      </div>
      {/* <a href="#">Mot de passe oublié ?</a> */}
      <button>
        <i className="spinner"></i>
        <span className="state">S'enregistrer</span>
      </button>
      </div>
    </form>
    <Link to="/login"><div className="create_login">Déjà un compte ? Connectez vous !</div></Link>

    {/* </p> */}
  </div>
 );
}

export default Register;
