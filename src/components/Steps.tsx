import policy1 from '../images/policy1.svg'
import policy2 from '../images/policy2.svg'
import policy3 from '../images/policy3.svg'
import policy4 from '../images/policy4.svg'

const STEPS = [policy1, policy2, policy3, policy4]

function Steps() {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-12 text-center text-2xl font-bold text-neutral-900 md:text-[28px]">
          Как купить полис?
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={`Шаг ${i + 1}`}
              className="w-full rounded-xl"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Steps
