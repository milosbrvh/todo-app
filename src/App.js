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

  const [prioritet, setPrioritet] = useState("low");

const dodajZadatak = () => {
  if (tekst === "") return;

  const novi = {
    tekst: tekst,
    zavrsen: false,
    datum: new Date().toLocaleString(),
    prioritet: prioritet
  };

  setLista([...lista, novi]);
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
  <select
    value={prioritet}
    onChange={(e) => setPrioritet(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "5px"
    }}
  >
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

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
     boxSizing: "border-box",
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
        <button onClick={() => setFilter("svi")}>Svi</button>
        <button onClick={() => setFilter("aktivni")}>Aktivni</button>
        <button onClick={() => setFilter("zavrseni")}>Završeni</button>
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
                backgroundColor:
                item.prioritet === "high"
               ? "#ff4d4d"
               : item.prioritet === "medium"
               ? "#ffd11a"
               : darkMode
               ? "#333"
               : "white",
                color: darkMode ? "white" : "black",
                padding: "10px",
                marginTop: "10px",
                borderRadius: "5px",
                transition: "0.2s",
                transform: "scale(1)"
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.97)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              {editIndex === index ? (
  <>
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

    <button
      onClick={() => setEditIndex(null)}
      style={{
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "5px",
        padding: "5px 10px",
        marginRight: "5px"
      }}
    >
      ✔
    </button>
  </>
) : (
  <>
  <span
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
    <p style={{ fontSize: "12px", margin: 0 }}>
    {item.datum}
    </p>
  </span>

  <button
    onClick={() => setEditIndex(index)}
    style={{
      backgroundColor: "#2196F3",
      color: "white",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      marginRight: "5px",
      cursor: "pointer"
    }}
  >
    ✏️
  </button>

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
      padding: "5px 10px",
      cursor: "pointer"
    }}
  >
    X
  </button>
</>
        )}
      </li>
    ))}
      </ul>
    </div>
  );
}

export default App;