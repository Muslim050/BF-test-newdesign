import React, { useEffect, useRef } from 'react'
import { EyeOff, Eye, Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { useForm } from 'react-hook-form'
import { login } from 'src/redux/auth/authSlice.js'
import { toast } from 'react-hot-toast'
import { gsap } from 'gsap'
import { Card, CardContent } from '@/components/ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
// import Cookies from 'js-cookie'

function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = React.useState(false)
  const [showPasswordOld, setShowPasswordOld] = React.useState(false)

  const {
    register,
    formState: { errors, isValid },

    handleSubmit,
  } = useForm({
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onBlur',
  })

  const handleTogglePasswordOld = () => {
    setShowPasswordOld(!showPasswordOld)
  }
  const onSubmit = async (data) => {
    try {
      setIsLogin(true)

      const logindata = await dispatch(login({ data }))
      if (logindata.payload.message === 'Success') {
        const role = localStorage.getItem('role')
        const routesByRole = {
          admin: '/order',
          publisher: '/inventory',
          channel: '/inventory',
          advertiser: '/order',
          guest: '/login',
          advertising_agency: '/order',
        }
        toast.success('Вы успешно вошли в систему!')

        const redirectRoute = role ? routesByRole[role] : routesByRole.guest
        // Анимация исчезновения элементов перед навигацией
        animateElementsOut().then(() => {
          navigate(redirectRoute)
        })
        // navigate(redirectRoute)
      } else if (logindata.payload.data.error.detail) {
        toast.error(logindata.payload.data.error.detail)
      }

      setIsLogin(false)
    } catch (error) {
      setIsLogin(false)
      toast.error(error?.data?.error?.message)
    }
  }
  const animateElementsOut = () => {
    return new Promise((resolve) => {
      const duration = 1 // Длительность анимации
      gsap.to(sectionRef.current, { duration, opacity: 0, x: -150 })
      gsap.to(titleRef.current, { duration, opacity: 0, y: 50, delay: 0.5 })
      gsap.to(firstRef.current, { duration, opacity: 0, y: 50, delay: 0.8 })
      gsap.to(secondRef.current, { duration, opacity: 0, y: 50, delay: 1 })
      gsap.to(buttonRef.current, { duration, opacity: 0, y: 50, delay: 1.5 })
      gsap.to(leftRef.current, { duration, opacity: 0, x: -30 })

      // Разрешение промиса после завершения анимации
      setTimeout(resolve, (duration + 1.5) * 1000)
    })
  }

  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const firstRef = useRef(null)
  const secondRef = useRef(null)
  const buttonRef = useRef(null)
  const leftRef = useRef(null)
  const mainTitleRef = useRef(null)
  const mainSubtitleRef = useRef(null)

  useEffect(() => {
    gsap.from(sectionRef.current, { duration: 1, opacity: 0, y: -50 })
    gsap.from(titleRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.5 })
    gsap.from(firstRef.current, { duration: 1, opacity: 0, y: 50, delay: 0.8 })
    gsap.from(secondRef.current, { duration: 1, opacity: 0, y: 50, delay: 1 })
    gsap.from(buttonRef.current, { duration: 1, opacity: 0, y: 50, delay: 1.5 })
    gsap.from(leftRef.current, { duration: 1, opacity: 0, x: -30 })
  }, [])

  const carouselItemsRef = useRef([])
  useEffect(() => {
    carouselItemsRef.current = carouselItemsRef.current.slice(0, 4)
    gsap.fromTo(
      carouselItemsRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
    )
    gsap.from(mainTitleRef.current, { duration: 1, opacity: 0, y: 50 })
    gsap.from(mainSubtitleRef.current, { duration: 1, opacity: 0, y: 50 })
  }, [])

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full lg:grid h-screen lg:grid-cols-2  bg-[#090E35] p-6 ">
          <div
            ref={leftRef}
            className="hidden bg-[#090E35] lg:block border_container_login glass-background rounded-[22px]"
          >
            <div className="flex flex-col justify-around	 h-full">
              <div className=" xl:px-[110px]  lg:px-[50px]	flex flex-col gap-6">
                <div
                  ref={mainTitleRef}
                  className="font-normal	text-6xl	text-white 2xl:text-6xl xl:text-5xl  lg:text-4xl"
                >
                  Увеличьте охваты вашего бренда с помощью брендированной
                  рекламы
                </div>
                <div
                  ref={mainSubtitleRef}
                  className="text-2xl	font-normal	text-white"
                >
                  Brandformance - это онлайн видео площадка созданная для
                  увеличения показателей вашего бренда через видео контент.
                </div>
              </div>
              <div className="pl-[110px] flex  gap-2 w-full relative">
                <Carousel className="w-full" opts={{ loop: true }}>
                  <div className="absolute -top-16 right-16 z-10">
                    <CarouselPrevious type="button" />
                    <CarouselNext type="button" />
                  </div>
                  <CarouselContent className="-ml-1">
                    {Array.from({ length: 4 }).map((_, index) => (
                      <CarouselItem
                        key={index}
                        className="pl-1 mr-1 md:basis-80 h-[210px]"
                        ref={(el) => (carouselItemsRef.current[index] = el)}
                      >
                        <div className="">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6 h-[210px] w-[308px]">
                              <span className="text-2xl font-semibold">
                                {index + 1}
                              </span>
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            </div>
          </div>
          <div
            ref={sectionRef}
            className="flex items-center justify-center py-12"
          >
            <div className="mx-auto grid w-[450px] gap-6">
              <div ref={titleRef} className="grid gap-2 text-center">
                <h1 className="text-[32px] font-bold text-white">
                  Brandformance
                </h1>
                <p className="text-balance text-muted-foreground">
                  Let’s sign you in{' '}
                </p>
              </div>
              <div ref={firstRef} className="relative">
                <Input
                  id="login"
                  type="text"
                  {...register('login', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  className={`border-[1px]  rounded-[20px] h-[73px] p-[26px] text-white bg-[#0A0F3633] text-base ${
                    errors.login ? 'border-red-500' : 'border-[#123057]'
                  }`}
                  placeholder="Логин"
                  required
                  autoComplete="off"
                />
                <span className="text-red-500 text-sm	">
                  {errors?.login && <p>{errors?.login?.message}</p>}
                </span>
              </div>
              <div ref={secondRef} className="relative">
                <Input
                  id="password"
                  type={showPasswordOld ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  className={`border-[1px]  rounded-[20px] h-[73px] p-[26px] text-white bg-[#0A0F3633] text-base ${
                    errors.password ? 'border-red-500' : 'border-[#123057]'
                  }`}
                  placeholder="Пароль"
                  required
                  autoComplete="off"
                />
                <span className="text-red-500 text-sm	">
                  {errors?.password && <p>{errors?.password?.message}</p>}
                </span>{' '}
                <div
                  onClick={handleTogglePasswordOld}
                  className="absolute top-[35%] right-[26px] cursor-pointer"
                >
                  {showPasswordOld ? (
                    <Eye className="text-white" />
                  ) : (
                    <EyeOff className="text-white" />
                  )}
                </div>
              </div>
              <div ref={buttonRef}>
                <Button
                  className={`${
                    isValid
                      ? 'bg-[#2A85FF] hover:bg-[#2A85FF99]'
                      : 'bg-[#616161]'
                  } w-full  rounded-[20px] h-[64px] text-white`}
                  disabled={!isValid || isLogin}
                >
                  Войти
                  {isLogin && <Loader2 className="ml-2 h-6 w-6 animate-spin" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
