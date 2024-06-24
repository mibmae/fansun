import React, { useState, useEffect, Suspense } from 'react';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { generateUniqueKey } from 'src/functions'
import './styles.scss';

function Downloads() {
    const [userOk, setUserOk] = useState(false)
    const [idUser, setIdUser] = useState(0);
    const [msg, setMsg] = useState('');
    const { nukecode } = useParams();
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        async function decode(nukecode) {
            const response = await jwtDecode(nukecode).user.id
            setIdUser(response)
        }
       decode(nukecode)
       setLoading(true)
    }, [])
    
    
    useEffect(() => {
            let datas = [];
    datas.push({nukecode: nukecode})
    datas.push({nukesize: jwtDecode(nukecode).user.id})
   
    if (idUser !== 0) {
    fetch('https://serveur.fansun.webmg.eu/user/checktokendownload/', {
        method: "POST",
        body: JSON.stringify(datas),
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-api-key': 'couscousgarbit',
            'x-access-token': nukecode
        }
    }).then((res) => res.json())
    .then((response) => {
        if (response.status === 200) {
            setUserOk(true)
            setFiles(response.files)
        }
        if (response.status !== 200) {
            setUserOk(false);
            setMsg('Status : ' + response.status + ' - ' + response.msg)
        }  
        setLoading(false)
    })
} else {
    setUserOk(false);
    setMsg("Le lien n'est pas valide")
}


    }, [idUser])

    const handleDownload = (linke) => {
        const link = document.createElement('a');
        link.download = linke;
    
        link.href = linke;
        link.target = "_blank";
    
        link.click();
      };

function Loading() {
    return <div className="load">Loading</div>;
}
  return (
   <>
   {loading ? <Loading /> : (
userOk ? (
    <div className="downloads">
     <div className='downloads_title'>Voici vos fichiers à télécharger : </div>
     {files.length > 0 && files.map((e) => (
         <div className="fileToDl" key={generateUniqueKey(e)}>
             <div className="nameFile">{e.name}</div>
             <button className="button_prestas" onClick={() => handleDownload(e.link)}>Télécharger</button>
         </div>))}
     </div>) : (
     <div className="container_error">
         <div className="errorDownload">
            
             <div className="errorMsg">{msg}</div>
             <div className="backtohome"><Link to="/"><button className="button_prestas">Retour à l'accueil</button></Link></div>
             </div>
         </div>
         )
   )}
   
        </>
        
 );
}

export default Downloads;
