import React, { useRef, useState, useEffect } from 'react';
import './styles.scss';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import ClientCaptcha from "react-client-captcha"
// import "react-client-captcha/dist/index.css"


function Contacts() {
    const [captchaCode, setCaptchaCode] = useState('');
    const formLogin = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm(); 

    useEffect(() => {
      window.scrollTo({
       top: 0,
       left: 0,
       behavior: "smooth",
      })
     }, [])

    const submitMail = () => {
        const forma = document.getElementById('contact');
        const datas = Object.fromEntries(new FormData(forma).entries());
        // console.log(datas)
        if (datas.code !== captchaCode) {
          Swal.fire({
            title: 'Les codes ne correspondent pas !',
            text: '',
            icon: 'error',
            confirmButtonText: 'Ok',
          })
        } else {
          // console.log('ok')
              fetch('https://serveur.fansun.webmg.eu/user/contact/', { 
            method: 'POST',
            body: JSON.stringify(datas),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
        })
        .then((res) => {
            if (res.status === 200) {
                Swal.fire({
                    title: 'Mail envoyé',
                    text: 'Le mail a bien  été envoyé',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = '/';
                    }
                  });
            } 
            
    }).catch((error) => {
        Swal.fire({
          title: 'Mail non envoyé',
          text: "Une erreur s'est produite, veuillez réessayer plus tard",
          icon: 'error',
          confirmButtonText: 'Ok',
        })
    })
        }
    
    }


  return (
   <div id="contacts">
    <h2 className="col-2-small title_contact">Contactez-nous</h2>
    <div className="container_contact">  
   <form id="contact" onSubmit={handleSubmit(submitMail)} ref={formLogin}>
     <h3>Fansun</h3>
     <h4>Pour tous renseignements ou questions</h4>
     <fieldset>
       <input name="nom" className="uppercase" placeholder="Vos nom et prénom" type="text" tabIndex="1" required autoFocus />
     </fieldset>
     <fieldset>
       <input name="email" placeholder="Votre adresse e-mail" type="email" tabIndex="2" required />
     </fieldset>
     <fieldset>
       <input name="tel" placeholder="Votre numéro de téléphone" type="tel" tabIndex="3" required />
     </fieldset>
     {/* <fieldset>
       <input placeholder="Your Web Site (optional)" type="url" tabindex="4" required />
     </fieldset> */}
     <fieldset>
       <textarea name="msg" placeholder="Votre message ..." tabIndex="5" required></textarea>
     </fieldset>
     <fieldset>
     <ClientCaptcha captchaCode={setCaptchaCode}/>
     </fieldset>
     <fieldset>
     <input name="code" placeholder="Recopiez le code" type="text" id="code" />
     </fieldset>
     <fieldset>
       <button name="submit" type="submit" id="contact-submit">Envoyer</button>
     </fieldset>
     {/* <p class="copyright">Designed by <a href="https://colorlib.com" target="_blank" title="Colorlib">Colorlib</a></p> */}
   </form>
 </div></div>
 );
}

export default Contacts;
