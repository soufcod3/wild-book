import { useState } from "react";
import { IWilderForm } from "../Interfaces";
import { gql, useMutation } from "@apollo/client";

const CREATE_WILDER = gql`
  mutation CreateWilder($city: String!, $name: String!) {
    createWilder(city: $city, name: $name) {
      id
    }
  }
`;

const WilderForm = (props: IWilderForm) => {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");

  const [newWilder] = useMutation(CREATE_WILDER);

  async function onSubmit(event: { preventDefault: () => void }) {
    console.log(name);
    console.log(city);
    event.preventDefault();

    await newWilder({
      variables: {
        name: name,
        city, // avec ES6 on peut simplifier si clé = valeur
      }
    });

    setName("");
    setCity("");
  }


  props.onWilderCreated();

  return (
    <form onSubmit={onSubmit}>
      <h3 className="">New wilder</h3>
      <div className="form-group mb-2">
        <input
          placeholder="Enter a name"
          className="form-control"
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></input>
      </div>
      <div className="form-group mb-2">
        <input
          placeholder="Enter a city"
          className="form-control"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        ></input>
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Add wilder
      </button>
    </form>
  );
};

export default WilderForm;
