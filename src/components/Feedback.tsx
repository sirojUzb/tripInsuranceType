import { Star } from 'lucide-react'
import feedbackPhoto from '../images/feedback-photo.png'

const REVIEWS = [
  {
    date: '05/02/2023',
    text: 'Много лет пользуюсь предпочитаю другим компании! Оперативный чат, посмотрим как будет дальше! Пока все отлично)',
    name: 'Василий Петров',
  },
  {
    date: '05/02/2023',
    text: 'Много лет пользуюсь предпочитаю другим компании! Оперативный чат, посмотрим как будет дальше! Пока все отлично)',
    name: 'Василий Петров',
  },
  {
    date: '05/02/2023',
    text: 'Много лет пользуюсь предпочитаю другим компании! Оперативный чат, посмотрим как будет дальше! Пока все отлично)',
    name: 'Василий Петров',
  },
  {
    date: '05/02/2023',
    text: 'Много лет пользуюсь предпочитаю другим компании! Оперативный чат, посмотрим как будет дальше! Пока все отлично)',
    name: 'Василий Петров',
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
                  src={feedbackPhoto}
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
