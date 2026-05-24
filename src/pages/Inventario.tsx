import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/Inventario.css'

interface Producto {
  id: number
  codigo: string
  nombre: string
  grupo: string
  cantidad: number
  precio_compra: number
  precio_venta: number
  ubicacion: string
}

const productosIniciales: Producto[] = [
  { id: 1, codigo: 'P001', nombre: 'Casco de seguridad', grupo: 'Seguridad', cantidad: 50, precio_compra: 25000, precio_venta: 35000, ubicacion: 'Bodega A' },
  { id: 2, codigo: 'P002', nombre: 'Guantes industriales', grupo: 'Seguridad', cantidad: 120, precio_compra: 8000, precio_venta: 12000, ubicacion: 'Bodega A' },
  { id: 3, codigo: 'P003', nombre: 'Botas punta acero', grupo: 'Calzado', cantidad: 30, precio_compra: 80000, precio_venta: 110000, ubicacion: 'Bodega B' },
  { id: 4, codigo: 'P004', nombre: 'Chaleco reflectivo', grupo: 'Seguridad', cantidad: 5, precio_compra: 15000, precio_venta: 22000, ubicacion: 'Bodega A' },
  { id: 5, codigo: 'P005', nombre: 'Cinta de señalización', grupo: 'Señalización', cantidad: 200, precio_compra: 3000, precio_venta: 5000, ubicacion: 'Bodega C' },
]

const formularioVacio = {
  codigo: '',
  nombre: '',
  grupo: '',
  cantidad: 0,
  precio_compra: 0,
  precio_venta: 0,
  ubicacion: '',
}

function Inventario() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState<Producto[]>(productosIniciales)
  const [mostrarModal, setMostrarModal] = useState(false)
  const [formulario, setFormulario] = useState(formularioVacio)

  const abrirModal = () => {
    setFormulario(formularioVacio)
    setMostrarModal(true)
  }

  const cerrarModal = () => {
    setMostrarModal(false)
  }

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormulario((prev) => ({
      ...prev,
      [name]: ['cantidad', 'precio_compra', 'precio_venta'].includes(name)
        ? Number(value)
        : value,
    }))
  }

  const agregarProducto = () => {
    if (!formulario.codigo || !formulario.nombre) {
      alert('Código y nombre son obligatorios')
      return
    }
    const nuevo: Producto = {
      ...formulario,
      id: productos.length + 1,
    }
    setProductos((prev) => [...prev, nuevo])
    cerrarModal()
  }

  return (
    <div className="inventario-contenedor">
      <div className="inventario-header">
        <h1>Inventario</h1>
        <button className="boton-agregar" onClick={abrirModal}>
          + Agregar producto
        </button>
      </div>

      <div className="tabla-contenedor">
        <table className="tabla-inventario">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Grupo</th>
              <th>Cantidad</th>
              <th>Precio compra</th>
              <th>Precio venta</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr
                key={producto.id}
                className={producto.cantidad <= 10 ? 'fila-alerta' : ''}
                onClick={() => navigate(`/producto/${producto.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.grupo}</td>
                <td>{producto.cantidad}</td>
                <td>${producto.precio_compra.toLocaleString()}</td>
                <td>${producto.precio_venta.toLocaleString()}</td>
                <td>{producto.ubicacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {mostrarModal && (
        <div className="fondo-modal">
          <div className="modal-caja">
            <h2>Agregar producto</h2>

            <div className="modal-campos">
              <div className="modal-campo">
                <label>Código</label>
                <input name="codigo" value={formulario.codigo} onChange={manejarCambio} placeholder="Ej: P006" />
              </div>
              <div className="modal-campo">
                <label>Nombre</label>
                <input name="nombre" value={formulario.nombre} onChange={manejarCambio} placeholder="Nombre del producto" />
              </div>
              <div className="modal-campo">
                <label>Grupo</label>
                <input name="grupo" value={formulario.grupo} onChange={manejarCambio} placeholder="Ej: Seguridad" />
              </div>
              <div className="modal-campo">
                <label>Cantidad</label>
                <input name="cantidad" type="number" value={formulario.cantidad} onChange={manejarCambio} />
              </div>
              <div className="modal-campo">
                <label>Precio compra</label>
                <input name="precio_compra" type="number" value={formulario.precio_compra} onChange={manejarCambio} />
              </div>
              <div className="modal-campo">
                <label>Precio venta</label>
                <input name="precio_venta" type="number" value={formulario.precio_venta} onChange={manejarCambio} />
              </div>
              <div className="modal-campo">
                <label>Ubicación</label>
                <input name="ubicacion" value={formulario.ubicacion} onChange={manejarCambio} placeholder="Ej: Bodega A" />
              </div>
            </div>

            <div className="modal-botones">
              <button className="boton-cancelar" onClick={cerrarModal}>Cancelar</button>
              <button className="boton-guardar" onClick={agregarProducto}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventario