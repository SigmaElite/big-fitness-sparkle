const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-8">Политика конфиденциальности</h1>
        <p className="text-muted-foreground mb-6 text-sm">Дата вступления в силу: 15 января 2026 г.</p>

        <div className="space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">1. Общие положения</h2>
            <p>
              Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
              пользователей сайта Big Fitness (далее — «Сайт»), расположенного по адресу big-fitness-sparkle.lovable.app.
              Используя Сайт, вы соглашаетесь с условиями данной Политики.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">2. Какие данные мы собираем</h2>
            <p className="mb-3">Мы можем собирать следующие данные:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Имя и номер телефона (при заполнении контактной формы)</li>
              <li>Данные об использовании сайта (страницы, время визита, действия)</li>
              <li>Техническая информация (IP-адрес, тип браузера, устройство, операционная система)</li>
              <li>Файлы cookie и данные аналитики</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">3. Использование Google Tag Manager и аналитики</h2>
            <p className="mb-3">
              На нашем сайте используется Google Tag Manager (GTM) — сервис компании Google LLC, который позволяет
              управлять тегами (фрагментами кода) на сайте. GTM сам по себе не собирает персональные данные,
              однако может активировать другие теги, которые могут собирать данные.
            </p>
            <p className="mb-3">Через GTM могут использоваться следующие сервисы:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Google Analytics</strong> — для анализа посещаемости и поведения пользователей на сайте</li>
              <li><strong>Google Ads</strong> — для отслеживания конверсий и показа рекламы</li>
            </ul>
            <p className="mt-3">
              Эти сервисы могут использовать файлы cookie для сбора анонимных данных о вашем взаимодействии с сайтом.
              Подробнее: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Политика конфиденциальности Google</a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">4. Цели обработки данных</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Обработка заявок и обратная связь с пользователями</li>
              <li>Улучшение работы сайта и качества услуг</li>
              <li>Анализ посещаемости и эффективности рекламных кампаний</li>
              <li>Обеспечение безопасности сайта</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">5. Файлы cookie</h2>
            <p>
              Сайт использует файлы cookie для корректной работы и аналитики. Вы можете отключить cookie
              в настройках вашего браузера, однако это может повлиять на функциональность сайта.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">6. Передача данных третьим лицам</h2>
            <p>
              Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением случаев,
              предусмотренных законодательством Республики Беларусь, а также использования сервисов Google
              для аналитики (в анонимизированном виде).
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">7. Защита данных</h2>
            <p>
              Мы принимаем разумные технические и организационные меры для защиты ваших персональных данных
              от несанкционированного доступа, изменения, раскрытия или уничтожения.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">8. Ваши права</h2>
            <p>Вы имеете право:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Запросить информацию о хранящихся у нас данных</li>
              <li>Потребовать удаления ваших персональных данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
            <p className="mt-3">
              Для реализации ваших прав свяжитесь с нами по телефону{" "}
              <a href="tel:+375295060605" className="text-primary hover:underline">+375 29 506 06 05</a>.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">9. Контактная информация</h2>
            <p>
              Big Fitness<br />
              Адрес: Новая Боровая, ул. Камова, 7а<br />
              Телефон: <a href="tel:+375295060605" className="text-primary hover:underline">+375 29 506 06 05</a>
            </p>
          </section>

          <section>
            <h2 className="font-heading text-xl font-semibold mb-3 text-foreground">10. Изменения в политике</h2>
            <p>
              Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности.
              Актуальная версия всегда доступна на данной странице.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-6 border-t border-foreground/10">
          <a href="/" className="text-primary hover:underline text-sm">← Вернуться на главную</a>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
