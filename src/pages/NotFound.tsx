import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="text-center">
      <h1 className="mb-4 text-3xl font-semibold text-neutral-900">
        404 — Sahifa topilmadi
      </h1>
      <Link to="/" className="text-purple-600 hover:underline">
        Bosh sahifaga qaytish
      </Link>
    </section>
  )
}

export default NotFound
