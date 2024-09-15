import React, { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import 'react-datepicker/dist/react-datepicker.css'
import { Loader2 } from 'lucide-react'
import {
  editAdvertiser,
  fetchAdvertiser,
} from '@/redux/advertiser/advertiserSlice.js'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Button } from '@/components/ui/button.jsx'
import { toast } from 'react-hot-toast'

export default function EditAdvModal({ onClose, currentAdvertiser, fetchCpm }) {
  const dispatch = useDispatch()
  const [isEditingCreated, setEditingCreated] = React.useState(false)

  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      name: currentAdvertiser.name,
      email: currentAdvertiser.email,
      phone_number: currentAdvertiser.phone_number,
      cpm_mixroll: currentAdvertiser.cpm_mixroll,
      cpm_preroll: currentAdvertiser.cpm_preroll,
      cpm_preroll_uz: currentAdvertiser.cpm_preroll_uz,
      cpm_mixroll_uz: currentAdvertiser.cpm_mixroll_uz,
    },
    mode: 'onBlur',
  })
  useEffect(() => {
    if (currentAdvertiser) {
      fetchCpm(currentAdvertiser.id)
    }
  }, [currentAdvertiser, fetchCpm])

  const onSubmit = async (data) => {
    try {
      const adv = await dispatch(editAdvertiser({ data })).unwrap()
      toast.success('Изминения успешно обновлены!')
      onClose()
      setTimeout(() => {
        dispatch(fetchAdvertiser())
      }, 1000)
    } catch (error) {
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
            Редактировать CPM
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="pb-4 flex gap-4">
              {/**/}
              <div className="grid w-full ">
                <Label className="text-sm	text-white pb-1">
                  Preroll
                  <span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_preroll"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_preroll
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }  transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите preroll'}
                    />
                  )}
                />
              </div>
              {/**/}
              {/**/}
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1">
                  Mixroll<span className="text-red-500 ml-0.5">*</span>
                </Label>

                <Controller
                  name="cpm_mixroll"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_mixroll
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }  transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите mixroll'}
                    />
                  )}
                />
              </div>
            </div>

            <div className=" flex gap-4">
              {/**/}
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1">
                  Target Preroll<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_preroll_uz"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_preroll_uz
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }  transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите target preroll'}
                    />
                  )}
                />
              </div>
              {/**/}

              {/**/}
              <div className="grid w-full">
                <Label className="text-sm	text-white pb-1">
                  Target Mixroll<span className="text-red-500 ml-0.5">*</span>
                </Label>
                <Controller
                  name="cpm_mixroll_uz"
                  control={control}
                  rules={{ required: 'Поле обязательно к заполнению' }}
                  defaultValue=""
                  render={({
                    field: { onChange, onBlur, value, name, ref },
                  }) => (
                    <Input
                      type="text"
                      value={value?.toLocaleString('en-US')}
                      onChange={(e) => {
                        const rawValue = e.target.value.replace(/\D/g, '')
                        const newValue = rawValue ? parseInt(rawValue, 10) : ''
                        onChange(newValue)
                      }}
                      onBlur={onBlur}
                      name={name}
                      ref={ref}
                      autoComplete="off"
                      step="1000"
                      className={`border ${
                        errors?.cpm_mixroll_uz
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }   transition-all duration-300 text-sm text-[#CECECE]`}
                      placeholder={'Введите target mixroll'}
                    />
                  )}
                />
              </div>
              {/**/}
            </div>

            <div>
              <Button
                className={`${
                  isValid
                    ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                    : 'bg-[#616161]'
                } w-full   h-[44px] text-white rounded-lg	mt-8`}
                disabled={!isValid || isEditingCreated}
              >
                Сохранить
                {isEditingCreated && (
                  <Loader2 className="ml-2 h-6 w-6 animate-spin" />
                )}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </>
  )
}
