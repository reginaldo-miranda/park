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
      placa: inputPlaca.current.value.toUpperCase(),
      marca: inputMarca.current.value.toUpperCase(),
      cor: inputCor.current.value.toUpperCase()
    
    });
        inputPlaca.current.value = "";
        inputMarca.current.value = "";
       inputCor.current.value = "";
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
  <div className="content">
    <form className="form">
      <h1>Cadastro de Veículos</h1>
      <input name="placa" type="text" placeholder="Placa" ref={inputPlaca} />
      <input name="marca" type="text" placeholder="Marca" ref={inputMarca} />
      <input name="cor" type="text" placeholder="Cor" ref={inputCor} />
      <button type="button" onClick={createUser}>
        Cadastrar
      </button>
    </form>

    <div className="cards">
      {carro.map((veiculos) => (
        <div key={veiculos.id} className="card">
          <div className="card-info">
            <p><strong>Placa:</strong> {veiculos.placa}</p>
            <p><strong>Marca:</strong> {veiculos.marca}</p>
            <p><strong>Cor:</strong> {veiculos.cor}</p>
          </div>
          <button onClick={() => deleteUser(veiculos.id)} className="delete-button">
            <img src={Lixeira} alt="Excluir" />
          </button>
        </div>
      ))}
    </div>
  </div>
</div>

    
  );
}

export default Home;
