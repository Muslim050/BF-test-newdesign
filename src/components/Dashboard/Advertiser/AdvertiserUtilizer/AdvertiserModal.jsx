import React from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addAdvertiser } from '@/redux/advertiser/advertiserSlice.js'
import { useForm, Controller } from 'react-hook-form'
import backendURL from '@/utils/url.js'
import MaskedInput from 'react-text-mask'
import { Loader2 } from 'lucide-react'

import { toast } from 'react-hot-toast'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'

import { hasRole } from '@/utils/roleUtils.js'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from '@/components/ui/select.jsx'
import { Button } from '@/components/ui/button.jsx'
import { SelectTrigger } from '@/components/ui/selectTrigger.jsx'
import Cookies from 'js-cookie'

export default function AdvertiserModal({ onClose }) {
  const [advertiserModal, setAdvertiserModal] = React.useState([])
  const [isLogin, setIsLogin] = React.useState(false)

  const [setCpm] = React.useState([])
  const dispatch = useDispatch()
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      agency: '',
      cpm_mixroll: '',
      cpm_preroll: '',
      cpm_preroll_uz: '',
      cpm_mixroll_uz: '',
    },
    mode: 'onBlur',
  })
  const fetchAdvertiser = async () => {
    const token = Cookies.get('token')
    const response = await axios.get(
      `${backendURL}/advertiser/advertising-agency/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setAdvertiserModal(response.data.data)
  }
  const fetchCpm = async () => {
    const token = Cookies.get('token')

    const response = await axios.get(
      `${backendURL}/order/cpm/`,

      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )
    setCpm(response.data.data)
    setValue('cpm_mixroll', response.data.data.mixroll)
    setValue('cpm_preroll', response.data.data.preroll)
  }
  React.useEffect(() => {
    fetchAdvertiser()
  }, [])
  React.useEffect(() => {
    fetchCpm()
  }, [])

  const onSubmit = async (data) => {
    try {
      setIsLogin(true)

      const adv = await dispatch(addAdvertiser({ data })).unwrap()
      toast.success('Пользователь рекламодателя успешно создан!')
      onClose()
      setTimeout(() => {
        dispatch(fetchAdvertiser())
      }, 1000)
      setIsLogin(false)
    } catch (error) {
      setIsLogin(false)
      toast.error(error?.data?.error?.message)
    }
  }
  return (
    <>
      <DialogContent
        className="w-[450px] p-4"
        onInteractOutside={(e) => {
          e.preventDefault()
        }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg	font-medium	text-white border-b border-[#F9F9F926] pb-4">
            Cоздать рекламодателя
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/**/}
            <div className="flex gap-4 mb-4">
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Название компании
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Input
                  type="text"
                  autoComplete="off"
                  {...register('name', {
                    required: 'Поле обезательно к заполнению',
                  })}
                  placeholder={'Название компании'}
                  className={`border ${
                    errors?.name ? 'border-red-500' : 'border-gray-300'
                  }   transition-all duration-300 text-sm `}
                />
              </div>
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-2">
                  Номер телефона<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: 'Поле обезательно к заполнению',
                    pattern: {
                      value: /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
                      message: 'Неверный формат номера телефона',
                    },
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <MaskedInput
                      mask={[
                        '+',
                        '9',
                        '9',
                        '8',
                        ' ',
                        '(',
                        /[1-9]/,
                        /\d/,
                        ')',
                        ' ',
                        /\d/,
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                        '-',
                        /\d/,
                        /\d/,
                      ]}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      render={(inputRef, props) => (
                        <Input
                          {...props}
                          ref={(e) => {
                            ref(e)
                            inputRef(e)
                          }}
                          placeholder="+998 (__) ___ - __ - __"
                          className={`border ${
                            errors?.phone ? 'border-red-500' : 'border-gray-300'
                          } transition-all duration-300 text-sm `}
                        />
                      )}
                    />
                  )}
                />
              </div>
            </div>
            {/**/}

            {/**/}
            <div className="grid w-full mb-4">
              <Label className="text-sm	text-white pb-2 flex gap-0.5">
                Email<span className="text-red-500 ml-0.5">*</span>
                <div className="text-sm	text-red-500 ">
                  {' '}
                  {errors?.email && <p>{errors.email.message}</p>}
                </div>
              </Label>
              <Input
                type="email"
                autoComplete="off"
                {...register('email', {
                  required: '.',
                })}
                placeholder={'Введите email'}
                className={`border ${
                  errors?.email ? 'border-red-500' : 'border-gray-300'
                }   transition-all duration-300 text-sm `}
              />
            </div>
            {/*  */}

            {/*  */}
            {hasRole('admin') && (
              <div className="flex gap-4 mb-4">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2">
                    СPM Preroll<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register('cpm_preroll', {
                      required: 'Поле обезательно к заполнению',
                    })}
                    placeholder={'Введите cpm preroll'}
                    className={`border ${
                      errors?.cpm_preroll ? 'border-red-500' : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                  />
                </div>

                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2">
                    CPM Mixroll<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register('cpm_mixroll', {
                      required: 'Поле обезательно к заполнению',
                    })}
                    placeholder={'Введите cpm mixroll'}
                    className={`border ${
                      errors?.cpm_mixroll ? 'border-red-500' : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                  />
                </div>
              </div>
            )}
            {/**/}

            {/**/}
            {hasRole('admin') && (
              <div className="flex gap-4 mb-4">
                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2">
                    Target preroll<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register('cpm_preroll_uz', {
                      required: 'Поле обезательно к заполнению',
                    })}
                    placeholder={'Введите cpm preroll'}
                    className={`border ${
                      errors?.cpm_preroll_uz
                        ? 'border-red-500'
                        : 'border-gray-300'
                    }   transition-all duration-300 text-sm `}
                  />
                </div>

                <div className="grid w-full">
                  <Label className="text-sm	text-white pb-2">
                    Target Mixroll<span className="text-red-500 ml-0.5">*</span>
                  </Label>
                  <Input
                    type="text"
                    autoComplete="off"
                    {...register('cpm_mixroll_uz', {
                      required: 'Поле обязательно к заполнению',
                    })}
                    placeholder="Введите target mixroll"
                    className={`border ${
                      errors?.cpm_mixroll_uz
                        ? 'border-red-500'
                        : 'border-gray-300'
                    } transition-all duration-300 text-sm`}
                  />
                </div>
              </div>
            )}
            {/**/}

            {/**/}
            <div className="grid">
              <Label className="text-sm	text-white pb-2">
                Выбрать рекламное агенство
                <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Controller
                name="selectedAdvertiserId"
                {...register('agency', {
                  required: 'Поле обязательно',
                })}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger className="!text-white">
                      <SelectValue placeholder="Выбрать рекламное агенство" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Выбрать рекламное агенство</SelectLabel>
                        {advertiserModal.map((adv) => (
                          <SelectItem key={adv.id} value={adv.id.toString()}>
                            {adv.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            {/**/}
            <Button
              className={`${
                isValid
                  ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                  : 'bg-[#616161]'
              } w-full   h-[44px] text-white rounded-lg	mt-8`}
              disabled={!isValid || isLogin}
            >
              {isLogin && <Loader2 className="ml-2 h-6 w-6 animate-spin" />}
              Создать
            </Button>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
