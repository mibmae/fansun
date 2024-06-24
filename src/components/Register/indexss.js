import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles.scss';

function Register() {
    const [errorUser, setErrorUser] = useState(false);
    const [errorEmail, setErrorEmail] = useState(false);
    const [userName, setUserName] = useState('');
    const formRegister = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const checkUsername = (username) => {
        // console.log(username)
        fetch(`https://serveur.fansun.webmg.eu//auth/checkusername/${username}`, {
          method: 'GET',
          // body: username,
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
              setUserName(username)
            }
          })
      })
    }


    const onSubmit = (data, event) => {
        event.preventDefault();
        const formC = document.getElementById('register_form');
        const datas = Object.fromEntries(new FormData(formC).entries());
        console.log(datas)
        console.log(!errorEmail, !errorUser)
        // fetch('https://serveur.fansun.webmg.eu/auth/register', {
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
            // console.log(account)
            if (account.status === 200) {
              swal({
                title: 'Votre compte à bien été créé',
                icon: 'success',
                showConfirmButton: false,
                timer: 2000,
              });
              // localStorage.setItem('token_fansun', account.token);
              // store.dispatch(signinByToken(account.token));
              setTimeout(() => {
                window.location.href = "/login"; 
              }, 2000);
            }
            if (account.status === 401) {
              swal({
                title: 'Un utilisateur existe déjà avec cette adresse mail ou ce pseudo',
                icon: 'error',
                showConfirmButton: false,
                // timer: 2000,
              });
            //   localStorage.setItem('token_fansun', account.user.token);
            //   store.dispatch(signinByToken(account.user.token));
            //   setTimeout(() => {
            //     navigate('/account');
            //   }, 2000);
            }
        })
    })
  } else {
    swal({
      title: 'Un utilisateur existe déjà avec cette adresse mail ou ce pseudo',
      icon: 'error',
      showConfirmButton: false,
      // timer: 2000,
    });
  }
        // let datas = [];
        // datas.push(document.getElementById('user').value)
        // datas.push(document.getElementById('password').value)
        // e.preventDefault();
        // const forma = document.getElementById('register_form');
        // console.log(forma)
        // const datass = Object.fromEntries(new FormData(forma).entries());
        // console.log(datass)
        
        // fetch(`https://serveur.fansun.webmg.eu/auth/signin`, {
    //     fetch(`https://serveur.fansun.webmg.eu/auth/signin`, {
    //     method: 'POST',
    //     body: JSON.stringify(datas),
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //       'x-api-key': 'couscousgarbit',
    //     },
    //   }).then((response) => {
    //     response.json().then((res) => {
    //       console.log(res)
    //       if (res.admin === true) {
    //         setAdmin(true);
    //         localStorage.setItem('token_fansun_admin', res.token)
    //       } else {
    //       localStorage.setItem('token_fansun', res.token)
    //       }
    //       window.location.href = "/"; 
    //     //   setFormationsAll(formations.data)
    //     });
    //   });
        // console.log('submit', e.target.map((val) => val))
    }

  return (
    <div className="wrapper">
    <div className="formations_title">S'inscrire</div>
    <form className="registere" ref={formRegister} id="register_form" name="register_form" onSubmit={handleSubmit(onSubmit)}>
    <input type="text" id="user" placeholder="Nom d'utilisateur" onInput={(e) => checkUsername(e.target.value)} autoFocus {...register('user', { required: "Veuillez entrer votre nom d'utilisateur" })} />
    {!errorUser && userName !== "" && (
        // <input type="password" id="password" placeholder="Votre mot de passe" {...register('password', { required: "Veuillez entrer votre nom d'utilisateur" })} />
        <>
                       {/* <input type="password" id="password" placeholder="Votre mot de passe" {...register('password', { required: "Veuillez entrer votre nom d'utilisateur" })} /> */}
                      <input type="text" id="email" onInput={(e) => checkEmail(e.target.value)} placeholder="E-mail" {...register('email', { required: 'Veuillez entrer votre e-mail' })} /><i className="fa fa-envelope"></i></>
    )}
    




    </form>
    </div>
 );
}

export default Register;
