import React, { useRef, useEffect, useState } from 'react';
import swal from 'sweetalert';
import './styles.scss';
import store from 'src/store';

function ModifyPassword() {
 const [idUser, setIdUser] = useState();

  useEffect(() => {
   setTimeout(() => {
    // console.log(store.getState().User.user)
    setIdUser(store.getState().User.user.id);
   }, 1000);
  }, [])
  
  
  const formLogin = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    let datas = [];
        datas.push(document.getElementById('newPassword').value)
        datas.push(document.getElementById('newPasswordConfirm').value)
        datas.push(document.getElementById('id').value)
    
    if (checkPassword(document.getElementById('newPassword').value) === 1) {
      const token = localStorage.getItem('token_fansun') || localStorage.getItem('token_fansun_admin')
      fetch(`https://serveur.fansun.webmg.eu/user/changepassword`, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': token,
        },
      }).then((response) => {
        response.json().then((res) => {
          if (res.msg === 'Changement ok') {
            swal({
              title: 'Mot de passe changé avec succès',
              icon: 'success',
              buttons: false,
              timer: 1500,
            });
            setTimeout(() => {
              window.location.href = "/account";
            }, 2000);

          }

         }) })

    } else {
      swal({
        title: 'Il y a une erreur dans vos informations',
        icon: 'error',
        buttons: false,
        timer: 3000,
      });
    }
 
  }

  
  function checkPassword(password) {
    const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    const valid = regularExpression.test(password);
    if (!valid) {
      document.querySelector('#newPassword').classList.add('invalid');
      document.querySelector('#newPasswordConfirm').classList.add('invalid');
    }
    if (valid) {
      document.querySelector('#newPasswordConfirm').classList.remove('invalid');
      document.querySelector('#newPasswordConfirm').classList.add('valid');
      document.querySelector('#newPassword').classList.remove('invalid');
      document.querySelector('#newPassword').classList.add('valid');
    }
    if (document.querySelector('#newPassword').value === document.querySelector('#newPasswordConfirm').value) {
      return 1;
    } else {
      return 0;
    }
    // }
  }



  return (
  //  <div className="ModifyPassword">
<div className="wrapper_forgot">
        <div className="formations_title">Modifier le mot de passe</div>
  <form className="logine" ref={formLogin} id="login_form" onSubmit={(e) => onSubmit(e)}>
    <input type="hidden" id="id" value={idUser} />
    <input type="password" id="newPassword" autoComplete='false' onChange={(e) => checkPassword(e.target.value)} placeholder="Nouveau mot de passe" autoFocus />
    {/* <i className="fa fa-user"></i> */}
    {/* <i className="fa fa-key"></i> */}
    <input type="password" id="newPasswordConfirm" autoComplete='false' onChange={(e) => checkPassword(e.target.value)} placeholder="Confirmation" />
    {/* <i className="fa fa-key"></i> */}
    {/* <a href="#">Mot de passe oublié ?</a> */}
    <button>
      <i className="spinner"></i>
      <span className="state">Changer le mot de passe</span>
    </button>
  </form>


   </div>
 );
}

export default ModifyPassword;
