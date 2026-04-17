import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faPen, faTrash, faNewspaper } from '@fortawesome/free-solid-svg-icons'
import NewsAPI from '../../API/NewsAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

export default function NewsList() {
  const { authTokens } = useContext(AuthContext)
  const [news, setNews] = useState([])
  const [staffs, setStaffs] = useState([])
  const [search, setSearch] = useState('')

  const headers = { Authorization: `Bearer ${authTokens.access}` }

  useEffect(() => {
    NewsAPI.get('/', { headers }).then(res => setNews(res.data)).catch(console.log)
    StaffAPI.get('/', { headers }).then(res => setStaffs(res.data)).catch(console.log)
  }, [])

  const staffName = (id) => staffs.find(s => s.id === id)?.name || '—'

  const onDelete = (id) => {
    NewsAPI.delete(`/${id}/`, { headers }).then(() =>
      setNews(prev => prev.filter(n => n.id !== id))
    ).catch(console.log)
  }

  const filtered = news.filter(n => {
    const q = search.toLowerCase()
    return (
      n.headline?.toLowerCase().includes(q) ||
      n.textbrief?.toLowerCase().includes(q) ||
      staffName(n.person_name).toLowerCase().includes(q)
    )
  })

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'

  return (
    <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>News</h2>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
            {news.length} article{news.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Link to="/newsadd">
          <button style={{ backgroundColor: ORANGE, color: 'white', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '600', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FontAwesomeIcon icon={faPlus} /> Add News
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
          <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: '40px', marginBottom: '12px', display: 'block', margin: '0 auto 12px' }} />
          <p style={{ margin: 0 }}>{search ? 'No articles match your search.' : 'No news articles yet.'}</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {filtered.map(n => (
            <div key={n.id} style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Card top accent */}
              <div style={{ height: '4px', backgroundColor: ORANGE }} />
              <div style={{ padding: '20px', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ fontSize: '12px', color: '#888' }}>{formatDate(n.news_date)}</span>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <Link to={`/newsedit/${n.id}`} style={{ color: NAVY }}>
                      <FontAwesomeIcon icon={faPen} style={{ fontSize: '13px' }} />
                    </Link>
                    <span style={{ cursor: 'pointer', color: '#dc3545' }} onClick={() => onDelete(n.id)}>
                      <FontAwesomeIcon icon={faTrash} style={{ fontSize: '13px' }} />
                    </span>
                  </div>
                </div>
                <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '8px', fontSize: '16px', lineHeight: '1.4' }}>
                  {n.headline || 'Untitled'}
                </h5>
                {n.textbrief && (
                  <p style={{ color: '#555', fontSize: '13px', margin: '0 0 12px', lineHeight: '1.6' }}>
                    {n.textbrief}
                  </p>
                )}
              </div>
              <div style={{ padding: '12px 20px', borderTop: '1px solid #f3f4f6', backgroundColor: '#fafafa' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>
                  By <span style={{ color: NAVY, fontWeight: '600' }}>{staffName(n.person_name)}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
