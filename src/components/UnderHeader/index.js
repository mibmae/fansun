import React, { useEffect, useState } from 'react';
import './styles.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Modal, Button } from "react-bootstrap";
import RendezVous from '../RendezVous';
import accueil from '../../assets/images/accueil.jpg'
import salon from '../../assets/images/salon.jpg'
import salonba from '../../assets/images/fansunba.jpg'
import fansun from '../../assets/images/bagnols.jpg'
import salonales from '../../assets/images/salonales.jpg'
import logofont from '../../assets/images/fansunlo.png'
import Horaires from '../Horaires';

function UnderHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const images = [accueil, salon, fansun, salonba, salonales]
    useEffect(() => {
        AOS.init();
        let index = 0;
        const interval = setInterval(() => {
            if (index === images.length - 1) {
                index = 0;
            } else {
                index++;
            }          
            setImg(images[index])      
          }, 5000);
          

      }, [])
      const [img, setImg] = useState('https://res.cloudinary.com/planity/image/upload/w_1200,f_auto,q_auto/14d4ab3b-c43d-446c-b0e9-4d779eff4810')
    useEffect(() => {
    }, [img])

    const openModal = () => {
        setIsOpen(true);
    }
    const closeModal = () => {
        setIsOpen(false);
        if (document.getElementById('planity')) {
            document.getElementById('planity').remove()
            }
        
    }
    
  return (
   <div className='underHeader' id="underheader" data-aos="fade-in" data-aos-duration="3000" style={{ backgroundImage: `url('${img}')`, backgroundPosition: 'center' }}>
   
    <div className="divOpa">
    <div className="title_underheader_container">
    {/* <div className="title_underheader_log">FANSUN</div> */}
    <div className="title_underheader_log"><img className="logofont" src={logofont} /></div>
    <div className="title_underheader">Centre de bronzage et d'esthétique</div>
    <div className="title_underheader_button"><button className="button_prestas" onClick={() => openModal()}>Nos Prestations</button></div>
    </div>
    
    </div>

    {isOpen && (
        <Modal className="modale" show={isOpen}>
              <Modal.Body>
                <RendezVous items="rdv" />
              </Modal.Body>
              <Modal.Footer>
                  <Button className="buttonCloseAdd" onClick={() => closeModal()}>X</Button>
              </Modal.Footer>
          </Modal>
      )}
   
    </div>
 );
}

export default UnderHeader;
