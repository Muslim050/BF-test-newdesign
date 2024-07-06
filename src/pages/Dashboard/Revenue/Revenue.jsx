import { useSelector } from 'react-redux'
import TableRevenue from 'src/components/Dashboard/Revenue/TableRevenue/TableRevenue'

function Revenue() {
  const { showOrder } = useSelector((state) => state.modal)

  return (
    <div>
      {/* <AnimatePresence>
        {showOrder && (
          <ModalUI>
            <OrderModal />
          </ModalUI>
        )}
      </AnimatePresence> */}

      <TableRevenue />
    </div>
  )
}

export default Revenue
