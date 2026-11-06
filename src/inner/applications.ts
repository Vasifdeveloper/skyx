import { tr, type Localized } from "./text";

interface Industry {
  id: string;
  name: Localized;
  task: Localized;
  workflow: Localized[];
  metrics: Localized;
}

export const industries: Industry[] = [
  {
    id: "ecommerce",
    name: tr("Elektron ticarət", "Электронная торговля", "E-commerce"),
    task: tr(
      "Çatdırılma və qaytarma ilə bağlı sualları sifariş məlumatına əsasən cavablandırmaq.",
      "Отвечать на вопросы о доставке и возврате с опорой на данные заказа.",
      "Answer delivery and return questions using the relevant order information.",
    ),
    workflow: [
      tr("Müştərinin sualı", "Вопрос покупателя", "Customer question"),
      tr("Sifarişin tapılması", "Поиск заказа", "Order lookup"),
      tr("Təsdiqlənmiş qaydalar", "Утверждённые правила", "Approved policies"),
      tr(
        "Cavab və ya operatora ötürmə",
        "Ответ или передача оператору",
        "Reply or handoff",
      ),
    ],
    metrics: tr(
      "İlk cavaba qədər vaxt, təkrar müraciətlər, operatora ötürülən sorğuların payı.",
      "Время первого ответа, повторные обращения, доля передач оператору.",
      "Time to first reply, repeat enquiries and share of requests handed to an agent.",
    ),
  },
  {
    id: "retail",
    name: tr("Pərakəndə ticarət", "Розничная торговля", "Retail"),
    task: tr(
      "Mağaza üzrə tələbi və stokun mövcudluğunu eyni hesabatda görmək.",
      "Сопоставлять спрос и наличие товаров в отчёте по магазинам.",
      "Compare demand against stock availability in a store-level report.",
    ),
    workflow: [
      tr(
        "Satış və anbar məlumatı",
        "Данные продаж и склада",
        "Sales and stock data",
      ),
      tr(
        "Məhsul kodlarının uyğunlaşdırılması",
        "Сверка кодов товаров",
        "Product code matching",
      ),
      tr("Mağazalar üzrə hesabat", "Отчёт по магазинам", "Store report"),
      tr(
        "Alış planına baxış",
        "Пересмотр плана закупок",
        "Review purchasing plan",
      ),
    ],
    metrics: tr(
      "Stok çatışmazlığı, mal dövriyyəsi, məlumatın yenilənmə vaxtı.",
      "Отсутствие товара, оборачиваемость, давность обновления данных.",
      "Stockouts, inventory turnover and data freshness.",
    ),
  },
  {
    id: "hospitality",
    name: tr(
      "Restoran və qonaqpərvərlik",
      "Рестораны и гостеприимство",
      "Restaurants and hospitality",
    ),
    task: tr(
      "Rezervasiya sorğularını komandanın vahid növbəsinə toplamaq.",
      "Собирать запросы на бронирование в одной очереди для команды.",
      "Bring booking requests into one queue for the team.",
    ),
    workflow: [
      tr("Rezervasiya sorğusu", "Запрос на бронь", "Booking enquiry"),
      tr(
        "Tarix və sayın yoxlanması",
        "Проверка даты и количества гостей",
        "Check date and party size",
      ),
      tr(
        "Məsul əməkdaşa tapşırıq",
        "Задача администратору",
        "Assign to a host",
      ),
      tr("Təsdiq", "Подтверждение", "Confirmation"),
    ],
    metrics: tr(
      "Təsdiqə qədər vaxt, cavabsız sorğular, ləğv edilən rezervasiyalar.",
      "Время до подтверждения, запросы без ответа, отмены.",
      "Time to confirmation, unanswered requests and cancellations.",
    ),
  },
  {
    id: "professional-services",
    name: tr(
      "Peşəkar xidmətlər",
      "Профессиональные услуги",
      "Professional services",
    ),
    task: tr(
      "İlkin müraciəti mövzunu bilən məsləhətçiyə yönləndirmək.",
      "Направлять первичное обращение консультанту нужного профиля.",
      "Route each initial enquiry to a consultant with the right expertise.",
    ),
    workflow: [
      tr("Qısa təsvir", "Краткое описание", "Short brief"),
      tr(
        "Mövzunun müəyyənləşdirilməsi",
        "Определение темы",
        "Topic classification",
      ),
      tr(
        "Məsləhətçinin seçilməsi",
        "Подбор консультанта",
        "Match a consultant",
      ),
      tr("Görüş tapşırığı", "Задача на встречу", "Schedule a discussion"),
    ],
    metrics: tr(
      "Təyinata qədər vaxt, yenidən yönləndirmələr, görüşə çevrilən müraciətlər.",
      "Время до назначения, переназначения, доля обращений с назначенной встречей.",
      "Time to assignment, reassignments and share of enquiries leading to a meeting.",
    ),
  },
  {
    id: "real-estate",
    name: tr("Daşınmaz əmlak", "Недвижимость", "Real estate"),
    task: tr(
      "Alıcının meyarlarını və obyekt variantlarını agent üçün bir araya gətirmək.",
      "Собирать пожелания покупателя и подходящие объекты для работы агента.",
      "Bring a buyer’s requirements and relevant listings together for an agent.",
    ),
    workflow: [
      tr("Alıcının meyarları", "Запрос покупателя", "Buyer criteria"),
      tr("Obyekt bazası", "База объектов", "Listings database"),
      tr("Agentin yoxlaması", "Проверка агентом", "Agent review"),
      tr("Baxış üçün razılaşma", "Согласование просмотра", "Arrange viewing"),
    ],
    metrics: tr(
      "Seçimə qədər vaxt, baxışa keçid, məlumatı köhnəlmiş elanlar.",
      "Время подбора, переход к просмотру, объявления с устаревшими данными.",
      "Time to shortlist, viewing conversion and stale listings.",
    ),
  },
  {
    id: "b2b",
    name: tr("B2B", "B2B", "B2B"),
    task: tr(
      "Daxil olan sorğunun tələblərini dəqiqləşdirib satış üzrə məsul şəxsə ötürmək.",
      "Уточнять требования во входящем запросе и передавать его ответственному за продажу.",
      "Qualify incoming requirements and hand them to the right sales owner.",
    ),
    workflow: [
      tr("Daxil olan sorğu", "Входящий запрос", "Incoming enquiry"),
      tr(
        "Tələblərin təsnifatı",
        "Классификация требований",
        "Classify requirements",
      ),
      tr("CRM kartı", "Карточка CRM", "CRM record"),
      tr("Satış üzrə məsul şəxs", "Ответственный за продажу", "Sales owner"),
    ],
    metrics: tr(
      "İlkin cavab vaxtı, tam doldurulmuş kartlar, satış mərhələləri arasındakı keçid.",
      "Время ответа, полнота карточек, переходы между этапами сделки.",
      "Response time, record completeness and progression between sales stages.",
    ),
  },
];

export const privacySections = [
  [
    tr(
      "Müraciətdəki məlumatlar",
      "Что входит в обращение",
      "Information in your enquiry",
    ),
    tr(
      "Forma adınızı, email ünvanınızı, seçdiyiniz xidməti, layihə təsvirini və müraciətə cavab vermək üçün razılığınızı qəbul edir. Şirkət adı və telefon nömrəsi istəyə bağlıdır.",
      "Форма принимает имя, email, выбранную услугу, описание проекта и согласие на ответ. Название компании и номер телефона указывать необязательно.",
      "The form accepts your name, email address, selected service, project description and consent to a reply. Company name and phone number are optional.",
    ),
  ],
  [
    tr(
      "İstifadə və ötürülmə",
      "Для чего используются данные",
      "Use and recipients",
    ),
    tr(
      "SKYX məlumatlardan sorğunu nəzərdən keçirmək və sizinlə əlaqə saxlamaq üçün istifadə edir. Göndəriş qoşulduqda Resend müraciəti info@sky-x.az ünvanına çatdırmaq üçün emal edir. Cavab sizin göstərdiyiniz email ünvanına yönləndirilir.",
      "SKYX использует сведения, чтобы разобрать запрос и связаться с вами. При настроенной отправке Resend обрабатывает письмо для передачи на info@sky-x.az. Ответ направляется на указанный вами email.",
      "SKYX uses the information to review your request and respond. When email delivery is configured, Resend processes the message for transfer to info@sky-x.az. Replies are addressed to the email you provide.",
    ),
  ],
  [
    tr(
      "Təkrar göndəriş və spamdan qorunma",
      "Защита от спама и повторной отправки",
      "Spam and duplicate protection",
    ),
    tr(
      "Server sorğuların tezliyini və təkrar göndərişləri yoxlayır. Paylanmış qoruma qoşulduqda Upstash Redis texniki açarı və sorğu sayını qısa müddətə saxlayır. Dəyişməmiş müraciət təkrar göndəriləndə Resend eyni texniki açarı alır.",
      "Сервер проверяет частоту запросов и повторные попытки отправки. При подключённой распределённой защите Upstash Redis временно хранит технический ключ и счётчик запросов. При повторной отправке неизменённого обращения Resend получает прежний идентификатор попытки.",
      "The server checks request frequency and repeated submissions. When distributed protection is configured, Upstash Redis briefly holds a technical key and a request count. A retry of an unchanged enquiry sends the same submission key to Resend.",
    ),
  ],
  [
    tr(
      "Brauzer və digər kanallar",
      "Браузер и другие каналы связи",
      "Your browser and other channels",
    ),
    tr(
      "Yazdığınız mətn forma açıq olduğu müddətdə onun yaddaşında qalır. Sayt şəxsi sahələri URL-ə, analitikaya və ya brauzerin daimi yaddaşına yazmır. Email və WhatsApp keçidləri seçdiyiniz xarici xidməti açır. Müraciət reklam abunəliyi yaratmır.",
      "Введённый текст остаётся в памяти открытой формы. Сайт не записывает личные поля в адрес страницы, аналитику или постоянную память браузера. Ссылки на email и WhatsApp открывают соответствующий внешний сервис. Отправка формы не оформляет рекламную подписку.",
      "Your entries stay in the open form’s memory. The site keeps personal fields out of page addresses, analytics and persistent browser storage. Email and WhatsApp links open the corresponding external service. Sending an enquiry does not subscribe you to marketing.",
    ),
  ],
  [
    tr(
      "Məlumatınızla bağlı əlaqə",
      "Вопросы о ваших данных",
      "Questions about your data",
    ),
    tr(
      "Əvvəlki müraciətlə bağlı məlumatı dəqiqləşdirmək, düzəliş və ya silinmə xahişi göndərmək üçün studiyaya müraciət edərkən istifadə etdiyiniz email ünvanından yazın.",
      "Чтобы уточнить сведения по обращению, запросить исправление или удаление, напишите в студию с email, который вы указали в форме.",
      "To ask about an enquiry or request a correction or deletion, contact the studio from the email address you supplied in the form.",
    ),
  ],
] as const;

export const storageSections = [
  [
    tr("Hərəkət seçimi", "Настройка движения", "Motion preference"),
    tr(
      "Səhifənin aşağısındakı idarəetmə elementi animasiyaları söndürməyə imkan verir. Seçiminiz yalnız onu dəyişəndə bu brauzerin yerli yaddaşında saxlanır. Cihazın azaldılmış hərəkət ayarı üstünlük daşıyır.",
      "Переключатель внизу страницы управляет анимацией. Выбранный режим сохраняется в локальной памяти этого браузера, когда вы его меняете. Системная настройка уменьшенного движения имеет приоритет.",
      "The control at the foot of the page lets you turn motion off. Your choice is saved in this browser’s local storage when you change it. Your device’s reduced-motion preference takes priority.",
    ),
  ],
  [
    tr(
      "Dil və əlaqə forması",
      "Язык и форма обращения",
      "Language and enquiry form",
    ),
    tr(
      "Dil səhifənin /az, /ru və ya /en ünvanı ilə seçilir. Forma sahələri yalnız açıq səhifədə qalır. Onlar kukiyə və ya yerli yaddaşa yazılmır.",
      "Язык задаётся частью адреса /az, /ru или /en. Введённые поля формы остаются на открытой странице и не записываются в cookies или локальное хранилище.",
      "The /az, /ru or /en part of the address selects a language. Form fields remain on the open page and are not written to cookies or local storage.",
    ),
  ],
  [
    tr(
      "Analitika və reklam",
      "Аналитика и реклама",
      "Analytics and advertising",
    ),
    tr(
      "Bu saytda üçüncü tərəf analitikası, reklam pikselləri və reklam kukiləri qoşulmayıb. Yerli demolar heç bir AI və ya CRM xidmətinə sorğu göndərmir.",
      "На сайте не подключены сторонняя аналитика, рекламные пиксели и рекламные cookies. Локальные демонстрации не обращаются к AI-сервисам или CRM.",
      "The site does not load third-party analytics, advertising pixels or advertising cookies. The local demos do not call AI services or a CRM.",
    ),
  ],
  [
    tr("Seçimi sıfırlamaq", "Как сбросить выбор", "Reset your preference"),
    tr(
      "Hərəkəti səhifənin aşağısındakı keçidlə yenidən tənzimləyə bilərsiniz. Saxlanmış seçimi silmək üçün brauzer parametrlərində bu saytın məlumatlarını təmizləyin.",
      "Изменить режим можно переключателем внизу страницы. Чтобы удалить сохранённый выбор, очистите данные этого сайта в настройках браузера.",
      "Use the motion control at the foot of the page to change the setting. To remove the saved preference, clear this site’s data in your browser settings.",
    ),
  ],
] as const;
