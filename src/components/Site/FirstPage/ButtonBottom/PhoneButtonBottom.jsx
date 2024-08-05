import { ArrowLeft } from 'lucide-react'

const PhoneButtonBottom = ({
  phoneWRef,
  isSecondPage,
  windowWidth,
  swiperRef,
}) => {
  return (
    <div
      ref={phoneWRef}
      className={`
                ${
                  isSecondPage && windowWidth < 1100 ? 'hidden' : ''
                } absolute z-40 flex gap-1 bottom-[-88%] w-[190px] left-[26%]`}
    >
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className={`h-[38px] w-[55px]  rounded-full `}
        style={{
          background: 'rgba(2, 3, 8, 0.5)',
          boxShadow:
            'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(6px)',
          borderRadius: '500px',
        }}
      >
        <div className="flex justify-center">
          <ArrowLeft />
        </div>
      </button>
      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="h-[38px] w-[115px] rounded-full"
        style={{
          background: 'rgba(2, 3, 8, 0.5)',
          boxShadow:
            'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
          backdropFilter: 'blur(6px)',
          borderRadius: '500px',
        }}
      >
        <div className="flex justify-center text-white text-xs">Next</div>
      </button>
    </div>
  )
}

export default PhoneButtonBottom
