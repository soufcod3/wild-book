import React from "react";
import axios from "axios";
import { ISkillForm } from "../Interfaces";

const SkillForm = (props: ISkillForm): JSX.Element => {

  const [skillName, setSkillName] = React.useState("");
  const [error, setError] = React.useState("");
  const [errorClass, setErrorClass] = React.useState("form-control");

  const getError = (result: any) => {
    setError(result.data);
    setErrorClass("form-control is-invalid");
  }

  // MouseEvent ne veut pas marcher d'où ce type
  function onSubmit(event: { preventDefault: () => void}) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/api/skill", { name: skillName })
      .then((result) => {
        setSkillName("");
        props.onSkillCreated();
        if (result.status === 201) {
          getError(result);
        }
      });
  }

  const onChange = (event: any) => {
    setSkillName(event.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
    <h3 className="">New skill</h3>
    <div className="form-row mb-2">
      <input
        placeholder="Enter a skill"
        className={errorClass}
        value={skillName}
        onChange={onChange}
      ></input>
      <div className="invalid-feedback">{error}</div>
    </div>
    <button className="btn btn-primary w-100" type="submit">
      Add skill
    </button>
  </form>
  );
}

export default SkillForm;
