import { useParams } from 'react-router-dom'

function Producto() {
  const { id } = useParams()

  return (
    <section id="center">
      <h1>Producto {id}</h1>
      <p>Detalles del producto <strong>{id}</strong></p>
    </section>
  )
}

export default Producto