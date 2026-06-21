export default function DashboardCards({ stats }) {
  const cards = [
    {
      title: 'Students',
      value: stats.students,
      color: '#2563eb',
    },
    {
      title: 'Companies',
      value: stats.companies,
      color: '#16a34a',
    },
    {
      title: 'Applications',
      value: stats.applications,
      color: '#9333ea',
    },
    {
      title: 'Job Posts',
      value: stats.jobs,
      color: '#ea580c',
    },
  ]

  return (
    <div className="dashboard-grid">
        <p className="page-header">Home Page</p>

      
      {cards.map(card => (
        <div
          key={card.title}
          className="dashboard-card"
          style={{ borderTop: `4px solid ${card.color}` }}
        >
          <h3>{card.title}</h3>
          <p className="card-value">{card.value}</p>
        </div>
      ))}
    </div>
  )
}