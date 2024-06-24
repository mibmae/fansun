import React, { useEffect, useState } from 'react';
import './styles.scss';
import moment from 'moment';
import { LuCalendarClock } from "react-icons/lu";
import { FaMapMarkerAlt } from "react-icons/fa";

moment.locale('fr'); 


function Horaires() {

    const [day, setDay] = useState('');
    const [heuresOA, setHeuresOA] = useState('');
    const [heuresFA, setHeuresFA] = useState('');
    const [heuresOB, setHeuresOB] = useState('');
    const [heuresFB, setHeuresFB] = useState('');
    const [heuresO, setHeuresO] = useState('');
    const [heuresF, setHeuresF] = useState('');
    const [heuresdOA, setHeuresdOA] = useState('');
    const [heuresdFA, setHeuresdFA] = useState('');
    const [heuresdOB, setHeuresdOB] = useState('');
    const [heuresdFB, setHeuresdFB] = useState('');
    const [ouvertA, setOuvertA] = useState(false);
    const [ouvertB, setOuvertB] = useState(false);
    const [open, setOpen] = useState('');

    const horairesAles = [
        {
            id: 'lundi',
            open: 'FERME',
            close: 'FERME'
        
        },
        {
            id: 'mardi',
            open: '09:00',
            close: '20:00'
        },
        {
            id: 'mercredi',
            open: '09:00',
            close: '20:00'
        },
        {
            id: 'jeudi',
            open: '09:00',
            close: '20:00'
        },
        {
            id: 'vendredi',
            open: '09:00',
            close: '20:00'
        },
        {
            id: 'samedi',
            open: '09:00',
            close: '18:00'
        },
        {
            id: 'dimanche',
            open: 'FERME',
            close: 'FERME'
        },
       
    ]
    const horairesBagnols = [
        {
            id: 'lundi',
            open: 'FERME',
            close: 'FERME'
        
        },
        {
            id: 'mardi',
            open: '09:00',
            close: '19:00'
        },
        {
            id: 'mercredi',
            open: '09:00',
            close: '19:00'
        },
        {
            id: 'jeudi',
            open: '09:00',
            close: '19:00'
        },
        {
            id: 'vendredi',
            open: '09:00',
            close: '19:00'
        },
        {
            id: 'samedi',
            open: '09:00',
            close: '18:00'
        },
        {
            id: 'dimanche',
            open: 'FERME',
            close: 'FERME'
        },
       
    ]

    useEffect(() => {
        // console.log(horaire.map((e) => e))
        // console.log(horairesAles.filter((e) => moment().format('dddd').toString() === e.id)[0].open)
        setHeuresOA(horairesAles.filter((e) => moment().format('dddd').toString() === e.id)[0].open)
        setHeuresFA(horairesAles.filter((e) => moment().format('dddd').toString() === e.id)[0].close)
        setHeuresdOA(horairesAles.filter((e) => moment().add(1, "days").format('dddd').toString() === e.id)[0].open)
        setHeuresdFA(horairesAles.filter((e) => moment().add(1, "days").format('dddd').toString() === e.id)[0].close)
        setHeuresOB(horairesBagnols.filter((e) => moment().format('dddd').toString() === e.id)[0].open)
        setHeuresFB(horairesBagnols.filter((e) => moment().format('dddd').toString() === e.id)[0].close)
        setHeuresdOB(horairesBagnols.filter((e) => moment().add(1, "days").format('dddd').toString() === e.id)[0].open)
        setHeuresdFB(horairesBagnols.filter((e) => moment().add(1, "days").format('dddd').toString() === e.id)[0].close)     
    }, [])

    useEffect(() => {
        if (heuresFA !== '') {
        if ((moment().format('HH:mm').toString() > heuresOA) && (moment().format('HH:mm').toString() < heuresFA)) {
            setOuvertA(true)
        }
        if ((moment().format('HH:mm').toString() > heuresOB) && (moment().format('HH:mm').toString() < heuresFB)) {
            setOuvertB(true)
        }
        }
    }, [heuresFA, heuresOA])
    
    
    
    function affiche() {

        if (!open) {
        setOpen(true)
        if (window.innerWidth < 650 && screen.orientation.type === "portrait-primary") {
            // console.log('PORTRAIT - 650 - OPEN')
            document.getElementById('super_container').style.transform = 'translateY(0px)'
            } 
        if (window.innerWidth < 650 && screen.orientation.type === "landscape-primary") {
                // console.log('LANDSCAPE < 650 PAYSAGE - OPEN')
                document.getElementById('super_container').style.transform = 'translateY(0px)'
            }
        if (window.innerWidth > 650 && screen.orientation.type === "landscape-primary") {
                // console.log('LANDSCAPE > 650 PAYSAGE - OPEN')
                document.getElementById('super_container').style.transform = 'translateY(0px)'
            }
            if (window.innerWidth > 650 && screen.orientation.type === "portrait-primary") {
                // console.log('LANDSCAPE > 650 PORTRAIT - OPEN')
                document.getElementById('super_container').style.transform = 'translateY(0px)'
            }
            if (window.innerWidth > 650 && screen.orientation.type === "portrait-primary") {
                // console.log('LANDSCAPE > 650 PORTRAIT - OPEN')
                document.getElementById('super_container').style.transform = 'translateY(0px)'
            }

        // document.getElementById('super_container').style.transform = 'translateY(0)'
        } else {
            setOpen(false)
            if (window.innerWidth > 410 < 650 && screen.orientation.type === "portrait-primary") {
                // console.log('PORTRAIT < 650 - CLOSE')
            document.getElementById('super_container').style.transform = 'translateY(-175px)'
            }  
            if (window.innerWidth < 410 && screen.orientation.type === "portrait-primary") {
                // console.log('PORTRAIT < 650 - CLOSE')
            document.getElementById('super_container').style.transform = 'translateY(-215px)'
            }  
            if (window.innerWidth > 410 < 650 && screen.orientation.type === "landscape-primary") {
                // console.log('LANDSCAPE < 650 - CLOSE')
                document.getElementById('super_container').style.transform = 'translateY(-175px)'
                }  
                if (window.innerWidth > 650 && screen.orientation.type === "landscape-primary") {
                    // console.log('LANDSCAPE > 650 PAYSAGE - CLOSE')
                    document.getElementById('super_container').style.transform = 'translateY(-175px)'
                }
                if (window.innerWidth > 650 && screen.orientation.type === "portrait-primary") {
                    // console.log('LANDSCAPE > 650 PAYSAGE - CLOSE')
                    document.getElementById('super_container').style.transform = 'translateY(-175px)'
                }
                if (window.innerWidth > 1280 && screen.orientation.type === "landscape-primary") {
                    // console.log('LANDSCAPE < 650 - CLOSE')
                    document.getElementById('super_container').style.transform = 'translateY(-135px)'
                    }  
        }
    }
    window.addEventListener("orientationchange", function (e) {
        affiche()
      });
      useEffect(() => {
      }, [])
      

  return (
   <div className="horaire_supercontainer" id="super_container">
   
     <div className="horaire_container">
    <div className="horaire_now"><a href="https://www.google.fr/maps/place/Fan+Sun/@44.104582,3.7836582,11z/data=!4m10!1m2!2m1!1sfansun+ales!3m6!1s0x12b443d0f29243e5:0x7749bde8ce112c7d!8m2!3d44.104582!4d4.0885288!15sCgtmYW5zdW4gYWxlc1oNIgtmYW5zdW4gYWxlc5IBDnRhbm5pbmdfc3R1ZGlvmgEkQ2hkRFNVaE5NRzluUzBWSlEwRm5TVVIxTW5aaGJHdEJSUkFC4AEA!16s%2Fg%2F11h7q4xqcr?entry=ttu" target="_blank"><FaMapMarkerAlt /> Alès</a></div>
    <div className="horaire_date">{moment().format('dddd L')}</div>
  
    {ouvertA ? <span className="hopen"> OUVERT</span> : <span className="hclose">FERME</span>}
    {heuresOA !== 'FERME' && (
    <div className="horaire_heure">{heuresOA} - {heuresFA}</div>
    )}
    <hr className="hrhours"/>
    <div className="horaire_now"><a href="https://www.google.fr/maps/place/Fan+Sun/@44.1654759,4.6174836,17z/data=!3m1!4b1!4m6!3m5!1s0x12b5a53a5daadd5b:0x8c6ea2e2ff510d76!8m2!3d44.1654721!4d4.6200585!16s%2Fg%2F11rwl091qw?entry=ttu" target="_blank"><FaMapMarkerAlt /> Bagnols sur Cèze</a></div>
    <div className="horaire_date">{moment().format('dddd L')}</div>
    {ouvertB ? <span className="hopen">OUVERT</span> : <span className="hclose">FERME</span>}

    {heuresOB !== 'FERME' && (
    <div className="horaire_heure">{heuresOB} - {heuresFB}</div>
    )}
    </div>
    <div className="buttonOpenClose" onClick={() => affiche()}><span className="buttonOpen" ><LuCalendarClock /> Les horaires</span></div>
   </div>
 );
}

export default Horaires;
