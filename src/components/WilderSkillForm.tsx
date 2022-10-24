import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { IWilderSkillForm } from "../Interfaces";

const CREATE_UPVOTE = gql`
  mutation CreateUpvote($skillId: ID!, $wilderId: ID!) {
    createUpvote(skillId: $skillId, wilderId: $wilderId) {
      id
    }
  }
`;

const WilderSkillForm = (props: IWilderSkillForm) => {
  // Selected values
  const [wilderId, setWilderId] = useState("");
  const [skillId, setSkillId] = useState("");

  const [newUpvote] = useMutation(CREATE_UPVOTE);

  // Error display
  const [error, setError] = useState("");
  const [errorClass, setErrorClass] = useState("form-control");

  const getError = (result: any) => {
    setError(result.data);
    setErrorClass("form-control is-invalid");
  };

  const changeSkillId = (e: any) => {
    // Si je ne fais pas par étape, le skill est le précédent, pourquoi ??
    const skillId = e.target.value;
    setSkillId(skillId);
  };

  const changeWilderId = (e: any) => {
    const wilderId = e.target.value;
    setWilderId(wilderId);
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();
    await newUpvote({
      variables: {
        wilderId: wilderId,
        skillId: skillId
      }
    })
    props.refetchWilders();
  };

  const wilders = props.wilders;
  const skills = props.skills;

  return (
    <form onSubmit={onSubmit}>
      <h3 className="">Add skill to wilder</h3>
      <div className="form-group mb-2">
        <select
          value={wilderId}
          onChange={changeWilderId}
          name="wilder-select"
          className="form-control"
        >
          <option>Select a wilder</option>
          {wilders?.map((wilder) => {
            return (
              <option key={wilder.id} value={wilder.id}>
                {wilder.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group mb-2">
        <select
          value={skillId}
          onChange={changeSkillId}
          name="skill-select"
          className={errorClass}
        >
          <option>Select a skill</option>
          {skills?.map((skill) => {
            return (
              <option key={skill.id} value={skill.id}>
                {skill.name}
              </option>
            );
          })}
        </select>
        <div className="invalid-feedback">{error}</div>
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Link that skill
      </button>
    </form>
  );
};

export default WilderSkillForm;
