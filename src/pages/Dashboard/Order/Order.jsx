import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import ModalUI from 'src/components/Labrery/ModalComponents/ModalUI/ModalUI.jsx'
import OrderModal from 'src/components/Dashboard/Order/OrderModal/OrderModal.jsx'
import OrderTable from 'src/components/Dashboard/Order/OrderTable/OrderTable.jsx'

function Order() {
  const { showOrder } = useSelector((state) => state.modal)

  return (
    <div>
      <AnimatePresence>
        {showOrder && (
          <ModalUI>
            <OrderModal />
          </ModalUI>
        )}
      </AnimatePresence>

      <OrderTable />
    </div>
  )
}

export default Order
