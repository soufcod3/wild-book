import { IForms } from "../Interfaces";
import SkillForm from "./SkillForm";
import WilderForm from "./WilderForm";
import WilderSkillForm from "./WilderSkillForm";

const Forms = (props: IForms) => {

  return (
    <section className="container row">
      <div className="col-4">
        <WilderForm onWilderCreated={() => props.getWilders()} />
      </div>
      <div className="col-4">
        <SkillForm onSkillCreated={() => props.getSkills()} />
      </div>
      <div className="col-4">
        <WilderSkillForm
          wilders={props.wilders}
          skills={props.skills}
          onLinking={() => props.getWilders()}
        />
      </div>
    </section>
  );
};

export default Forms;
