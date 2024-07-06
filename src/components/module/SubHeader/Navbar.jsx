import { CircleUser } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from 'src/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu'
import getTitle from './RouteItems'

const Navbar = () => {
  const route = useLocation().pathname.split('/').slice(1)
  // const { id } = useParams();

  const title = route[0]
  const id = route[1]
  const transformedTitle = getTitle(title, id)

  const username = localStorage.getItem('username')
  const user = localStorage.getItem('role')

  return (
    <div className="flex flex-col border_container">
      <header className="flex justify-between glass-background border_design rounded-[14px]  h-[70px] items-center gap-4  px-4 lg:px-6 relative">
        <div className="text-2xl 	font-medium	text-[#FFFFFF]">
          {transformedTitle}
        </div>

        <div className="flex items-center gap-4">
          <div>
            <div className="text-white" style={{ fontSize: '14px' }}>
              Логин: &nbsp;
              {user}
            </div>

            <div className="text-white" style={{ fontSize: '14px' }}>
              Роль: &nbsp;
              {(username === 'admin' && 'Менеджер') ||
                (username === 'channel' && 'Канал') ||
                (username === 'advertiser' && 'Рекламодатель') ||
                (username === 'publisher' && 'Паблишер') ||
                (username === 'advertising_agency' && 'Рекламное агентство')}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="size-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </div>
  )
}

export default Navbar
