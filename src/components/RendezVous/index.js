import React, { useEffect, useState } from 'react';
import { BiLoader } from 'react-icons/bi';
import { RotatingLines } from 'react-loader-spinner';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.scss';

function RendezVous({ items }) {
    
    const [where, setWhere] = useState('ales|https://www.planity.com/fan-sun-ales-30100');
    const [whereN, setWhereN] = useState('Alès');
    const [loading, setLoading] = useState(false);
    useEffect(() => {
      setLoading(true)
      setTimeout(() => {
          setLoading(false)
      }, 500);
      setTimeout(() => {
        document.getElementById(where.split("|")[0]).setAttribute('selected','selected');
      }, 800);
    }, [where])   
    
  return (
    <>
    {loading ? (<div className="loader"><RotatingLines
  strokeColor="#CEAB8D"
  strokeWidth="5"
  animationDuration="0.75"
  width="96"
  visible={true}
/></div>) : ( 
      
   <div className="rendezvous">
    <div className="rdv_title">{items === 'prestas' && ('Nos prestations')}{items === 'rdv' && ('Rendez-vous en ligne')}</div>
   <div className="box">
  <select id="select" onChange={(e) => setWhere(e.target.value)}>
  <option id="ales" value='ales|https://www.planity.com/fan-sun-ales-30100'>Salon d'Alès</option>
  <option id="bagnols" value='bagnols|https://www.planity.com/fan-sun-bagnols-sur-ceze-30200'>Salon de Bagnols sur cèze</option>
  </select>
</div>
    {where !== '' && (
    <iframe className="iframeModal" src={where.split("|")[1]}></iframe>
    )}
    
   </div>
 )}
 </>
  )}
    


export default RendezVous;
