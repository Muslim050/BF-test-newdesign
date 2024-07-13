import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import backendURL from 'src/utils/url'
import AddInventory from './AddInventory'
import AddSentPublisher from './AddSentPublisher'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "src/components/ui/tabs.jsx";
import {hasRole} from "@/utils/roleUtils.js";

const OpenOrderTable = ({ onRowsSelected, expandedRows }) => {
  const dispatch = useDispatch()
  const [selectedRows, setSelectedRows] = React.useState([])
  const [getOrder, setGetOrder] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  const [onceOrder, setOnceOrder] = React.useState([])

  const { order } = useSelector((state) => state)
  const orders = order?.order

  const { inventory } = useSelector((state) => state)
  const inventor = inventory?.inventory

  const fetchGetOrder = async () => {
    setIsLoading(true)
    const token = localStorage.getItem('token')
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
  }, [dispatch])
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
          <Tabs defaultValue="inventory" >
            <TabsList className="grid grid-cols-2 w-[300px] h-[48px] my-2">
              <TabsTrigger value="inventory" className='bg-[#225AB3'>Инвентари</TabsTrigger>
              {
                hasRole('admin') ?
                  <TabsTrigger value="sentpublisher">Размещения</TabsTrigger> : null
              }
            </TabsList>
            <TabsContent value="inventory" className='bg-[#090e35e0] rounded-lg'>
              <AddInventory
                getOrder={getOrder}
                setSelectedRows={setSelectedRows}
                selectedRows={selectedRows}
                expandedRows={expandedRows}
                fetchGetOrder={fetchGetOrder} // Передача функции как пропс
              />
            </TabsContent>
            <TabsContent value="sentpublisher" className='bg-[#090e35e0] rounded-xl'>
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
