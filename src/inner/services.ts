import { tr, type Localized } from "./text";

export interface Service {
  slug: string;
  name: Localized;
  summary: Localized;
  fit: Localized;
  problems: Localized[];
  scope: Localized[];
  handover: Localized[];
  examples: { title: Localized; description: Localized }[];
  approach: Localized;
  faq: [Localized, Localized][];
}

export const services: Service[] = [
  {
    slug: "digital-marketing",
    name: tr("Rəqəmsal marketinq", "Цифровой маркетинг", "Digital marketing"),
    summary: tr(
      "Auditoriyanı, kanalları və ölçmə qaydalarını əlaqələndiririk ki, reklamdan satışa qədər müştəri yolunu izləyə biləsiniz.",
      "Связываем аудиторию, каналы и измерения, чтобы команда видела путь клиента от первого объявления до продажи.",
      "Connect audiences, channels and measurement so your team can follow the customer journey from first impression to sale.",
    ),
    fit: tr(
      "Kanallar işləyir, amma hansının uyğun müraciət gətirdiyi aydın deyil.",
      "Каналы работают, но непонятно, какие из них приводят подходящие обращения.",
      "Channels are active, but you cannot tell which ones bring suitable enquiries.",
    ),
    problems: [
      tr(
        "Doğru auditoriyanı tapmaq və təklifin mesajını dəqiqləşdirmək.",
        "Найти нужную аудиторию и уточнить сообщение о продукте.",
        "Find the right audience and clarify the product message.",
      ),
      tr(
        "Reklamla hədəf səhifəsi arasındakı uyğunsuzluğu tapmaq.",
        "Обнаружить разрыв между рекламой и посадочной страницей.",
        "Identify gaps between an ad and its landing page.",
      ),
      tr(
        "Kanal və kampaniyaları eyni ölçmə qaydaları ilə müqayisə etmək.",
        "Сравнивать каналы и кампании по общим правилам измерения.",
        "Compare channels and campaigns using consistent definitions.",
      ),
    ],
    scope: [
      tr(
        "Marketinq strategiyası, auditoriya təhlili və kanal seçimi",
        "Маркетинговая стратегия, анализ аудитории и выбор каналов",
        "Marketing strategy, audience analysis and channel selection",
      ),
      tr(
        "Google Ads, Meta Ads və TikTok Ads ilə nəticəyə yönəlmiş reklam",
        "Performance-кампании в Google Ads, Meta Ads и TikTok Ads",
        "Performance campaigns across Google Ads, Meta Ads and TikTok Ads",
      ),
      tr(
        "SEO, sosial media və kreativ kampaniyalar",
        "SEO, социальные сети и креативные кампании",
        "SEO, social media and creative campaigns",
      ),
      tr(
        "Konversiyanın optimallaşdırılması (CRO) və marketinq analitikası",
        "Оптимизация конверсии (CRO) и маркетинговая аналитика",
        "Conversion rate optimisation (CRO) and marketing analytics",
      ),
    ],
    handover: [
      tr(
        "Mövcud kanalların auditi və kanal strategiyası",
        "Аудит каналов и стратегия их использования",
        "Channel audit and channel strategy",
      ),
      tr(
        "Kampaniyaların strukturu və kreativ tapşırıqlar",
        "Структура кампаний и задания для креативов",
        "Campaign structure and creative briefs",
      ),
      tr(
        "Testlərin, ölçmələrin və hesabatların planı",
        "План тестов, измерений и отчётности",
        "Testing, measurement and reporting plan",
      ),
    ],
    examples: [
      {
        title: tr(
          "Yeni məhsul üçün tələb",
          "Спрос на новый продукт",
          "Demand for a new product",
        ),
        description: tr(
          "Bir auditoriya üçün iki mesajı yoxlamaq və nəticəni uyğun müraciətlərin dəyərinə görə müqayisə etmək.",
          "Проверить два сообщения на одной аудитории и сравнить стоимость подходящего обращения.",
          "Test two messages with one audience and compare the cost of a qualified enquiry.",
        ),
      },
      {
        title: tr(
          "Səbətdə yarımçıq qalan sifariş",
          "Незавершённый заказ",
          "An unfinished checkout",
        ),
        description: tr(
          "Səbətdən ödənişə qədər addımları ölçmək və ən çox itki olan mərhələdə dəyişikliyi sınaqdan keçirmək.",
          "Измерить шаги от корзины до оплаты и проверить изменение на этапе с наибольшими потерями.",
          "Measure each step from basket to payment, then test a change at the largest drop-off.",
        ),
      },
    ],
    approach: tr(
      "Əvvəlcə mövcud kanalları və ölçmə imkanlarını yoxlayırıq. Bir fərziyyəni seçir, sınaq meyarını razılaşdırır, sonra nəticəyə görə növbəti addımı planlaşdırırıq.",
      "Проверяем текущие каналы и измерения. Выбираем гипотезу, согласуем критерий теста и планируем следующий шаг по его результату.",
      "Review current channels and measurement, choose a hypothesis and agree on how to test it. Use the result to plan the next change.",
    ),
    faq: [
      [
        tr(
          "Bir kanalla başlamaq olar?",
          "Можно начать с одного канала?",
          "Can we start with one channel?",
        ),
        tr(
          "Bəli. Bir auditoriya, bir təklif və izlənə bilən məqsəd seçirik ki, sınağın nəticəsini şərh etmək mümkün olsun.",
          "Да. Для первого теста выбираем одну аудиторию, одно предложение и измеримую цель.",
          "Yes. Pick one audience, one offer and a measurable goal so the first test is easy to interpret.",
        ),
      ],
      [
        tr(
          "KPI necə seçilir?",
          "Как определить KPI?",
          "How do we choose a KPI?",
        ),
        tr(
          "Göstəricini biznes qərarı ilə əlaqələndiririk. Satış komandası üçün bu, məsələn, uyğun müraciətin dəyəri ola bilər.",
          "Привязываем показатель к бизнес-решению. Для отдела продаж это может быть стоимость квалифицированного обращения.",
          "Tie the metric to a business decision. For a sales team, a useful starting point might be the cost of a qualified enquiry.",
        ),
      ],
      [
        tr(
          "Başlamaq üçün hansı məlumat lazımdır?",
          "Что нужно для начала?",
          "What do you need to start?",
        ),
        tr(
          "Məhsulun təsviri, auditoriya, kampaniya nümunələri və varsa satış məlumatı kifayətdir. Çatışmayan ölçmələri ayrıca qeyd edirik.",
          "Полезны описание продукта и аудитории, примеры кампаний и доступные данные о продажах. Пробелы в измерениях отмечаем отдельно.",
          "A product and audience description, sample campaigns and any available sales data. We document gaps in measurement separately.",
        ),
      ],
    ],
  },
  {
    slug: "ai-automation",
    name: tr("AI avtomatlaşdırma", "AI-автоматизация", "AI automation"),
    summary: tr(
      "Sorğunun qəbulundan növbəti əməliyyata qədər təkrarlanan addımları əlaqələndiririk. İstisnalar üçün məsul əməkdaşa aydın ötürmə yolu qururuq.",
      "Связываем повторяющиеся шаги от входящего запроса до следующего действия. Для исключений предусматриваем передачу ответственному сотруднику.",
      "Connect recurring steps from an incoming request to its next action. Give exceptions a clear route to a person.",
    ),
    fit: tr(
      "Komanda eyni məlumatı bir neçə sistemə əl ilə köçürür.",
      "Команда вручную переносит одни и те же данные между системами.",
      "People repeatedly copy the same information between tools.",
    ),
    problems: [
      tr(
        "Müraciətləri məzmununa görə ayırmaq və məsul şəxsi təyin etmək.",
        "Разбирать обращения по содержанию и назначать ответственного.",
        "Sort incoming requests by topic and assign an owner.",
      ),
      tr(
        "CRM-ə məlumat daxil etməklə bağlı təkrar işi azaltmaq.",
        "Сократить повторный ввод данных в CRM.",
        "Reduce duplicate data entry in the CRM.",
      ),
      tr(
        "Cavab gecikəndə və ya qayda işləməyəndə komandanı xəbərdar etmək.",
        "Уведомлять команду о задержках и сбоях правил.",
        "Notify the team when a reply is late or a rule fails.",
      ),
    ],
    scope: [
      tr(
        "İş axınları, AI agentləri və CRM inteqrasiyası",
        "Рабочие процессы, AI-агенты и интеграция CRM",
        "Workflows, AI agents and CRM integration",
      ),
      tr(
        "Müraciətlərin təsnifatı, çatbotlar və dəstək",
        "Квалификация обращений, чат-боты и поддержка",
        "Enquiry qualification, chatbots and customer support",
      ),
      tr(
        "Marketinq əməliyyatları və AI dəstəkli ünsiyyət",
        "Маркетинговые операции и AI-коммуникации",
        "Marketing automation and AI-assisted communication",
      ),
      tr(
        "Hesabatlar, xətaların izlənməsi və prosesin təkmilləşdirilməsi",
        "Отчётность, контроль ошибок и оптимизация процесса",
        "Reporting, error monitoring and process optimisation",
      ),
    ],
    handover: [
      tr(
        "Proses xəritəsi, qaydalar və istisnalar",
        "Карта процесса, правила и исключения",
        "Process map, rules and exception paths",
      ),
      tr(
        "İşlək avtomatlaşdırma və əməkdaşa ötürmə qaydası",
        "Рабочая автоматизация и передача человеку",
        "A working workflow with a human handoff",
      ),
      tr(
        "Əməliyyat jurnalı və komanda üçün təlimat",
        "Журнал операций и инструкция для команды",
        "An activity log and operating instructions",
      ),
    ],
    examples: [
      {
        title: tr(
          "Müraciətdən CRM kartına",
          "Из обращения в карточку CRM",
          "From enquiry to CRM",
        ),
        description: tr(
          "Sorğunun mövzusunu müəyyən etmək, kart açmaq və uyğun mütəxəssisə tapşırıq yaratmaq.",
          "Определить тему запроса, создать карточку и назначить задачу профильному специалисту.",
          "Classify an enquiry, create a record and assign a follow-up to the appropriate specialist.",
        ),
      },
      {
        title: tr(
          "Dəstək üçün cavab layihəsi",
          "Черновик ответа поддержки",
          "A support reply draft",
        ),
        description: tr(
          "Təsdiqlənmiş məlumatdan cavab layihəsi hazırlamaq və qeyri-müəyyən halları əməkdaşın yoxlamasına vermək.",
          "Составить черновик по утверждённой информации и передать неоднозначные вопросы на проверку сотруднику.",
          "Draft an answer from approved information and route uncertain cases to a team member for review.",
        ),
      },
    ],
    approach: tr(
      "Əvvəlcə təkrarlanan bir prosesi xəritələndiririk. Qaydaları nümunələr üzərində yoxlayır, sonra giriş icazələrini məhdudlaşdıraraq avtomatlaşdırmanı qoşuruq.",
      "Начинаем с карты одного повторяющегося процесса. Проверяем правила на примерах и подключаем автоматизацию с необходимыми правами доступа.",
      "Map one recurring process. Test its rules against examples, then connect the workflow using only the access it needs.",
    ),
    faq: [
      [
        tr(
          "Hansı proses uyğundur?",
          "Какие процессы подходят?",
          "Which processes are a good fit?",
        ),
        tr(
          "Təkrarlanan, giriş və nəticəsi aydın olan işlər. Qərar subyektivdirsə, avtomatlaşdırma ilkin materialı hazırlaya, son qərarı isə əməkdaş verə bilər.",
          "Повторяемые задачи с понятным входом и результатом. Если решение субъективно, система может готовить материал для проверки человеком.",
          "Repeatable tasks with clear inputs and outputs. For subjective decisions, the workflow can prepare a draft for a person to review.",
        ),
      ],
      [
        tr(
          "Mövcud CRM ilə işləyə bilərsiniz?",
          "Можно использовать существующую CRM?",
          "Can we use our existing CRM?",
        ),
        tr(
          "Əvvəlcə API imkanlarını, giriş hüquqlarını və sahələrin strukturunu yoxlayırıq. İnteqrasiyanın həcmi bu yoxlamadan sonra müəyyən olunur.",
          "Сначала проверяем API, разрешения и структуру полей. По результату определяем доступный объём интеграции.",
          "First check the API, access permissions and field structure. Those findings determine what the integration can cover.",
        ),
      ],
      [
        tr(
          "Xəta olduqda nə baş verir?",
          "Что происходит при ошибке?",
          "What happens when a step fails?",
        ),
        tr(
          "Razılaşdırılmış qaydaya uyğun olaraq əməliyyat dayanır, hadisə jurnala yazılır və məsul şəxsə ötürülür. Təkrar cəhd üçün ayrıca şərt müəyyən edilir.",
          "По согласованному правилу действие останавливается, событие записывается в журнал, а запрос передаётся ответственному. Условия повторной попытки задаются отдельно.",
          "The agreed exception rule can stop the action, log the event and alert an owner. Retry conditions are defined explicitly.",
        ),
      ],
    ],
  },
  {
    slug: "ai-architecture",
    name: tr("AI arxitekturası", "AI-архитектура", "AI architecture"),
    summary: tr(
      "Məlumatların, modellərin və biznes alətlərinin necə əlaqələnəcəyini layihələndiririk. Sistemin keyfiyyətini, giriş hüquqlarını və istismar xərclərini əvvəlcədən nəzərə alırıq.",
      "Проектируем связи между данными, моделями и бизнес-системами. Заранее определяем требования к качеству, правила доступа и способ оценивать расходы.",
      "Design how data, models and business tools work together. Define quality checks, permissions and a way to track operating costs.",
    ),
    fit: tr(
      "AI alətini mövcud məlumat və əməliyyat sistemlərinə bağlamaq lazımdır.",
      "Нужно связать AI-инструмент с существующими данными и операционными системами.",
      "An AI tool needs to work with existing data and operational systems.",
    ),
    problems: [
      tr(
        "Məlumatın hansı mənbədən və hansı icazə ilə gələcəyini müəyyənləşdirmək.",
        "Определить источники данных и права на их использование.",
        "Define data sources and the permissions needed to use them.",
      ),
      tr(
        "Modelin hansı qərarlarda iştirak edəcəyini və cavabın necə yoxlanacağını seçmək.",
        "Выбрать роль модели и способ проверки её ответа.",
        "Decide where a model belongs and how to verify its output.",
      ),
      tr(
        "Xəta, gecikmə və artan istifadə xərclərini izləmək.",
        "Наблюдать за ошибками, задержками и стоимостью использования.",
        "Make errors, latency and usage costs observable.",
      ),
    ],
    scope: [
      tr(
        "AI strategiyası, sistem dizaynı, LLM və lazım olduqda RAG",
        "AI-стратегия, проектирование систем, LLM и RAG при необходимости",
        "AI strategy, system design, LLMs and RAG when needed",
      ),
      tr(
        "API, məlumat axınları, CRM və ERP inteqrasiyaları",
        "API, потоки данных и интеграции CRM и ERP",
        "APIs, data flows and CRM and ERP integrations",
      ),
      tr(
        "Agentlərin koordinasiyası, infrastruktur və giriş hüquqları",
        "Оркестрация агентов, инфраструктура и управление доступом",
        "Agent orchestration, infrastructure and access controls",
      ),
    ],
    handover: [
      tr(
        "Sistem sxemi və məlumatlara tələblər",
        "Схема системы и требования к данным",
        "System diagram and data requirements",
      ),
      tr(
        "İnteqrasiya müqavilələri və giriş matrisi",
        "Контракты интеграций и матрица доступов",
        "Integration contracts and a permissions matrix",
      ),
      tr(
        "Keyfiyyətin qiymətləndirilməsi, miqyaslama və xərc planı",
        "Оценка качества, план масштабирования и расходов",
        "An evaluation plan, scaling approach and cost plan",
      ),
    ],
    examples: [
      {
        title: tr(
          "Daxili sənədlərlə iş",
          "Работа с внутренними документами",
          "Working with internal documents",
        ),
        description: tr(
          "İcazə verilmiş sənədlərdən uyğun hissələri tapmaq və cavabı mənbə ilə birlikdə yoxlamaya təqdim etmək.",
          "Подбирать фрагменты доступных сотруднику документов и показывать черновик ответа вместе с источниками.",
          "Retrieve relevant passages from documents a person can access and present a sourced draft for review.",
        ),
      },
      {
        title: tr(
          "Sistemlər arasında sorğu",
          "Запрос между системами",
          "A request across systems",
        ),
        description: tr(
          "CRM sorğusunu ERP məlumatı ilə əlaqələndirmək və əməliyyatı təsdiqdən sonra icra etmək.",
          "Связать запрос из CRM с данными ERP и выполнять действие после подтверждения.",
          "Connect a CRM request to ERP data and execute the action once it has been approved.",
        ),
      },
    ],
    approach: tr(
      "Məlumat mənbələrini və məhdudiyyətləri qeyd edirik. Seçilmiş nümunələrlə kiçik bir prototipi yoxlayır, nəticəyə görə arxitekturanı və qəbul meyarlarını dəqiqləşdiririk.",
      "Описываем источники и ограничения. Проверяем небольшой прототип на согласованных примерах, затем уточняем архитектуру и критерии приёмки.",
      "Map the sources and constraints, then test a small prototype against agreed examples. Use the findings to refine the architecture and acceptance criteria.",
    ),
    faq: [
      [
        tr(
          "Mövcud sistemlərdən istifadə etmək mümkündür?",
          "Можно сохранить существующие системы?",
          "Can we keep our existing systems?",
        ),
        tr(
          "Əvvəlcə mövcud CRM, ERP və məlumat anbarlarının imkanlarına baxırıq. Uyğun interfeyslər varsa, onları layihəyə daxil edirik.",
          "Начинаем с возможностей действующих CRM, ERP и хранилищ. При наличии подходящих интерфейсов включаем их в схему.",
          "Start by reviewing your CRM, ERP and data stores. Where suitable interfaces exist, include them in the design.",
        ),
      ],
      [
        tr(
          "RAG həmişə lazımdır?",
          "Всегда ли нужен RAG?",
          "Is RAG always necessary?",
        ),
        tr(
          "RAG sənədlərdəki məlumatı tapıb modelə ötürmək lazım olduqda faydalıdır. Strukturlaşdırılmış sorğu üçün birbaşa API daha sadə ola bilər.",
          "RAG полезен, когда модели нужны фрагменты документов. Для структурированного запроса может быть достаточно прямого обращения к API.",
          "RAG helps when a model needs to retrieve relevant document passages. A structured request may only need a direct API call.",
        ),
      ],
      [
        tr(
          "Keyfiyyət necə yoxlanılır?",
          "Как оценивается качество?",
          "How is quality evaluated?",
        ),
        tr(
          "Nümunə tapşırıqlar və gözlənilən cavablarla sınaq dəsti qururuq. Dəqiqliyi, icazələri, cavab vaxtını və xəta halındakı davranışı yoxlayırıq.",
          "Собираем контрольные задачи и ожидаемые ответы. Проверяем корректность, права доступа, время ответа и поведение при ошибке.",
          "Build an evaluation set with representative tasks and expected results. Check correctness, permissions, latency and failure handling.",
        ),
      ],
    ],
  },
  {
    slug: "data-analytics",
    name: tr(
      "Məlumat və analitika",
      "Данные и аналитика",
      "Data and analytics",
    ),
    summary: tr(
      "Mənbələrdəki məlumatları ortaq göstəricilərə çeviririk. Komanda hər hesabatın hansı suala cavab verdiyini və rəqəmin necə hesablandığını görə bilir.",
      "Сводим источники в согласованные показатели. Команда видит, на какой вопрос отвечает отчёт и как рассчитывается каждое число.",
      "Turn data from separate sources into agreed measures. Give the team a clear question for each report and a definition for each number.",
    ),
    fit: tr(
      "Hesabatlardakı rəqəmlər fərqlənir və qərar vermək üçün onları əllə tutuşdurursunuz.",
      "Цифры в отчётах расходятся, и перед каждым решением их приходится сверять вручную.",
      "Reports disagree and every decision starts with a manual reconciliation.",
    ),
    problems: [
      tr(
        "Müxtəlif mənbələrdə eyni göstəricinin niyə fərqləndiyini tapmaq.",
        "Найти причины расхождений одного показателя в разных источниках.",
        "Explain why the same metric differs across sources.",
      ),
      tr(
        "Analitika hadisələrini satış və əməliyyat nəticələri ilə əlaqələndirmək.",
        "Связать события аналитики с продажами и операционными результатами.",
        "Connect analytics events with sales and operational outcomes.",
      ),
      tr(
        "Komandanın qərarlarına uyğun hesabat və yenilənmə qaydası qurmaq.",
        "Настроить отчёт и частоту обновления под решения команды.",
        "Set the reporting view and refresh cycle around decisions the team makes.",
      ),
    ],
    scope: [
      tr(
        "BI, idarəetmə panelləri və vizuallaşdırma",
        "BI, дашборды и визуализация",
        "BI, dashboards and data visualisation",
      ),
      tr(
        "GA4, konversiyalar, atribusiya və satış huniləri",
        "GA4, конверсии, атрибуция и воронки",
        "GA4, conversions, attribution and funnels",
      ),
      tr(
        "KPI qaydaları, hesabatlılıq və optimallaşdırma",
        "Определения KPI, отчётность и оптимизация",
        "KPI definitions, reporting and optimisation",
      ),
    ],
    handover: [
      tr(
        "Ölçmə planı və hadisələr xəritəsi",
        "План измерения и карта событий",
        "Measurement plan and event map",
      ),
      tr(
        "Məlumat keyfiyyəti yoxlamasının nəticələri",
        "Результаты проверки качества данных",
        "Data quality findings",
      ),
      tr(
        "İdarəetmə paneli və hesabat qaydası",
        "Дашборд и регламент отчётности",
        "A dashboard and reporting routine",
      ),
    ],
    examples: [
      {
        title: tr(
          "Kanaldan satışa qədər",
          "От канала до продажи",
          "From channel to sale",
        ),
        description: tr(
          "Reklam xərcləri ilə CRM mərhələlərini ortaq identifikatorla tutuşdurub kanalları razılaşdırılmış atribusiya qaydasına görə müqayisə etmək.",
          "Сопоставить рекламные расходы и этапы CRM по общему идентификатору и сравнить каналы по согласованной модели атрибуции.",
          "Match ad spend to CRM stages through a shared identifier and compare channels using an agreed attribution rule.",
        ),
      },
      {
        title: tr(
          "Əməliyyat hesabatı",
          "Операционный отчёт",
          "An operations report",
        ),
        description: tr(
          "Sorğunun daxil olmasından bağlanmasına qədər keçən vaxtı ölçmək və gecikmələrin hansı mərhələdə toplandığını görmək.",
          "Измерять путь запроса от поступления до закрытия и видеть этап, на котором накапливаются задержки.",
          "Measure the time from request to resolution and identify the stage where delays build up.",
        ),
      },
    ],
    approach: tr(
      "Hesabatın dəstəkləyəcəyi qərarı müəyyənləşdiririk. Mənbələri yoxlayır, hadisələri və göstərici qaydalarını sənədləşdirir, paneli nümunə nəticələrlə tutuşdururuq.",
      "Определяем решение, для которого нужен отчёт. Проверяем источники, описываем события и правила расчёта, сверяем дашборд с контрольными примерами.",
      "Identify the decision the report needs to support. Audit the sources, document events and metric definitions, then reconcile the dashboard with sample records.",
    ),
    faq: [
      [
        tr(
          "Bir neçə mənbəni birləşdirmək olar?",
          "Можно объединить несколько источников?",
          "Can we combine several sources?",
        ),
        tr(
          "Bəli, ortaq açar, tarix və vaxt zonası razılaşdırıldıqda. Uyğunlaşdırılması mümkün olmayan hissələri ayrıca göstəririk.",
          "Да, если согласованы ключи, даты и часовые пояса. Данные, которые нельзя надёжно сопоставить, помечаем отдельно.",
          "Yes, when identifiers, dates and time zones can be reconciled. Data that cannot be matched reliably is marked separately.",
        ),
      ],
      [
        tr(
          "Məlumat natamamdırsa nə edirsiniz?",
          "Что делать с неполными данными?",
          "What if the data is incomplete?",
        ),
        tr(
          "Boşluqları və onların hesablamaya təsirini göstəririk. Hesabatın əhatə dairəsini qeyd edir və sonrakı toplama qaydasını razılaşdırırıq.",
          "Показываем пробелы и их влияние на расчёт. Обозначаем покрытие отчёта и договариваемся, как собирать недостающие данные.",
          "Expose the gaps and their effect on the calculation. State the report’s coverage and agree on how to collect missing data going forward.",
        ),
      ],
      [
        tr(
          "Hansı KPI ilə başlamaq lazımdır?",
          "С каких KPI начать?",
          "Which KPIs should we start with?",
        ),
        tr(
          "Əvvəlcə göstəriciyə baxaraq kimin hansı qərarı verəcəyini soruşuruq. Sonra onun hesablanma qaydasını, mənbəyini və məsul şəxsi müəyyən edirik.",
          "Сначала выясняем, кто и какое решение примет по показателю. Затем фиксируем формулу, источник и ответственного.",
          "Start with who will make a decision and what they will decide. Then document the metric’s formula, source and owner.",
        ),
      ],
    ],
  },
];
