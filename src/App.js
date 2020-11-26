import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: 'GameUnity',
      url: 'http://github.com/ThiagoBrolly/gameunity',
      techs: ['C#', 'Javascript']
    })

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter(
      repo => repo.id !== id
    ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        ))}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
