import React, { useEffect } from 'react';

import './styles.scss';

function Mentions() {
    useEffect(() => {
        window.scrollTo(0,0)
    }, [])
    
  return (
   <div className="mentions">
    <div className="mentions_title">
        Nos mentions légales
    </div>
    <div className="contain_mentions">
    {/* <div className="item_mentions_title">Nous trouver :</div> */}
    <div className="item_mentions"><span>Nom : Fansun Alès</span></div>
    <div className="item_mentions"><span>Adresse : 480 Avenue Olivier de Serres 30100 Alès</span></div>
    <div className="item_mentions"><span>Siret : 84262258100028</span></div>
    </div>
    <div className="contain_mentions">
    {/* <div className="item_mentions_title">Nous trouver :</div> */}
    <div className="item_mentions"><span>Nom : Fansun Bagnols sur Cèze</span></div>
    <div className="item_mentions"><span>Adresse : 7 Pl. Jean Jaurès, 30200 Bagnols-sur-Cèze</span></div>
    <div className="item_mentions"><span>Siret : 84262258100036</span></div>
    </div>
    <br />
    <p className="css-1cj6n06">Pour les mentions relatives à l'utilisation du service de réservation et à la protection des données personnelles, merci de vous reporter aux <a href="https://www.planity.com/mentions-legales" target="_blank">CGU de Planity</a>.</p>
    </div>
 );
}

export default Mentions;
