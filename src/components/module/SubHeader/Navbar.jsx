import { CircleUser } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import getTitle from './RouteItems'
import Cookies from 'js-cookie'
import React from 'react'
import { ThemeContext } from '@/utils/ThemeContext.jsx'

const Navbar = () => {
  const route = useLocation().pathname.split('/').slice(1)
  const { textColor } = React.useContext(ThemeContext)

  const title = route[0]
  const id = route[1]
  const transformedTitle = getTitle(title, id)

  const username = Cookies.get('username')
  const user = Cookies.get('role')

  return (
    <div className="flex flex-col border_container">
      <header className="flex justify-between glass-background border_design rounded-[14px]  h-[60px] items-center gap-4  px-4 lg:px-6 relative">
        <div className="text-2xl 	font-medium	" style={{ color: textColor }}>
          {transformedTitle}
        </div>

        <div className="flex items-center gap-4">
          <div>
            <div className="text-white text-sm" style={{ color: textColor }}>
              Логин: &nbsp;
              {username}
            </div>

            <div className="text-white text-sm" style={{ color: textColor }}>
              Роль: &nbsp;
              {(user === 'admin' && 'Менеджер') ||
                (user === 'channel' && 'Канал') ||
                (user === 'advertiser' && 'Рекламодатель') ||
                (user === 'publisher' && 'Паблишер') ||
                (user === 'advertising_agency' && 'Рекламное агентство')}
            </div>
          </div>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="size-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </div>
      </header>
    </div>
  )
}

export default Navbar
