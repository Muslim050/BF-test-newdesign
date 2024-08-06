import React from 'react'
import { TooltipContent } from 'src/components/ui/tooltip'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from 'lucide-react'
import { hasRole } from '../../../utils/roleUtils'

const NavItem = ({ item, open, setOpen }) => {
  const location = useLocation()
  const pathname = location.pathname
  const isActive = pathname === item.to

  const baseStyles =
    'flex items-center text-[#838383] text-base font-medium rounded-xl p-3.5 text-white '
  const activeStyles = 'bg-[#FFFFFF0D] border-[1px]'
  const inactiveStyles = 'hover:bg-[#FFFFFF0D] bg-transparent'

  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false)

  const toggleSubMenu = () => {
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  const hasSubMenuAccess = item.subMenu?.some((subItem) =>
    hasRole(subItem.roles),
  )

  return (
    <div>
      <Link
        to={item.to}
        className={`justify-between  ${baseStyles} ${
          isActive ? activeStyles : inactiveStyles
        }`}
        onClick={item.accordion ? toggleSubMenu : null}
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
        {item.accordion && (isSubMenuOpen ? <ChevronUp /> : <ChevronDown />)}

        {!open && (
          <TooltipContent side={'right'} className="ml-2" sideOffset={0}>
            <p>{item.label}</p>
          </TooltipContent>
        )}
      </Link>
      {/* {hasAccess && ( */}
      {/* <>
        {open && hasSubMenuAccess ? (
          <>
            {item.accordion && isSubMenuOpen && (
              <div className="ml-8 mt-2">
                {item.subMenu &&
                  item.subMenu.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.to}
                      className={`justify-between ${baseStyles} ${
                        isActive ? activeStyles : inactiveStyles
                      }`}
                    >
                      {open ? (
                        <span
                          className={` transition-opacity duration-500 ease-in-out ${
                            open
                              ? 'opacity-100 visible'
                              : 'opacity-0 invisible '
                          }`}
                          style={{ transitionDelay: open ? '0.3s' : '0s' }}
                        >
                          {subItem.label}
                        </span>
                      ) : null}
                    </Link>
                  ))}
              </div>
            )}
          </>
        ) : null}
      </> */}
      {item.accordion && isSubMenuOpen && hasSubMenuAccess && (
        <div className="ml-8 mt-2">
          {item.subMenu &&
            item.subMenu.map((subItem, index) => {
              const subItemHasAccess = hasRole(subItem.roles)
              return subItemHasAccess ? (
                <Link
                  key={index}
                  to={subItem.to}
                  className={`justify-between ${baseStyles} ${
                    isActive ? activeStyles : inactiveStyles
                  }`}
                >
                  {open ? (
                    <span
                      className={`transition-opacity duration-500 ease-in-out ${
                        open ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      style={{ transitionDelay: open ? '0.3s' : '0s' }}
                    >
                      {subItem.label}
                    </span>
                  ) : null}
                </Link>
              ) : null
            })}
        </div>
      )}
      {/* )} */}
    </div>
  )
}

export default NavItem
