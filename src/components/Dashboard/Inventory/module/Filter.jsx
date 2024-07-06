import React from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from 'src/components/ui/select.jsx'
import { FormatSvg, TvSvg } from 'src/assets/icons-ui.jsx'
import { Button } from 'src/components/ui/button.jsx'
import {SelectTrigger} from "@/components/ui/selectTrigger.jsx";

const formatV = [
  { value: 'preroll', text: 'Pre-roll' },
  { value: 'mixroll', text: 'Mix-roll' },
]

function Filter({
  channel,
  selectedOptionChannel,
  selectedFormat,
  handleSelectFormat,
  handleSelectChange,
  selectedChannel,
  handleSearch,
}) {
  return (
    <>
      <div className="flex flex-col gap-2">
        {/*Выбрать канал*/}
        <Select
          onValueChange={handleSelectChange}
          value={selectedOptionChannel}
        >
          <div className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[50px] rounded-md">
            <div className="text-xs flex gap-2 text-white">
              <TvSvg className="text-white" /> Канал
            </div>
            <SelectTrigger className="rounded-none border-0 p-0 h-auto pl-[25px] text-white">
              <SelectValue placeholder="Выбрать канал" />
            </SelectTrigger>
          </div>
          <SelectContent className="w-full">
            <SelectGroup>
              {channel.map((option) => (
                <SelectItem
                  className=""
                  key={option.id}
                  value={JSON.stringify(option)}
                >
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/*Выбрать канал*/}

        {/*Выбрать формат*/}
        <Select onValueChange={handleSelectFormat} value={selectedFormat}>
          <div className="bg-white bg-opacity-30 backdrop-blur-md px-2 py-2 h-[50px] rounded-md">
            <div className="text-xs flex gap-2 text-white">
              <FormatSvg className="text-white" /> Формат
            </div>
            <SelectTrigger className="rounded-none border-0 p-0 h-auto pl-[25px] text-white">
              <SelectValue placeholder="Выбрать формат" />
            </SelectTrigger>
          </div>
          <SelectContent className="w-full">
            <SelectGroup>
              {formatV.map((option, index) => (
                <SelectItem key={index} value={option.value}>
                  {option.text}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/*Выбрать формат*/}

        {(selectedChannel || selectedFormat) && (
          <Button
            variant="ghost"
            className="bg-brandPrimary-1 rounded-lg hover:bg-brandPrimary-50 text-white no-underline hover:text-white h-[44px] w-full"
            onClick={handleSearch}
          >
            Поиск
          </Button>
        )}
      </div>
    </>
  )
}

export default Filter
