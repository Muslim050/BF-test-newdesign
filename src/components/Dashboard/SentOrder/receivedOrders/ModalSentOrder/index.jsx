import React from "react";
import AddVideo from "./AddVideo";
import SelectedVideo from "./SelectedVideo";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs.jsx";

export default function ModalSentOrder ({setOpenPopoverIndex, item, setIsPopoverOpen}) {
  return (
    <>
      <div className='' >
        <div className="text-white text-xl	mb-4	font-medium	">
          Размещение
        </div>


        <Tabs defaultValue="advertiser" >
          <TabsList className="grid grid-cols-2 w-full h-[48px] my-4">
            <TabsTrigger value="advertiser" className='bg-[#225AB3'>Создать видео</TabsTrigger>
            <TabsTrigger value="advertiser-users">Выбрать видео</TabsTrigger>
          </TabsList>
          <TabsContent value="advertiser" >
            <AddVideo item={item} setOpenPopoverIndex={setOpenPopoverIndex} setIsPopoverOpen={setIsPopoverOpen}/>
          </TabsContent>
          <TabsContent value="advertiser-users">
            <SelectedVideo item={item} setOpenPopoverIndex={setOpenPopoverIndex} setIsPopoverOpen={setIsPopoverOpen}/>
          </TabsContent>
        </Tabs>

      </div>
    </>
  );
}
