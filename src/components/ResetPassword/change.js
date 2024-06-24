import React, { useRef } from 'react';
import './styles.scss';

function ChangePassLost({ id, token }) {

    function checkPassword(password) {
        const regularExpression = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
        const valid = regularExpression.test(password);
        if (!valid) {
          document.querySelector('#newPassword').classList.add('invalid');
        }
        if (valid) {
          document.querySelector('#newPassword').classList.remove('invalid');
          document.querySelector('#newPassword').classList.add('valid');
        }
      }

      const formLogin = useRef(null);
      const onSubmit = (e) => {
        e.preventDefault();
        let datas = [];
            datas.push(document.getElementById('newPassword').value)
            datas.push(document.getElementById('newPasswordConfirm').value)
            datas.push(document.getElementById('id').value)
            datas.push(document.getElementById('token').value)
            console.log(document.getElementById('newPassword').value === document.getElementById('newPasswordConfirm').value)
        
        if (document.getElementById('newPassword').value === document.getElementById('newPasswordConfirm').value) {
          
          // envoie dans la base
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
                  window.location.href = "/login";
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


  return (
            <div className="wrapper_forgot">
        <div className="formations_title">Modifier le mot de passe</div>

  <form className="logine" ref={formLogin} onSubmit={(e) => onSubmit(e)}  id="modify_pass">
    <input type="hidden" id="id" value={id}  />
    <input type="hidden" id="token" value={token}  />
    <input type="password" id="newPassword" onInput={(e) => checkPassword(e.target.value)} placeholder="Nouveau mot de passe" autoFocus />
    <input type="password" id="newPasswordConfirm" onInput={(e) => checkPassword(e.target.value)} placeholder="Confirmation" />
    <button>
      <i className="spinner"></i>
      <span className="state">Changer le mot de passe</span>
    </button>
  </form>


   </div>
 );
}

export default ChangePassLost;
