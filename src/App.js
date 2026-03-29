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
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h1>To-Do lista</h1>

      <input
        value={tekst}
        onChange={(e) => setTekst(e.target.value)}
        placeholder="Unesi zadatak"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            dodajZadatak();
          }
        }}
      />

      <button onClick={dodajZadatak} style={{ marginLeft: "10px" }}>
        Dodaj
      </button>

      <ul>
        {lista.map((item, index) => (
          <li key={index}>
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
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;