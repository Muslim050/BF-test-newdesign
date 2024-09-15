import FormatterView from 'src/components/Labrery/formatter/FormatterView.jsx'
import AdvertStatus from 'src/components/Labrery/AdvertStatus/AdvertStatus.jsx'
import FormatterBudjet from 'src/components/Labrery/formatter/FormatterBudjet.jsx'
import React from 'react'

const InfoCartButton = ({ getOrder, orderData, totalBudget, totalViews }) => {
  return (
    <div className="flex  justify-center h-[80px]">
      <div className="bg-[#090e35e0] rounded-[18px] mt-4 w-max flex p-[5px] pl-4">
        <div className="flex gap-2">
          <div
            className="text-white flex gap-2 items-center"
            style={{ marginRight: '5px' }}
          >
            <div className="w-4 h-9 bg-[#D1C5FF] rounded"></div>
            Итоги
          </div>
          {/*Остаток*/}
          {orderData === 'finished' ? (
            ''
          ) : (
            <div className="bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-[12px]	flex flex-col justify-center text-center">
              <div className="text-xl">
                <FormatterView
                  data={
                    getOrder.expected_number_of_views - getOrder.online_views
                  }
                />
              </div>
              <div className="text-base	font-medium"> Остаток</div>
            </div>
          )}
          {/*Остаток*/}

          {/*Статус*/}
          {orderData === 'finished' ? (
            ''
          ) : (
            <div className="flex items-center ">
              <AdvertStatus
                status={orderData.status}
                endDate={orderData.actual_end_date}
                className="h-full"
              >
                {getOrder.status === 'in_progress' ? (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',

                      padding: '3px 5px',
                      borderRadius: '7px',
                      background: (() => {
                        const ratie = Math.floor(
                          (getOrder.online_views /
                            getOrder.expected_number_of_views) *
                            100,
                        )

                        if (ratie >= 100) {
                          return '#ec2020'
                        } else if (ratie >= 80) {
                          return 'rgba(85, 112, 241, 0.16)'
                        } else if (ratie >= 50) {
                          return 'rgba(50, 147, 111, 0.16)'
                        } else if (ratie >= 1) {
                          return 'rgb(86 112 241)'
                        }
                        return 'inherit'
                      })(),

                      color: (() => {
                        const ratio = Math.floor(
                          (getOrder.online_views /
                            getOrder.expected_number_of_views) *
                            100,
                        )
                        if (ratio >= 100) {
                          return '#f8f8f8'
                        } else if (ratio >= 80) {
                          return '#5570F1'
                        } else if (ratio >= 50) {
                          return '#519C66'
                        } else if (ratio >= 1) {
                          return 'rgb(228 232 253)'
                        }
                        return 'inherit'
                      })(),
                    }}
                  >
                    {getOrder.online_views > 0 &&
                      Math.floor(
                        (getOrder.online_views /
                          getOrder.expected_number_of_views) *
                          100,
                      ) +
                        ' ' +
                        '%'}
                  </div>
                ) : // <div
                //   style={{
                //     display: 'flex',
                //     justifyContent: 'space-around',
                //     marginTop: '5px',
                //     padding: '3px 5px',
                //     borderRadius: '7px',
                //     background: (() => {
                //       const ratie = Math.floor(
                //         (totalViews / getOrder.online_views) * 100,
                //       )

                //       if (ratie >= 100) {
                //         return '#ec2020'
                //       } else if (ratie >= 80) {
                //         return 'rgba(85, 112, 241, 0.16)'
                //       } else if (ratie >= 50) {
                //         return 'rgba(50, 147, 111, 0.16)'
                //       } else if (ratie >= 1) {
                //         return 'rgb(86 112 241)'
                //       }
                //       return 'inherit'
                //     })(),

                //     color: (() => {
                //       const ratio = Math.floor(
                //         (totalViews / getOrder.online_views) * 100,
                //       )
                //       if (ratio >= 100) {
                //         return '#f8f8f8'
                //       } else if (ratio >= 80) {
                //         return '#5570F1'
                //       } else if (ratio >= 50) {
                //         return '#519C66'
                //       } else if (ratio >= 1) {
                //         return 'rgb(228 232 253)'
                //       }
                //       return 'inherit'
                //     })(),
                //   }}
                // >
                //   {totalViews > 0 &&
                //     Math.floor((totalViews / getOrder.online_views) * 100) +
                //       ' ' +
                //       '%'}
                // </div>
                null}
              </AdvertStatus>
            </div>
          )}
          {/*Статус*/}

          {/*Итого показы*/}
          {orderData === 'finished' ? (
            ''
          ) : (
            <div className="bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-[12px]	flex flex-col justify-center text-center">
              <div className="text-xl">
                <FormatterView data={totalViews} />
              </div>
              <div className="text-base	font-medium">Показы</div>
            </div>
          )}
          {/*Итого показы*/}

          {/*Итого показы*/}
          {orderData === 'finished' ? (
            ''
          ) : (
            <div className="bg-white bg-opacity-30 backdrop-blur-md text-white p-2.5 rounded-[12px]	flex flex-col justify-center text-center">
              <div className="text-xl">
                <FormatterBudjet
                  budget={totalBudget}
                  // data={getOrder.expected_start_date}
                />
              </div>
              <div className="text-base	font-medium">Бюджет</div>
            </div>
          )}
          {/*Итого показы*/}
        </div>
      </div>
    </div>
  )
}

export default InfoCartButton
