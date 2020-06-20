import React ,{useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(()=>{
    api.get('repositories').then(response =>{
      setRepositories(response.data)
      console.log(response.data);
      
    })
  },[])


  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title:`repositorio ${Date.now()}`
    })

    const repository = response.data
    setRepositories([...repositories, repository])
    console.log(repositories)
  }


  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);
    repositories.splice(repositories
      .findIndex((repo) => repo.id === id), 1);
    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(rep => 
          <li key={rep.id}>{rep.title}
          

          <button onClick={() => handleRemoveRepository(rep.id)}>
            Remover
          </button>
        </li>
        )}
        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
