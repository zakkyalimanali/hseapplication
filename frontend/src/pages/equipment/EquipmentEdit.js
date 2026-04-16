import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import EquipmentAndItemsAPI from '../../API/EquipmentAndItemsAPI'
import AuthContext from '../../context/AuthContext'
import API_BASE from '../../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function EquipmentEdit() {
  const { authTokens } = useContext(AuthContext)
  const params = useParams()
  const navigate = useNavigate()

  const [equipment_item, setEquipmentItem] = useState('')
  const [type_of_equipment_item, setTypeOfEquipmentItem] = useState('')
  const [category, setCategory] = useState('')
  const [size, setSize] = useState('')
  const [quantity_in_item, setQuantityInItem] = useState('')
  const [dollar_value, setDollarValue] = useState('')
  const [condition, setCondition] = useState('')
  const [storage_location, setStorageLocation] = useState('')
  const [identification_code, setIdentificationCode] = useState('')

  useEffect(() => {
    axios.get(`${API_BASE}/hseapp/equipmentanditems/${params.id}/`, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(res => {
      const d = res.data
      setEquipmentItem(d.equipment_item || '')
      setTypeOfEquipmentItem(d.type_of_equipment_item || '')
      setCategory(d.category || '')
      setSize(d.size || '')
      setQuantityInItem(d.quantity_in_item ?? '')
      setDollarValue(d.dollar_value ?? '')
      setCondition(d.condition || '')
      setStorageLocation(d.storage_location || '')
      setIdentificationCode(d.identification_code || '')
    }).catch(console.log)
  }, [params.id])

  const onUpdate = (e) => {
    e.preventDefault()
    EquipmentAndItemsAPI.patch(`/${params.id}/`, {
      equipment_item, type_of_equipment_item, category, size,
      quantity_in_item, dollar_value, condition,
      storage_location, identification_code,
    }, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate(-1)).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '720px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', padding: 0, color: '#888', fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Equipment
        </button>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Edit Equipment / Item</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Update equipment details, quantity, and storage location.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onUpdate}>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Item / Equipment</Form.Label>
                <Form.Control type="text" placeholder="Item or equipment name" value={equipment_item} onChange={e => setEquipmentItem(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Type of Equipment / Item</Form.Label>
                <Form.Control type="text" placeholder="e.g. PPE, Tool, Vehicle..." value={type_of_equipment_item} onChange={e => setTypeOfEquipmentItem(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Identification Code</Form.Label>
                <Form.Control type="text" placeholder="e.g. EQ-001" value={identification_code} onChange={e => setIdentificationCode(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Size</Form.Label>
                <Form.Control type="text" placeholder="e.g. Large, 10mm..." value={size} onChange={e => setSize(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Quantity</Form.Label>
                <Form.Control type="number" min="0" placeholder="0" value={quantity_in_item} onChange={e => setQuantityInItem(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Dollar Value</Form.Label>
                <Form.Control type="number" min="0" placeholder="0.00" value={dollar_value} onChange={e => setDollarValue(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Condition</Form.Label>
                <Form.Control type="text" placeholder="e.g. Good, Fair, Poor" value={condition} onChange={e => setCondition(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-4">
            <Form.Label style={L}>Storage Location</Form.Label>
            <Form.Control type="text" placeholder="Where is this stored?" value={storage_location} onChange={e => setStorageLocation(e.target.value)} />
          </Form.Group>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Changes
            </Button>
            <Button
              type="button"
              onClick={() => navigate(-1)}
              style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}
            >
              Cancel
            </Button>
          </div>

        </Form>
      </div>
    </div>
  )
}
