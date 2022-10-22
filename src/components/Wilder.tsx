import blank_profile from "../assets/img/8bRN5ga.png";
import React, { useEffect } from "react";
import axios from "axios";
import { IWilder } from "../Interfaces";
import Skill from "./Skill";


const Wilder: React.FC<IWilder> = (props: IWilder): JSX.Element => {
  
  const [image, setImage] = React.useState(blank_profile);
  const [imageFile, setFile] = React.useState("");

  const getImage = async () => {
    await axios.get(`http://localhost:8080/avatar/${props.id}`).then(
      (response) => {
        // Si la reponse contient le chemin de l'image
        if (response.data.path) {
          setImage("http://localhost:8080/" + response.data.path);
        }
      }
    );
  }

  useEffect(() => {
    getImage();
  })

  const getImageFile = (e: any) => {
    console.log("Fichier ajouté : ");
    console.log(e.target.files[0])
    setFile(e.target.files[0]);
  }

  const uploadImage = (event: any) => {
    event.preventDefault(); // prevents browser to refresh

    const formData = new FormData(); // create new form object
    formData.append('file', imageFile); // add image to form object

    axios({
      method: 'post',
      url: `http://localhost:8080/avatar/${props.id}`,
      data: formData, // send image to server
    })
    .then((response) => {
      getImage(); // set url to image variable
    })
    .catch((err) => {
      console.log(err);
    })
    
  }

  const deleteWilder = () => {
    axios.delete(`http://localhost:8080/api/wilder/${props.id}`)
    .then(() => {
      props.onWilderCreated();
    })
  };

  return (
    <article className="card">
      <img src={image} alt="" />
      <h3>{props.name}</h3>
      <h5>{props.city}</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {props.upvotes?.map((upvote) => {
          return (
            <Skill
            onUpvote={ () => props.onWilderCreated() } 
            key={upvote.id}
            id={upvote.id} 
            skill={upvote.skill}
            count={upvote.count}
            wilder={upvote.wilder}
            />
          );
        })}
      </ul>
      <div className="delete">
        <button onClick={deleteWilder}>🗑️</button>
      </div>
      <form onSubmit={uploadImage}>
            <div className="flex">
                <label htmlFor="Choisissez un avatar"></label>
                <input type="file" name="file" accept=".jpg, .png"
                onChange={getImageFile}/>
                <button type="submit">ok</button>
            </div>
        </form>
    </article>
  );
}

export default Wilder;
