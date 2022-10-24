import React, { useEffect } from "react";
import "./App.css";
import Wilder from "./components/Wilder";
import Forms from "./components/Forms";
import { IWilder } from "./Interfaces";
import { gql, useQuery } from "@apollo/client";

const GET_WILDERS = gql`
  query Wilders {
    wilders {
      id
      name
      city
      upvotes {
        id
        upvotes
        skill {
          id
          name
        }
      }
    }
  }
`;

const GET_SKILLS = gql`
  query Skills {
    skills {
      id
      name
    }
  }
`;

function App() {

  const {
    loading: wildersLoading,
    data: wildersData,
    refetch: refetchWilders,
  } = useQuery(GET_WILDERS);

  const [wilders, setWilders] = React.useState<IWilder[]>([]);
  const getWilders = () => {
    setWilders(wildersData && wildersData.wilders);
  };

  const {
    data: skillsData,
    refetch: refetchSkills
  } = useQuery(GET_SKILLS);
  const [skills, setSkills] = React.useState([]);

  const getSkills = () => {
    setSkills(skillsData && skillsData.skills);
  };

  useEffect(() => {
    getWilders();
    getSkills();
  });

  return (
    <div>
      <header>
        <div className="container">
          <h1>Wilders Book</h1>
        </div>
      </header>
      <main className="container">
        <h2>Wilders</h2>
        <Forms
          wilders={wilders}
          skills={skills}
          refetchWilders={refetchWilders}
          refetchSkills={refetchSkills}
        />
        {wildersLoading ? <h1>Chargement...</h1> : null}
        <section className="card-row">
          {
            // && ou data? : ça évite d'aller chercher si null ou undefined
            wildersData &&
              wildersData.wilders.map((wilder: any) => {
                return (
                  <Wilder
                    onWilderCreated={() => getWilders()}
                    id={wilder.id}
                    key={wilder.id}
                    name={wilder.name}
                    city={wilder.city}
                    upvotes={wilder.upvotes}
                  />
                );
              })
          }
        </section>
      </main>
      <footer>
        <div className="container">
          <p>&copy; 2022 Wild Code School</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
