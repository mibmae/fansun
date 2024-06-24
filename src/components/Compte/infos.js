import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { setUserInfos, signinByToken, signinByTokenAdmin } from '../../actions';
import moment from 'moment';
import { FaCity } from 'react-icons/fa'
import { BsFillTelephoneFill } from 'react-icons/bs'
import store from 'src/store';
import './styles.scss';

function Infos() {
    const [me, setMe] = useState({});
    const formRegister = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
      setTimeout(() => {
        setMe(store.getState().User.user)
      }, 1000);
    }, [])
    
    // useEffect(() => {
    // console.log('me', me)
    // }, [me])
    
    
  const onSubmit = (data, event) => {
    const token = localStorage.getItem('token_fansun') || localStorage.getItem('token_fansun_admin')
    event.preventDefault();
    const formC = document.getElementById('register_form');
    const datas = Object.fromEntries(new FormData(formC).entries());
    
    datas.id = me.id;
    datas.user = document.getElementById('user').value;
    datas.token = token;
    fetch('https://serveur.fansun.webmg.eu/user/modify', {
      method: 'POST',
      body: JSON.stringify(datas),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'couscousgarbit',
        'x-access-token' : token,
      },
    }).then((response) => {
      response.json().then((account) => {
        if (account.msg !== 'TokenExpiredError') {
          swal({
            title: 'Vos informations sont bien modifiées',
            icon: 'success',
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "buttonSwalOk",
              closeModal: true,
            }
          });
          store.dispatch(setUserInfos(account))
          if (localStorage.getItem('token_fansun_admin')) { store.dispatch(signinByTokenAdmin(localStorage.getItem('token_fansun_admin'))) } else {
          store.dispatch(signinByToken(localStorage.getItem('token_fansun')));
          }
        } else {
          swal({
            title: 'Session expirée',
            icon: 'error',
            button: true,
            // timer: 2000,
            confirmButtonColor: '#CEAB8D',
            confirmButtonText: 'OK',
  // confirmButtonColor: '#8CD4F5',
  cancelButtonText: 'Annuler',
          });
        }
    })
})
}

  return (
    <>
    {me.id && (
      <><div className="compte_title_infos">Mes informations</div><form className="mycompte" ref={formRegister} id="register_form" name="register_form" onSubmit={handleSubmit(onSubmit)}>
          <div className="infos_container">
            <div className="first_info">
              <label htmlFor='user'>Nom d'utilisateur</label>
              <input type="text" id="user" disabled placeholder="Nom d'utilisateur" defaultValue={(me && me.user)} {...register('user')} />
              <i className="fa fa-user"></i>
              <label htmlFor='email'>E-mail</label>
              <input type="text" id="email" defaultValue={(me && me.email)} placeholder="E-mail" {...register('email', { required: true })} />
              <i className="fa fa-envelope"></i>
              <label htmlFor='lastname'>Nom</label>
              <input type="text" id="lastname" defaultValue={(me && me.nom)} placeholder="Nom" {...register('lastname', { required: true })} />
              <i className="fa fa-user"></i>
              <label htmlFor='firstname'>Prénom</label>
              <input type="text" id="firstname" defaultValue={(me && me.prenom)} placeholder="Prénom" {...register('firstname', { required: true })} />
              <i className="fa fa-user"></i>
            </div>
            <div className="second">
              {/* <label htmlFor='birthday'>Date de naissance</label> */}

              {/* <input type="text" id="birthday" defaultValue={(me && me.birthday && moment(me.birthday).format("DD/MM/YYYY"))} placeholder="Date de naissance" {...register('birthday')} /> */}
              {/* <i className="fa fa-user"></i> */}
              <label htmlFor='address'>Adresse</label>
              <input type="text" id="address" defaultValue={(me && me.addresse)} placeholder="Adresse" {...register('address', { required: true })} />
              <i className="fa"><FaCity /></i>
              <label htmlFor='cp'>Code postal</label>
              <input type="text" id="cp" defaultValue={(me && me.cp)} placeholder="Code postal" {...register('cp', { required: true })} />
              <i className="fa"><FaCity /></i>
              <label htmlFor='city'>Ville</label>
              <input type="text" id="city" defaultValue={(me && me.ville)} placeholder="Ville" {...register('ville', { required: true })} />
              <i className="fa"><FaCity /></i>
              <label htmlFor='phone'>Téléphone</label>
              <input type="text" id="phone" defaultValue={(me && me.phone)} placeholder="Téléphone" {...register('phone', { required: true })} />
              <i className="fa"><BsFillTelephoneFill /></i>
            </div>
            <button>
              <i className="spinner"></i>
              <span className="state">Modifier</span>
            </button>
          </div>
        </form></>
    )}
    </>
 );
}

export default Infos;
