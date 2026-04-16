import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import EquipmentAndItemsAPI from '../../API/EquipmentAndItemsAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function Equipment() {
  const { authTokens } = useContext(AuthContext)
  const [equipments, setEquipments] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchEquipment()
  }, [])

  const fetchEquipment = () => {
    EquipmentAndItemsAPI.get('/', {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => setEquipments(res.data)).catch(console.log)
  }

  const onDelete = (id) => {
    EquipmentAndItemsAPI.delete(`/${id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => fetchEquipment()).catch(console.log)
  }

  const filtered = equipments.filter(e => {
    const q = search.toLowerCase()
    return (
      (e.equipment_item || '').toLowerCase().includes(q) ||
      (e.type_of_equipment_item || '').toLowerCase().includes(q) ||
      (e.category || '').toLowerCase().includes(q) ||
      (e.identification_code || '').toLowerCase().includes(q) ||
      (e.storage_location || '').toLowerCase().includes(q)
    )
  })

  const totalQty = equipments.reduce((sum, e) => sum + (Number(e.quantity_in_item) || 0), 0)

  return (
    <div style={{ padding: '40px', maxWidth: '1300px', margin: '0 auto' }}>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Equipment & Items</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            Track equipment inventory, categories, and storage locations.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link to="/equipmenttotals">
            <Button style={{ backgroundColor: NAVY, border: 'none', fontWeight: '600', padding: '10px 18px' }}>
              Totals
            </Button>
          </Link>
          <Link to="/equipmentadd">
            <Button style={{ backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px 20px' }}>
              <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
              Add Equipment
            </Button>
          </Link>
        </div>
      </div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Total Items',    value: equipments.length, color: NAVY },
          { label: 'Total Quantity', value: totalQty,          color: '#2563EB' },
        ].map(card => (
          <div key={card.label} style={{
            backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: card.color }}>{card.value}</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{card.label}</div>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', margin: 0 }}>All Items ({filtered.length})</h5>
          <input
            type="text"
            placeholder="Search item, type, category, location..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              border: '1.5px solid #e5e7eb', borderRadius: '8px',
              padding: '7px 14px', fontSize: '13px', width: '300px', outline: 'none',
            }}
          />
        </div>

        {filtered.length === 0 ? (
          <p style={{ color: '#aaa', textAlign: 'center', padding: '40px 0', margin: 0 }}>
            {equipments.length === 0 ? 'No equipment added yet.' : 'No results match your search.'}
          </p>
        ) : (
          <Table hover responsive style={{ fontSize: '13px' }}>
            <thead style={{ backgroundColor: '#f8f9fa' }}>
              <tr>
                <th style={{ color: NAVY }}>Item / Equipment</th>
                <th style={{ color: NAVY }}>Type</th>
                <th style={{ color: NAVY }}>ID Code</th>
                <th style={{ color: NAVY }}>Category</th>
                <th style={{ color: NAVY }}>Size</th>
                <th style={{ color: NAVY }}>Qty</th>
                <th style={{ color: NAVY }}>Storage Location</th>
                <th style={{ color: NAVY }}>Edit</th>
                <th style={{ color: NAVY }}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(e => (
                <tr key={e.id}>
                  <td style={{ fontWeight: '600' }}>{e.equipment_item || '—'}</td>
                  <td style={{ color: '#666' }}>{e.type_of_equipment_item || '—'}</td>
                  <td style={{ color: '#666' }}>{e.identification_code || '—'}</td>
                  <td style={{ color: '#666' }}>{e.category || '—'}</td>
                  <td style={{ color: '#666' }}>{e.size || '—'}</td>
                  <td style={{ textAlign: 'center' }}>
                    {e.quantity_in_item != null ? (
                      <span style={{ backgroundColor: '#EEF2FF', color: '#4F46E5', padding: '2px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>
                        {e.quantity_in_item}
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ color: '#666' }}>{e.storage_location || '—'}</td>
                  <td>
                    <Link to={`/equipmentedit/${e.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} />
                    </Link>
                  </td>
                  <td>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(e.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  )
}
