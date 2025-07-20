/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import "./style.css";
import Lixeira from "../../assets/lixeira.svg";
import api from "../../services/api";

function Home() {
  const [carro, setCarro] = useState([]);

  const inputPlaca = useRef();
  const inputMarca = useRef();
  const inputCor = useRef();

  /* const [carro, setCarro] = useState([
   { id: 1, placa: "Teste", marca: 99, cor: "teste@email.com" }
  ]);
*/
  async function getUsers() {
    const userFromApi = await api.get("/Veiculos");
    setCarro(userFromApi.data);
  }

  async function createUser() {
    await api.post("/Veiculos", {
      placa: inputPlaca.current.value,
      marca: inputMarca.current.value,
      cor: inputCor.current.value,
    });
    getUsers();
  }

  async function deleteUser(id) {
    await api.delete(`/Veiculos/${id}`);
    getUsers(); // Atualiza a lista após a exclusão
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
  <div className="container">
  <div className="form-container">
    <form>
      <h1>Cadastro de Veículos</h1>
      <input name="placa" type="text" placeholder="placa" ref={inputPlaca} />
      <input name="marca" type="text" placeholder="marca" ref={inputMarca} />
      <input name="cor" type="text" placeholder="cor" ref={inputCor} />
      <button type="button" onClick={createUser}>Cadastrar</button>
    </form>
  </div>

  <div className="cards-container">
    {carro.map((veiculo) => (
      <div key={veiculo.id} className="card">
        <div>
          <p>Placa: <span>{veiculo.placa}</span></p>
          <p>Marca: <span>{veiculo.marca}</span></p>
          <p>Cor: <span>{veiculo.cor}</span></p>
        </div>
        <button onClick={() => deleteUser(veiculo.id)}>
          <img src={Lixeira} alt="Deletar veículo" />
        </button>
      </div>
    ))}
  </div>
</div>

    
  );
}

export default Home;


//* eslint-disable react-hooks/exhaustive-deps 
/*import { useEffect, useState, useRef } from "react";
import "./style.css";
import Lixeira from "../../assets/lixeira.svg";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Home() {
  const [carro, setCarro] = useState([]);

  const inputPlaca = useRef();
  const inputMarca = useRef();
  const inputCor = useRef();

  async function getVeiculos() {
    try {
      const res = await api.get("/api/veiculos");
      setCarro(res.data);
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      toast.error("Erro ao carregar veículos.");
    }
  }

  async function createVeiculo() {
    const placa = inputPlaca.current.value.trim();
    const marca = inputMarca.current.value.trim();
    const cor = inputCor.current.value.trim();

    // Validação simples
    if (!placa || !marca || !cor) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    try {
      await api.post("/api/veiculos", { placa, marca, cor });
      toast.success("Veículo cadastrado com sucesso!");
      getVeiculos();
      // Limpar os campos
      inputPlaca.current.value = "";
      inputMarca.current.value = "";
      inputCor.current.value = "";
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      toast.error("Erro ao cadastrar veículo.");
    }
  }

  async function deleteVeiculo(id) {
    if (!window.confirm("Deseja realmente deletar este veículo?")) return;

    try {
      await api.delete(`/api/veiculos/${id}`);
      toast.success("Veículo deletado!");
      getVeiculos();
    } catch (error) {
      console.error("Erro ao cadastrar veículo:", error);
      toast.error("Erro ao deletar veículo.");
    }
  }

  useEffect(() => {
    getVeiculos();
  }, []);

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <h1>Cadastro de Veículos</h1>
          <input name="placa" type="text" placeholder="Placa" ref={inputPlaca} />
          <input name="marca" type="text" placeholder="Marca" ref={inputMarca} />
          <input name="cor" type="text" placeholder="Cor" ref={inputCor} />
          <button type="button" onClick={createVeiculo}>Cadastrar</button>
        </form>
      </div>

      <div className="cards-container">
        {carro.length === 0 ? (
          <p>Nenhum veículo cadastrado.</p>
        ) : (
          carro.map((veiculo) => (
            <div key={veiculo.id} className="card">
              <div>
                <p>Placa: <span>{veiculo.placa}</span></p>
                <p>Marca: <span>{veiculo.marca}</span></p>
                <p>Cor: <span>{veiculo.cor}</span></p>
              </div>
              <button onClick={() => deleteVeiculo(veiculo.id)}>
                <img src={Lixeira} alt="Deletar veículo" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Home; 
*/
