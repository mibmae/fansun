import React, { useState, useRef } from 'react';
import './styles.scss';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import * as htmlToImage from 'html-to-image';
import { generateUniqueKey } from 'src/functions';
import store from 'src/store';
import Swal from 'sweetalert2';
import logo from '../../../public/img/logo.jpg'
import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';
// import { writeFile } from 'fs/promises';

function Facture({infos}) {

    const [facture, setFacture] = useState([]);
    const [loading, setLoading] = useState(false);
    const domEl = useRef(null);
    const routeParams = useParams();
    useEffect(() => {
        const token = localStorage.getItem('token_fansun') || localStorage.getItem('token_fansun_admin')
        setLoading(true)        
        setTimeout(() => {
            const idUser = store.getState().User.user.id;
            fetch(`https://serveur.fansun.webmg.eu/user/getfacture/${routeParams.id}`, {
            method: 'POST',
    //   body: JSON.stringify(datas),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'couscousgarbit',
        'x-access-token' : token,
        'iduser' : idUser
      },
        }).then((res) => res.json())
        // .then((response) => console.log(response.datas))
        .then((response) => {
            console.log(response)
            if (response.status === 200) {
            setFacture(response.datas)
            setLoading(false)
            } else {
               Swal.fire({
                title: 'Erreur',
                icon: 'error',
                text: "Vous n'avez pas le droit",
                // button: ["Ok"]
               }).then((res) => {
                if (res.value) {
                    window.location.href = '/'
                }
               })
               setLoading(false)
            }
        })
        
        }, 1500);
        
    // console.log('je suis dans facture', routeParams)
    }, [])

    useEffect(() => {
        console.log(facture)
    }, [facture])

    const convertPdf = () => {
        const token = localStorage.getItem('token_fansun') || localStorage.getItem('token_fansun_admin')
        const element = document.getElementById('facture').innerHTML
        console.log(JSON.stringify(element))
        fetch('https://serveur.fansun.webmg.eu/user/getpdf', {
    // fetch('https://serveur.fansun.webmg.eu/user/modify', {
      method: 'POST',
      body: JSON.stringify({a: element}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'couscousgarbit',
        'x-access-token' : token,
      },
        }).then((res) => res.json())
        .then((response) => console.log(response))
    }

    const downloadImage = async () => {
        console.log('tintin')
        const dataUrl = await htmlToImage.toPng(domEl.current);
     
        // download image
        const link = document.createElement('a');
        link.download = "html-to-img.png";
        link.href = dataUrl;
        link.click();
      }

      const handleCaptureClick = async () => {
        document.getElementById('download').style.display = "none"
        const canvas = await html2canvas(domEl.current);
        const dataURL = canvas.toDataURL('image/png');
        Promise.all(downloadjs(dataURL, `Facture-${facture[0].id}.png`, 'image/png'))
        .then((r) => console.log(r))
        // .catch((error) => console.log(error))
        .finally(() => {
                    document.getElementById('download').style.display = "block"
         
                })
      };

    // const convertPdf = () => {
    //     const element = document.getElementById('facture')
    //     document.getElementById('download').style.display = "none"
    //     toPng(element, { cacheBust: true, })
    //     .then((dataUrl) => {
           
    //             const link = document.createElement('a')
    //             link.download = `Facture-${facture[0].id}.png`
    //             link.href = dataUrl
    //             link.click()  
            
                
            
         
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    //     .finally(() => {
    //         document.getElementById('download').style.display = "block"
 
    //     })
    // }
    
    
  return (
   
     <><div className="superContainer">

          {!loading && facture.length > 0 ? (

              <div className="containerfacture d-flex" id='facture' ref={domEl}>
                  <style>

                  </style>
                  <div className="invoice">
                      <div className="row">
                          <div className="col-7">
                              <img src={logo} className="logo_facture" />
                          </div>
                          <div className="col-5">
                              <h1 className="document-type display-4 mr-5">FACTURE</h1>
                              <p className="text-right text-mob"><strong>Facture : {facture.length > 0 && facture[0].id}</strong></p>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-7">
                              <p className="addressMySam">
                                  <strong>Fansun</strong><br />
                                  480, avenue Olivier de Serres<br />
                                  30100 Alès
                              </p>
                          </div>
                          <div className="col-5">
                              <br /><br /><br />
                              <p className="addressDriver">
                                  <strong><span>{facture.length > 0 && facture[0].user[0].nom}</span><span> {facture.length > 0 && facture[0].user[0].prenom}</span></strong><br />

                                  <span>{facture.length > 0 && facture[0].user[0].addresse}</span><br />
                                  <span>{facture.length > 0 && facture[0].user[0].cp}</span> <span
                                  >{facture.length > 0 && facture[0].user[0].ville}</span>
                              </p>
                          </div>
                      </div>
                      <br />
                      <br />
                      {/* <h6>Frais de services MYSAM du <span >date</span> au <span >date</span>
            </h6> */}
                      <br />
                      <table className="table table-striped">
                          <thead>
                              <tr>
                                  <th>Description</th>
                                  {/* <th>Quantité</th> */}
                                  <th>Unité</th>
                                  <th>PU TTC</th>
                                  <th>TVA</th>
                                  {/* <th class="text-right">Total HT</th> */}
                                  <th className="text-right">Total TTC</th>
                              </tr>
                          </thead>
                          <tbody>
                              {facture[0].formations[0].map((e) => (
                                  <tr key={generateUniqueKey(e)}>
                                      <td>{e.name}</td>
                                      {/* <td>13</td> */}
                                      <td>1</td>
                                      <td className="text-right">{e.price} €</td>
                                      <td>20%</td>
                                      {/* <td class="text-right" >{(e.price / 1.20).toFixed(2)} €</td> */}
                                      <td className="text-right">{e.price} €</td>
                                  </tr>
                              ))}

                          </tbody>
                      </table>
                      <div className="row">
                          {/* {window.innerWidth} */}
                          {window.innerWidth < 800 ? (
                              <><div className="col-4"></div>
                                  <div className="col-7">
                                      <table className="table table-sm text-right table-mob">
                                          <tbody>
                                              {facture[0].details.remise === 0 ? (
                                                  <><tr>
                                                      <td><strong>Total HT</strong></td>
                                                      <td className="text-right">{(facture[0].details.totalSansremise / 1.2).toFixed(2)} €</td>
                                                  </tr><tr>
                                                          <td><strong>TVA 20%</strong></td>
                                                          <td className="text-right">{(facture[0].details.totalSansremise * 0.2).toFixed(2)} €</td>
                                                      </tr><tr>
                                                          <td><strong>Total TTC</strong></td>
                                                          <td className="text-right">{(facture[0].details.totalSansremise)} €</td>
                                                      </tr></>
                                              ) : (
                                                  <><tr>
                                                      <td><strong>Total HT</strong></td>
                                                      <td className="text-right">{(facture[0].details.totalSansremise - (facture[0].details.totalSansremise * 0.2)).toFixed(2)} €</td>
                                                  </tr>

                                                      <tr>
                                                          <td><strong>TVA 20%</strong></td>
                                                          <td className="text-right">{(facture[0].details.totalSansremise * 0.2).toFixed(2)} €</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Total TTC (sans remise)</strong></td>
                                                          <td className="text-right">{(facture[0].details.totalSansremise)} €</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Remise</strong></td>
                                                          <td className="text-right red-text">{facture[0].details.remise} %</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Total TTC (avec remise)</strong></td>
                                                          <td className="text-right">{(facture[0].details.total)} €</td>
                                                      </tr></>
                                              )}

                                          </tbody>
                                      </table>
                                  </div>
                              </>
                          ) : (
                              <><div className="col-6" />
                                  <div className="col-5">
                                      <table className="table table-sm text-right table-mob">
                                          <tbody>
                                              {facture[0].details.remise === 0 ? (
                                                  <><tr>
                                                      <td><strong>Total HT</strong></td>
                                                      {/* <td className="text-right">{(facture[0].details.totalSansremise - (facture[0].details.totalSansremise * 0.2)).toFixed(2)} €</td> */}
                                                      <td className="text-right">{(facture[0].details.totalSansremise * 100 / (100 + 20) ).toFixed(2)} €</td>
                                                  </tr><tr>
                                                          <td><strong>TVA 20%</strong></td>
                                                          {/* <td className="text-right">{(facture[0].details.totalSansremise * (20/100)).toFixed(2)} €</td> */}
                                                          <td className="text-right">{(facture[0].details.totalSansremise / 120 * 20).toFixed(2)} €</td>
                                                      </tr><tr>
                                                          <td><strong>Total TTC</strong></td>
                                                          <td className="text-right">{(facture[0].details.totalSansremise)} €</td>
                                                      </tr></>
                                              ) : (
                                                  <><tr>
                                                      <td><strong>Total HT</strong></td>
                                                      <td className="text-right">{(facture[0].details.totalSansremise * 100 / (100 + 20) ).toFixed(2)} €</td>
                                                  </tr>

                                                      <tr>
                                                          <td><strong>TVA 20%</strong></td>
                                                          <td className="text-right">{(facture[0].details.totalSansremise / 120 * 20).toFixed(2)} €</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Total TTC (sans remise)</strong></td>
                                                          <td className="text-right">{(facture[0].details.totalSansremise)} €</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Remise</strong></td>
                                                          <td className="text-right red-text">{facture[0].details.remise} %</td>
                                                      </tr>
                                                      <tr>
                                                          <td><strong>Total TTC (avec remise)</strong></td>
                                                          <td className="text-right">{(facture[0].details.total)} €</td>
                                                      </tr></>
                                              )}

                                          </tbody>
                                      </table>

                                  </div>
                              </>
                          )}

                          <p className="conditions">
                              En votre aimable règlement
                              <br />
                              Et avec nos remerciements.
                              <br /><br />
                              Payé par carte bancaire le {moment(facture[0].details.date).format("DD/MM/YYYY")}
                              <br />
                              Aucun escompte consenti pour règlement anticipé.
                              <br />
                              {/* Règlement par virement bancaire ou carte bancaire. */}
                              <br /><br />
                              {/* En cas de retard de paiement, indemnité forfaitaire pour frais de recouvrement : 40 euros (art. L.4413
            et
            L.4416 code du commerce). */}
                          </p>

                          <br />
                          <br />
                          <br />
                          <br />

                          <p className="bottom-page text-right">
                              SAS FANSUN - N° SIRET 84262258100028 RCS NIMES B 842 622 581<br />
                              480, avenue Olivier de Serres - 30100 Alès 06 01 02 03 04 - www.fansun.fr<br />
                              Code APE 9602B - N° TVA Intracom. FR 31 842622581<br />
                              {/* IBAN FR76 1470 7034 0031 4211 7882 825 - SWIFT CCBPFRPPMTZ */}
                          </p>
                          <div className="d-flex justify-content-center mb-5 mt-5">
                              {/* <button className="button_prestas " id="download" onClick={() => convertPdf()} > Télécharger la facture </button> */}
                              <button className="button_prestas" id="download"  onClick={handleCaptureClick}>Télécharger la facture</button>
                          </div>
                      </div>
                  </div>
                  
              </div>

          ) : ('Loading')}
      </div></>)}


export default Facture;
