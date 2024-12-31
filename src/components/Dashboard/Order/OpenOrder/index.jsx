import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import backendURL from '@/utils/url'
import AddInventory from './AddInventory'
import AddSentPublisher from './AddSentPublisher'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs.jsx'
import { hasRole } from '@/utils/roleUtils.js'
import Cookies from 'js-cookie'

const OpenOrderTable = ({ onRowsSelected, expandedRows }) => {
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = React.useState([])
  const [getOrder, setGetOrder] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [onceOrder, setOnceOrder] = React.useState([])

  const fetchGetOrder = async () => {
    setIsLoading(true)
    const token = Cookies.get('token')
    const response = await axios.get(
      `${backendURL}/order/${expandedRows}/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setGetOrder(response.data.data.inventories)
    setOnceOrder(response.data.data)

    setIsLoading(false)
  }
  React.useEffect(() => {
    fetchGetOrder()
  }, [dispatch, expandedRows, setOnceOrder])
  console.log (onceOrder)
  const isDisabled = selectedRows.length === 0
  const [addInventroyModal, setAddInventroyModal] = React.useState(false)
  return (
    <>
      {isLoading ? (
        <div className="loaderWrapper" style={{ height: '10vh' }}>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Tabs defaultValue="inventory">
            <TabsList
              className="grid grid-cols-2 w-[300px] h-auto rounded-[14px]"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255, 255, 255, 0.17) 0%, rgba(255, 255, 255, 0.0289) 99.67%)',
              }}
            >
              <TabsTrigger
                value="inventory"
                className="text-[12px] h-[25px] rounded-[12px]"
              >
                Инвентари
              </TabsTrigger>
              {hasRole('admin') ? (
                <TabsTrigger
                  value="sentpublisher"
                  className="text-[12px] h-[25px] rounded-[12px]"
                >
                  Размещения
                </TabsTrigger>
              ) : null}
            </TabsList>
            <TabsContent
              value="inventory"
              style={{ background: 'var(--bg-color)' }}
              className="rounded-[22px] "
            >
              <AddInventory
                getOrder={getOrder}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                expandedRows={expandedRows}
                fetchGetOrder={fetchGetOrder}
                onceOrder={onceOrder} // Передача функции как пропс
              />
            </TabsContent>
            <TabsContent
              value="sentpublisher"
              style={{ background: 'var(--bg-color)' }}
              className="rounded-[22px]"
            >
              <AddSentPublisher
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                expandedRows={expandedRows}
                setAddInventroyModal={setAddInventroyModal}
                onceOrder={onceOrder}
              />
            </TabsContent>
          </Tabs>
        </>
      )}
    </>
  )
}

export default OpenOrderTable
