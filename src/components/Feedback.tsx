import { Star } from 'lucide-react'
import feedbackPhoto1 from '../images/feedback-photo.png'
import feedbackPhoto2 from '../images/feedback-photo-2.svg'
import feedbackPhoto3 from '../images/feedback-photo-3.svg'
import feedbackPhoto4 from '../images/feedback-photo-4.svg'

const REVIEWS = [
  {
    date: '05/02/2023',
    text: 'Много лет пользуюсь предпочитаю другим компании! Оперативный чат, посмотрим как будет дальше! Пока все отлично)',
    name: 'Василий Петров',
    photo: feedbackPhoto1,
  },
  {
    date: '12/03/2023',
    text: 'Оформила страховку за 5 минут прямо перед вылетом. Все понятно, никаких скрытых условий. Буду обращаться еще!',
    name: 'Анна Смирнова',
    photo: feedbackPhoto2,
  },
  {
    date: '28/04/2023',
    text: 'Пользовался страховкой в Турции, пришлось обращаться в клинику. Все расходы покрыли быстро, без лишних вопросов.',
    name: 'Игорь Кузнецов',
    photo: feedbackPhoto3,
  },
  {
    date: '09/06/2023',
    text: 'Удобное приложение, доктор онлайн реально помог, когда ребенок заболел в поездке. Спасибо за сервис!',
    name: 'Мария Иванова',
    photo: feedbackPhoto4,
  },
]

function Feedback() {
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-12 text-center text-2xl font-bold text-neutral-900 md:text-[28px]">
          Отзывы
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="flex flex-col justify-between rounded-2xl bg-purple-50 p-5"
            >
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, starIdx) => (
                      <Star
                        key={starIdx}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-neutral-400">{review.date}</span>
                </div>
                <p className="text-sm leading-relaxed text-neutral-700">
                  {review.text}
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-neutral-900">
                  {review.name}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-brand" />
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
          <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" />
        </div>
      </div>
    </section>
  )
}

export default Feedback
