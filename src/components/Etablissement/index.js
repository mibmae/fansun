import React from 'react';
import './styles.scss';
import etab from '../../assets/images/illust2.jpg'

function Etablissement() {
  return (
   <div className="etablissement" id="etablissement">
    <div className="container_equipe">
        <div className="imageillust_eta"><img className="image_illust" src={etab} /></div>
        <div className="textillust_eta">
            <div className="etablissement_title">NOS ETABLISSEMENTS FANSUN</div>
            <div className="etablissement_pres">Vous rêvez d’avoir la peau hâlée toute l’année ?
            <p>Rendez-vous au centre de bronzage et d’esthétique Fan Sun à Alès (Gard) ou à Bagnols sur Cèze (Gard) où vous pourrez profiter du solarium à prix vraiment attractif.</p> <p>Créé par Fanny et Angélique, deux soeurs passionnées d’esthétique, le centre de bronzage est rapidement devenu un centre d’esthétique complet de 160 m2 où vous pouvez aujourd’hui vous faire chouchouter de la tête aux pieds.   </p>
<p>Votre institut met à la carte des prestations qui vont vous donner envie de vous faire délicieusement belle : bronzage, épilation, onglerie, beauté du regard, maquillage semi-permanent, blanchiment dentaire, soins pour le visage, Plasma Pen contre les rides, soins pour le corps, soins minceur… Nous avons trouvé votre nouvelle adresse beauté !  
Vous voulez affiner votre silhouette sans chirurgie ? </p><p>Découvrez la méthode de massage révolutionnaire <a className="linkext" href="https://www.magazine-avantages.fr/tout-savoir-sur-le-drainage-lymphatique-methode-renata,192314.asp#:~:text=Le%20praticien%20r%C3%A9alise%20ainsi%20des,les%20bras%20et%20le%20ventre." target="_blank">Renata França</a>. Le drainage lymphatique permet d’atténuer la cellulite aqueuse. Le remodelage, quant à lui, déloge les cellules graisseuses et vous promet une silhouette plus tonique.</p><p> Vous allez adorer rentrer à nouveau dans votre jean !   
Pour profiter des dernières techniques esthétiques du moment, prenez vite rendez-vous au centre de bronzage et d’esthétique Fan Sun à Alès. Une équipe de choc vous attend pour vous prodiguer des soins de haute qualité avec beaucoup de douceur et de gentillesse. Vous allez aussitôt vous sentir à l’aise.
</p>
</div>
</div>

</div>
    </div>
 );
}

export default Etablissement;
