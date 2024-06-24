import React, { useState, useEffect } from 'react';
// import { Modal, Button } from 'react-bootstrap';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { generateUniqueKey } from 'src/functions';
import Fade from "@mui/material/Fade";
import logopromo from '../../../public/img/logopromo.png';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './styles.scss';
import moment from 'moment';

function Offer({ offer, admin }) { 
  const [showOffer, setShowOffer] = useState(false)
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 60 * 1000));
    const expires = `expires=${d.toGMTString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }
  function getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }

    return '';
  }

  useEffect(() => {
    getCookie('fansun_pub');
    if (!admin) {
    if (document.cookie.match(/^(.*;)?\s*fansun_pub\s*=\s*[^;]+(.*)?$/) !== null) {
      setShowOffer(false)
    } else {
      setShowOffer(true)     
    }
  } else {
    setShowOffer(true)
  }
  });
  const [open, setOpen] = useState(true);
  const handleClose = (event, reason) => {
    if (reason && reason == "backdropClick") 
        return;
    const seen = document.getElementById('seen')
    if (!seen.checked) {
      setCookie('fansun_pub', true, 10);//1minute
    }
   
    setOpen(false);
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    bgcolor: "white",
    boxShadow: 5,
    p: 5,
    borderRadius:1
  
  };

  const dontSee = (e) => {
    if (e.target.checked) {
      setCookie('fansun_pub', true, 1440);
    } else {
      document.cookie = 'fansun_pub=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC'; 
    }
  }





  return (
    <div>
      {showOffer && (
   <Modal
   open
   onClose={handleClose}
   aria-labelledby="modal-modal-title"
   aria-describedby="modal-modal-description"
 >
 <Fade in={open} timeout={500}>
           
        
   <Box sx={style}>
     <AiOutlineCloseCircle className="closeBtnPuB" onClick={handleClose} />
     {offer.image && offer.image.split(',').length > 0 ? (
      <div className="w3-content w3-section">
      <Carousel autoPlay infiniteLoop interval={3000} showArrows showThumbs={false} swipeable stopOnHover>
        {offer.image.split(',').map((e) => (
          <img className="mySlides w3-animate-fading" key={generateUniqueKey(e)} src={e} alt="paysage" />
        ) )}
              </Carousel>

</div>
     ) : (
  <img
             src={offer.image !== "" ? offer.image : logopromo}
             alt="Logo promo"
             style={{ maxHeight: "100%", maxWidth: "100%" }}
           />
     )}
  <div className="padding-modal">
     <Typography id="modal-modal-title" variant="h6" component="h4">
       {offer && offer.texte ? offer.texte : ''}
     </Typography>
     <Typography id="modal-modal-description" sx={{ mt: 2 }} fontSize={10}>
     {offer ? `Offre valable jusqu'au ${offer && moment(offer.dateend).format("DD/MM/YYYY")}` : ''}
      
     </Typography>
     <input type="checkbox" name="seen" id="seen" onChange={(e) => dontSee(e)} />
      <label className="seenlabel" htmlFor="seen">Ne plus voir pendant 24h</label>
      </div>
   </Box>
   </Fade>
 </Modal>
      )}
 
  </div>
 );
}

export default Offer;
