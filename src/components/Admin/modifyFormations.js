import React, { useRef, useState, useEffect } from 'react';
import { generateUniqueKey } from 'src/functions';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import ReactQuill, { Quill } from "react-quill";

import { Navbar, Nav, NavItem, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import { RiDeleteBinLine } from 'react-icons/ri';
import { BsGear } from 'react-icons/bs'
import { ImCross } from 'react-icons/im'

import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import './styles.scss';



var Image = Quill.import('formats/image');
Image.className = 'image-quill';
Quill.register(Image, true);

function ModifyFormations({ id, closeModalModif }) {

  const [pics, setPics] = useState([]);
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [formation, setFormation] = useState();
  const [value, setValue] = useState('');
  const [defaultImg, setDefaultImg] = useState('');
  const [loading, setLoading] = useState(false)
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const fileList = () => {
    fetch('https://serveur.fansun.webmg.eu/admin/pics/list')
      .then((response) => response.json())
      .then((res) => {
        setPics(res.array);
        // setIsOpenImg(true)
        //  setLoading(false);
      });
  };

  const infoFormation = (id) => {
    fetch(`https://serveur.fansun.webmg.eu/admin/formations/${id}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'x-api-key': 'couscousgarbit',
        'x-access-token' : localStorage.getItem('token_fansun_admin')
      }
    })
      .then((response) => response.json())
      .then((res) => {
        setValue(res.formation[0].description)
        setFormation(res.formation[0])
        setImage(res.formation[0].img)
        setDefaultImg(res.formation[0].img)
        setFileUrl(res.formation[0].link)

      })
  }
  const [image, setImage] = useState(null);

    const formaddform = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleChange(event) {
      setFile(event.target.files[0]);
      handleSubmitPic(event)
    }

    function handleSubmitFile(event) {
      console.log(event.target.files[0].type)
      setLoading(true)
      event.preventDefault()
      if (event.target.files[0].size < 209715200 && event.target.files[0].type === "application/pdf") {
        const url = `https://serveur.fansun.webmg.eu/admin/files/upload/`;
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('fileName', event.target.files[0].name);
        const config = {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
            'x-access-token' : localStorage.getItem('token_fansun_admin')
          },
        };
        axios.post(url, formData, config).then((response) => {
          // console.log(response.data.address)
          setFileUrl(response.data.address)
          setLoading(false)
          if (document.getElementById('addfile').classList.contains('red')) {
            document.getElementById('addfile').classList.remove('red')
            }
          
          // getFormations(start, number);
          // if (response.data.address !== '') {
          //   setImg(response.data.address);
          //   if (response.data.message === 'Image ajoutée') {
          //     swal({
          //       title: 'Image ajoutée',
          // text: 'L\'image est ajoutée',
          // icon: 'success',
          // confirmButtonText: 'Ok',
          //     })
          //   }
          //   fileList();
          //   // document.getElementById('upload').value = '';
          //   setFile(undefined)

          // }
        });
      }
      else {
        setLoading(false)
        swal({
          title: 'Erreur',
          text: 'Le poid du fichier doit être inférieur à 2 MO et ce doit être un fichier PDF',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        // event.target.files[0] = ""
      }
    }


    function handleSubmitPic(event) {
      // console.log(event.target.files[0])
      event.preventDefault()
      // if (file.size < 2097152) {
      if (event.target.files[0].size < 209715200) {
        const url = 'https://serveur.fansun.webmg.eu/admin/files/upload';
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        formData.append('fileName', event.target.files[0].name);
        const config = {
          method: 'POST',
          headers: {
            'content-type': 'multipart/form-data',
          },
        };
        axios.post(url, formData, config).then((response) => {
          setFileUrl(response.data.address)
          // if (response.data.address !== '') {
          //   setImg(response.data.address);
          //   if (response.data.message === 'Image ajoutée') {
          //     swal({
          //       title: 'Image ajoutée',
          // text: 'L\'image est ajoutée',
          // icon: 'success',
          // confirmButtonText: 'Ok',
          //     })
          //   }
          //   fileList();
          //   // document.getElementById('upload').value = '';
          //   setFile(undefined)

          // }
        });
      }
      else {
        swal({
          title: 'Erreur',
          text: 'L\'image est trop volumineuse ! Le poid doit être inférieur à 2 MO',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      }
    }
    
    useEffect(() => {
    }, [fileUrl])
    useEffect(() => {
     infoFormation(id)
    }, [id])
    

    const modifyFormation = (data, event) => {
        event.preventDefault();
        const formC = document.getElementById('modform_form');
        const datas = Object.fromEntries(new FormData(formC).entries());
        const title = document.getElementById('title').value
        // const description = document.getElementById('desc').value
        const price = document.getElementById('prix').value
        // const fichier = fileUrl
        const image = document.getElementById('imageform').src

      // console.log('fichier', fileUrl, fileUrl.length)
      if (fileUrl.length > 0) {
        const obj = {
          id: id,
          title: title,
          description: value,
          price: price,
          image: image,
          link: fileUrl,
        }
      

        const tokenAdmin = localStorage.getItem('token_fansun_admin');
        if (tokenAdmin) {
//   fetch(`https://serveur.fansun.webmg.eu/formations/modify`, {
    //   //   method: 'POST',
    //   //   body: JSON.stringify({id, description, title, price, picture}),
    //   //   headers: {
    //   //     Accept: 'application/json',
    //   //     'Content-Type': 'application/json',
    //   //     'x-access-token' : localStorage.getItem('token_fansun_admin')
    //   //   },
    //   // }).then((response) => {
        fetch(`https://serveur.fansun.webmg.eu/formations/modify`, {
        // fetch(`https://serveur.fansun.webmg.eu/formations/modify`, {

        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': tokenAdmin,
        },
      }).then((response) => {
        response.json().then((formations) => {
          if (formations.modify === 'ok') {
            // window.location.reload()
            closeModalModif()
          }
          // window.location.reload()
        //  setTotal(formations.data.length)
        //   setLoading(false);
        });
      });
        }
    } else {
      swal({
        title: 'Erreur',
        text: "Vous n'avez pas indiqué de fichier de formation !!",
        icon: 'error',
        confirmButtonText: 'Ok',
      });
      document.getElementById('addfile').classList.add('red')
    }


        // console.log('addformation', event)
        
    }

    const changeImage = (e) => {
      setImage(e.link);
    }

    useEffect(() => {
     fileList()
    }, [])

    useEffect(() => {
      
    }, [image])
    

    useEffect(() => {
      // console.log(fileUrl)
    }, [fileUrl])
    
    const [quilModules] = useState({
      toolbar: {
        // [{ header: [1, 2, false] }],
        container: [
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        // [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    });
    useEffect(() => {
      // quill.getModule("toolbar").addHandler("video", videoHandler);

    }, [])
    function imageHandler() {
      console.log(quillRef.current)
      if (!quillRef.current) return
  
      const editor = quillRef.current.getEditor()
      const range = editor.getSelection()
      const value = prompt("Please enter the image URL")
  
      if (value && range) {
        editor.insertEmbed(range.index, "image", value, "user")
      }
    }
    const [quilFormats] = useState([
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "indent",
      "size",
      "heading",
      "color",
      "background",
      "font",
      "align",
      "link",
      "image",
      "video",
    ]);

    useEffect(() => {
      // if (formation) {
      // console.log(pics.filter((e) => e.link === formation.img))
      // }
      // console.log(formation)
      // pics.map((e) => console.log(e))
    }, [pics, formation])
    function Loading() {
      return<div className="loadingg"> <h2><div className="loadlogo"><BsGear /></div> Chargement...</h2></div>;
    }

    useEffect(() => {
      setTimeout(() => {
        console.log(document.getElementsByClassName('ql-tooltip'))
 
      }, 1000);
    }, [])
    

  return (
    <>
    {loading && <Loading />}
    <div className="container_d">
    <div className="child_add" >
        <form action="" id="modform_form" ref={formaddform} onSubmit={handleSubmit(modifyFormation)}>
                  <div className="formation_prout" id="titleform"><input type='text' id="title" required className="add_form_input" placeholder='Nom de la formation' defaultValue={formation && formation.name}/></div>
                  {pics && pics.length > 0 && (
                    // <select name="image" className="select_image" id="image" onChange={(e) => changeImage(e)}>
                    //   {/* {defaultImg && <option defaultValue>*{defaultImg.substring(40, defaultImg.length)}</option>} */}
                    //   {/* <option>Sélectionner une image</option> */}
                    //   {defaultImg && (
                    //     <option defaultValue disabled>*{defaultImg.substring(40, defaultImg.length)}</option> )}
                    //   { pics.map((e) =>  (<><option value={e.link}>{e.name}</option></>))}
                      
                    // </select>
                    <Navbar brand='React-Bootstrap'>
                    <Nav className="marginAuto">
                      <DropdownButton 
                        title={
                         'Choisir une image'
                        }
                        // onSelect={(f) => changeImage(f)}
                        // onClick={() => {
                        //   const element = document.getElementsByClassName('swal2-container')[0]
                        //   element.scrollTo({
                        //     bottom: 0,
                        //     behavior: 'smooth',
                        //   })
                        // }}
                      >
                        {pics.map((g) => <Dropdown.Item eventKey={g.link} key={generateUniqueKey(g)} onClick={() => changeImage(g)}>
                        <img className="iconSelect" src={g.link} />
                          </Dropdown.Item>)}
                      </DropdownButton>
                    </Nav>
                   
                  </Navbar>
                  )}
                  <input type='hidden' id='formaLink' defaultValue={formation && formation.link} />
                  <div className="addFile_label"> 
                  <label htmlFor="uploadS" className="label-file">{fileUrl && fileUrl !== '' ? <div className="link_add"><span className="nameFilUp">{fileUrl && fileUrl.slice(38)}</span><span className="deleteFileUploaded" onClick={() => setFileUrl('')}><RiDeleteBinLine className="deletefile" /></span></div> : <button className="button_prestasfileS" id="addfile"><input type="file" className='input_fileS' id="uploadS" accept=".pdf" placeholder='Choisir un fichier' onChange={(g) => handleSubmitFile(g)} /> Choisir le fichier de la formation</button>}</label>  </div>
                               


                  {/* <input type="text" id="changeImage"  className="add_form_input_img" placeholder="Entrez le lien d'une image" onChange={(e) => changeImage(e)} /> */}
                  <div className="formations_img">
                    {/* <img className="formation_title_image" id={`image${e.id}`} src={e.img} onClick={(f) => changeImage(e.id)} /></div> */}
                    
                    <img className="add_formation_image" id="imageform"  src={image === null ? "https://serveur.fansun.webmg.eu/uploads/hd_massagerelaxant.jpg" : image} />
                    </div>
                  <div className="url"><input type="text" className="input_img"  /></div>
                  <div className="formation_content_admin_add" >
                    
          <ReactQuill theme="snow" value={value} onChange={setValue} ref={quillRef}  modules={quilModules}
  formats={quilFormats}
          />
                  </div>

                  <div className="formation_download_admin_add">
                    <div className="pricead" ><input type='number' id="prix" placeholder='Prix' required defaultValue={formation && formation.price} /></div>
                    <button className="button_admin" type='submit' >Modifier</button>

                    
                  </div>
                  </form>
                </div>
    </div>
    </>
 );
}

export default ModifyFormations;
