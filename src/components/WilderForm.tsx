import React from "react";
import axios from "axios";
import { useState } from "react";
import { IWilderForm } from "../Interfaces";

const WilderForm = (props: IWilderForm) => {
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
  
    function onSubmit(event: {preventDefault: () => void}) {
      event.preventDefault();
      axios
        .post("http://localhost:8080/api/wilder", { name: name, city: city })
        .then((result) => {
          // Afficher mes wilders à jour
          props.onWilderCreated();
          setName("");
          setCity("");
          console.log(result.data);
        });
    }
  
    function onNameChange(event: any) {
      setName(event.target.value);
    }
    function onCityChange(event: any) {
      setCity(event.target.value);
    }
    return (
      <form onSubmit={onSubmit}>
        <h3 className="">New wilder</h3>
        <div className="form-group mb-2">
          <input placeholder="Enter a name" className="form-control" value={name} onChange={onNameChange}></input>
        </div>
        <div className="form-group mb-2">
          <input placeholder="Enter a city" className="form-control" value={city} onChange={onCityChange}></input>      
        </div>
        <button className="btn btn-primary w-100" type="submit">Add wilder</button>
      </form>
    );
  };
  
  export default WilderForm;
  