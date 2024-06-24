import React, { useRef, useState, useEffect } from 'react';
import { generateUniqueKey } from 'src/functions';
import { useForm } from 'react-hook-form';
import { Editor } from '@tinymce/tinymce-react';
import ReactQuill, { Quill } from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navbar, Nav, NavItem, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './styles.scss';
import swal from 'sweetalert';
import { BsGear } from 'react-icons/bs'
import { RiDeleteBinLine } from 'react-icons/ri'

var Image = Quill.import('formats/image');
Image.className = 'image-quill';
Quill.register(Image, true);


function AddFormations() {

  const [pics, setPics] = useState([]);
  const [file, setFile] = useState();
  const [fileUrl, setFileUrl] = useState();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
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
  const [image, setImage] = useState(null);

    const formaddform = useRef(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    function handleChange(event) {
      setFile(event.target.files[0]);
      handleSubmitPic(event)
    }

    function handleSubmitFile(event) {
      setLoading(true)
      event.preventDefault()
      // if (file.size < 2097152) {
      if (event.target.files[0].size < 209715200) {
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
          setFileUrl(response.data.address)
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
          setLoading(false)
        });
      }
      else {
        swal({
          title: 'Erreur',
          text: 'L\'image est trop volumineuse ! Le poid doit être inférieur à 2 MO',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
        setLoading(false)
      }

    }


    function handleSubmitPic(event) {
      console.log(event.target.files[0])
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
     console.log(fileUrl)
    }, [fileUrl])
    

    const addFormation = (data, event) => {
        event.preventDefault();
        const formC = document.getElementById('addform_form');
        const datas = Object.fromEntries(new FormData(formC).entries());
        const title = document.getElementById('title').value
        // const description = document.getElementById('desc').value
        const price = document.getElementById('prix').value
        const image = document.getElementById('imageform').src

      if (fileUrl !== undefined && fileUrl !== '') {
        const obj = {
          title: title,
          description: value,
          price: price,
          image: image,
          link: fileUrl,
        }
      

        const tokenAdmin = localStorage.getItem('token_fansun_admin');
        if (tokenAdmin) {

        fetch(`https://serveur.fansun.webmg.eu/admin/formations/add`, {

        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'couscousgarbit',
          'x-access-token': tokenAdmin,
        },
      }).then((response) => {
        console.log(response)
        response.json().then((formations) => {
          console.log(formations)
          window.location.reload()
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
      // setImage(e.target.value);
      setImage(e.link);
    }

    useEffect(() => {
     fileList()
    }, [])

    useEffect(() => {
      
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

  function Loading() {
    // return<div className="loadingg"> <h2><div className="loadlogo">🌀</div> Loading...</h2></div>;
    return<div className="loadingg"> <h2><div className="loadlogo"><BsGear /></div> Chargement...</h2></div>;
  }

  return (
    <>
    {loading && <Loading />}
    
   <div className="container_d">
    <div className="child_add" >
        <form action="" id="addform_form" ref={formaddform} onSubmit={handleSubmit(addFormation)}>
                  <div className="formation_prout" id="titleform"><input type='text' id="title" required className="add_form_input" placeholder='Nom de la formation'/></div>
                  {pics && pics.length > 0 && (
                     <Navbar brand='React-Bootstrap'>
                     <Nav className="marginAuto">
                       <DropdownButton 
                         title={
                          'Choisir une image'
                         }
                       >
                         {pics.map((g) => <Dropdown.Item eventKey={g.link} key={generateUniqueKey(g)} onClick={() => changeImage(g)}>
                         <img className="iconSelect" src={g.link} />
                           </Dropdown.Item>)}
                       </DropdownButton>
                     </Nav>
                    
                   </Navbar>
                  )}
                  <div className="addFile_label"> 
                  <label htmlFor="uploadS" className="label-file">
                    {fileUrl !== undefined ? 
                    <div className="link_add">
                      <span className="nameFilUp">{fileUrl.slice(38)}</span>
                      <span className="deleteFileUploaded" onClick={() => setFileUrl(undefined)}><RiDeleteBinLine className="deletefile" />
</span>
                      </div>
                       : 
                       <button className="button_prestasfileS" id="addfile">
                        <input type="file" className='input_fileS' id="uploadS" accept="application/pdf" placeholder='Choisir un fichier' onChange={(g) => handleSubmitFile(g)} />
                         Choisir le fichier de la formation
                         </button>
                         }</label> 
                          </div>
                               


                  {/* <input type="text" id="changeImage"  className="add_form_input_img" placeholder="Entrez le lien d'une image" onChange={(e) => changeImage(e)} /> */}
                  <div className="formations_img">
                    {/* <img className="formation_title_image" id={`image${e.id}`} src={e.img} onClick={(f) => changeImage(e.id)} /></div> */}
                    
                    <img className="add_formation_image" id="imageform"  src={image === null ? "https://serveur.fansun.webmg.eu/uploads/hd_massagerelaxant.jpg" : image} />
                    </div>
                  <div className="url"><input type="text" className="input_img"  /></div>
                  <div className="formation_content_admin_add" >
                    {/* <textarea id="desc" className="add_form_input textareaAdd" rows={9} required /> */}
                    {/* <Editor
            onInit={(evt, editor) => editorRef.current = editor}
            apiKey="6zcj7g28etu6ufv5kfa8v1hvq9qi1p78u9znu8viyez2ndse"
            // initialValue={formation && formation.description}
            init={{
              height: 300,
              
              // menubar: true,
              plugins: 'lists link image help wordcount emoticons code',
              toolbar: 'undo redo | formatselect | '
            + 'bold italic underline backcolor forecolor fontsize fontfamily | alignleft aligncenter '
            + 'alignright alignjustify | bullist numlist outdent indent | '
            + 'removeformat | help | language | emoticons | image | code',
              // toolbar: 'language',
              selector: 'textarea', // change this value according to your HTML
              language: 'fr_FR',
              content_style: "@import url('https://fonts.googleapis.com/css2?family=ABeeZee&family=Montserrat:wght@300;400&display=swap')",
              statusbar: false,
              font_family_formats: 'ABeeZee=abeezee,sans-serif; Arial=arial,helvetica,sans-serif; Courier New=courier new,courier,monospace; AkrutiKndPadmini=Akpdmi-n; ',
              mobile: {
                menubar: false,
                plugins: 'lists link image help wordcount emoticons code',
              toolbar: 'undo redo | formatselect | '
            + 'bold italic underline backcolor forecolor fontsize fontfamily | alignleft aligncenter '
            + 'alignright alignjustify | bullist numlist outdent indent | '
            + 'removeformat | help | language | emoticons | image | code',
              }
            }}
            textareaName="content"
            name="contenu"
            id="desc"
          /> */}
          <ReactQuill theme="snow" value={value} onChange={setValue} ref={quillRef}  modules={quilModules}
  formats={quilFormats}
          />
                  </div>

                  <div className="formation_download_admin_add">
                    <div className="pricead" ><input type='text' id="prix" placeholder='Prix' required /></div>
                    <button className="button_admin" type='submit' >Ajouter</button>

                    
                    {/* <button className="button_prestas_dwl" >Supprimer</button> */}
                  </div>
                  </form>
                </div>
    </div>
    
    </>
 );
}

export default AddFormations;
