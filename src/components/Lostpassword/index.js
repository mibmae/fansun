import React from 'react';
import './styles.scss';

function LostPassword() {

    const lostPassword = (e) => {
        e.preventDefault();
        if (document.getElementById('email').value !== '') {
        let datas = [];
        datas.push(document.getElementById('email').value)
        fetch(`https://serveur.fansun.webmg.eu/user/lostpassword`, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
        },
      }).then((response) => {
        response.json().then((res) => {
          if (res.status === 404) {
            swal({
              title: 'Erreur',
              text: "Aucun utilisateur avec cette adresse mail.",
              icon: 'error',
              buttons: ["OK"],
            })
          } else {
            if (response.status === 200) {
                      swal({
                        title: 'Votre demande est validée.',
                        text: "Vous allez recevoir un lien pour changer votre mot de passe",
                        icon: 'success',
                        buttons: ["OK"],
                        timer: 3000,
                      })
                       setTimeout(() => {
                        window.location.href = "/login"; 
                      }, 4000);
                    }
        };
        })
    })
  } else {
    swal({
      title: "Veuillez renseigner l'adresse mail !",
      icon: 'error',
      buttons: false,
      timer: 1500,
    });
  }
    }


  return (
   <div className="lostpassword">
    <div className="formations_title">Mot de passe perdu</div>
    <p className="plost">Merci de renseigner votre adresse mail, un lien vous sera envoyé afin de changer votre mot de passe. Ce lien est valable 1h.</p>
    <div className='wrapper'>
        <form action="" className="lost" onSubmit={(e) => lostPassword(e)}>
    <input type="text" id="email" placeholder="E-mail" name="email" />
      <button className="button_send">Envoyer</button>
      </form>
    </div>
   </div>
 );
}

export default LostPassword;
