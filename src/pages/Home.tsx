import { useState } from 'react'
//import reactLogo from '../assets/react.svg'
//import viteLogo from '../assets/vite.svg'
import logoImg from '../assets/logo.png'
 import { Link } from 'react-router-dom'
import '../App.css'


function Home() {
  const [count, setCount] = useState(0);
  const [textoingresado, setTextoIngresado] = useState<string>('');
  const [mostrarmodal, setMostrarModal] = useState<boolean>(false);
  
  const manejarclick = () => {
    if (textoingresado.trim() === '') {
      alert('Por favor, ingresa un texto antes de hacer clic.');
     return;    
    }
    setMostrarModal(true);
  };
  const cerrarModal = () => {
    setMostrarModal(false);
    setTextoIngresado('');
  };
 
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={logoImg} className="base" width="170" height="179" alt="" />
         {/*<img src={reactLogo} className="framework" alt="React logo" />*/}
          {/*<img src={viteLogo} className="vite" alt="Vite logo" />*/}
        </div>
        <div>
          <h1>Mi Negocio</h1>
          {/*<p>Edit <code>src/App.tsx</code> and save to test <code>HMR</code> </p>*/}
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
      <div className="caja-entrada">
        <input
          type="text"
          placeholder="Ingresa un texto"
          value={textoingresado}
          onChange={(e) => setTextoIngresado(e.target.value)}
          className='input-texto'
        />
        <button
          onClick={manejarclick} className='boton-mostrar'>Mostrar Modal</button>
      </div>
      {mostrarmodal && (
        <div className="fondo-modal">
          {/*<p>Texto ingresado: {textoingresado}</p>*/}
          <div className="contenido-modal">
            <h2>lo que escribiste</h2>
            <p className="texto-modal">{textoingresado}</p>
            <button onClick={cerrarModal} className='boton-cerrar'>Cerrar</button>
          </div>
        </div>
      )}
        <section style={{ padding: '32px', textAlign: 'left' }}>
        <h2>Nuestros productos</h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '12px', marginTop: '16px' }}>
          <li><Link to="/producto/1">Zapatos</Link></li>
          <li><Link to="/producto/2">Camisa</Link></li>
          <li><Link to="/producto/3">Sombrero</Link></li>
        </ul>
      </section>

         </>
  )
}

export default Home
