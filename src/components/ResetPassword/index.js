import React, { useEffect, useState } from 'react';
import './styles.scss';
import { useParams } from 'react-router-dom';
import { signinByToken } from 'src/actions'
import { useNavigate, Link, Navigate } from "react-router-dom";
import ChangePassLost from './change';
import store from 'src/store';

function ResetPassword() {

  const [change, setChange] = useState(false);
  const { nukecode, nukesize } = useParams();
  useEffect(() => {
    let datas = [];
    datas.push({nukecode: nukecode})
    datas.push({nukesize: nukesize})
    fetch(`https://serveur.fansun.webmg.eu/user/checktoken`, {
        method: 'POST',
        body: JSON.stringify(datas),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': nukecode
        },
      }).then((response) => {
        response.json().then((res) => {
          if (res.status === 404) {
            document.getElementById('msg').innerHTML = "Ce lien n'est pas valide.  <div class='retour'><a href='/'<button class='button_prestas'>Retour à l'accueil</button></a></div>";
          }
          if (res.status === 200) {
            document.getElementById('msg').remove();
           setChange(true);
            
          }
          if (res.status === 400) {
            document.getElementById('msg').innerHTML = "Ce lien n'est plus valide. Veuillez refaire une demande de mot de passe.  <div class='retour'><a href='/lost'<button class='button_prestas'>Réinitialisation de mot de passe</button></a></div>";
          }
        }) 
      })
    
    
  }, [])
  


  return (
   <div className="container_mdp">
    <div id="msg"></div>
    {change && (
    <ChangePassLost id={nukesize} token={nukecode} />
    )}
   </div>
 );
}

export default ResetPassword;
