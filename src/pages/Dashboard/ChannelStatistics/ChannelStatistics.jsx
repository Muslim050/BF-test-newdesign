import { Link } from 'react-router-dom'
import ChannelStatisticsPage from 'src/components/Dashboard/ChannelStatisticsPage/ChannelStatisticsPage'

function ChannelStatistics() {
  return (
    <>
      <Link to={'/channel'} style={{ display: 'inline-flex' }}>
        <button>Назад</button>
      </Link>

      <div>
        <ChannelStatisticsPage />
      </div>
    </>
  )
}

export default ChannelStatistics
