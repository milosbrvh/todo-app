import { useState, useEffect } from "react";

function App() {
  const [tekst, setTekst] = useState("");
  const [lista, setLista] = useState(() => {
    const sacuvano = localStorage.getItem("lista");
    return sacuvano ? JSON.parse(sacuvano) : [];
  });

  useEffect(() => {
    localStorage.setItem("lista", JSON.stringify(lista));
  }, [lista]);

  const dodajZadatak = () => {
    if (tekst === "") return;
    setLista([...lista, { tekst: tekst, zavrsen: false }]);
    setTekst("");
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "400px",
        margin: "50px auto",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <h1 style={{ textAlign: "center" }}>To-Do Lista</h1>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          value={tekst}
          onChange={(e) => setTekst(e.target.value)}
          placeholder="Unesi zadatak"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              dodajZadatak();
            }
          }}
          style={{
            padding: "10px",
            flex: 1,
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={dodajZadatak}
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "0.3s"
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Dodaj
        </button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {lista.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              padding: "10px",
              marginTop: "10px",
              borderRadius: "5px",
              transition: "0.3s"
            }}
          >
            <span
              onClick={() => {
                const novaLista = [...lista];
                novaLista[index].zavrsen = !novaLista[index].zavrsen;
                setLista(novaLista);
              }}
              style={{
                textDecoration: item.zavrsen ? "line-through" : "none",
                cursor: "pointer"
              }}
            >
              {item.tekst}
            </span>

            <button
              onClick={() => {
                const novaLista = lista.filter((_, i) => i !== index);
                setLista(novaLista);
              }}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                padding: "5px 10px",
                transition: "0.3s"
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "red")}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;