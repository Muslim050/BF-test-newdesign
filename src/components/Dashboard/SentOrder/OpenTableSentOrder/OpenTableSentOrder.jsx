import React from 'react'
import {fetchInventory} from "../../../../redux/inventory/inventorySlice";
import {useDispatch, useSelector} from "react-redux";
import OpenTableSentOrderData from "./OpenTableSentOrderData";
import ModalSentOrder from "../receivedOrders/ModalSentOrder";
import style from "@/components/Dashboard/SentOrder/TableSentsOrder.module.scss";
import {TableHead, Table, TableHeader, TableRow, TableBody} from "@/components/ui/table.jsx";
import {ThemeContext} from "@/utils/ThemeContext.jsx";

const headers = [
  {key: 'id', label: '№'},
  {key: 'channel.name', label: 'Канал'},
  {key: 'video_content.name', label: 'Контент'},
  {key: 'format', label: 'Формат'},
  {
    key: 'expected_number_of_views',
    label: 'Показы факт',
  },
  {key: 'category', label: 'Категория'},
  {key: 'publication_time', label: 'Дата начала'},

  {key: 'status', label: 'Действия'},
  {key: 'status', label: ''},
]

function OpenTableSentOrder ({item}) {
  const { textColor } = React.useContext(ThemeContext);

  const dispatch = useDispatch ()
  const [loading, setLoading] = React.useState (true)
  const data = useSelector ((state) => state.inventory.inventory)
  // const [openPopoverIndex, setOpenPopoverIndexLocal] = useState (false);
  const [openPopoverIndex, setOpenPopoverIndex] = React.useState (null);
  console.log (openPopoverIndex)

  React.useEffect (() => {
    dispatch (fetchInventory ({orderAssignmentId: item.id})).then (() => setLoading (false))
  }, [dispatch])
  const handlePopoverClick = (index) => {
    setOpenPopoverIndex (openPopoverIndex === index ? null : index);
  };
  return (
    < div style={{position: "relative"}}>
      {loading ? (
        <div className="loaderWrapper" style={{height: '50px'}}>
          <div style={{color: 'var(--text-color, )'}}>
            Загрузка инвентарей &nbsp;
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {item.order_status === 'in_progress' ?
            <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: "15px"}}>
              <div
                style={{
                  color: '#53545C',
                  borderRadius: '8px',
                  fontSize: '15px',
                  border: '1.5px solid #53545C',
                  padding: '6.5px 8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'flex-end',
                }}
                onClick={() => handlePopoverClick (item.id)}
              >
                Размещение
              </div>
              {openPopoverIndex === item.id && (
                <div
                  style={{
                    width: '430px',
                    position: 'absolute',
                    zIndex: '10',
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '2px solid #cfcfd1',
                    padding: '12px',
                    boxShadow: '0px 0px 15px -7px black',
                  }}
                >
                  <ModalSentOrder setOpenPopoverIndex={setOpenPopoverIndex} item={item}/>
                </div>
              )}
            </div> : null
          }
            {/*<div className="p-3 rounded-xl	border_container bg-white bg-opacity-30 backdrop-blur-md">*/}

          {data && data.length ? (

              <Table
            className={`${style.responsive_table} border_design rounded-lg overflow-auto bg-[#090e35e0]`}
            >
              <TableHeader className="bg-[#FFFFFF2B] rounded-t-lg">
              <TableRow>
                {headers.map ((row) => {
                  const user = localStorage.getItem ('role')
                  const showStatusColumn = user !== 'admin'
                  if (row.key === 'is_connected' && !showStatusColumn) {
                    return null
                  }
                  if (data.status === 'open') {
                    headers.push ({key: 'status', label: 'Действия'})
                  }
                  return (
                    <TableHead key={row.key} className={`text-${textColor} `}>
                      {row.label}
                    </TableHead>
                  )
                })}
              </TableRow>
              </TableHeader>
              <TableBody>
              <OpenTableSentOrderData data={data}/>
              </TableBody>
            </Table>
          ) : (
            <div className="empty_list">Список пустой. Добавьте инвентарь!</div>
          )}
          {/*</div>*/}

        </>
      )
      }</div>
  )
}

export default OpenTableSentOrder
