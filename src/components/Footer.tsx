import { NavLink } from 'react-router-dom'
import youtube from '../images/1.youtube.svg'
import vk from '../images/2.vk.svg'
import facebook from '../images/3.facebook.svg'
import twitter from '../images/4.twitter.svg'
import tiktok from '../images/5.tiktok.svg'
import instagram from '../images/6.instagram.svg'
import telegram from '../images/7.telegram.svg'
import whatsapp from '../images/8.whatsapp.svg'

const INFO_LINKS = [
  { to: '/o-nas', label: 'О нас' },
  { to: '/otzyvy', label: 'Отзывы' },
  { to: '/partneram', label: 'Партнерам' },
]

const PRODUCT_LINKS = [
  { to: '/visa/shengen', label: 'Страховка для Шенгена' },
  { to: '/strahovanie-v-rossii', label: 'Страховка для России' },
  { to: '/straxovka', label: 'Страховка в страны' },
  { to: '/gornolyzhnaya-strahovka', label: 'Горнолыжная страховка' },
  { to: '/godovaya-strahovka', label: 'Годовая страховка' },
]

const DOCUMENT_LINKS = [
  { to: '/polzovatelskoe-soglashenie', label: 'Пользовательское соглашение' },
  { to: '/politika-obrabotki-dannyh', label: 'Политика обработки данных' },
  {
    to: '/politika-informacionnoy-bezopasnosti',
    label: 'Политика информационной безопасности',
  },
]

const SOCIALS = [
  { icon: youtube, label: 'YouTube' },
  { icon: vk, label: 'VK' },
  { icon: facebook, label: 'Facebook' },
  { icon: twitter, label: 'Twitter' },
  { icon: tiktok, label: 'TikTok' },
  { icon: instagram, label: 'Instagram' },
  { icon: telegram, label: 'Telegram' },
  { icon: whatsapp, label: 'WhatsApp' },
]

interface LinkColumnProps {
  title: string
  links: { to: string; label: string }[]
}

function LinkColumn({ title, links }: LinkColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold text-neutral-900">{title}</h3>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className="text-sm text-neutral-500 hover:text-purple-brand"
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 px-6 sm:grid-cols-4">
        <LinkColumn title="Информационный центр" links={INFO_LINKS} />
        <LinkColumn title="Продукты" links={PRODUCT_LINKS} />
        <LinkColumn title="Документы" links={DOCUMENT_LINKS} />

        <div>
          <h3 className="mb-4 text-sm font-bold text-neutral-900">
            Связаться с нами
          </h3>
          <div className="grid grid-cols-4 gap-3 sm:w-40">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="flex h-8 w-8 items-center justify-center"
              >
                <img src={social.icon} alt={social.label} className="h-8 w-8" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
