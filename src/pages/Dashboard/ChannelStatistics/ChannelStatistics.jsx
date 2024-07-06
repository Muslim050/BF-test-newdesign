import { Link } from 'react-router-dom'
import ButtonTable from 'src/components/Labrery/ButtonTable/ButtonTable'
import ChannelStatisticsPage from 'src/components/Dashboard/ChannelStatisticsPage/ChannelStatisticsPage'

function ChannelStatistics() {
  return (
    <>
      <Link to={'/channel'} style={{ display: 'inline-flex' }}>
        <ButtonTable>Назад</ButtonTable>
      </Link>

      <div>
        <ChannelStatisticsPage />
      </div>
    </>
  )
}

export default ChannelStatistics
