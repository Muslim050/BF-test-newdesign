import React from 'react'
import style from './BuisnessModel.module.scss'
import { useForm } from 'react-hook-form'
import Logo from '@/assets/Logo.png'

function RightForm() {
  const [isLogin, setIsLogin] = React.useState(false)

  const {
    register,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      link: '',
    },
  })

  const submitForm = () => {
    const formData = getValues()
    const subject = `Заказ рекламы от ${formData.name}`
    const emailBody = `
    Имя: ${formData.name}
    Email: ${formData.email}
    Телефон: ${formData.phone}
    Ссылка: ${formData.link}`
    const mailtoLink = `mailto:adtechmediainfo@gmail.com?subject=${subject}
    &body=${encodeURIComponent(emailBody)}`
    window.location.href = mailtoLink
  }
  return (
    <div>
      <div
        className=" w-[400px] h-[550px] p-10	rounded-[20px] mt-6 "
        style={{
          background:
            'linear-gradient(0deg, rgba(186, 207, 247, 0.04), rgba(186, 207, 247, 0.04)), rgba(2, 3, 8, 0.8)',

          boxShadow:
            '0px 16px 32px rgba(0, 0, 0, 0.3), inset 0px 1px 1px rgba(216, 236, 248, 0.3), inset 0px 24px 48px rgba(168, 216, 245, 0.06)',
          borderRadius: '20px',
        }}
      >
        {' '}
        <div className="text-lg	font-bold flex gap-3 items-center flex-col text-white">
          <img src={Logo} className="w-[27px] h-[30px]" alt="" /> Brandformance
        </div>
        <div className="flex flex-col justify-center items-center mt-4 gap-3">
          <p className="text-[24px] text-white font-medium">Заказать рекламу</p>
          <p className="text-[#6D768F] text-[14px]">Если вы канал</p>
        </div>
        <div className="pt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Компания"
            className="w-full !h-[39px] "
            style={{
              background: 'rgba(109, 118, 143, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(6px)',
              borderRadius: '500px',
              color: '#FFFFFF',
              padding: '15px 20px',
            }}
            autoComplete="off"
            {...register('name', {
              required: 'Поле обезательно к заполнению',
            })}
          />

          <input
            style={{
              background: 'rgba(109, 118, 143, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(6px)',
              borderRadius: '500px',
              color: '#FFFFFF',
              padding: '15px 20px',
            }}
            className="w-full !h-[39px] "
            placeholder="Email"
            type="text"
            autoComplete="off"
            {...register('email', {
              required: 'Поле обезательно к заполнению',
            })}
          />

          <input
            placeholder="Номер телефона"
            className="w-full !h-[39px] "
            style={{
              background: 'rgba(109, 118, 143, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(6px)',
              borderRadius: '500px',
              color: '#FFFFFF',
              padding: '15px 20px',
            }}
            type="text"
            autoComplete="off"
            {...register('phone', {
              required: 'Поле обезательно к заполнению',
            })}
          />

          <input
            className="w-full !h-[39px] "
            style={{
              background: 'rgba(109, 118, 143, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow:
                'inset -0.6px 0px 0px rgba(255, 255, 255, 0.04), inset 0.6px 0px 0px rgba(255, 255, 255, 0.04)',
              backdropFilter: 'blur(6px)',
              borderRadius: '500px',
              color: '#FFFFFF',
              padding: '15px 20px',
            }}
            type="text"
            placeholder="Ссылка на канал"
            autoComplete="off"
            {...register('link', {
              required: 'Поле обезательно к заполнению',
            })}
          />

          <div className={style.btn__wrapper}>
            <button
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
              type="submit"
              disabled={!isValid || isLogin}
              className={isValid && !isLogin ? style.button : style.button__dis}
              onClick={submitForm}
            >
              {isLogin ? (
                <>
                  <span>Отправить</span>
                  <div className={style.loaderWrapper}>
                    <div className={style.spinner}></div>
                  </div>
                </>
              ) : (
                <span>Отправить</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightForm
