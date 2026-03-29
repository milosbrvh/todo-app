import { useState, useEffect } from "react";

function App() {
  const [tekst, setTekst] = useState("");
  const [filter, setFilter] = useState("svi");
  const [editIndex, setEditIndex] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
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
  backgroundColor: darkMode ? "#1e1e1e" : "#f5f5f5",
  color: darkMode ? "white" : "black",
  borderRadius: "10px",
  boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}
    >
      <h1 style={{ textAlign: "center" }}>To-Do Lista</h1>
<button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    marginBottom: "10px",
    width: "100%",
    padding: "10px",
    backgroundColor: darkMode ? "#444" : "#ddd",
    color: darkMode ? "white" : "black",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }}
>
  {darkMode ? "Light mode ☀️" : "Dark mode 🌙"}
</button>
      <div>
  <input
    value={tekst}
    onChange={(e) => setTekst(e.target.value)}
    placeholder="Unesi zadatak"
    onKeyDown={(e) => {
      if (e.key === "Enter") dodajZadatak();
    }}
    style={{
      padding: "10px",
      width: "100%",
      borderRadius: "5px",
      border: "1px solid #ccc",
      marginBottom: "10px"
    }}
  />

  <button
    onClick={dodajZadatak}
    style={{
      width: "100%",
      padding: "10px",
      backgroundColor: "#4CAF50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer"
    }}
  >
    Dodaj
  </button>
</div>

      {/* FILTER */}
      <div style={{ marginTop: "10px", textAlign: "center" }}>
        <button
          onClick={() => setFilter("svi")}
          style={{
            backgroundColor: filter === "svi" ? "#4CAF50" : "lightgray",
            color: filter === "svi" ? "white" : "black",
            marginRight: "5px",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Svi
        </button>

        <button
          onClick={() => setFilter("aktivni")}
          style={{
            backgroundColor: filter === "aktivni" ? "#4CAF50" : "lightgray",
            color: filter === "aktivni" ? "white" : "black",
            marginRight: "5px",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Aktivni
        </button>

        <button
          onClick={() => setFilter("zavrseni")}
          style={{
            backgroundColor: filter === "zavrseni" ? "#4CAF50" : "lightgray",
            color: filter === "zavrseni" ? "white" : "black",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Završeni
        </button>
      </div>

      {/* OBRIŠI */}
      <button
        onClick={() => setLista([])}
        style={{
          marginTop: "10px",
          width: "100%",
          backgroundColor: "black",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "5px"
        }}
      >
        Obriši sve
      </button>

      {/* BROJAČ */}
      <p style={{ textAlign: "center", marginTop: "10px" }}>
        Završeno: {lista.filter(item => item.zavrsen).length} / {lista.length}
      </p>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {lista
          .filter((item) => {
            if (filter === "aktivni") return !item.zavrsen;
            if (filter === "zavrseni") return item.zavrsen;
            return true;
          })
          .map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: darkMode ? "#333" : "white",
                color: darkMode ? "white" : "black",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "5px"
              }}
            >
              {editIndex === index ? (
                <input
                  value={item.tekst}
                  onChange={(e) => {
                    const novaLista = [...lista];
                    novaLista[index].tekst = e.target.value;
                    setLista(novaLista);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditIndex(null);
                  }}
                  autoFocus
                  style={{
                    flex: 1,
                    marginRight: "10px",
                    padding: "5px"
                  }}
                />
              ) : (
                <span
                  onDoubleClick={() => setEditIndex(index)}
                  onClick={() => {
                    const novaLista = [...lista];
                    novaLista[index].zavrsen = !novaLista[index].zavrsen;
                    setLista(novaLista);
                  }}
                  style={{
                    textDecoration: item.zavrsen ? "line-through" : "none",
                    cursor: "pointer",
                    flex: 1
                  }}
                >
                  {item.tekst}
                </span>
              )}

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
                  padding: "5px 10px"
                }}
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