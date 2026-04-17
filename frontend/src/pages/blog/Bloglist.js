import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faTrash, faBlog } from '@fortawesome/free-solid-svg-icons'
import BlogAPI from '../../API/BlogAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function Bloglist() {
  const { authTokens } = useContext(AuthContext)
  const [blogs, setBlogs] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    BlogAPI.get('/', { headers }).then(res => setBlogs(res.data)).catch(console.log)
    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const onDelete = (id) => {
    BlogAPI.delete(`/${id}/`, { headers }).then(() =>
      setBlogs(prev => prev.filter(b => b.id !== id))
    ).catch(console.log)
  }

  const filtered = blogs.filter(b => {
    const q = search.toLowerCase()
    return (
      b.headline?.toLowerCase().includes(q) ||
      b.textbrief?.toLowerCase().includes(q) ||
      staffName(b.person_name).toLowerCase().includes(q)
    )
  })

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Blog</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            {blogs.length} post{blogs.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/blogadd">
          <button style={{ backgroundColor: ORANGE, color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={faPlus} /> Add Post
          </button>
        </Link>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '24px' }}>
        <input
          type="text"
          placeholder="Search by headline, brief, or author..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', maxWidth: '400px', padding: '9px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none' }}
        />
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa' }}>
          <FontAwesomeIcon icon={faBlog} style={{ fontSize: '40px', marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
          <p style={{ margin: 0 }}>{search ? 'No posts match your search.' : 'No blog posts yet.'}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map(b => (
            <div key={b.id} style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Card top accent */}
              <div style={{ height: '4px', backgroundColor: NAVY }} />
              <div style={{ padding: '20px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>{formatDate(b.blog_date)}</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to={`/blogedit/${b.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} style={{ fontSize: '13px' }} />
                    </Link>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(b.id)}>
                      <FontAwesomeIcon icon={faTrash} style={{ fontSize: '13px' }} />
                    </span>
                  </div>
                </div>
                <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '8px', fontSize: '16px', lineHeight: '1.4' }}>
                  {b.headline || 'Untitled'}
                </h5>
                {b.textbrief && (
                  <p style={{ color: '#555', fontSize: '13px', margin: '0 0 12px', lineHeight: '1.6' }}>
                    {b.textbrief}
                  </p>
                )}
              </div>
              <div style={{ padding: '12px 20px', borderTop: '1px solid #f3f4f6', backgroundColor: '#fafafa' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>
                  By <span style={{ color: NAVY, fontWeight: '600' }}>{staffName(b.person_name)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
