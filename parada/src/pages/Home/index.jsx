/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import "./style.css";
import Lixeira from "../../assets/react.svg";
import api from "../../services/api";

function Home() {
  const [carro, setCarro] = useState([]);

  const inputPlaca = useRef();
  const inputMarca = useRef();
  const inputCor= useRef();

 /* const [carro, setCarro] = useState([
   { id: 1, placa: "Teste", marca: 99, cor: "teste@email.com" }
  ]);*/

  async function getUsers() {
    const userFromApi = await api.get("/veiculos");
    setCarro(userFromApi.data);
  }

  async function createUser() {
    await api.post("/veiculos", {
      placa: inputPlaca.current.value,
      marca: inputMarca.current.value,
      cor: inputCor.current.value
    });
    getUsers();
  }

  async function deleteUser(id) {
    await api.delete(`/veiculos/${id}`);
    getUsers(); // Atualiza a lista após a exclusão
  }



  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Veiculos</h1>
        <input name="placa" type="text" placeholder="placa" ref={inputPlaca} />
        <input name="marca" type="text" placeholder="marca" ref={inputMarca} />
        <input name="cor" type="text" placeholder="cor" ref={inputCor} />
        <button type="button" onClick={createUser}>
          Cadastrar
        </button>
      </form>
     
      {carro.map((veiculos) => (
        <div key={veiculos.id} className="card">
          <div>
            <p>
              Placas : <span>{veiculos.placa}</span>
            </p>
            <p>
              Marca : <span>{veiculos.marca}</span>
            </p>
            <p>
              Cor :<span>{veiculos.cor}</span>
            </p>
          </div>
          <button onClick={() => deleteUser(veiculos.id)}>
            <img src={Lixeira} />
          </button>
        </div>
        
      ))}
      </div>
    
  );
}

export default Home;
