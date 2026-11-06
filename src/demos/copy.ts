export type Locale = "az" | "ru" | "en";

export type WorkflowStep = {
  title: string;
  heading: string;
  description: string;
  fields?: [string, string][];
};
export type WorkflowCopy = {
  steps: WorkflowStep[];
  play: string;
  pause: string;
  resume: string;
  replay: string;
  idle: string;
  running: string;
  paused: string;
  complete: string;
  note: string;
};
export type ArchitectureCopy = {
  layers: { name: string; purpose: string; input: string; output: string }[];
  input: string;
  output: string;
  aspects: string;
  note: string;
};
type ModulesCopy = {
  sections: [string, string, string, string];
  titles: [string, string, string, string];
  links: [string, string, string, string];
  workflow: WorkflowCopy;
  architecture: ArchitectureCopy;
  scenarioNote: string;
  scenarios: { industry: string; task: string; steps: string[] }[];
  stages: [string, string][];
};

export const modulesCopy: Record<Locale, ModulesCopy> = {
  az: {
    sections: [
      "AI avtomatlaşdırma",
      "AI arxitekturası",
      "Mümkün ssenarilər",
      "İş prosesi",
    ],
    titles: [
      "Təkrarlanan işi sistemə həvalə edin.",
      "AI üçün möhkəm təməl.",
      "Biznesinizdə necə işləyə bilər?",
      "Məqsəddən işləyən sistemə.",
    ],
    links: [
      "Avtomatlaşdırma xidmətinə baxın",
      "Arxitektura xidmətinə baxın",
      "Altı sahə üzrə ssenarilərə baxın",
      "Prosesi ətraflı araşdırın",
    ],
    workflow: {
      steps: [
        {
          title: "Müştəri sorğusu",
          heading: "Gələn mesaj",
          description:
            "“Demo şirkət üçün marketinq və CRM proseslərini əlaqələndirmək istəyirik.”",
        },
        {
          title: "AI təhlili",
          heading: "Sorğunun təsnifatı",
          description:
            "Mesajın mövzusu müəyyən edilir və sorğu uyğun istiqamətə yönləndirilir.",
          fields: [
            ["Mövzu", "Marketinq və CRM"],
            ["Niyyət", "İnteqrasiya sorğusu"],
          ],
        },
        {
          title: "CRM inteqrasiyası",
          heading: "Yeni CRM kartı",
          description: "Sorğunun məzmunu və kateqoriyası bir kartda toplanır.",
          fields: [
            ["Şirkət", "Demo"],
            ["Status", "Yeni sorğu"],
          ],
        },
        {
          title: "Avtomatik əməliyyat",
          heading: "Tapşırığın təyinatı",
          description:
            "İnteqrasiya mütəxəssisinə sorğunu nəzərdən keçirmək üçün tapşırıq yaradılır.",
          fields: [["Məsul şəxs", "İnteqrasiya mütəxəssisi"]],
        },
        {
          title: "Nəticə",
          heading: "Növbəti addım hazırdır",
          description:
            "Sorğu təsnif edildi, CRM kartı yaradıldı və cavab üçün mütəxəssis təyin olundu.",
        },
      ],
      play: "Demonu başladın",
      pause: "Fasilə",
      resume: "Davam edin",
      replay: "Təkrarlayın",
      idle: "Başlamağa hazırdır",
      running: "İcra olunur",
      paused: "Fasilədədir",
      complete: "Tamamlandı",
      note: "İllüstrativ demo — real müştəri məlumatları istifadə edilmir.",
    },
    architecture: {
      layers: [
        {
          name: "Məlumat mənbələri",
          purpose: "Komandanın razılaşdırdığı məlumatları bir araya gətirir.",
          input: "Sənədlər, CRM qeydləri",
          output: "Nizamlanmış məlumatlar",
        },
        {
          name: "API və inteqrasiyalar",
          purpose: "Alətlər arasında məlumat mübadiləsini təmin edir.",
          input: "Mənbə məlumatları",
          output: "Razılaşdırılmış format",
        },
        {
          name: "AI emalı",
          purpose: "Kontekstə əsasən cavab və ya təsnifat hazırlayır.",
          input: "Sorğu və kontekst",
          output: "İlkin cavab və ya kateqoriya",
        },
        {
          name: "Avtomatlaşdırma və orkestrasiya",
          purpose: "Qaydalara uyğun əməliyyatı və ya işçiyə ötürməni başladır.",
          input: "Nəticə və qaydalar",
          output: "Tapşırıq və ya yönləndirmə",
        },
        {
          name: "Analitika və optimallaşdırma",
          purpose:
            "Nəticələri müqayisə edir və təkmilləşdirmə sahələrini göstərir.",
          input: "Hadisələr və rəylər",
          output: "Göstəricilər və yoxlama planı",
        },
      ],
      input: "Giriş",
      output: "Çıxış",
      aspects:
        "Bütün qatlarda girişə nəzarət, xətaların idarəsi və monitorinq.",
      note: "Konseptual nümunədir. Tərkib vəzifədən asılıdır.",
    },
    scenarioNote: "Mümkün tətbiq ssenarisi",
    scenarios: [
      {
        industry: "Elektron ticarət",
        task: "Məhsul sualına təsdiqlənmiş məlumat əsasında cavab vermək.",
        steps: [
          "Müştəri sualı",
          "Məhsul kataloqu",
          "Cavab və ya işçiyə ötürmə",
        ],
      },
      {
        industry: "Restoranlar",
        task: "Rezervasiya sorğusunu uyğun əməkdaşa çatdırmaq.",
        steps: [
          "Rezervasiya sorğusu",
          "Tarix və qonaq sayı",
          "Administratorun təsdiqi",
        ],
      },
      {
        industry: "B2B",
        task: "Satış komandasına görüş üçün lazımi konteksti vermək.",
        steps: [
          "Yeni müraciət",
          "Ehtiyacın təsnifatı",
          "CRM kartı",
          "Məsul əməkdaş",
        ],
      },
    ],
    stages: [
      ["Araşdırırıq", "Məqsədlər və proseslər."],
      ["Layihələndiririk", "Plan və arxitektura."],
      ["Tətbiq edirik", "Quraşdırma və inteqrasiya."],
      ["Təkmilləşdiririk", "Ölçmə və təkmilləşdirmə."],
    ],
  },
  ru: {
    sections: [
      "AI-автоматизация",
      "AI-архитектура",
      "Возможные сценарии",
      "Процесс работы",
    ],
    titles: [
      "Освободите команду от рутины.",
      "Основа для работающих AI-систем.",
      "Как это может работать у вас.",
      "От задачи к работающей системе.",
    ],
    links: [
      "Подробнее об автоматизации",
      "Подробнее об архитектуре",
      "Сценарии для шести отраслей",
      "Подробнее о процессе",
    ],
    workflow: {
      steps: [
        {
          title: "Обращение",
          heading: "Входящее сообщение",
          description: "«Хотим связать маркетинг и CRM в компании Demo».",
        },
        {
          title: "AI-анализ",
          heading: "Классификация запроса",
          description:
            "Система определяет тему сообщения и выбирает маршрут обращения.",
          fields: [
            ["Тема", "Маркетинг и CRM"],
            ["Намерение", "Запрос на интеграцию"],
          ],
        },
        {
          title: "CRM-интеграция",
          heading: "Новая карточка CRM",
          description:
            "Содержание обращения и его категория сохраняются в одной карточке.",
          fields: [
            ["Компания", "Demo"],
            ["Статус", "Новое обращение"],
          ],
        },
        {
          title: "Автоматическое действие",
          heading: "Назначение задачи",
          description: "Специалист получает задачу изучить обращение.",
          fields: [["Ответственный", "Специалист по интеграции"]],
        },
        {
          title: "Результат",
          heading: "Следующий шаг определён",
          description:
            "Запрос классифицирован, карточка CRM создана, назначен ответственный за ответ.",
        },
      ],
      play: "Запустить демо",
      pause: "Пауза",
      resume: "Продолжить",
      replay: "Повторить",
      idle: "Готово к запуску",
      running: "Выполняется",
      paused: "На паузе",
      complete: "Завершено",
      note: "Иллюстративная демонстрация. Реальные данные клиентов не используются.",
    },
    architecture: {
      layers: [
        {
          name: "Источники данных",
          purpose: "Собирают сведения из источников, согласованных с командой.",
          input: "Документы и записи CRM",
          output: "Подготовленные данные",
        },
        {
          name: "API и интеграции",
          purpose: "Передают сведения между инструментами.",
          input: "Данные источников",
          output: "Согласованный формат",
        },
        {
          name: "AI-обработка",
          purpose:
            "Готовит ответ или классифицирует запрос с учётом контекста.",
          input: "Запрос и контекст",
          output: "Черновик или категория",
        },
        {
          name: "Автоматизация и оркестрация",
          purpose:
            "Запускает действие по правилам или передаёт задачу сотруднику.",
          input: "Результат и правила",
          output: "Действие или передача",
        },
        {
          name: "Аналитика и оптимизация",
          purpose: "Сопоставляет результаты и показывает, что стоит улучшить.",
          input: "События и обратная связь",
          output: "Метрики и план проверок",
        },
      ],
      input: "Вход",
      output: "Выход",
      aspects:
        "На каждом слое действуют контроль доступа, обработка ошибок и мониторинг.",
      note: "Концептуальный пример. Состав зависит от задачи.",
    },
    scenarioNote: "Возможный сценарий применения",
    scenarios: [
      {
        industry: "Электронная торговля",
        task: "Ответить на вопрос о товаре по утверждённым данным.",
        steps: [
          "Вопрос покупателя",
          "Каталог товаров",
          "Ответ или передача сотруднику",
        ],
      },
      {
        industry: "Рестораны",
        task: "Передать заявку на бронирование ответственному сотруднику.",
        steps: [
          "Запрос на бронь",
          "Дата и число гостей",
          "Подтверждение администратора",
        ],
      },
      {
        industry: "B2B",
        task: "Передать отделу продаж контекст для первого разговора.",
        steps: [
          "Новое обращение",
          "Определение потребности",
          "Карточка CRM",
          "Ответственный",
        ],
      },
    ],
    stages: [
      ["Изучаем", "Цели и процессы."],
      ["Проектируем", "План и архитектура."],
      ["Внедряем", "Настройка и интеграция."],
      ["Улучшаем", "Измерение и улучшения."],
    ],
  },
  en: {
    sections: [
      "AI automation",
      "AI architecture",
      "Possible scenarios",
      "Our process",
    ],
    titles: [
      "Let the system handle routine work.",
      "A foundation for AI that works.",
      "How it could work in your business.",
      "From a goal to a working system.",
    ],
    links: [
      "Explore automation",
      "Explore architecture",
      "Explore all six industries",
      "Explore our process",
    ],
    workflow: {
      steps: [
        {
          title: "Enquiry",
          heading: "Incoming message",
          description:
            "“We’d like to connect marketing and CRM workflows at Demo.”",
        },
        {
          title: "AI analysis",
          heading: "Request classification",
          description:
            "The system identifies the subject and selects a route for the enquiry.",
          fields: [
            ["Subject", "Marketing and CRM"],
            ["Intent", "Integration request"],
          ],
        },
        {
          title: "CRM integration",
          heading: "New CRM record",
          description: "One record holds the enquiry and its category.",
          fields: [
            ["Company", "Demo"],
            ["Status", "New enquiry"],
          ],
        },
        {
          title: "Automated action",
          heading: "Task assignment",
          description:
            "An integration specialist receives a task to review the enquiry.",
          fields: [["Assigned to", "Integration specialist"]],
        },
        {
          title: "Result",
          heading: "Ready for follow-up",
          description:
            "The enquiry is classified, the CRM record is created and a specialist owns the response.",
        },
      ],
      play: "Run demo",
      pause: "Pause",
      resume: "Resume",
      replay: "Replay",
      idle: "Ready to run",
      running: "Running",
      paused: "Paused",
      complete: "Complete",
      note: "Illustrative demo. No real customer data is used.",
    },
    architecture: {
      layers: [
        {
          name: "Data sources",
          purpose:
            "Bring together information from sources agreed with the team.",
          input: "Documents and CRM records",
          output: "Prepared data",
        },
        {
          name: "APIs and integrations",
          purpose: "Move information between the tools that need it.",
          input: "Source data",
          output: "A shared format",
        },
        {
          name: "AI processing",
          purpose: "Draft a response or classify a request using its context.",
          input: "Request and context",
          output: "Draft or category",
        },
        {
          name: "Automation and orchestration",
          purpose: "Apply rules to trigger an action or hand off to a person.",
          input: "Result and rules",
          output: "Action or handoff",
        },
        {
          name: "Analytics and optimisation",
          purpose:
            "Compare outcomes and identify where the system can improve.",
          input: "Events and feedback",
          output: "Metrics and a review plan",
        },
      ],
      input: "Input",
      output: "Output",
      aspects:
        "Access controls, error handling and monitoring apply across every layer.",
      note: "Conceptual example. The layers depend on the task.",
    },
    scenarioNote: "Possible application scenario",
    scenarios: [
      {
        industry: "E-commerce",
        task: "Answer a product question using approved information.",
        steps: ["Customer question", "Product catalogue", "Answer or handoff"],
      },
      {
        industry: "Restaurants",
        task: "Route a booking request to the person managing reservations.",
        steps: ["Booking request", "Date and party size", "Host confirmation"],
      },
      {
        industry: "B2B",
        task: "Give the sales team context for a first conversation.",
        steps: [
          "New enquiry",
          "Identify the need",
          "CRM record",
          "Assigned specialist",
        ],
      },
    ],
    stages: [
      ["Discover", "Goals and processes."],
      ["Design", "Plan and architecture."],
      ["Implement", "Setup and integration."],
      ["Improve", "Measurement and refinement."],
    ],
  },
};
