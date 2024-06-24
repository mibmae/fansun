import React from 'react';
import './styles.scss';
import equip from '../../../public/img/equipe.jpg'
import equipe from '../../assets/images/equipe/equipecomplete.jpg'
import angelique from '../../assets/images/equipe/angelique.jpg'
import fanny from '../../assets/images/equipe/fanny.jpg'
import laurine from '../../assets/images/equipe/laurine.jpg'
import lea from '../../assets/images/equipe/lea.jpg'
import elza from '../../assets/images/equipe/elza.jpg'
import marie from '../../assets/images/equipe/marie.jpg'
import morgane from '../../assets/images/equipe/morgane.jpg'
import valerie from '../../assets/images/equipe/valerie.jpg'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
// let myIndex = 0;
// function carousel() {
//     let i;
//     const x = document.getElementsByClassName('mySlides');
//     for (i = 0; i < x.length; i++) {
//       x[i].style.display = 'none';
//     }
//     myIndex++;
//     if (myIndex > x.length) {
//       myIndex = 1;
//     }
//     x[myIndex - 1].style.display = 'block';
//     setTimeout(carousel, 5000);
//   }

function Equipe() {
  return (
    <div className="equipe" id="equipe" >
    <div className="container_equipe">
        <div className="imageillust_eta"><img className="image_illust" src={equip} /></div>
        <div className="textillust_eta">
            <div className="etablissement_title">NOS EQUIPES</div>
            <div className="equipe_pres">
                <p><span className="guillemet">&#10078;</span> Nous sommes deux soeurs, Angélique et Fanny associées dans une merveilleuse aventure depuis maintenant 2 ans !
                </p>
                <p>
                Passionnées, par la beauté et le bien-être, ouvrir notre institut a été une évidence pour nous deux ! <span className="guillemet">&#10078;</span>
                </p>
                <div className="w3-content w3-section">
                <Carousel autoPlay infiniteLoop interval={5000} showArrows showThumbs={false} swipeable stopOnHover>
                        <img className="mySlides w3-animate-fading" src={equipe} alt="paysage" />
                        <img className="mySlides w3-animate-fading" src={elza} alt="paysage" />
                        <img className="mySlides w3-animate-fading" src={angelique} alt="paysage" />
                        <img className="mySlides w3-animate-fading" src={fanny} alt="paysage" />
                        <img className="mySlides w3-animate-fading" src={laurine} alt="paysage" />
                        <img className="mySlides w3-animate-fading" src={lea} alt="paysage" />
                        <img className="mySlides w3-animate-fading" src={marie} alt="paysage" />
                        <img className="mySlides w3-animate-fading" src={morgane} alt="paysage" />
                        <img className="mySlides w3-animate-fading" src={valerie} alt="paysage" />
                        </Carousel>
        
      </div>
                
        
            </div>
            
        </div>
        
</div>
    </div>
 );
}

export default Equipe;
