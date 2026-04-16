import { useEffect, useState, useContext } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Pie, Bar } from 'react-chartjs-2'
import AuthContext from '../context/AuthContext'
import API_BASE from '../utils/apiBase'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const MODULES = [
  { label: 'Incidents',               endpoint: '/hseapp/incident/' },
  { label: 'Safety Cards',            endpoint: '/hseapp/safetycard/' },
  { label: 'Incident Investigations', endpoint: '/hseapp/incidentinvestigation/' },
  { label: 'Permit to Work',          endpoint: '/hseapp/permittowork/' },
  { label: 'Job Safety Analysis',     endpoint: '/hseapp/jobsafetyanalysis/' },
  { label: 'Training Records',        endpoint: '/hseapp/training/' },
  { label: 'Toolbox Talks',           endpoint: '/hseapp/toolboxtalk/' },
  { label: 'Site Visits',             endpoint: '/hseapp/sitevisit/' },
  { label: 'Risk Register',           endpoint: '/hseapp/riskregisterproject/' },
  { label: 'HSE Audits',              endpoint: '/hseapp/hseaudit/' },
  { label: 'Emergency Plans',         endpoint: '/hseapp/emergencyplan/' },
  { label: 'Risk Management',         endpoint: '/hseapp/riskmanagement/' },
  { label: 'Safe Work Practices',     endpoint: '/hseapp/safeworkpractice/' },
  { label: 'Workplace Rules',         endpoint: '/hseapp/workplacerules/' },
  { label: 'Risk Mitigations',        endpoint: '/hseapp/riskmitigation/' },
  { label: 'Staff',                   endpoint: '/hseapp/staff/' },
  { label: 'Equipment',               endpoint: '/hseapp/equipmentanditems/' },
  { label: 'Attendance',              endpoint: '/hseapp/attendence/' },
]

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 14, boxWidth: 14 } },
  },
}

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: { size: 11 }, color: '#444' }, grid: { display: false } },
    y: { ticks: { font: { size: 11 }, color: '#666' }, grid: { color: '#f0f0f0' } },
  },
}

function makePieData(labels, data, colors) {
  return {
    labels,
    datasets: [{ data, backgroundColor: colors, borderColor: colors.map(c => c), borderWidth: 1 }],
  }
}

function SmallChartCard({ title, children, height = 220 }) {
  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '12px',
      padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <h6 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px', fontSize: '14px' }}>{title}</h6>
      <div style={{ height: `${height}px`, position: 'relative' }}>{children}</div>
    </div>
  )
}

export default function Stats() {
  const { authTokens } = useContext(AuthContext)
  const [counts, setCounts] = useState({})
  const [safetyCards, setSafetyCards] = useState([])
  const [staffs, setStaffs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const headers = { Authorization: `Bearer ${authTokens.access}` }
    const results = {}

    Promise.all([
      // Module counts
      ...MODULES.map(async (m) => {
        try {
          const res = await fetch(`${API_BASE}${m.endpoint}`, { headers })
          const data = await res.json()
          results[m.label] = Array.isArray(data) ? data.length : (data.count ?? 0)
          if (m.label === 'Safety Cards' && Array.isArray(data)) setSafetyCards(data)
          if (m.label === 'Staff' && Array.isArray(data)) setStaffs(data)
        } catch {
          results[m.label] = '—'
        }
      }),
    ]).then(() => {
      setCounts(results)
      setLoading(false)
    })
  }, [authTokens])

  // Safety card breakdowns (dynamic — only show categories with data)
  const countBy = (arr, key) => {
    const c = {}
    arr.forEach(item => { const v = item[key]; if (v) c[v] = (c[v] || 0) + 1 })
    return c
  }
  const sortedEntries = (obj) => Object.entries(obj).sort((a, b) => b[1] - a[1])

  const whatCounts    = countBy(safetyCards, 'what_happened')
  const whyCounts     = countBy(safetyCards, 'why_happened')
  const statusCounts  = countBy(safetyCards, 'status')

  // Staff breakdowns
  const maleCount    = staffs.filter(s => s.gender === 'Male').length
  const femaleCount  = staffs.filter(s => s.gender === 'Female').length
  const greenCard    = staffs.filter(s => s.smart_card_colour === 'Green').length
  const yellowCard   = staffs.filter(s => s.smart_card_colour === 'Yellow').length
  const redCard      = staffs.filter(s => s.smart_card_colour === 'Red').length

  const genderPie = makePieData(
    ['Male', 'Female'],
    [maleCount, femaleCount],
    ['#3B82F6CC', '#EC4899CC']
  )

  const cardColorPie = makePieData(
    ['Green', 'Yellow', 'Red'],
    [greenCard, yellowCard, redCard],
    ['#22C55ECC', '#F59E0BCC', '#EF4444CC']
  )

  const statusPie = makePieData(
    Object.keys(statusCounts),
    Object.values(statusCounts),
    ['#E15047CC', '#3B82F6CC', '#10B981CC', '#F59E0BCC', '#8B5CF6CC']
  )

  const whatSorted = sortedEntries(whatCounts)
  const whySorted  = sortedEntries(whyCounts)

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Statistics</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Live counts and breakdowns across all HSE modules.
        </p>
      </div>

      {/* Module count grid */}
      <div style={{ marginBottom: '40px' }}>
        <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>Module Overview</h5>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
          gap: '14px',
        }}>
          {MODULES.map(m => (
            <div key={m.label} style={{
              backgroundColor: 'white', borderRadius: '10px',
              padding: '18px 14px', boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '26px', fontWeight: '800', color: NAVY }}>
                {loading ? '…' : (counts[m.label] !== undefined ? counts[m.label] : '—')}
              </div>
              <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Staff charts */}
      {staffs.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>Staff Breakdown</h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            <SmallChartCard title="Gender Distribution" height={200}>
              {(maleCount + femaleCount) > 0
                ? <Pie data={genderPie} options={pieOptions} />
                : <p style={{ color: '#bbb', fontSize: '13px' }}>No data</p>}
            </SmallChartCard>
            <SmallChartCard title="Smart Card Colour" height={200}>
              {(greenCard + yellowCard + redCard) > 0
                ? <Pie data={cardColorPie} options={pieOptions} />
                : <p style={{ color: '#bbb', fontSize: '13px' }}>No data</p>}
            </SmallChartCard>
            <SmallChartCard title="Smart Card Totals" height={200}>
              <Bar
                data={{
                  labels: ['Green', 'Yellow', 'Red'],
                  datasets: [{
                    data: [greenCard, yellowCard, redCard],
                    backgroundColor: ['#22C55ECC', '#F59E0BCC', '#EF4444CC'],
                    borderColor:     ['#22C55E',   '#F59E0B',   '#EF4444'],
                    borderWidth: 1,
                    borderRadius: 4,
                  }],
                }}
                options={barOptions}
              />
            </SmallChartCard>
          </div>
        </div>
      )}

      {/* Safety card charts */}
      {safetyCards.length > 0 && (
        <div>
          <h5 style={{ color: NAVY, fontWeight: '700', marginBottom: '16px' }}>Safety Card Breakdown</h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Status pie */}
            {Object.keys(statusCounts).length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '20px', alignItems: 'start' }}>
                <SmallChartCard title="Status" height={220}>
                  <Pie data={statusPie} options={pieOptions} />
                </SmallChartCard>
                <div style={{
                  backgroundColor: 'white', borderRadius: '12px',
                  padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}>
                  <h6 style={{ color: NAVY, fontWeight: '700', marginBottom: '12px', fontSize: '14px' }}>Status Counts</h6>
                  {sortedEntries(statusCounts).map(([label, count]) => {
                    const pct = Math.round((count / safetyCards.length) * 100)
                    return (
                      <div key={label} style={{ marginBottom: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '13px', color: '#444' }}>{label}</span>
                          <span style={{ fontSize: '13px', fontWeight: '700', color: NAVY }}>{count}</span>
                        </div>
                        <div style={{ backgroundColor: '#f0f0f0', borderRadius: '4px', height: '6px' }}>
                          <div style={{ backgroundColor: ORANGE, borderRadius: '4px', height: '6px', width: `${pct}%`, transition: 'width 0.4s' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* What happened */}
            {whatSorted.length > 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <h6 style={{ color: NAVY, fontWeight: '700', marginBottom: '12px', fontSize: '14px' }}>What Happened</h6>
                {whatSorted.map(([label, count]) => {
                  const pct = Math.round((count / safetyCards.length) * 100)
                  return (
                    <div key={label} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', color: '#444' }}>{label}</span>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: NAVY }}>{count}</span>
                      </div>
                      <div style={{ backgroundColor: '#f0f0f0', borderRadius: '4px', height: '6px' }}>
                        <div style={{ backgroundColor: ORANGE, borderRadius: '4px', height: '6px', width: `${pct}%`, transition: 'width 0.4s' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Why it happened */}
            {whySorted.length > 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                <h6 style={{ color: NAVY, fontWeight: '700', marginBottom: '12px', fontSize: '14px' }}>Why It Happened</h6>
                {whySorted.map(([label, count]) => {
                  const pct = Math.round((count / safetyCards.length) * 100)
                  return (
                    <div key={label} style={{ marginBottom: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span style={{ fontSize: '13px', color: '#444' }}>{label}</span>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: NAVY }}>{count}</span>
                      </div>
                      <div style={{ backgroundColor: '#f0f0f0', borderRadius: '4px', height: '6px' }}>
                        <div style={{ backgroundColor: NAVY, borderRadius: '4px', height: '6px', width: `${pct}%`, transition: 'width 0.4s' }} />
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

          </div>
        </div>
      )}

      {!loading && safetyCards.length === 0 && staffs.length === 0 && (
        <div style={{
          backgroundColor: 'white', borderRadius: '12px', padding: '40px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)', textAlign: 'center', color: '#aaa',
        }}>
          <p style={{ margin: 0 }}>No breakdown data available yet. Add staff and safety cards to see statistics.</p>
        </div>
      )}
    </div>
  )
}
