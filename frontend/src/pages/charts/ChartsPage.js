import { useState, useEffect, useContext } from 'react'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar, Pie } from 'react-chartjs-2'
import SafetyCardAPI from '../../API/SafetyCardAPI'
import StaffAPI from '../../API/StaffAPI'
import AuthContext from '../../context/AuthContext'

const NAVY = '#1B2B4B'
const ORANGE = '#E15047'

const PALETTE = [
  '#E15047', '#1B2B4B', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#14B8A6', '#F97316', '#6366F1', '#22C55E', '#EF4444',
  '#0EA5E9', '#84CC16', '#A855F7',
]

const countBy = (arr, key) => {
  const counts = {}
  arr.forEach(item => {
    const val = item[key]
    if (val) counts[val] = (counts[val] || 0) + 1
  })
  return counts
}

const sortedByCount = (obj) =>
  Object.entries(obj).sort((a, b) => b[1] - a[1])

const makeBarData = (labels, data, color = ORANGE) => ({
  labels,
  datasets: [{
    data,
    backgroundColor: `${color}BF`,
    borderColor: color,
    borderWidth: 1,
    borderRadius: 4,
  }],
})

const makePieData = (labels, data) => ({
  labels,
  datasets: [{
    data,
    backgroundColor: PALETTE.slice(0, labels.length).map(c => `${c}CC`),
    borderColor: PALETTE.slice(0, labels.length),
    borderWidth: 1,
  }],
})

const hBarOptions = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: { size: 11 }, color: '#666' }, grid: { color: '#f0f0f0' } },
    y: {
      ticks: {
        font: { size: 11 }, color: '#444',
        callback: function(val) {
          const label = this.getLabelForValue(val)
          return label.length > 45 ? label.slice(0, 43) + '…' : label
        },
      },
      grid: { display: false },
    },
  },
}

const vBarOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: { size: 11 }, color: '#444' }, grid: { display: false } },
    y: { ticks: { font: { size: 11 }, color: '#666' }, grid: { color: '#f0f0f0' } },
  },
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom', labels: { font: { size: 12 }, padding: 14, boxWidth: 14 } },
  },
}

function ChartCard({ title, children, height = 300 }) {
  return (
    <div style={{
      backgroundColor: 'white', borderRadius: '12px',
      padding: '24px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
    }}>
      <h6 style={{ color: NAVY, fontWeight: '700', marginBottom: '20px', fontSize: '15px' }}>{title}</h6>
      <div style={{ height: `${height}px`, position: 'relative' }}>
        {children}
      </div>
    </div>
  )
}

export default function ChartsPage() {
  const { authTokens } = useContext(AuthContext)
  const [safetyCards, setSafetyCards] = useState([])
  const [staffs, setStaffs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const headers = { Authorization: `Bearer ${authTokens.access}` }
    Promise.all([
      SafetyCardAPI.get('/', { headers }),
      StaffAPI.get('/', { headers }),
    ]).then(([cardsRes, staffRes]) => {
      setSafetyCards(cardsRes.data)
      setStaffs(staffRes.data)
      setLoading(false)
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
  }, [authTokens])

  const whatCounts   = countBy(safetyCards, 'what_happened')
  const whyCounts    = countBy(safetyCards, 'why_happened')
  const lsrCounts    = countBy(safetyCards, 'life_saving_rule')
  const statusCounts = countBy(safetyCards, 'status')

  const perStaff = staffs
    .map(s => ({ name: s.name, count: safetyCards.filter(c => c.name === s.name).length }))
    .filter(s => s.count > 0)
    .sort((a, b) => b.count - a.count)

  const whatSorted = sortedByCount(whatCounts)
  const whySorted  = sortedByCount(whyCounts)
  const lsrSorted  = sortedByCount(lsrCounts)

  const noData = <p style={{ color: '#bbb', fontSize: '13px', margin: 0 }}>No data yet</p>

  return (
    <div style={{ padding: '40px', maxWidth: '1300px', margin: '0 auto' }}>

      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ color: NAVY, fontWeight: '800', margin: '0 0 4px' }}>Charts</h2>
        <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>
          Visual breakdown of safety card data and staff records.
        </p>
      </div>

      {/* Summary strip */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        {[
          { label: 'Safety Cards', value: loading ? '…' : safetyCards.length, color: ORANGE },
          { label: 'Staff',        value: loading ? '…' : staffs.length,      color: NAVY },
          { label: 'What Happened categories', value: loading ? '…' : Object.keys(whatCounts).length, color: '#3B82F6' },
          { label: 'Why categories',           value: loading ? '…' : Object.keys(whyCounts).length,  color: '#10B981' },
        ].map(card => (
          <div key={card.label} style={{
            backgroundColor: 'white', borderRadius: '10px', padding: '20px 16px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.07)', textAlign: 'center',
          }}>
            <div style={{ fontSize: '26px', fontWeight: '800', color: card.color }}>{card.value}</div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>{card.label}</div>
          </div>
        ))}
      </div>

      {loading ? (
        <div style={{
          backgroundColor: 'white', borderRadius: '12px', padding: '60px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)', textAlign: 'center', color: '#aaa',
        }}>
          Loading chart data…
        </div>
      ) : safetyCards.length === 0 ? (
        <div style={{
          backgroundColor: 'white', borderRadius: '12px', padding: '60px',
          boxShadow: '0 1px 4px rgba(0,0,0,0.08)', textAlign: 'center', color: '#aaa',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
          <p style={{ margin: 0 }}>No safety card data to chart yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Row 1: Per staff bar + Status pie */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
            <ChartCard title="Safety Cards per Staff" height={Math.max(260, perStaff.length * 36)}>
              {perStaff.length > 0
                ? <Bar data={makeBarData(perStaff.map(s => s.name), perStaff.map(s => s.count))} options={vBarOptions} />
                : noData}
            </ChartCard>
            <ChartCard title="Status Breakdown" height={260}>
              {Object.keys(statusCounts).length > 0
                ? <Pie data={makePieData(Object.keys(statusCounts), Object.values(statusCounts))} options={pieOptions} />
                : noData}
            </ChartCard>
          </div>

          {/* What happened — horizontal bar */}
          <ChartCard title="What Happened" height={Math.max(300, whatSorted.length * 30)}>
            {whatSorted.length > 0
              ? <Bar
                  data={makeBarData(whatSorted.map(([l]) => l), whatSorted.map(([, v]) => v), ORANGE)}
                  options={hBarOptions}
                />
              : noData}
          </ChartCard>

          {/* Row 3: Why + LSR side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <ChartCard title="Why It Happened" height={Math.max(280, whySorted.length * 34)}>
              {whySorted.length > 0
                ? <Bar
                    data={makeBarData(whySorted.map(([l]) => l), whySorted.map(([, v]) => v), NAVY)}
                    options={hBarOptions}
                  />
                : noData}
            </ChartCard>
            <ChartCard title="Life Saving Rule" height={Math.max(280, lsrSorted.length * 34)}>
              {lsrSorted.length > 0
                ? <Bar
                    data={makeBarData(lsrSorted.map(([l]) => l), lsrSorted.map(([, v]) => v), '#3B82F6')}
                    options={hBarOptions}
                  />
                : noData}
            </ChartCard>
          </div>

        </div>
      )}
    </div>
  )
}
