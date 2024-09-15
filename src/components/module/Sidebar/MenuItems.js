import {
  agencySvg,
  channelsSvg,
  inventorySvg,
  ordersSvg,
  publishersSvg,
  reportsSvg,
  videoSvg,
} from 'src/assets/SidebarsIcons-ui.jsx'
// import {ordersSvg, overviewSvg} from "../../../assets/SidebarsIcons-ui.jsx";
import { Notebook } from 'lucide-react'

export const menuItems = [
  {
    roles: ['advertising_agency', 'advertiser', 'admin'],
    label: 'Заказы',
    to: '/order',
    icon: ordersSvg,
    accordion: false,
  },
  {
    roles: ['channel', 'publisher'],
    label: 'Заказы',
    to: '/sents-order',
    icon: Notebook,
  },
  {
    roles: [
      'publisher',
      'channel',
      'admin',
      'advertiser',
      'advertising_agency',
    ],
    label: 'Отчет',
    icon: reportsSvg,
    accordion: true,
    subMenu: [
      {
        label: 'Паблишеров',
        to: '/publisher-report',
        roles: ['publisher', 'channel', 'admin'],
      },
      {
        label: 'Рекламодателей',
        to: '/advertiser-report',
        roles: ['advertiser', 'advertising_agency', 'admin'],
      },
    ],
  },

  {
    roles: ['admin'],
    label: 'Инвентарь',
    to: '/inventory',
    icon: inventorySvg,
    accordion: false,
  },
  {
    roles: ['admin'],
    label: 'Видео',
    to: '/video',
    icon: videoSvg,
    accordion: false,
  },
  {
    roles: ['channel', 'publisher', 'admin'],
    label: 'Каналы',
    to: '/channel',
    icon: channelsSvg,
    accordion: false,
  },
  {
    roles: ['publisher', 'admin'],
    label: 'Паблишеры',
    to: '/publisher',
    icon: publishersSvg,
    accordion: false,
  },
  {
    roles: ['admin', 'advertising_agency'],
    label: 'Рекламодатели',
    to: '/advertiser',
    icon: publishersSvg,
    accordion: false,
  },
  {
    roles: ['admin'],
    label: 'Агентства',
    to: '/advertiser-agency',
    icon: agencySvg,
    accordion: false,
  },
]
