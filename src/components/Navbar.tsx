import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronDown, Mail } from 'lucide-react'
import tickIcon from '../images/tick-icon.svg'

const products = [
  { to: '/visa/shengen', label: 'Страхование для Шенгена' },
  { to: '/strahovanie-v-rossii', label: 'Страхование в России' },
  { to: '/gornolyzhnaya-strahovka', label: 'Горнолыжная страховка' },
  { to: '/godovaya-strahovka', label: 'Годовая страховка' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = 'text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-violet-600 shadow-sm' : 'bg-purple-600'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-2">
          <img src={tickIcon} alt="" className="h-5 w-5" />
          <span className={`text-lg ${textColor}`}>
            <span className="font-bold">trip</span> страхование
          </span>
        </NavLink>

        <ul className={`flex items-center gap-8 text-sm font-medium ${textColor}`}>
          <li className="group relative">
            <button type="button" className="flex items-center gap-1 py-6">
              Продукты
              <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </button>
            <ul className="invisible absolute left-0 top-full min-w-64 rounded-lg bg-violet-600 py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
              {products.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="block px-4 py-2 text-white/90 hover:bg-violet-700 hover:text-white"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <NavLink to="/otzyvy" className="hover:text-violet-500">
              Отзывы
            </NavLink>
          </li>
          <li>
            <NavLink to="/partneram" className="hover:text-violet-500">
              Партнерам
            </NavLink>
          </li>
        </ul>

        <NavLink
          to="/skidki"
          className="flex items-center gap-2 rounded-full border border-white/60 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          <Mail className="h-4 w-4" />
          Скидки
        </NavLink>
      </nav>
    </header>
  )
}

export default Navbar
