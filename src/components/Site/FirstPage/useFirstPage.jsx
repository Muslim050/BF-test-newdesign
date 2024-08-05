import { useEffect, useState } from 'react'

export const useFirstPage = () => {
  //Изминения ширины экарана
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  //Изминения ширины экарана

  return {
    windowWidth,
  }
}
