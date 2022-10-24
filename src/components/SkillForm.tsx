import React from "react";
import { ISkillForm } from "../Interfaces";
import { gql, useMutation } from "@apollo/client";

const CREATE_SKILL = gql`
  mutation CreateSkill($name: String!) {
    createSkill(name: $name) {
      id
    }
  }
`;

const SkillForm = (props: ISkillForm): JSX.Element => {
  
  const [skillName, setSkillName] = React.useState("");
 
  const [newSkill, { loading, error }] = useMutation(CREATE_SKILL);
  
  if (loading) return <h1>Submitting...</h1>;
  if (error) return <h5>Submission error! ${error.message}</h5>;

  // MouseEvent ne veut pas marcher d'où ce type
  async function onSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    let data = await newSkill({
      variables: {
        name: skillName,
      },
    });
    console.log(data);
    setSkillName(""); // Reset input
    props.refetchSkills(); // Refresh skills for upvote form
  }

  return (
    <form onSubmit={onSubmit}>
      <h3 className="">New skill</h3>
      <div className="form-row mb-2">
        <input
          placeholder="Enter a skill"
          // className={errorClass}
          value={skillName}
          onChange={(event) => {
            setSkillName(event.target.value);
          }}
        ></input>
        {/* <div className="invalid-feedback">{SkillError && SkillError.message}</div> */}
      </div>
      <button className="btn btn-primary w-100" type="submit">
        Add skill
      </button>
    </form>
  );
};

export default SkillForm;
