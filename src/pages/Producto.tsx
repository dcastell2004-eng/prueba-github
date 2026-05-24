import { useParams, useNavigate } from 'react-router-dom'
import '../styles/Producto.css'

const productosSimulados = [
  { id: 1, codigo: 'P001', nombre: 'Casco de seguridad', grupo: 'Seguridad', cantidad: 50, precio_compra: 25000, precio_venta: 35000, ubicacion: 'Bodega A' },
  { id: 2, codigo: 'P002', nombre: 'Guantes industriales', grupo: 'Seguridad', cantidad: 120, precio_compra: 8000, precio_venta: 12000, ubicacion: 'Bodega A' },
  { id: 3, codigo: 'P003', nombre: 'Botas punta acero', grupo: 'Calzado', cantidad: 30, precio_compra: 80000, precio_venta: 110000, ubicacion: 'Bodega B' },
  { id: 4, codigo: 'P004', nombre: 'Chaleco reflectivo', grupo: 'Seguridad', cantidad: 5, precio_compra: 15000, precio_venta: 22000, ubicacion: 'Bodega A' },
  { id: 5, codigo: 'P005', nombre: 'Cinta de señalización', grupo: 'Señalización', cantidad: 200, precio_compra: 3000, precio_venta: 5000, ubicacion: 'Bodega C' },
]

function Producto() {
  const { id } = useParams()
  const navigate = useNavigate()

  const producto = productosSimulados.find((p) => p.id === Number(id))

  if (!producto) {
    return (
      <div style={{ padding: '32px' }}>
        <h2>Producto no encontrado</h2>
        <button onClick={() => navigate('/inventario')}>Volver al inventario</button>
      </div>
    )
  }

  return (
    <div className="producto-contenedor">
      <button className="boton-volver" onClick={() => navigate('/inventario')}>
        ← Volver al inventario
      </button>

      <h1>{producto.nombre}</h1>

      <div className="producto-detalle">
        <div className="detalle-fila">
          <span className="detalle-label">Código</span>
          <span>{producto.codigo}</span>
        </div>
        <div className="detalle-fila">
          <span className="detalle-label">Grupo</span>
          <span>{producto.grupo}</span>
        </div>
        <div className="detalle-fila">
          <span className="detalle-label">Cantidad</span>
          <span className={producto.cantidad <= 10 ? 'texto-alerta' : ''}>
            {producto.cantidad} unidades
          </span>
        </div>
        <div className="detalle-fila">
          <span className="detalle-label">Precio compra</span>
          <span>${producto.precio_compra.toLocaleString()}</span>
        </div>
        <div className="detalle-fila">
          <span className="detalle-label">Precio venta</span>
          <span>${producto.precio_venta.toLocaleString()}</span>
        </div>
        <div className="detalle-fila">
          <span className="detalle-label">Ubicación</span>
          <span>{producto.ubicacion}</span>
        </div>
      </div>
    </div>
  )
}

export default Producto