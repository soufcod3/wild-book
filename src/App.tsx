import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Wilder from './components/Wilder';
import Forms from './components/Forms';
import { IWilder } from './Interfaces';

function App() {

  const [wilders, setWilders] = React.useState<IWilder[]>([]);
  const [skills, setSkills] = React.useState([]);

  const getWilders = () => {
    axios.get("http://localhost:8080/api/wilders")
      .then( (wilders) => {
        setWilders(wilders.data);
    } )
  }

  const getSkills = () => {
    axios.get("http://localhost:8080/api/skills")
      .then((skills) => {
        setSkills(skills.data);
      })
  };

  useEffect(() => {
    getWilders();
    getSkills();
  }, []);

  return (
    <div>
    <header>
      <div className="container">
        <h1>Wilders Book</h1>
      </div>
    </header>
    <main className="container">
      <h2>Wilders</h2>
      <Forms wilders={wilders} skills={skills} getWilders={getWilders} getSkills={getSkills}/>
      <section className="card-row">
        {/* JSX ne permet d'écrire une expression qu'en une seule ligne (pas de boucles donc) */}
        {
         wilders.map((wilder) => {
          return <Wilder
          onWilderCreated={() => getWilders()}
          id={wilder.id}
          key={wilder.id}
          name={wilder.name} 
          city={wilder.city} 
          upvotes={wilder.upvotes}
          />
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
