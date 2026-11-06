export type Locale = "az" | "ru" | "en";
export type Localized = Readonly<Record<Locale, string>>;
export const tr = (az: string, ru: string, en: string): Localized => ({
  az,
  ru,
  en,
});

export const labels = {
  home: tr("Ana səhifə", "Главная", "Home"),
  about: tr("Studiya", "Студия", "Studio"),
  services: tr("Xidmətlər", "Услуги", "Services"),
  solutions: tr("Ssenarilər", "Сценарии", "Scenarios"),
  process: tr("Proses", "Процесс", "Process"),
  privacy: tr("Məxfilik", "Конфиденциальность", "Privacy"),
  cookies: tr(
    "Kukilər və yaddaş",
    "Cookies и хранилище",
    "Cookies and storage",
  ),
  crumb: tr("Səhifənin yeri", "Путь к странице", "Breadcrumb"),
  contents: tr("Bu səhifədə", "На этой странице", "On this page"),
  principles: tr(
    "İş prinsiplərimiz",
    "Как мы принимаем решения",
    "How we make decisions",
  ),
  servicesMore: tr("Bütün xidmətlər", "Все услуги", "All services"),
  serviceMore: tr("Xidmət haqqında", "Об услуге", "Explore service"),
  when: tr("Hansı halda", "Когда подходит", "When it fits"),
  issues: tr(
    "Həll etdiyimiz məsələlər",
    "Задачи, с которыми помогаем",
    "Problems we work on",
  ),
  scope: tr("İşin tərkibi", "Состав работ", "Scope of work"),
  deliverables: tr(
    "Sizə nə təhvil verilir",
    "Что вы получаете",
    "What you receive",
  ),
  use: tr(
    "Mümkün tətbiq ssenariləri",
    "Возможные сценарии применения",
    "Possible applications",
  ),
  approach: tr("İşi necə qururuq", "Как строится работа", "How we approach it"),
  processMore: tr(
    "İş prosesinə baxın",
    "Как проходит проект",
    "Explore the process",
  ),
  faq: tr(
    "Tez-tez verilən suallar",
    "Частые вопросы",
    "Frequently asked questions",
  ),
  overview: tr("İstiqamətlər", "Направления", "Disciplines"),
  sectors: tr("Sahələr", "Отрасли", "Industries"),
  chain: tr("Mümkün iş axını", "Возможная цепочка", "Possible workflow"),
  metrics: tr(
    "İzlənə bilən göstəricilər",
    "Что можно измерять",
    "What you could measure",
  ),
  activities: tr("Nə edirik", "Что делаем", "What we do"),
  input: tr("Başlamaq üçün", "Что нужно для начала", "What we need"),
  output: tr("Mərhələnin nəticəsi", "Итог этапа", "What you leave with"),
  contactTitle: tr(
    "Növbəti addımı birlikdə ataq.",
    "Обсудим ваш следующий шаг.",
    "Let’s discuss your next step.",
  ),
  contactLead: tr(
    "Həll etmək istədiyiniz məsələni və hazırda istifadə etdiyiniz alətləri qısaca təsvir edin.",
    "Кратко опишите задачу и инструменты, которыми уже пользуетесь.",
    "Tell us what you want to change and which tools you use today.",
  ),
  contact: tr(
    "Layihəni müzakirə edək",
    "Обсудить проект",
    "Discuss your project",
  ),
  emailAction: tr("Bizə yazın", "Написать в студию", "Email the studio"),
  jump: tr("Bölməyə keç", "Перейти к разделу", "Jump to section"),
};

export const pages = {
  about: {
    label: labels.about,
    title: tr(
      "Rəqəmsal inkişaf studiyası.",
      "Студия цифрового роста.",
      "A digital growth studio.",
    ),
    lead: tr(
      "SKYX marketinqi, AI alətlərini, avtomatlaşdırmanı və analitikanı birləşdirir. İşə istifadə etdiyiniz sistemlərdən və biznesinizin həll etmək istədiyi məsələdən başlayırıq.",
      "SKYX объединяет маркетинг, AI, автоматизацию и аналитику. Мы начинаем с задачи бизнеса и изучаем системы, которыми команда уже пользуется.",
      "SKYX connects marketing, AI, automation and analytics. We start with the problem your business needs to solve and the systems your team already uses.",
    ),
  },
  services: {
    label: labels.services,
    title: tr(
      "Bir məqsəd. Dörd istiqamət.",
      "Одна цель. Четыре направления.",
      "One goal. Four disciplines.",
    ),
    lead: tr(
      "İlk addımı ehtiyacınıza uyğun seçin. Bir istiqamətlə başlaya, sonra işi ortaq məlumat və proseslər üzərindən genişləndirə bilərsiniz.",
      "Выберите отправную точку по задаче. Можно начать с одного направления и подключать остальные по мере того, как для них появятся данные и процессы.",
      "Choose a starting point around the work you need to do. Begin with one discipline and connect the others as your data and processes develop.",
    ),
  },
  solutions: {
    label: labels.solutions,
    title: tr(
      "Biznesinizdə necə işləyə bilər?",
      "Как это может работать у вас.",
      "How it could work in your business.",
    ),
    lead: tr(
      "Altı sahə üçün mümkün ssenarilər. Hər nümunə bir məsələdən başlayır və prosesi qiymətləndirməyə kömək edən göstəricilərlə tamamlanır.",
      "Возможные сценарии для шести отраслей. Каждый пример связывает бизнес-задачу, последовательность действий и показатели, по которым можно оценить работу.",
      "Possible applications across six industries. Each example connects a business question to a sequence of actions and a set of measures you can track.",
    ),
  },
  process: {
    label: labels.process,
    title: tr(
      "Məqsəddən işləyən sistemə.",
      "От задачи к работающей системе.",
      "From a goal to a working system.",
    ),
    lead: tr(
      "Hər mərhələ növbəti qərar üçün material verir. Prioritetləri, məsul şəxsləri və nəticənin necə yoxlanacağını komandanızla razılaşdırırıq.",
      "Каждый этап даёт команде материал для следующего решения. Вместе определяем приоритеты, ответственных и способ проверить результат.",
      "Each step gives your team something to use in the next decision. Together we agree on priorities, ownership and how to check the result.",
    ),
  },
  privacy: {
    label: labels.privacy,
    title: tr("Məxfilik.", "Конфиденциальность.", "Privacy."),
    lead: tr(
      "Bu səhifə müraciət formasının hansı məlumatları qəbul etdiyini, onların necə istifadə olunduğunu və SKYX ilə necə əlaqə saxlaya biləcəyinizi izah edir.",
      "Здесь описано, какие данные принимает форма обращения, как они используются и куда обратиться с вопросом об обработке.",
      "This page explains what the enquiry form collects, how the information is used and how to contact SKYX about your enquiry.",
    ),
  },
  cookies: {
    label: labels.cookies,
    title: tr(
      "Kukilər və brauzer yaddaşı.",
      "Cookies и память браузера.",
      "Cookies and browser storage.",
    ),
    lead: tr(
      "Sayt hərəkət seçiminizi yadda saxlaya bilər. Dil səhifənin ünvanından oxunur, forma məlumatları isə brauzer yaddaşına yazılmır.",
      "Сайт может запомнить настройку движения. Язык определяется адресом страницы, а поля формы не записываются в постоянную память браузера.",
      "The site can remember your motion preference. Your language comes from the page address, and enquiry fields are kept out of persistent browser storage.",
    ),
  },
} as const;

export const principles = [
  [
    tr("Əlaqəli yanaşma", "Связанный подход", "Connect the work"),
    tr(
      "Reklamdan gələn müraciətin satış komandasına necə çatdığını izləyirik. Hər keçid üçün məlumatın formatını və məsul şəxsi razılaşdırırıq.",
      "Прослеживаем путь обращения от объявления до отдела продаж. Для каждой передачи определяем формат данных и ответственного.",
      "Follow an enquiry from an ad to the sales team. Agree on the handoff, the data format and the person responsible.",
    ),
  ],
  [
    tr(
      "Məlumata əsaslanan qərarlar",
      "Решения на основе данных",
      "Use evidence",
    ),
    tr(
      "Kampaniyanı və ya prosesi dəyişməzdən əvvəl başlanğıc göstəricini, onun mənbəyini və ölçmə qaydasını qeyd edirik.",
      "Перед изменением кампании или процесса фиксируем исходный показатель, его источник и правило расчёта.",
      "Before changing a campaign or workflow, document the baseline, its source and the rule used to measure it.",
    ),
  ],
  [
    tr(
      "Təkrarlanan işi azaltmaq",
      "Меньше ручной рутины",
      "Reduce repetitive work",
    ),
    tr(
      "Məlumatın əl ilə köçürüldüyü addımları tapırıq. Standart halları avtomatlaşdırır, istisnaları əməkdaşa yönləndiririk.",
      "Находим этапы с ручным переносом данных. Автоматизируем типовые действия и направляем исключения сотруднику.",
      "Identify where people repeatedly copy information. Automate routine steps and give exceptions a clear path to a person.",
    ),
  ],
  [
    tr(
      "Genişlənməyə hazır olmaq",
      "Возможность расширения",
      "Leave room to scale",
    ),
    tr(
      "Girişləri, çıxışları və icazələri təsvir edirik ki, növbəti kanal və ya məlumat mənbəyi mövcud sistemə qoşula bilsin.",
      "Описываем входы, выходы и права доступа, чтобы команда могла подключать новые каналы и источники к существующей системе.",
      "Document inputs, outputs and permissions so the team can add another channel or source to the existing system.",
    ),
  ],
  [
    tr(
      "Ölçərək təkmilləşdirmək",
      "Улучшение по измерениям",
      "Improve through measurement",
    ),
    tr(
      "İşə salındıqdan sonra göstəriciləri yoxlayırıq. Növbəti dəyişiklik üçün fərziyyəni və yoxlama meyarını əvvəlcədən müəyyənləşdiririk.",
      "После запуска сверяем показатели. Для следующего изменения заранее формулируем гипотезу и критерий её проверки.",
      "Review what happens after launch. For the next change, write down the hypothesis and decide how to evaluate it.",
    ),
  ],
] as const;

export const processSteps = [
  {
    title: tr("Araşdırırıq", "Изучаем", "Discover"),
    aim: tr(
      "Problemin harada yarandığını müəyyən edirik.",
      "Определяем, где возникает проблема.",
      "Find where the problem starts.",
    ),
    action: tr(
      "Komanda ilə danışır, müraciətin indiki yolunu və prosesdəki gecikmələri izləyirik.",
      "Обсуждаем задачу с командой, проходим путь обращения и находим задержки.",
      "Speak with the team, trace a real workflow and identify its points of friction.",
    ),
    input: tr(
      "Biznes məqsədi, mövcud prosesin təsviri və anonimləşdirilmiş nümunələr.",
      "Цель бизнеса, описание текущего процесса и обезличенные примеры.",
      "A business goal, a description of the current process and anonymised examples.",
    ),
    result: tr(
      "Məqsəd və proseslərin xəritəsi",
      "Карта целей и процессов",
      "A map of goals and processes",
    ),
  },
  {
    title: tr("Layihələndiririk", "Проектируем", "Design"),
    aim: tr(
      "İş axınını və onun sərhədlərini razılaşdırırıq.",
      "Согласуем схему работы и её границы.",
      "Agree on the design and its boundaries.",
    ),
    action: tr(
      "Alətlərin rolunu, inteqrasiya nöqtələrini, icazələri və qəbul meyarlarını müəyyənləşdiririk.",
      "Определяем роли инструментов, точки интеграции, доступы и критерии приёмки.",
      "Define the roles of each tool, integration points, permissions and acceptance criteria.",
    ),
    input: tr(
      "Proses xəritəsi, sistem məhdudiyyətləri və komandanın prioritetləri.",
      "Карта процесса, ограничения систем и приоритеты команды.",
      "The process map, system constraints and the team’s priorities.",
    ),
    result: tr(
      "İş planı və arxitektura",
      "План и архитектура",
      "A delivery plan and architecture",
    ),
  },
  {
    title: tr("Tətbiq edirik", "Внедряем", "Implement"),
    aim: tr(
      "Razılaşdırılmış həlli iş mühitinə gətiririk.",
      "Переносим согласованное решение в работу.",
      "Bring the agreed design into use.",
    ),
    action: tr(
      "İnteqrasiyaları qurur, adi halları və xətaları yoxlayır, komanda ilə birlikdə iş qaydasını sınaqdan keçiririk.",
      "Настраиваем интеграции, проверяем штатные и ошибочные сценарии, проходим новый процесс с командой.",
      "Configure integrations, test normal and exception paths, then walk the team through the workflow.",
    ),
    input: tr(
      "Təsdiqlənmiş sxem, zəruri giriş icazələri və sınaq nümunələri.",
      "Согласованная схема, необходимые доступы и тестовые примеры.",
      "The approved design, necessary access and representative test examples.",
    ),
    result: tr(
      "Təlimatı ilə birlikdə tətbiq edilmiş həll",
      "Внедрённое решение с инструкцией",
      "A working solution with operating instructions",
    ),
  },
  {
    title: tr("Təkmilləşdiririk", "Улучшаем", "Improve"),
    aim: tr(
      "Növbəti dəyişikliyi ölçmələrə əsasən seçirik.",
      "Выбираем следующее изменение по измерениям.",
      "Choose the next change from the evidence.",
    ),
    action: tr(
      "Nəticələri ilkin vəziyyətlə müqayisə edir, səhvləri və komandanın rəylərini nəzərə alırıq.",
      "Сравниваем показатели с исходными, разбираем ошибки и учитываем обратную связь команды.",
      "Compare observations with the baseline, investigate errors and collect feedback from the team.",
    ),
    input: tr(
      "İş jurnalı, razılaşdırılmış göstəricilər və istifadəçi rəyləri.",
      "Журнал работы, согласованные показатели и обратная связь пользователей.",
      "Operating logs, agreed measures and user feedback.",
    ),
    result: tr(
      "Hesabat və təkmilləşdirmə planı",
      "Отчёт и план улучшений",
      "A report and improvement plan",
    ),
  },
];
