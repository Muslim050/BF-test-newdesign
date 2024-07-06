// import React from 'react'
//
// import Eclipse from 'src/assets/Site/Ellipse.png'
//
// import { useDispatch } from 'react-redux'
// import { login } from '../../redux/auth/authSlice'
// import { useNavigate } from 'react-router-dom'
// import { toast } from 'react-toastify'
// import { useForm } from 'react-hook-form'
// import style from './Login.module.scss'
// import { toastConfig } from 'src/utils/toastConfig'
//
// function Login() {
//   const dispatch = useDispatch()
//   let navigate = useNavigate()
//   const [isLogin, setIsLogin] = React.useState(false)
//   const [showPasswordOld, setShowPasswordOld] = React.useState(false)
//
//   const {
//     register,
//     formState: { errors, isValid },
//     handleSubmit,
//   } = useForm({
//     defaultValues: {
//       login: '',
//       password: '',
//     },
//     mode: 'onBlur',
//   })
//   const handleTogglePasswordOld = () => {
//     setShowPasswordOld(!showPasswordOld)
//   }
//   const onSubmit = async (data) => {
//     try {
//       setIsLogin(true)
//
//       const logindata = await dispatch(login({ data }))
//       if (logindata.payload) {
//         const role = localStorage.getItem('role')
//         const routesByRole = {
//           admin: '/order',
//           publisher: '/inventory',
//           channel: '/inventory',
//           advertiser: '/order',
//           guest: '/login',
//           advertising_agency: '/order',
//         }
//         const redirectRoute = role ? routesByRole[role] : routesByRole.guest
//         navigate(redirectRoute)
//       }
//
//       setIsLogin(false)
//     } catch (error) {
//       setIsLogin(false)
//
//       toast.error(
//         'Ошибка при входе. Пожалуйста, попробуйте снова.',
//         toastConfig,
//       )
//     }
//   }
//
//   return (
//     <>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className={style.login}>
//           <img className={style.eclipse_1} src={Eclipse} alt="" />
//           <img className={style.eclipse_2} src={Eclipse} alt="" />
//
//           <div className={style.login__wrapper}>
//             <div className={style.login__wrapper__table_header}>
//               <div className={style.login__wrapper__table_title}>
//                 BRANDFORMANCE
//               </div>
//               <div className={style.login__wrapper__table_subtitle}>
//                 Войти в систему
//               </div>
//             </div>
//
//             <div>
//               <div
//                 className={style.modalWindow}
//                 style={{ marginBottom: '40px' }}
//               >
//                 <div className={style.inputContainer}>
//                   <div className={style.inputIcon}>
//                     {/*<Email />*/}
//                     Email
//                   </div>
//                   <input
//                     className={style.modalWindow__input}
//                     type="text"
//                     placeholder="Логин"
//                     autoComplete="off"
//                     {...register('login', {
//                       required: 'Поле обезательно к заполнению',
//                     })}
//                   />
//
//                   <span className={style.modalWindow__input_error}>
//                     {errors?.login && <p>{errors?.login?.message}</p>}
//                   </span>
//                 </div>
//               </div>
//
//               <div
//                 className={style.modalWindow}
//                 style={{ marginBottom: '80px' }}
//               >
//                 <div className={style.inputContainer}>
//                   <div className={style.inputIcon}>
//                     {/*<Lock />*/}
//                     Lock
//                   </div>
//                   <input
//                     className={style.modalWindow__input}
//                     type={showPasswordOld ? 'text' : 'password'}
//                     placeholder="Пароль"
//                     autoComplete="off"
//                     {...register('password', {
//                       required: 'Поле обезательно к заполнению',
//                     })}
//                   />
//                 </div>
//
//                 <span className={style.modalWindow__input_error}>
//                   {errors?.password && <p>{errors?.password?.message}</p>}
//                 </span>
//                 <div
//                   onClick={handleTogglePasswordOld}
//                   style={{
//                     position: 'absolute',
//                     right: '20px',
//                     top: '15px',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {showPasswordOld ? (
//                     // <Ulock style={{ width: '20px', height: '20px' }} />
//                     <div>Ulock</div>
//                   ) : (
//                     // <Show style={{ width: '20px', height: '20px' }} />
//                     <div>Show</div>
//                   )}
//                 </div>
//               </div>
//
//               {/* <ButtonUI isValid={true} disabled={!isValid}>
//                 Войти
//               </ButtonUI> */}
//               <div className={style.btn__wrapper}>
//                 <button
//                   style={{ display: 'flex', alignItems: 'center' }}
//                   type="submit"
//                   disabled={!isValid || isLogin}
//                   className={
//                     isValid && !isLogin
//                       ? style.btn__wrapper__btn
//                       : style.btn__wrapper__disabled
//                   }
//                 >
//                   {isLogin ? (
//                     <>
//                       <span>Войти</span>
//                       <div className={style.loaderWrapper}>
//                         <div className={style.spinner}></div>
//                       </div>
//                     </>
//                   ) : (
//                     <span>Войти</span>
//                   )}
//                 </button>
//               </div>
//               {/* <ButtonUI isValid={true} disabled={!isValid}>
//                 Войти
//               </ButtonUI> */}
//             </div>
//           </div>
//         </div>
//       </form>
//     </>
//   )
// }
//
// export default Login

import React from 'react'
import { EyeOff, Eye, Loader2 } from 'lucide-react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import { Input } from 'src/components/ui/input'
import { useForm } from 'react-hook-form'
import style from './Login.module.scss'
import { login } from 'src/redux/auth/authSlice.js'
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
      if (logindata.payload) {
        const role = localStorage.getItem('role')
        const routesByRole = {
          admin: '/order',
          publisher: '/inventory',
          channel: '/inventory',
          advertiser: '/order',
          guest: '/login',
          advertising_agency: '/order',
        }
        const redirectRoute = role ? routesByRole[role] : routesByRole.guest
        navigate(redirectRoute)
      }

      setIsLogin(false)
    } catch (error) {
      setIsLogin(false)

      // toast.error(
      //   'Ошибка при входе. Пожалуйста, попробуйте снова.',
      //   toastConfig,
      // )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full lg:grid h-screen lg:grid-cols-2  bg-[#090E35] p-6">
          <div
            className={`${style.whitegrad} glass-background rounded-[22px] `}
          >
            <div className="hidden bg-muted lg:block rounded-[22px] ">
              {/* <image
              src="/placeholder.svg"
              alt="Image"
              width="1920"
              height="1080"
              className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            /> */}
            </div>
          </div>
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[450px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-[32px] font-bold text-white">
                  Brandformance
                </h1>
                <p className="text-balance text-muted-foreground">
                  Let’s sign you in{' '}
                </p>
              </div>
              <div className="relative">
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
              <div className="relative">
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
              <Button
                className={`${
                  isValid ? 'bg-[#2A85FF] hover:bg-[#2A85FF99]' : 'bg-[#616161]'
                } w-full  rounded-[20px] h-[64px] text-white`}
                disabled={!isValid || isLogin}
              >
                Войти
                {isLogin && <Loader2 className="ml-2 h-6 w-6 animate-spin" />}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
