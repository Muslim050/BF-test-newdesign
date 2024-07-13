// import {ReactComponent as Confirm} from '../../../assets/Sidebar/confirmedorder.svg'
// import {ReactComponent as Order} from '../../../assets/Sidebar/order.svg'
// import {ReactComponent as Inventory} from '../../../assets/Sidebar/inventory.svg'
// import {ReactComponent as Pablisher} from '../../../assets/Sidebar/pablisher.svg'
// import {ReactComponent as AdvertiserAndAgency} from '../../../assets/Sidebar/advertiser.svg'
// import {ReactComponent as Index} from '../../../assets/Sidebar/channel.svg'
// import {ReactComponent as AdvertiserAgency} from '../../../assets/Sidebar/advertiseragency.svg'
// import {ReactComponent as Video} from '../../../assets/Sidebar/video.svg'
// import {ReactComponent as Wallet} from '../../../assets/Sidebar/Wallet.svg'
// import {ReactComponent as PublisherReport} from '../../../assets/Sidebar/publisherReport.svg'
// import {ReactComponent as AdvertiserReport} from '../../../assets/Sidebar/advreport.svg'

import {
  agencySvg,
  channelsSvg,
  inventorySvg,
  ordersSvg,
  overviewSvg,
  publishersSvg,
  reportsSvg,
  videoSvg,
} from 'src/assets/SidebarsIcons-ui.jsx'
// import {ordersSvg, overviewSvg} from "../../../assets/SidebarsIcons-ui.jsx";
import { Notebook } from 'lucide-react';

export const menuItems = [
  // {
  //   roles: ['admin'],
  //   label: 'Revenue',
  //   to: '/revenue',
  //   icon: overviewSvg,
  //   accordion: false,
  // },
  {
    roles: ['advertising_agency', 'advertiser', 'admin'],
    label: 'Заказы',
    to: '/order',
    icon: ordersSvg,
    accordion: false,
  },
  {
    roles: ['channel', 'publisher'],
    label: 'Заказы Паблишера',
    to: '/sents-order',
    icon: Notebook,
  },
  {
    roles: ['publisher', 'channel', 'admin'],
    label: 'Отчет-Паблишера',
    to: '/publisher-report',
    icon: reportsSvg,
    accordion: true,
  },
  {
    roles: ['advertiser', 'advertising_agency', 'admin'],
    label: 'Отчет-Рекламодателя',
    to: '/advertiser-report',
    icon: reportsSvg,
    accordion: true,
  },
  {
    roles: ['channel', 'publisher', 'admin'],
    label: 'Инвентарь',
    to: '/inventory',
    icon: inventorySvg,
    accordion: false,
  },
  {
    roles: ['channel', 'publisher', 'admin'],
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
