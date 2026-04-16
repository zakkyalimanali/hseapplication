import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function AddStaff() {
  const { authTokens } = useContext(AuthContext)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [position, setPosition] = useState('')
  const [staff_id_number, setStaffIdNumber] = useState('')
  const [gender, setGender] = useState('')
  const [date_of_birth, setDateOfBirth] = useState('')
  const [joining_date, setJoiningDate] = useState('')
  const [nationality, setNationality] = useState('')
  const [citizenship, setCitizenship] = useState('')
  const [home_address, setHomeAddress] = useState('')
  const [telephone_number, setTelephoneNumber] = useState('')
  const [email_address, setEmailAddress] = useState('')
  const [smart_card_number, setSmartCardNumber] = useState('')
  const [smart_card_colour, setSmartCardColour] = useState('')
  const [passport_number, setPassportNumber] = useState('')
  const [passport_expiry_date, setPassportExpiryDate] = useState('')
  const [yearly_leave_days, setYearlyLeaveDays] = useState('')
  const [yearly_leave_taken, setYearlyLeaveTaken] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const item = {
      name, position, staff_id_number, gender,
      date_of_birth: date_of_birth || null,
      joining_date: joining_date || null,
      nationality, citizenship, home_address,
      telephone_number, email_address,
      smart_card_number, smart_card_colour,
      passport_number,
      passport_expiry_date: passport_expiry_date || null,
      yearly_leave_days, yearly_leave_taken,
    }
    StaffAPI.post('/', item, {
      headers: { Authorization: `Bearer ${authTokens.access}` },
    }).then(() => navigate('/stafflist')).catch(console.log)
  }

  const L = { fontWeight: '600', fontSize: '14px', color: NAVY }

  return (
    <div style={{ padding: '40px', maxWidth: '860px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <Link to="/stafflist" style={{ color: '#888', fontSize: '13px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Staff List
        </Link>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Add New Staff</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Create a new staff profile.
        </p>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '32px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
        <Form onSubmit={onSubmit}>

          {/* Basic Info */}
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Position</Form.Label>
                <Form.Control type="text" placeholder="Job position" value={position} onChange={e => setPosition(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Staff ID Number</Form.Label>
                <Form.Control type="text" placeholder="e.g. EMP-001" value={staff_id_number} onChange={e => setStaffIdNumber(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Gender</Form.Label>
                <Form.Select value={gender} onChange={e => setGender(e.target.value)}>
                  <option value="">Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Date of Birth</Form.Label>
                <Form.Control type="date" value={date_of_birth} onChange={e => setDateOfBirth(e.target.value || '')} />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Nationality</Form.Label>
                <Form.Select value={nationality} onChange={e => setNationality(e.target.value)}>
                  <option value="">Select...</option>
                  <option>Brunei</option>
                  <option>Malaysia</option>
                  <option>UK</option>
                  <option>Australia</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Citizenship</Form.Label>
                <Form.Select value={citizenship} onChange={e => setCitizenship(e.target.value)}>
                  <option value="">Select...</option>
                  <option value="Citizen">Citizen</option>
                  <option value="PR">PR</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Joining Date</Form.Label>
                <Form.Control type="date" value={joining_date} onChange={e => setJoiningDate(e.target.value || '')} />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label style={L}>Home Address</Form.Label>
            <Form.Control type="text" placeholder="Residential address" value={home_address} onChange={e => setHomeAddress(e.target.value)} />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Telephone Number</Form.Label>
                <Form.Control type="text" placeholder="Phone number" value={telephone_number} onChange={e => setTelephoneNumber(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Email address" value={email_address} onChange={e => setEmailAddress(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Smart Card Number</Form.Label>
                <Form.Control type="text" placeholder="Card number" value={smart_card_number} onChange={e => setSmartCardNumber(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-4">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Smart Card Colour</Form.Label>
                <Form.Select value={smart_card_colour} onChange={e => setSmartCardColour(e.target.value)}>
                  <option value="">Select...</option>
                  <option>Yellow</option>
                  <option>Red</option>
                  <option>Green</option>
                </Form.Select>
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Passport Number</Form.Label>
                <Form.Control type="text" placeholder="Passport number" value={passport_number} onChange={e => setPassportNumber(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Passport Expiry Date</Form.Label>
                <Form.Control type="date" value={passport_expiry_date} onChange={e => setPassportExpiryDate(e.target.value || '')} />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label style={L}>Yearly Leave Days</Form.Label>
                <Form.Control type="number" min="0" placeholder="0" value={yearly_leave_days} onChange={e => setYearlyLeaveDays(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-4">
                <Form.Label style={L}>Yearly Leave Taken</Form.Label>
                <Form.Control type="number" min="0" placeholder="0" value={yearly_leave_taken} onChange={e => setYearlyLeaveTaken(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <Button
              type="submit"
              disabled={!name}
              style={{ flex: 1, backgroundColor: ORANGE, border: 'none', fontWeight: '600', padding: '10px' }}
            >
              Save Staff
            </Button>
            <Link to="/stafflist">
              <Button type="button" style={{ backgroundColor: 'transparent', border: `1.5px solid ${NAVY}`, color: NAVY, fontWeight: '600', padding: '10px 24px' }}>
                Cancel
              </Button>
            </Link>
          </div>

        </Form>
      </div>
    </div>
  )
}
