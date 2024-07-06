import React from 'react'
import { TooltipContent } from 'src/components/ui/tooltip'
import { Link, useLocation } from 'react-router-dom'

const NavItem = ({ item, open }) => {
  const location = useLocation()
  const pathname = location.pathname

  const isActive = pathname === item.to

  const baseStyles =
    'flex items-center text-[#838383] text-base font-medium rounded-xl p-3.5 text-white '
  const activeStyles = 'bg-[#FFFFFF0D] border-[1px]'
  const inactiveStyles = 'hover:bg-[#FFFFFF0D] bg-transparent'
  return (
    <Link
      to={item.to}
      className={`${baseStyles} ${isActive ? activeStyles : inactiveStyles}`}
    >
      <div className="flex items-center relative">
        {/*<item.icon className="text-white w-[26px] h-[26px]" />*/}
        <item.icon className="text-white w-[26px] h-[26px]" />

        {open ? (
          <span
            className={`ml-3.5 transition-opacity duration-500 ease-in-out ${
              open ? 'opacity-100 visible' : 'opacity-0 invisible '
            }`}
            style={{ transitionDelay: open ? '0.3s' : '0s' }}
          >
            {item.label}
          </span>
        ) : null}
      </div>
      {!open && (
        <TooltipContent side={'right'} className="ml-2" sideOffset={0}>
          <p>{item.label}</p>
        </TooltipContent>
      )}
    </Link>
  )
}

export default NavItem
