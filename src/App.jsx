import { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  Calculator,
  Check,
  Clock,
  GraduationCap,
  MapPin,
  MessageCircle,
  PhoneCall,
  Printer,
  ScanLine,
  Send,
  Shapes,
  Wrench,
} from 'lucide-react';

const services = [
  {
    id: 'print',
    title: '3D-печать',
    short: 'Единичные изделия, мелкие серии и крупные детали.',
    price: 1200,
    icon: Printer,
    portfolio: ['Корпус прибора', 'Макет детали', 'Фигура 32 см'],
  },
  {
    id: 'modeling',
    title: 'Моделирование',
    short: 'Художественные и промышленные модели по описанию, образцу или чертежу.',
    price: 2500,
    icon: Shapes,
    portfolio: ['3D-модель персонажа', 'Кронштейн', 'Прототип ручки'],
  },
  {
    id: 'scan',
    title: 'Сканирование',
    short: 'Цифровая копия объекта для печати, доработки или реверс-инжиниринга.',
    price: 1800,
    icon: ScanLine,
    portfolio: ['Скан бюста', 'Копия крепления', 'Архивная деталь'],
  },
  {
    id: 'repair',
    title: 'Ремонт',
    short: 'Диагностика, восстановление и настройка 3D-принтеров.',
    price: 1500,
    icon: Wrench,
    portfolio: ['Замена узла подачи', 'Калибровка стола', 'Настройка слайсера'],
  },
  {
    id: 'training',
    title: 'Обучение',
    short: 'Практика по печати, моделированию, материалам и обслуживанию оборудования.',
    price: 3000,
    icon: GraduationCap,
    portfolio: ['Индивидуальный урок', 'Запуск принтера', 'Печать первой модели'],
  },
];

const materials = [
  { id: 'pla', title: 'PLA', note: 'Макеты, декор, быстрые прототипы', coef: 1 },
  { id: 'petg', title: 'PETG', note: 'Функциональные детали и корпуса', coef: 1.25 },
  { id: 'abs', title: 'ABS', note: 'Прочные изделия с постобработкой', coef: 1.35 },
  { id: 'tpu', title: 'TPU', note: 'Гибкие элементы и амортизаторы', coef: 1.55 },
  { id: 'nylon', title: 'Nylon', note: 'Износостойкие технические детали', coef: 1.8 },
];

const colors = [
  { id: 'graphite', title: 'Графит', value: '#30343b' },
  { id: 'white', title: 'Белый', value: '#f8f8f3' },
  { id: 'red', title: 'Красный 161', value: '#d64a2f' },
  { id: 'silver', title: 'Серебро', value: '#9fa7a9' },
  { id: 'green', title: 'Техно-зелёный', value: '#587b6c' },
];

const works = [
  {
    title: 'Цельная фигура',
    category: '3D-печать',
    text: 'Высокая детализация, подготовка к покраске и аккуратная постобработка.',
  },
  {
    title: 'Технический корпус',
    category: 'Моделирование',
    text: 'Модель под посадочные места, крепления и дальнейшую мелкосерийную печать.',
  },
  {
    title: 'Восстановление детали',
    category: 'Сканирование',
    text: 'Сканирование образца, доработка геометрии и печать рабочей замены.',
  },
];

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export default function App() {
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].id);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [activeService, setActiveService] = useState(services[0].id);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    telegram: '',
    description: '',
  });
  const [isSent, setIsSent] = useState(false);

  const service = services.find((item) => item.id === selectedService) ?? services[0];
  const active = services.find((item) => item.id === activeService) ?? services[0];
  const material = materials.find((item) => item.id === selectedMaterial) ?? materials[0];
  const color = colors.find((item) => item.id === selectedColor) ?? colors[0];

  const estimatedPrice = useMemo(() => {
    const colorCoef = color.id === 'red' || color.id === 'silver' ? 1.08 : 1;
    return Math.round(service.price * material.coef * colorCoef);
  }, [color.id, material.coef, service.price]);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setIsSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSent(true);
  }

  function pickService(id) {
    setSelectedService(id);
    setActiveService(id);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="161 градусов">
          <span className="brand-mark">161°</span>
        </a>
        <nav className="nav" aria-label="Основная навигация">
          <a href="#services">Услуги</a>
          <a href="#calculator">Расчёт</a>
          <a href="#materials">Материалы</a>
          <a href="#portfolio">Портфолио</a>
          <a href="#contacts">Контакты</a>
        </nav>
        <div className="header-actions">
          <a className="urgent-link" href="tel:+70000000000">
            <PhoneCall size={18} />
            Срочная связь
          </a>
          <a className="telegram-link" href="https://t.me/" target="_blank" rel="noreferrer">
            <MessageCircle size={18} />
            Telegram
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-frame">
          <div className="hero-copy">
            <p className="section-kicker">Ростов-на-Дону</p>
            <h1>3D-печать 161° для деталей, фигур и прототипов</h1>
            <p className="hero-lead">
              Печатаем, моделируем, сканируем, ремонтируем 3D-принтеры и обучаем работе с оборудованием.
              Поможем быстро оценить задачу и передадим заявку конструктору.
            </p>
            <div className="quick-services" aria-label="Быстрый выбор услуги">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    className={selectedService === item.id ? 'quick-service is-active' : 'quick-service'}
                    key={item.id}
                    type="button"
                    onClick={() => pickService(item.id)}
                  >
                    <Icon size={18} />
                    {item.title}
                  </button>
                );
              })}
            </div>
            <div className="hero-actions">
              <a className="primary-button" href="#request">
                <Send size={18} />
                Оставить заявку
              </a>
              <a className="secondary-button" href="#calculator">
                <Calculator size={18} />
                Рассчитать стоимость
              </a>
            </div>
          </div>

          <div className="hero-visual" aria-label="3D-принтер 161">
            <img src="/assets/hero-printer.jpg" alt="3D-принтер мастерской 161" />
            <div className="hero-visual-badge">
              <span>161°</span>
              <strong>прямые заявки вместо маркетплейсов</strong>
            </div>
          </div>
        </section>

        <section className="calculator-band" id="calculator">
          <div className="section-frame calculator-layout">
            <div className="calculator-copy">
              <p className="section-kicker">Предварительный расчёт</p>
              <h2>Оценка заказа за несколько кликов</h2>
              <p>
                Выберите услугу, материал и цвет. Итоговую стоимость мастерская уточняет после консультации
                с конструктором.
              </p>
            </div>

            <div className="calculator-panel">
              <div className="field-group">
                <span className="field-label">Услуга</span>
                <div className="segmented">
                  {services.map((item) => (
                    <button
                      className={selectedService === item.id ? 'segment is-active' : 'segment'}
                      key={item.id}
                      type="button"
                      onClick={() => pickService(item.id)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field-grid">
                <label className="select-field">
                  <span>Материал</span>
                  <select value={selectedMaterial} onChange={(event) => setSelectedMaterial(event.target.value)}>
                    {materials.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="select-field">
                  <span>Цвет</span>
                  <select value={selectedColor} onChange={(event) => setSelectedColor(event.target.value)}>
                    {colors.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.title}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="price-result">
                <div>
                  <span>Ориентир от</span>
                  <strong>{formatPrice(estimatedPrice)} ₽</strong>
                </div>
                <a href="#request" className="price-action">
                  <ArrowDownRight size={22} />
                </a>
              </div>
              <p className="fine-print">
                Стоимость является предварительной. Итоговая стоимость определяется после консультации с
                конструктором.
              </p>
            </div>
          </div>
        </section>

        <section className="services-section section-frame" id="services">
          <div className="section-heading">
            <p className="section-kicker">Каталог услуг</p>
            <h2>От идеи до готовой детали</h2>
          </div>

          <div className="services-board">
            <div className="services-list">
              {services.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    className={activeService === item.id ? 'service-row is-active' : 'service-row'}
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveService(item.id)}
                    onFocus={() => setActiveService(item.id)}
                    onClick={() => pickService(item.id)}
                  >
                    <span className="service-title">
                      <Icon size={24} />
                      {item.title}
                    </span>
                    <span className="service-short">{item.short}</span>
                    <span className="service-arrow">
                      <ArrowDownRight size={26} />
                    </span>
                  </button>
                );
              })}
            </div>

            <aside className="service-preview" aria-label="Примеры работ по выбранной услуге">
              <div className="preview-media">
                <img src="/assets/services-reference.jpg" alt="Стиль страницы услуг 161" />
              </div>
              <p className="preview-label">{active.title}</p>
              <ul>
                {active.portfolio.map((item) => (
                  <li key={item}>
                    <Check size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        <section className="materials-band" id="materials">
          <div className="section-frame materials-layout">
            <div className="section-heading">
              <p className="section-kicker">Материалы и цвета</p>
              <h2>Выбор под задачу, прочность и внешний вид</h2>
            </div>

            <div className="materials-grid">
              <div className="checklist-panel">
                <h3>Материалы</h3>
                {materials.map((item) => (
                  <label className="check-row" key={item.id}>
                    <input
                      checked={selectedMaterial === item.id}
                      name="material"
                      type="radio"
                      value={item.id}
                      onChange={() => setSelectedMaterial(item.id)}
                    />
                    <span className="custom-check" />
                    <span>
                      <strong>{item.title}</strong>
                      <small>{item.note}</small>
                    </span>
                  </label>
                ))}
              </div>

              <div className="checklist-panel">
                <h3>Цвета</h3>
                <div className="color-grid">
                  {colors.map((item) => (
                    <button
                      className={selectedColor === item.id ? 'color-swatch is-active' : 'color-swatch'}
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedColor(item.id)}
                    >
                      <span style={{ backgroundColor: item.value }} />
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="portfolio-section section-frame" id="portfolio">
          <div className="section-heading">
            <p className="section-kicker">Портфолио</p>
            <h2>Демо-примеры для первого показа</h2>
          </div>
          <div className="portfolio-grid">
            {works.map((work, index) => (
              <article className="work-card" key={work.title}>
                <div className={`work-visual work-visual-${index + 1}`} />
                <span>{work.category}</span>
                <h3>{work.title}</h3>
                <p>{work.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="request-band" id="request">
          <div className="section-frame request-layout">
            <div className="request-copy">
              <p className="section-kicker">Заявка</p>
              <h2>Передадим задачу конструктору</h2>
              <p>
                В первой версии форма работает как прототип сценария. После согласования подключим обработку
                заявок в административной части.
              </p>
              <div className="contact-strip" id="contacts">
                <span>
                  <MapPin size={18} />
                  Ростов-на-Дону
                </span>
                <span>
                  <Clock size={18} />
                  Пн-Сб, 10:00-19:00
                </span>
                <span>
                  <PhoneCall size={18} />
                  +7 000 000-00-00
                </span>
              </div>
            </div>

            <form className="request-form" onSubmit={handleSubmit}>
              <label>
                <span>Имя</span>
                <input name="name" value={form.name} onChange={handleFormChange} placeholder="Как к вам обращаться" />
              </label>
              <label>
                <span>Телефон</span>
                <input name="phone" value={form.phone} onChange={handleFormChange} placeholder="+7" />
              </label>
              <label>
                <span>Telegram</span>
                <input name="telegram" value={form.telegram} onChange={handleFormChange} placeholder="@username" />
              </label>
              <label>
                <span>Описание задачи</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Что нужно напечатать, смоделировать или настроить"
                />
              </label>

              <div className="request-summary">
                <span>{service.title}</span>
                <span>{material.title}</span>
                <span>{color.title}</span>
                <strong>{formatPrice(estimatedPrice)} ₽</strong>
              </div>

              <button className="primary-button form-submit" type="submit">
                <Send size={18} />
                Подготовить заявку
              </button>
              {isSent && <p className="success-message">Заявка подготовлена для передачи конструктору.</p>}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
