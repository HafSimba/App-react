import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type Ingrediente = {
  nome: string
  quantita: number
  unita: string
}

function App() {
  // Due array: uno principale e una copia (esempio di due sorgenti dati)
  const ingredientiPrincipali: Ingrediente[] = [
    { nome: 'Farina', quantita: 500, unita: 'g' },
    { nome: 'Zucchero', quantita: 200, unita: 'g' },
    { nome: 'Burro', quantita: 100, unita: 'g' },
    { nome: 'Uova', quantita: 3, unita: 'pz' },
    { nome: 'Latte', quantita: 250, unita: 'ml' },
  ]

  // Secondo array (copia superficiale) che rappresenta un'altra fonte
  const ingredientiEsterni: Ingrediente[] = [...ingredientiPrincipali]

  // Stati per gli input dei filtri
  const [filtroTesto, setFiltroTesto] = useState('')
  // stato "committed" per il filtro con bottone: il filtro si applica quando l'utente preme Filtra
  const [filtroTestoCommit, setFiltroTestoCommit] = useState('')
  const [filtroLive, setFiltroLive] = useState('')

  // Funzione di utilità riutilizzabile per filtrare per nome (case-insensitive)
  const filtraPerNome = (arr: Ingrediente[], testo: string) => {
    const t = testo.trim().toLowerCase()
    if (!t) return arr
    return arr.filter((i) => i.nome.toLowerCase().includes(t))
  }

  // Risultati calcolati al volo (niente stato duplicato)
  const risultatiConBottone = filtraPerNome(ingredientiPrincipali, filtroTestoCommit)
  const risultatiLive = filtraPerNome(ingredientiEsterni, filtroLive)

  return (
    <div className="App">
      <header className="header">
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Logo Vite" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="Logo React" />
          </a>
        </div>
        <h1>Lista degli ingredienti — Filtri</h1>
      </header>

      <section>
        <h2 style={{ textAlign: 'center' }}>Filtro con bottone</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <input
            name="filtro"
            placeholder="Inserisci parola chiave..."
            value={filtroTesto}
            onChange={(e) => setFiltroTesto(e.target.value)}
          />
          <button onClick={() => setFiltroTestoCommit(filtroTesto)}>Filtra</button>
          <button
            onClick={() => {
              setFiltroTesto('')
              setFiltroTestoCommit('')
            }}
          >
            Ripristina
          </button>
        </div>

        <ul>
          {risultatiConBottone.map((i: Ingrediente, idx: number) => (
            <li key={idx}>
              {i.nome} — {i.quantita} {i.unita}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ textAlign: 'center' }}>Filtro live (onChange)</h2>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
          <input
            name="filtroLive"
            placeholder="Digita per filtrare..."
            value={filtroLive}
            onChange={(e) => setFiltroLive(e.target.value)}
          />
          <button
            onClick={() => {
              setFiltroLive('')
            }}
          >
            Cancella
          </button>
        </div>

        <ul>
          {risultatiLive.map((i: Ingrediente, idx: number) => (
            <li key={idx}>
              {i.nome} — {i.quantita} {i.unita}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <small>Secondo array (esempio) contiene {ingredientiEsterni.length} elementi</small>
        </div>
      </section>
    </div>
  )
}

export default App
