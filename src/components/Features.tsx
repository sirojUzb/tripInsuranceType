import doc1 from '../images/doc-1.png'
import doc2 from '../images/doc-2.png'
import doc3 from '../images/doc-3.png'
import doc4 from '../images/doc-4.png'

const FEATURES = [
  {
    image: doc1,
    title: 'Покрываем коронавирус',
    text: 'Все наши полисы покрывают лечение и диагностику в случае заражения COVID-19, ведь не все страны готовы лечить коронавирус за свой счет. Максимальное покрытие по медицинским расходам составит 100 000 USD/EUR. Также полисом предусмотрена компенсация по риску отмена поездки, если застрахованный заболеет COVID-19.',
  },
  {
    image: doc2,
    title: 'Помощь при обострении хронических заболеваний',
    text: 'Сейчас даже у людей моложе 30 лет есть хронические заболевания, которые время от времени дают о себе знать. Не говоря уже о пожилых людях — для них помощь при обострении хронических заболеваний особенно важна. Поэтому мы предлагаем одно из самых больших покрытий на рынке по купированию обострений хронических заболеваний — до 3 000 $.',
  },
  {
    image: doc3,
    title: 'Доктор онлайн 24/7',
    text: 'Чтобы не тратить время на дорогу до клиники и ожидание врача, наши клиенты могут бесплатно получить онлайн-консультацию терапевта или педиатра в приложении на смартфоне. Эта опция включена во все страховки независимо от тарифа. Врач отвечает сразу же 24/7 в видео- или онлайн-чате. Нужно лишь установить наше приложение.',
  },
  {
    image: doc4,
    title: 'Только проверенные клиники',
    text: 'Мы контролируем качество работы медицинских учреждений с помощью Ваших рейтингов и отзывов на нашем сайте. Если мы получаем более 2-х негативных отзывов по клинике, то просто перестаем с ней работать. Таким образом, наших клиентов направляем только в проверенные клиники, где быстро оказывают квалифицированную медицинскую помощь.',
  },
]

function Features() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto flex max-w-5xl flex-col gap-20 px-6 md:gap-28">
        {FEATURES.map((item, i) => (
          <div
            key={item.title}
            className={`flex flex-col items-center gap-8 md:gap-14 ${
              i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            <div className="flex w-full justify-center md:w-1/2">
              <img
                src={item.image}
                alt={item.title}
                className="w-full max-w-sm"
                loading="lazy"
              />
            </div>

            <div className="w-full md:w-1/2">
              <h2 className="relative mb-5 inline-block pr-4 text-2xl font-bold text-neutral-900 md:text-[28px]">
                {item.title}
                <span className="absolute -right-2 top-1 h-6 w-2.5 border-t-2 border-r-2 border-purple-brand" />
              </h2>
              <p className="text-[15px] leading-relaxed text-neutral-500">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features
