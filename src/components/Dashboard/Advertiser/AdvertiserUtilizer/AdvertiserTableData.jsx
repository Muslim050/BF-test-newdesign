import { TableCell, TableRow } from '@/components/ui/table.jsx'
import style from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/AdvertiserTable.module.scss'
import FormatterPhone from '@/components/Labrery/formatter/FormatterPhone.jsx'
import { hasRole } from '@/utils/roleUtils.js'
import { Dialog } from '@/components/ui/dialog.jsx'
import { Button } from '@/components/ui/button.jsx'
import React, { useCallback } from 'react'
import EditAdvModal from '@/components/Dashboard/Advertiser/AdvertiserUtilizer/EditAdvModal.jsx'
import backendURL from '@/utils/url.js'
import axios from 'axios'
import { EditSvg } from '@/assets/icons-ui.jsx'
import FormatterView from '@/components/Labrery/formatter/FormatterView.jsx'
import { ThemeContext } from '@/utils/ThemeContext.jsx'
import Cookies from 'js-cookie'

const AdvertiserTableData = ({ advertisers }) => {
  const { textColor } = React.useContext(ThemeContext)

  const [currentAdv, setCurrentAdv] = React.useState(null)
  // Модальное окно OrderModal
  const [open, setOpen] = React.useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  // Модальное окно OrderModal

  const fetchCpm = useCallback(async (id) => {
    try {
      const token = Cookies.get('token')
      await axios.get(`${backendURL}/order/cpm/?advertiser=${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
      console.error('Error fetching CPM:', error)
    }
  }, [])

  return (
    <>
      {/*Редактирование*/}
      <Dialog open={open} onOpenChange={setOpen}>
        {open && (
          <EditAdvModal
            onClose={handleClose}
            currentAdvertiser={currentAdv}
            fetchCpm={fetchCpm}
          />
        )}
      </Dialog>
      {/*Редактирование*/}

      {advertisers.map((person, i) => {
        return (
          <TableRow key={person.id} className={style.table__tr}>
            <TableCell
              data-label="№"
              className={`font-normal text-${textColor} text-sm`}
            >
              {i + 1}
            </TableCell>
            <TableCell
              data-label="Наименование Компании"
              className={`font-normal text-${textColor} text-sm`}
            >
              {person.name}
            </TableCell>
            {hasRole('admin') && (
              <>
                <TableCell
                  data-label="CPM_Preroll"
                  className={`font-normal text-${textColor} text-sm`}
                >
                  <FormatterView data={person.cpm_preroll} />
                </TableCell>
                <TableCell
                  data-label="CPM_Mixroll"
                  className={`font-normal text-${textColor} text-sm`}
                >
                  <FormatterView data={person.cpm_mixroll} />
                </TableCell>
              </>
            )}

            {hasRole('admin') && (
              <>
                <TableCell
                  data-label="Target_Preroll"
                  className={`font-normal text-${textColor} text-sm`}
                >
                  {person.cpm_preroll_uz ? (
                    <FormatterView data={person.cpm_preroll_uz} />
                  ) : (
                    <>----</>
                  )}
                </TableCell>
                <TableCell
                  data-label="Target_Mixroll"
                  className={`font-normal text-${textColor} text-sm`}
                >
                  {person.cpm_mixroll_uz ? (
                    <FormatterView data={person.cpm_mixroll_uz} />
                  ) : (
                    <>----</>
                  )}
                </TableCell>
              </>
            )}
            <TableCell
              data-label="Email"
              className={`font-normal text-${textColor} text-sm`}
            >
              {person.email}
            </TableCell>
            <TableCell
              data-label="Номер телефона"
              className={`font-normal text-${textColor} text-sm`}
            >
              <FormatterPhone phoneNumber={person.phone_number} />
            </TableCell>
            <TableCell
              data-label="Рекламное агенство"
              className={`font-normal text-${textColor} text-sm`}
            >
              {person.advertising_agency && person.advertising_agency.name ? (
                person.advertising_agency.name
              ) : (
                <>------</>
              )}
            </TableCell>
            {hasRole('admin') ? (
              <TableCell
                data-label=""
                className={`font-normal text-${textColor} text-sm`}
              >
                <Button
                  variant="link"
                  onClick={() => {
                    setCurrentAdv(person)
                    setOpen(!open)
                  }}
                  className={`hover:scale-125 transition-all p-0 text-${textColor}`}
                  // className={`text-${textColor} hover:text-brandPrimary-50 p-1`}
                >
                  <EditSvg className="w-[24px] h-[24px]  hover:text-orange-500" />
                </Button>
              </TableCell>
            ) : null}
          </TableRow>
        )
      })}
    </>
  )
}

export default AdvertiserTableData
