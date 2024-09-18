import m from '../FirstPage.module.scss'

const FirstTitleContainer = ({
  paragraphRef,
  headerRef,
  button1Ref,
  button2Ref,
}) => {
  return (
    <div className="w-full justify-center">
      <div className="w-full justify-center items-center flex-col flex md:my-5 my-1">
        <h2
          ref={headerRef}
          style={{
            background:
              'linear-gradient(360deg, #FFFFFF 16.15%, rgba(255, 255, 255, 0.3) 140.1%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            letterSpacing: '-0.03em',

            textShadow: '0px 4px 20px rgba(255, 255, 255, 0.25)',
          }}
          className={`animated-element text-[35px] md:text-[40px] lg:text-[60px] pt-3  text-center `}
        >
          Онлайн Платформа Видеорекламы{' '}
        </h2>

        <p
          ref={paragraphRef}
          className={`text-slate-500 text-[12px] md:text-[15px] lg:text-[18px] py-3 text-center`}
        >
          Разработанная для улучшения результатов бренда через привлекательный
          видеоконтент.{' '}
        </p>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <a
          href="#Монетизировать"
          ref={button1Ref}
          style={{
            background:
              'linear-gradient(177.96deg, rgba(2, 3, 8, 0) -16.56%, rgba(255, 255, 255, 0.1) 108%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow:
              'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(6px)',
          }}
          className={`${m.hover_with_before} w-[230px] h-[50px] sm:px-[30px] px-[10px] py-[15px]  rounded-[500px]  justify-center items-center gap-2.5 inline-flex `}
        >
          <div className="text-white text-sm sm:text-base  font-normal font-['Helvetica Neue'] leading-relaxed">
            Заказать рекламу
          </div>
        </a>
        <a
          href="#Монетизировать"
          ref={button2Ref}
          style={{
            background:
              'linear-gradient(177.96deg, rgba(2, 3, 8, 0) -16.56%, rgba(255, 255, 255, 0.1) 108%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow:
              'inset 0px 0.6px 0px rgba(255, 255, 255, 0.1), inset 0px 1.2px 0px rgba(255, 255, 255, 0.1), inset -1.2px 0px 0px rgba(255, 255, 255, 0.04), inset 1.2px 0px 0px rgba(255, 255, 255, 0.04)',
            backdropFilter: 'blur(6px)',
          }}
          className={`${m.hover_with_before}  w-[230px] h-[50px] sm:px-[30px] px-[10px] py-[15px]  rounded-[500px]  justify-center items-center gap-2.5 inline-flex`}
        >
          <div className="text-white text-sm sm:text-base  font-normal font-['Helvetica Neue'] leading-relaxed">
            Монетизировать
          </div>
        </a>
      </div>
    </div>
  )
}
export default FirstTitleContainer
