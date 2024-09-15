import { useDispatch } from 'react-redux'
import {addPublisher, fetchPublisher} from '../../../../redux/publisher/publisherSlice.js'
import {Controller, useForm} from 'react-hook-form'
import { toast } from 'react-hot-toast'
import {Button} from "@/components/ui/button.jsx";
import {DialogHeader, DialogTitle, DialogContent} from "@/components/ui/dialog.jsx";
import {Label} from "@/components/ui/label.jsx";
import {Input} from "@/components/ui/input.jsx";
import MaskedInput from 'react-text-mask'

export default function PublisherModal({onClose}) {
  const dispatch = useDispatch()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    control
  } = useForm({
    defaultValues: {
      name: '',
      startdate: '',
      enddate: '',
      expectedView: '',
      budget: '',
      format: '',
      selectedFile: null,
    },
    mode: 'onBlur',
  })
  const onSubmit = async (data) => {
    try {
      const publisher = await dispatch(addPublisher({ data })).unwrap()
      toast.success('Паблишер успешно создан!')
      onClose()
      setTimeout(() => {
        dispatch(fetchPublisher())
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
            Cоздать паблишера
          </DialogTitle>
        </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div >
          <div className="flex gap-4 mb-4">
            <div className='grid w-full'>
              <Label className="text-sm	text-white pb-2">Имя<span
                className='text-red-500 ml-0.5'>*</span></Label>
              <Input
                type="text"
                autoComplete="off"
                {...register ('name', {
                  required: 'Поле обезательно к заполнению',
                })}
                placeholder={'Введите имя'}
                className={`border ${errors?.name ? 'border-red-500' : 'border-gray-300'}   transition-all duration-300 text-sm `}
              />
            </div>
            <div className='grid w-full'>
              <Label className="text-sm	text-white pb-2">Номер телефона<span
                className='text-red-500 ml-0.5'>*</span></Label>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'Поле обезательно к заполнению',
                  pattern: {
                    value: /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/,
                    message: 'Неверный формат номера телефона'
                  }
                }}
                render={({field: {onChange, onBlur, value, ref}}) => (
                  <MaskedInput
                    mask={['+', '9', '9', '8', ' ', '(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    render={(inputRef, props) => (
                      <Input
                        {...props}
                        ref={(e) => {
                          ref (e);
                          inputRef (e);
                        }}
                        placeholder="+998 (__) ___ - __ - __"
                        className={`border ${errors?.phone ? 'border-red-500' : 'border-gray-300'} transition-all duration-300 text-sm `}
                      />
                    )}
                  />
                )}
              />
            </div>
          </div>

          {/**/}
          <div className='grid w-full '>
            <Label className="text-sm	text-white pb-2 flex gap-0.5">Email<span className='text-red-500 ml-0.5'>*</span>
              <div className="text-sm	text-red-500 "> {errors?.email && <p>{errors.email.message}</p>}
              </div>
            </Label>
            <Input
              type="email"
              autoComplete="off"
              {...register ('email', {
                required: '.',

              })}
              placeholder={'Введите email'}
              className={`border ${errors?.email ? 'border-red-500' : 'border-gray-300'}   transition-all duration-300 text-sm `}
            />
          </div>
          {/**/}

          <Button
            isValid={true}
            className={`${
              isValid
                ? 'bg-[#2A85FF66] hover:bg-[#0265EA] border-2 border-[#0265EA] hover:border-[#0265EA]'
                : 'bg-[#616161]'
            } w-full   h-[44px] text-white rounded-lg	mt-8`}
            disabled={!isValid}
          >
            Создать

          </Button>
        </div>
      </form>
      </DialogContent>

    </>
  )
}
