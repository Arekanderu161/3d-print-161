import { useMemo, useState } from 'react';
import {
  ArrowDownRight,
  Check,
  MapPin,
  MessageCircle,
  PhoneCall,
  Send,
} from 'lucide-react';

const navigation = [
  { id: 'top', label: 'Главная' },
  { id: 'studio', label: 'О студии' },
  { id: 'services', label: 'Услуги' },
  { id: 'materials', label: 'Материалы' },
];

const services = [
  {
    id: 'print',
    title: '3D печать',
    short: 'Высококачественное создание деталей и объектов на заказ с использованием современных технологий 3D-печати.',
    lead: 'Берём в работу прототипы, мелкосерийные партии и крупногабаритные изделия для бизнеса, производства и частных заказов.',
    basePrice: 1200,
    calculatorMode: 'production',
    bullets: ['Прототипы и единичные изделия', 'Мелкосерийная печать', 'Крупногабаритные детали', 'Функциональные изделия'],
    preview: {
      label: 'Портфолио по наведению',
      title: 'Мелкая серия корпусов',
      text: 'Подготовка геометрии, подбор материала и стабильный повтор тиража без провалов по срокам.',
    },
    chips: ['FDM', 'SLA', 'Срочные заказы'],
  },
  {
    id: 'modeling',
    title: 'Моделирование',
    short: 'Разработка индивидуальных 3D-моделей по вашим чертежам, идеям или образцам для последующей печати и производства.',
    lead: 'Проектируем модели с нуля, дорабатываем существующие файлы и готовим технические, художественные и промышленные решения.',
    basePrice: 2500,
    calculatorMode: 'production',
    bullets: ['Проектирование с нуля', 'Реверс-инжиниринг', 'Редактирование STL и STEP', 'Технические и художественные модели'],
    preview: {
      label: 'Портфолио по наведению',
      title: 'Корпус с посадочными местами',
      text: 'Модель собрана под печать и дальнейшую сборку, с креплениями, пазами и допусками под фурнитуру.',
    },
    chips: ['CAD', 'STL', 'STEP'],
  },
  {
    id: 'scan',
    title: 'Сканирование',
    short: 'Точное 3D-сканирование объектов для создания цифровых моделей с последующей печатью, восстановлением или доработкой.',
    lead: 'Сканируем малые, средние и крупные объекты, в том числе с выездом на дом или на производство по Ростову-на-Дону.',
    basePrice: 1800,
    calculatorMode: 'production',
    bullets: ['Малые и средние объекты', 'Крупные объекты', 'Цветное 3D-сканирование', 'Выездной сканер'],
    preview: {
      label: 'Портфолио по наведению',
      title: 'Восстановление редкой детали',
      text: 'Скан образца, чистка сетки и подготовка модели для печати рабочей замены без долгого поиска по рынку.',
    },
    chips: ['С выездом', 'Реставрация', 'Оцифровка'],
  },
  {
    id: 'repair',
    title: 'Ремонт',
    short: 'Восстановление, обслуживание и настройка 3D-принтеров для корректной работы, качества печати и продления срока службы.',
    lead: 'Диагностируем поломки, выезжаем в мастерскую или на производство и приводим технику в рабочий ритм без лишних простоев.',
    basePrice: 1500,
    calculatorMode: 'repair',
    bullets: ['Диагностика оборудования', 'Обслуживание и калибровка', 'Выезд в мастерскую или на производство', 'Настройка слайсеров'],
    preview: {
      label: 'Портфолио по наведению',
      title: 'Перезапуск принтера после простоя',
      text: 'Проверка механики, замена расходников, калибровка стола и возвращение стабильной геометрии печати.',
    },
    chips: ['Выезд', 'Калибровка', 'Запуск'],
  },
  {
    id: 'training',
    title: 'Обучение',
    short: 'Практическое обучение 3D-печати, моделированию и работе с оборудованием в мастерской или с выездом к клиенту.',
    lead: 'Проводим базовые и продвинутые занятия, индивидуальные разборы и выездные сессии для команд и производств.',
    basePrice: 3000,
    calculatorMode: 'training',
    bullets: ['3D-печать с нуля', 'Моделирование для задач клиента', 'Запуск оборудования', 'Выездное обучение команды'],
    preview: {
      label: 'Портфолио по наведению',
      title: 'Интенсив для производственной команды',
      text: 'Разобрали workflow печати, настройки оборудования и типовые ошибки, чтобы команда работала автономно.',
    },
    chips: ['Индивидуально', 'Команда', 'Выезд'],
  },
];

const materials = [
  {
    id: 'pla',
    title: 'PLA',
    note: 'Для макетов, декора и быстрых прототипов.',
    useCases: ['Макеты', 'Декор', 'Быстрые прототипы'],
    colors: '12 цветов',
    coef: 1,
  },
  {
    id: 'petg',
    title: 'PETG',
    note: 'Для функциональных деталей и корпусов.',
    useCases: ['Корпуса', 'Оснастка', 'Функциональные детали'],
    colors: '10 цветов',
    coef: 1.22,
  },
  {
    id: 'abs',
    title: 'ABS',
    note: 'Для прочных изделий с последующей обработкой.',
    useCases: ['Прочность', 'Постобработка', 'Технические изделия'],
    colors: '8 цветов',
    coef: 1.34,
  },
  {
    id: 'tpu',
    title: 'TPU',
    note: 'Для гибких элементов и амортизирующих деталей.',
    useCases: ['Гибкие детали', 'Уплотнители', 'Амортизаторы'],
    colors: '6 цветов',
    coef: 1.48,
  },
  {
    id: 'nylon',
    title: 'Nylon',
    note: 'Для нагруженных и износостойких узлов.',
    useCases: ['Износостойкость', 'Шестерни', 'Техничные узлы'],
    colors: '4 цвета',
    coef: 1.72,
  },
];

const colors = [
  { id: 'graphite', title: 'Графит', value: '#30343b', premium: false, note: 'Корпуса и технические модели' },
  { id: 'white', title: 'Белый', value: '#f5f3ef', premium: false, note: 'Макеты и чистая презентация' },
  { id: 'red', title: 'Красный 161', value: '#d64b2f', premium: true, note: 'Акцентные изделия и брендовые серии' },
  { id: 'silver', title: 'Серебро', value: '#b7bcc0', premium: true, note: 'Техничный внешний вид' },
  { id: 'sand', title: 'Песочный', value: '#c7b38c', premium: false, note: 'Тёплый оттенок для предметки' },
  { id: 'green', title: 'Техно-зелёный', value: '#587b6c', premium: false, note: 'Фирменный инженерный акцент' },
];

const repairModes = [
  { id: 'workshop', label: 'В мастерской', coef: 1 },
  { id: 'onsite', label: 'С выездом', coef: 1.34 },
  { id: 'remote', label: 'Удалённо', coef: 0.82 },
];

const repairScopes = [
  { id: 'desktop', label: 'Настольный принтер', coef: 1 },
  { id: 'farm', label: 'Ферма / несколько принтеров', coef: 1.42 },
  { id: 'industrial', label: 'Производственная техника', coef: 1.78 },
];

const trainingFormats = [
  { id: 'individual', label: 'Индивидуально', coef: 1 },
  { id: 'team', label: 'Для команды', coef: 1.58 },
  { id: 'onsite', label: 'С выездом', coef: 1.44 },
];

const trainingLevels = [
  { id: 'start', label: 'Старт', coef: 1 },
  { id: 'pro', label: 'Продвинутый', coef: 1.26 },
  { id: 'business', label: 'Под бизнес-задачи', coef: 1.52 },
];

const portfolioItems = [
  {
    title: 'Корпуса для малой серии',
    category: '3D печать',
    text: 'Подготовили партию деталей для локального бренда, чтобы уйти от ожидания поставок и ускорить сборку.',
  },
  {
    title: 'Реверс детали под замену',
    category: 'Сканирование + моделирование',
    text: 'Оцифровали образец, восстановили геометрию и выдали модель под печать без потери по посадкам.',
  },
  {
    title: 'Запуск оборудования под команду',
    category: 'Ремонт + обучение',
    text: 'Привели парк принтеров в рабочее состояние и обучили команду базовому обслуживанию и стабильной печати.',
  },
];

const studioPoints = [
  {
    title: 'Ростов-на-Дону',
    text: 'Локальная мастерская для прямой связи без посредников и долгих цепочек согласования.',
  },
  {
    title: '5 направлений',
    text: 'Печать, моделирование, сканирование, ремонт и обучение в одном месте.',
  },
  {
    title: 'Быстрый отклик',
    text: 'Предварительный расчёт и переход в Telegram или Whatsapp сразу после заявки.',
  },
];

const productionServiceIds = new Set(['print', 'modeling', 'scan']);

function formatPrice(value) {
  return new Intl.NumberFormat('ru-RU').format(value);
}

export default function App() {
  const [selectedService, setSelectedService] = useState(services[0].id);
  const [activeService, setActiveService] = useState(services[0].id);
  const [selectedMaterial, setSelectedMaterial] = useState(materials[0].id);
  const [selectedColor, setSelectedColor] = useState(colors[0].id);
  const [repairMode, setRepairMode] = useState(repairModes[0].id);
  const [repairScope, setRepairScope] = useState(repairScopes[0].id);
  const [trainingFormat, setTrainingFormat] = useState(trainingFormats[0].id);
  const [trainingLevel, setTrainingLevel] = useState(trainingLevels[0].id);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    messenger: '',
    description: '',
  });
  const [isSent, setIsSent] = useState(false);

  const service = services.find((item) => item.id === selectedService) ?? services[0];
  const active = services.find((item) => item.id === activeService) ?? services[0];
  const material = materials.find((item) => item.id === selectedMaterial) ?? materials[0];
  const color = colors.find((item) => item.id === selectedColor) ?? colors[0];
  const repairModeOption = repairModes.find((item) => item.id === repairMode) ?? repairModes[0];
  const repairScopeOption = repairScopes.find((item) => item.id === repairScope) ?? repairScopes[0];
  const trainingFormatOption = trainingFormats.find((item) => item.id === trainingFormat) ?? trainingFormats[0];
  const trainingLevelOption = trainingLevels.find((item) => item.id === trainingLevel) ?? trainingLevels[0];

  const estimatedPrice = useMemo(() => {
    if (productionServiceIds.has(selectedService)) {
      const colorCoef = color.premium ? 1.08 : 1;
      return Math.round(service.basePrice * material.coef * colorCoef);
    }

    if (selectedService === 'repair') {
      return Math.round(service.basePrice * repairModeOption.coef * repairScopeOption.coef);
    }

    if (selectedService === 'training') {
      return Math.round(service.basePrice * trainingFormatOption.coef * trainingLevelOption.coef);
    }

    return service.basePrice;
  }, [
    color.premium,
    material.coef,
    repairModeOption.coef,
    repairScopeOption.coef,
    selectedService,
    service.basePrice,
    trainingFormatOption.coef,
    trainingLevelOption.coef,
  ]);

  const quickSummary = productionServiceIds.has(selectedService)
    ? [material.title, color.title, 'Ростов-на-Дону']
    : selectedService === 'repair'
      ? [repairModeOption.label, repairScopeOption.label, 'Связь в Telegram / Whatsapp']
      : [trainingFormatOption.label, trainingLevelOption.label, 'Подбор программы'];

  function selectService(id) {
    setSelectedService(id);
    setActiveService(id);
    setIsSent(false);
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setIsSent(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsSent(true);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="161 градусов">
          <img src="/assets/Logo_2 1.png" alt="161 градусов" />
        </a>

        <nav className="nav" aria-label="Основная навигация">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} className={item.id === 'top' ? 'is-current' : ''}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a className="header-cta" href="#request">
            Оставить заявку
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-showcase" aria-label="Главный экран">
          <img className="hero-asset" src="/assets/Главный экран _ var 6.png" alt="Главный экран 161 градусов" />
        </section>

        <section className="services-intro section-frame" id="services">
          <div className="services-title">
            <h2>Услуги</h2>
            <p>Качественная печать, обучение, реверс-инжиниринг, настройка принтеров и оптимизация моделей.</p>
          </div>
        </section>

        <section className="service-stripes" aria-label="Каталог услуг">
          {services.map((item) => (
            <button
              key={item.id}
              type="button"
              className={activeService === item.id ? 'service-stripe is-active' : 'service-stripe'}
              onMouseEnter={() => setActiveService(item.id)}
              onFocus={() => setActiveService(item.id)}
              onClick={() => selectService(item.id)}
            >
              <span className="service-name">{item.title}</span>
              <span className="service-description">{item.short}</span>
              <span className="service-jump" aria-hidden="true">
                <ArrowDownRight size={34} strokeWidth={2.2} />
              </span>
            </button>
          ))}
        </section>

        <section className="service-preview-band">
          <div className="section-frame service-preview-layout">
            <div className="service-preview-copy">
              <p className="section-kicker">{active.preview.label}</p>
              <h3>{active.title}</h3>
              <p>{active.lead}</p>
              <div className="service-bullets">
                {active.bullets.map((item) => (
                  <span key={item}>
                    <Check size={16} />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <article className={`service-preview-card service-preview-${active.id}`}>
              <span className="preview-label">{active.title}</span>
              <strong>{active.preview.title}</strong>
              <p>{active.preview.text}</p>
              <div className="preview-tags">
                {active.chips.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="portfolio-section section-frame" id="portfolio">
          <div className="section-heading">
            <p className="section-kicker">Портфолио</p>
            <h2>Примеры задач, которые легче продать через прямой сайт</h2>
          </div>

          <div className="portfolio-grid">
            {portfolioItems.map((item, index) => (
              <article className="work-card" key={item.title}>
                <div className={`work-visual work-visual-${index + 1}`} />
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="materials-band" id="materials">
          <div className="section-frame materials-layout">
            <div className="section-heading">
              <p className="section-kicker">Материалы и цвета</p>
              <h2>Чек-лист выбора под задачу, прочность и внешний вид</h2>
            </div>

            <div className="materials-grid">
              <div className="materials-table">
                <div className="materials-row materials-head">
                  <span>Материал</span>
                  <span>Применимость</span>
                  <span>Доступность</span>
                </div>

                {materials.map((item) => (
                  <label
                    key={item.id}
                    className={selectedMaterial === item.id ? 'materials-row is-active' : 'materials-row'}
                  >
                    <input
                      type="radio"
                      name="material"
                      value={item.id}
                      checked={selectedMaterial === item.id}
                      onChange={() => setSelectedMaterial(item.id)}
                    />
                    <span className="material-title">
                      <strong>{item.title}</strong>
                      <small>{item.note}</small>
                    </span>
                    <span className="material-uses">
                      {item.useCases.map((useCase) => (
                        <b key={useCase}>{useCase}</b>
                      ))}
                    </span>
                    <span className="material-colors">{item.colors}</span>
                  </label>
                ))}
              </div>

              <div className="checklist-panel">
                <h3>Цвета в работе</h3>
                <div className="color-grid">
                  {colors.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={selectedColor === item.id ? 'color-swatch is-active' : 'color-swatch'}
                      onClick={() => setSelectedColor(item.id)}
                    >
                      <span style={{ backgroundColor: item.value }} />
                      <strong>{item.title}</strong>
                      <small>{item.note}</small>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="studio-section" id="studio">
          <div className="section-frame studio-layout">
            <div className="studio-copy">
              <p className="studio-year">3 года</p>
              <h2>на рынке скорость без срывов дедлайнов</h2>
              <p className="studio-text">
                Мы инженеры, дизайнеры и фанаты 3D-технологий. Проводим лекции, мастер-классы и выступаем на различных
                мероприятиях, а в работе держим темп и прямую связь с заказчиком.
              </p>
              <a className="primary-button studio-button" href="#contacts">
                Наша кухня
              </a>

              <div className="studio-points">
                {studioPoints.map((item) => (
                  <article key={item.title}>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="studio-collage" aria-hidden="true">
              <img src="/assets/О студии _ var 1.png" alt="" />
            </div>
          </div>
        </section>

        <section className="calculator-band" id="calculator">
          <div className="section-frame calculator-layout">
            <div className="calculator-copy">
              <p className="section-kicker">Предварительный расчёт</p>
              <h2>Клиент сразу понимает направление, порядок цены и следующий шаг</h2>
              <p>
                Для печати, моделирования и сканирования используем материал и цвет. Для ремонта и обучения показываем
                другой набор полей, чтобы сценарий выглядел живым уже на первом показе.
              </p>
            </div>

            <div className="calculator-panel">
              <div className="field-group">
                <span className="field-label">Услуга</span>
                <div className="segmented segmented-services">
                  {services.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      className={selectedService === item.id ? 'segment is-active' : 'segment'}
                      onClick={() => selectService(item.id)}
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              </div>

              {service.calculatorMode === 'production' && (
                <div className="field-stack">
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

                  <div className="calc-note">
                    <strong>Сценарий по ТЗ:</strong>
                    <span>одни поля для печати, моделирования и сканирования.</span>
                  </div>
                </div>
              )}

              {service.calculatorMode === 'repair' && (
                <div className="field-stack">
                  <div className="field-group">
                    <span className="field-label">Формат ремонта</span>
                    <div className="segmented">
                      {repairModes.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={repairMode === item.id ? 'segment is-active' : 'segment'}
                          onClick={() => setRepairMode(item.id)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field-group">
                    <span className="field-label">Тип оборудования</span>
                    <div className="segmented">
                      {repairScopes.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={repairScope === item.id ? 'segment is-active' : 'segment'}
                          onClick={() => setRepairScope(item.id)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {service.calculatorMode === 'training' && (
                <div className="field-stack">
                  <div className="field-group">
                    <span className="field-label">Формат обучения</span>
                    <div className="segmented">
                      {trainingFormats.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={trainingFormat === item.id ? 'segment is-active' : 'segment'}
                          onClick={() => setTrainingFormat(item.id)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="field-group">
                    <span className="field-label">Уровень</span>
                    <div className="segmented">
                      {trainingLevels.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          className={trainingLevel === item.id ? 'segment is-active' : 'segment'}
                          onClick={() => setTrainingLevel(item.id)}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="price-result">
                <div>
                  <span>Ориентир от</span>
                  <strong>{formatPrice(estimatedPrice)} ₽</strong>
                </div>
                <a href="#request" className="price-action" aria-label="Перейти к заявке">
                  <ArrowDownRight size={22} />
                </a>
              </div>

              <div className="calculator-summary">
                {quickSummary.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <p className="fine-print">
                Итоговую стоимость подтверждает менеджер после общения в Telegram, Whatsapp или по телефону.
              </p>
            </div>
          </div>
        </section>

        <section className="request-band" id="request">
          <div className="section-frame request-layout">
            <div className="request-copy">
              <p className="section-kicker">Контакты и форма заявки</p>
              <h2>Собираем короткую заявку и быстро переводим клиента в диалог</h2>
              <p>
                Для MVP форма остаётся простой, но уже соответствует обновлённому ТЗ: имя, телефон, Telegram / Whatsapp,
                описание задачи и выбор услуги.
              </p>

              <div className="contact-strip" id="contacts">
                <span>
                  <MapPin size={18} />
                  Ростов-на-Дону
                </span>
                <span>
                  <PhoneCall size={18} />
                  +7 000 000-00-00
                </span>
                <a href="#request">
                  <MessageCircle size={18} />
                  Telegram студии
                </a>
                <a href="#request">
                  <MessageCircle size={18} />
                  Whatsapp
                </a>
              </div>
            </div>

            <form className="request-form" onSubmit={handleSubmit}>
              <label>
                <span>Имя</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleFormChange}
                  placeholder="Как к вам обращаться"
                />
              </label>

              <label>
                <span>Телефон</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  placeholder="+7 (___) ___-__-__"
                />
              </label>

              <label>
                <span>Telegram / Whatsapp</span>
                <input
                  name="messenger"
                  value={form.messenger}
                  onChange={handleFormChange}
                  placeholder="@username или номер"
                />
              </label>

              <label>
                <span>Выбор услуги</span>
                <select value={selectedService} onChange={(event) => selectService(event.target.value)}>
                  {services.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span>Описание задачи</span>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Что нужно напечатать, смоделировать, отсканировать, починить или провести как обучение"
                />
              </label>

              <div className="request-summary">
                <span>{service.title}</span>
                <span>{quickSummary[0]}</span>
                <span>{quickSummary[1]}</span>
                <strong>от {formatPrice(estimatedPrice)} ₽</strong>
              </div>

              <button className="primary-button form-submit" type="submit">
                <Send size={18} />
                Отправить на просчёт
              </button>

              {isSent && <p className="success-message">Заявка подготовлена. Следующий шаг: менеджер связывается в удобном канале.</p>}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
