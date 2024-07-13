import React from 'react'
import ReceivedOrders from "./receivedOrders";
import CompletedOrder from './сompletedOrders/'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "src/components/ui/tabs.jsx";

function SentOrder () {
  return (
    <>
      <Tabs defaultValue="sent" >
        <TabsList className="grid grid-cols-2 w-[350px] h-[48px] my-4">
          <TabsTrigger value="sent" className='bg-[#225AB3'>Полученные заказы</TabsTrigger>
          <TabsTrigger value="complited">Завершенные заказы</TabsTrigger>
        </TabsList>
        <TabsContent value="sent" >
          <ReceivedOrders/>


        </TabsContent>
        <TabsContent value="complited">
          <CompletedOrder/>
        </TabsContent>
      </Tabs>

    </>
  )
}

export default SentOrder
