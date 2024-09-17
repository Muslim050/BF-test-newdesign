import { GradientBGSvg, SetkaSvg, StarsSSSvg } from '@/assets/Site/site-svg.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import m from './BuisnessModel.module.scss'
import PageTitle from '../module/PageTitle'
import RightForm from './RightForm'
import LeftForm from './LeftForm'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

function SeventhPage() {
  const phoneRightCart = useRef(null)
  const phoneLeftCart = useRef(null)
  const contentRef = useRef(null)
  const [tabValue, setTabValue] = React.useState('adv')
  const handleTabChange = (value) => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 2,
          ease: 'bounce.out',
        },
      )
    }
    setTabValue(value)
  }

  React.useEffect(() => {
    if (phoneLeftCart.current && phoneRightCart.current) {
      gsap.fromTo(
        phoneLeftCart.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phoneLeftCart.current,
            start: 'top center+=500',
            scrub: true,
          },
        },
      )

      gsap.fromTo(
        phoneRightCart.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: phoneRightCart.current,
            start: 'top center+=500',
            scrub: true,
          },
        },
      )
    }
  }, [])

  return (
    <div className="relative" id="Монетизировать">
      <GradientBGSvg className="absolute top-0 w-full -z-10" />
      <StarsSSSvg className="absolute top-0 w-full h-auto -z-10" />
      <SetkaSvg className="absolute top-0 w-full -z-10" />
      <div className="max-w-[1240px] w-full mx-auto px-4 py-28">
        <div ref={phoneLeftCart}>
          <PageTitle
            topTitle={'Свяжитесь с нами'}
            title={'Развивайте свой бизнес с нами'}
          />
        </div>
        <div className="flex justify-center" ref={phoneRightCart}>
          <Tabs
            value={tabValue}
            className="w-[400px]"
            onValueChange={handleTabChange}
          >
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
            <div ref={contentRef}>
              <TabsContent value="adv">
                {tabValue === 'adv' && <LeftForm />}
              </TabsContent>

              <TabsContent value="channel">
                {tabValue === 'channel' && <RightForm />}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default SeventhPage
