import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import m from './BuisnessModel.module.scss'
import PageTitle from '../module/PageTitle'
import RightForm from './RightForm'
import LeftForm from './LeftForm'

function SeventhPage() {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const phoneRef = useRef(null)

  useEffect(() => {
    gsap.from(sectionRef.current, { duration: 1, opacity: 0, y: -50 })
    gsap.from(titleRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.5 })
    gsap.from(descriptionRef.current, {
      duration: 1,
      opacity: 0,
      y: 50,
      delay: 1,
    })
    gsap.from(phoneRef.current, { duration: 1, opacity: 0, y: 50, delay: 1.5 })
  }, [])

  return (
    <div className="relative ">
      <GradientBGSvg className="absolute top-0 w-full -z-10" />
      <StarsSSSvg className="absolute top-0 w-full -z-10" />
      <SetkaSvg className="absolute top-0 w-full -z-10" />
      <div className="max-w-[1240px] w-full mx-auto px-4 py-28">
        <PageTitle
          topTitle={'Свяжитесь с нами'}
          title={'   Развивайте свой бизнес с нами '}
        />
        <div className="flex justify-center">
          <Tabs defaultValue="adv" className="w-[400px]">
            <TabsList
              className="grid w-full grid-cols-2 p-0  h-[50px] rounded-full"
              style={{
                background: 'rgba(2, 3, 8, 0.5)',
                boxShadow:
                  'inset 0px 0.3px 0px rgba(255, 255, 255, 0.1), inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(6px)',
              }}
            >
              <TabsTrigger value="adv" className={m.tabs_trigger}>
                Для рекламодателей
              </TabsTrigger>
              <TabsTrigger value="channel" className={m.tabs_trigger}>
                Для каналов
              </TabsTrigger>
            </TabsList>
            <TabsContent value="adv">
              <LeftForm />
            </TabsContent>

            <TabsContent value="channel">
              <RightForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SeventhPage
