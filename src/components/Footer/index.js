import React from 'react';
import { AiOutlineArrowDown, AiOutlineYoutube } from 'react-icons/ai'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { BsFacebook, BsInstagram, BsSnapchat, BsYoutube } from 'react-icons/bs';
import { FaFacebookF, FaSnapchatGhost, FaMapMarkerAlt } from 'react-icons/fa';

import {
  Link,
} from 'react-router-dom';
import './styles.scss';
import store from 'src/store'; 
import swal from 'sweetalert';
function Footer() {
  const changeColor = () => {
  
    if (window.screen.width > 800) {
    document.getElementById('fleche').style.transform = "translateY(-15px)";
    document.getElementById('fleche').style.transition = "0.3s";
    // document.getElementById('fleche').style.animationIterationCount = 'infinite'
    }
    }
  const changeColorR = () => {
    if (window.screen.width > 800) {
    document.getElementById('fleche').style.transform = "translateY(0)";
    document.getElementById('fleche').style.transition = "0.3s";
    }
    //  document.getElementById('fleche').style.transform = "scale(1)";
    // document.getElementById('fleche').style.transition = "0.3s";
    }
    const deleteMyAccount = (e) => {
      swal({
        title: `Êtes-vous sur de vouloir supprimer votre compte ?`,
        text: "Cette action est irréversible !",
        icon: 'warning',
        buttons: ["Annuler", "Oui je suis sûr"]
      }).then((result) => {
        if (result) {
          swal({
            content: {
              element: "input",
              attributes: {
                placeholder: "Tapez votre password afin de supprimer votre compte",
                type: "password",
              },
            },
          }).then((res) => {
          
          // console.log('password', res ,'email', store.getState().User.user.email)
          if (res !== "") {
            let datas = [];
            datas.push(res);
            datas.push(store.getState().User.user.email)
          // fetch(`https://serveur.fansun.webmg.eu/user/deleteme`, {
            fetch('https://serveur.fansun.webmg.eu/user/deleteme', {

            method: 'POST',
            body: `${res}, ${store.getState().User.user.email}`,
            headers: {
            'x-api-key': 'couscousgarbit',
          'x-access-token': localStorage.getItem('token_fansun') || localStorage.getItem('token_fansun_admin'),
          'usermail': store.getState().User.user.email,
          'pass': res,
            }
          }).then((response) => response.json())
          .then((res) => {
            if (res.status !== 200) {
              swal({
                title: 'Erreur',
                icon: 'error',
                text: res.error
              })
            } else {
              swal({
                title: 'Supprimé',
                icon: 'success',
                text: res.msg
              })
              localStorage.removeItem('token_fansun')
              setTimeout(() => {
                window.location.href = "/"
              }, 1000);
            }
          })
        } else {
          swal({
            title: 'Erreur',
            icon: 'error',
            text: "Vous devez entrer votre mot de passe"
          }).then(() => {
            deleteMyAccount()
          })
        
        }
      })
          // swal({
          //   title: 'Compte supprimé',
          //   icon: 'success',
          // })
      } else {
          swal({
              title: 'Vous avez annulé la demande de suppression de compte',
              icon: 'warning',
            })
      }

    })
    }
  return (
    <><div className="backToTop" id="back" onMouseOver={() => changeColor()} onMouseOut={() => changeColorR()}><IoIosArrowUp className="icon" id="fleche" color='white' onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth"})} /></div>
    <div className="footer" id="footer">
      <div className="footer_container">


        <div className="footer_addresse">Nos adresses
          <div className="footer_addresse_text">
            <a href="https://www.google.fr/maps/place/Fan+Sun/@44.104582,3.7836582,11z/data=!4m10!1m2!2m1!1sfansun+ales!3m6!1s0x12b443d0f29243e5:0x7749bde8ce112c7d!8m2!3d44.104582!4d4.0885288!15sCgtmYW5zdW4gYWxlc1oNIgtmYW5zdW4gYWxlc5IBDnRhbm5pbmdfc3R1ZGlvmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVIxTW5aaGJHdEJSUkFC4AEA!16s%2Fg%2F11h7q4xqcr?entry=ttu" target="_blank"><FaMapMarkerAlt /> 480, avenue Olivier de Serres 30100 Alès</a>
          </div>
          <div className="footer_addresse_text">
          <a href="https://www.google.fr/maps/place/Fan+Sun/@44.1654759,4.6174836,17z/data=!3m1!4b1!4m6!3m5!1s0x12b5a53a5daadd5b:0x8c6ea2e2ff510d76!8m2!3d44.1654721!4d4.6200585!16s%2Fg%2F11rwl091qw?entry=ttu" target="_blank"><FaMapMarkerAlt /> 7 Pl. Jean Jaurès, 30200 Bagnols-sur-Cèze</a>
          </div>
        </div>
        <div className="footer_contact">Nous contacter
        <div className="footer_addresse_text">
            Alès : 04 30 38 50 01
          </div>
        <div className="footer_addresse_text">
            Bagnols sur Cèze : 04 34 77 13 10
          </div>
        <div className="footer_addresse_text">
            Email : <Link to="/contact">infos@fansun.fr</Link>
           
          </div>
        </div>
        <div className="footer_mentions"><Link to="/mentions">Mentions Légales</Link>{store.getState().User.logged && (<div className="footer_delete_text" onClick={() => deleteMyAccount(store.getState().User.user.id)}>Supprimer mon compte</div>)}</div>
        {/* <div className="footer_reseau">Reseau</div> */}
      </div>
      
    </div>
    <div className="bottomm">
      {/* <div className="bottomm_contain">
      Plan du site : 
      <span className="item_plan">Accueil</span>
      <span className="item_plan">Contacts</span>
      <span className="item_plan">Mon compte</span>
      <span className="item_plan">Nos formations</span>
      </div> */}
      <div className="container_bottom">
      <div className='container_copyright'>
    <div className="copyright">© 2023 Copyright Fansun | <div>Création du site <a href="https://www.webmg.eu" target="_blank" className="myLink">WebMG</a></div></div>
    </div>
    <div className="social">
      <span className="socialinsta"><a href="https://www.instagram.com/fansun.officiel/?hl=fr" target="_blank"><BsInstagram  /></a></span> 
      <span className="socialfb"><a href="https://www.facebook.com/profile.php?id=100057065635606" target="_blank" rel="noreferrer"><FaFacebookF /></a></span>
            {/* <span className="socialsnap"><a href="https://www.snapchat.com/add/asstennis30340" target="_blank" rel="noreferrer"><FaSnapchatGhost /></a></span> */}
            {/* <span><a href="https://www.youtube.com/@fansun1766" target="_blank" rel="noreferrer"><BsYoutube className="socialyoutube" /></a></span> */}

      </div>
    </div>
    
    </div>
    </>
 );
}

export default Footer;
