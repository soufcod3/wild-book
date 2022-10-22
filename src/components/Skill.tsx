import React, { MouseEventHandler } from "react";
import axios from "axios";
import { IUpvote, IWilder } from "../Interfaces";
import styled from "styled-components";

type SkillProps = IUpvote & { onUpvote: () => IWilder[] };
type CounterCardProps = {count: number};

const CounterCard = styled.li<CounterCardProps>`
    // Fonction (doc styled component)
    user-select: none;
    background-color  : ${(props) => props.count >= 10 ? 'green' : props.count >= 5 ? 'yellow' : 'red' };
    color : ${(props) => props.count >= 10 ? 'white' : props.count >= 5 ? 'black' : 'white' };
`;

const Skill = (props: SkillProps) => {
  async function onUpvote() {
    await axios
      .post(`http://localhost:8080/api/upvote/${props.id}`)
      .then(() => {
        props.onUpvote();
      });
  }

  return (
    // Chevrons vides permettent de créer du JSX sans élément Html
    // <>
    // {
    //     props.count > 10 ? <GreenCard></GreenCard> : props.count > 5 ? <YellowCard></YellowCard> : <RedCard></RedCard>
    // }
    // </>

    <CounterCard count={props.count} onClick={async () => {
        await axios
        .post(`http://localhost:8080/api/upvote/${props.id}`)
        props.onUpvote();
  
         }} className="upvotes">
        {props.skill.name}
        <span className="votes">{props.count}</span>
    </CounterCard>
  )
};

export default Skill;
