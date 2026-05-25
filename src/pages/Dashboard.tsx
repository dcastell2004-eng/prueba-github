import { useNavigate } from 'react-router-dom'
import '../styles/Dashboard.css'

const productos = [
  { id: 1, codigo: 'P001', nombre: 'Casco de seguridad', grupo: 'Seguridad', cantidad: 50, precio_compra: 25000, precio_venta: 35000, ubicacion: 'Bodega A' },
  { id: 2, codigo: 'P002', nombre: 'Guantes industriales', grupo: 'Seguridad', cantidad: 120, precio_compra: 8000, precio_venta: 12000, ubicacion: 'Bodega A' },
  { id: 3, codigo: 'P003', nombre: 'Botas punta acero', grupo: 'Calzado', cantidad: 30, precio_compra: 80000, precio_venta: 110000, ubicacion: 'Bodega B' },
  { id: 4, codigo: 'P004', nombre: 'Chaleco reflectivo', grupo: 'Seguridad', cantidad: 5, precio_compra: 15000, precio_venta: 22000, ubicacion: 'Bodega A' },
  { id: 5, codigo: 'P005', nombre: 'Cinta de señalización', grupo: 'Señalización', cantidad: 200, precio_compra: 3000, precio_venta: 5000, ubicacion: 'Bodega C' },
]

function Dashboard() {
  const navigate = useNavigate()

  const totalProductos = productos.length
  const stockBajo = productos.filter((p) => p.cantidad <= 10)
  const valorTotal = productos.reduce((acc, p) => acc + p.cantidad * p.precio_compra, 0)

  // Resumen por grupo
  const porGrupo = productos.reduce((acc, p) => {
    if (!acc[p.grupo]) acc[p.grupo] = { cantidad: 0, valor: 0 }
    acc[p.grupo].cantidad += p.cantidad
    acc[p.grupo].valor += p.cantidad * p.precio_compra
    return acc
  }, {} as Record<string, { cantidad: number; valor: number }>)

  return (
    <div className="dashboard-contenedor">
      <h1>Dashboard</h1>

      {/* Tarjetas resumen */}
      <div className="dashboard-cards">
        <div className="card">
          <span className="card-label">Total productos</span>
          <span className="card-valor">{totalProductos}</span>
        </div>
        <div className="card card-alerta" onClick={() => navigate('/inventario')}>
          <span className="card-label">Stock bajo ⚠️</span>
          <span className="card-valor">{stockBajo.length}</span>
          <span className="card-hint">Ver inventario</span>
        </div>
        <div className="card">
          <span className="card-label">Valor total inventario</span>
          <span className="card-valor">${valorTotal.toLocaleString()}</span>
        </div>
      </div>

      {/* Productos con stock bajo */}
      {stockBajo.length > 0 && (
        <div className="dashboard-seccion">
          <h2>⚠️ Productos con stock bajo</h2>
          <div className="tabla-contenedor">
            <table className="tabla-dashboard">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Ubicación</th>
                </tr>
              </thead>
              <tbody>
                {stockBajo.map((p) => (
                  <tr key={p.id} onClick={() => navigate(`/producto/${p.id}`)} style={{ cursor: 'pointer' }}>
                    <td>{p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td className="texto-alerta">{p.cantidad}</td>
                    <td>{p.ubicacion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Resumen por grupo */}
      <div className="dashboard-seccion">
        <h2>Resumen por grupo</h2>
        <div className="tabla-contenedor">
          <table className="tabla-dashboard">
            <thead>
              <tr>
                <th>Grupo</th>
                <th>Unidades</th>
                <th>Valor total</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(porGrupo).map(([grupo, data]) => (
                <tr key={grupo}>
                  <td>{grupo}</td>
                  <td>{data.cantidad}</td>
                  <td>${data.valor.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard