const PageTitle = ({ topTitle, title }) => {
  return (
    <div className="text-center">
      <p className="text-white text-base font-normal">{topTitle}</p>
      <h2 className="text-white text-[35px] md:text-[40px] lg:text-[60px] pt-3  pb-10">
        {title}
      </h2>
    </div>
  )
}

export default PageTitle
