export default function getTitle(title) {
  if (title === 'inventory') {
    return 'Инвентарь'
  } else if (title === 'order') {
    return 'Заказы'
  } else if (title === 'confirmed-order') {
    return 'Потвержденные  заказы'
  } else if (title === 'complited-order') {
    return 'Завершенные заказы'
  } else if (title === 'publisher') {
    return 'Паблишер'
  } else if (title === 'publisher-users') {
    return 'Пользователи паблишера'
  } else if (title === 'video') {
    return 'Видео'
  } else if (title === 'advertiser') {
    return 'Рекламодатели'
  } else if (title === 'advertiser-users') {
    return 'Пользователи рекламодателей'
  } else if (title === 'advertiser-agency') {
    return 'Рекламное агентство'
  } else if (title === 'advertiser-agency-users') {
    return 'Пользователи рекламного агентства'
  } else if (title === 'channel') {
    return 'Канал'
  } else if (title.startsWith('chart-order-table')) {
    return `Статистика заказа`
  }
  // } else if (title === 'channel-users') {
  //   return 'Пользователи канала'.replace('-', ' ')
  // } else if (title.startsWith('chart-order-table')) {
  //   return `Статистика Заказа`
  // } else if (title.startsWith(`statistics-channel`)) {
  //   return `Статистика канала`
  // } else if (title.startsWith(`revenue`)) {
  //   return `Revenue`
  // }
  else if (title.startsWith(`publisher-report`)) {
    return `Отчет / Паблишера`
  } else if (title.startsWith(`sents-order`)) {
    return `Заказы - Паблишера / Канала`
  } else if (title.startsWith(`advertiser-report`)) {
    return `Отчет / Рекламодателя`
  }

  return ''
}
