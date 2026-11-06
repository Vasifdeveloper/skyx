import type { ContactCopy, ContactLocale } from "./shared";

export const contactCopy: Record<ContactLocale, ContactCopy> = {
  az: {
    label: "Əlaqə",
    title: "Növbəti addımı birlikdə ataq.",
    intro: "Həll etmək istədiyiniz məsələni qısaca təsvir edin.",
    formTitle: "Layihəniz haqqında",
    optional: "istəyə görə",
    form: {
      name: "Adınız",
      company: "Şirkət",
      email: "E-poçt",
      phone: "Telefon",
      service: "Xidmət",
      project: "Layihə haqqında",
      consent: "Sorğuma cavab verilməsi üçün məlumatlarımın emalına razıyam.",
    },
    services: {
      "digital-marketing": "Rəqəmsal marketinq",
      "ai-automation": "AI avtomatlaşdırma",
      "ai-architecture": "AI arxitekturası",
      "data-analytics": "Məlumat və analitika",
      other: "Digər",
    },
    choose: "İstiqaməti seçin",
    example: "Bu gün hansı prosesi təkmilləşdirmək istəyirsiniz?",
    privacy: "Məxfilik siyasəti",
    send: "Sorğunu göndər",
    sending: "Göndərilir…",
    noJs: "Bizə e-poçt və ya WhatsApp vasitəsilə yaza, yaxud zəng edə bilərsiniz.",
    errors: {
      name: "Adınız 2–120 simvoldan ibarət olmalıdır.",
      company: "Şirkətin adını 160 simvoladək qısaldın.",
      email: "Etibarlı e-poçt ünvanı daxil edin (ən çox 254 simvol).",
      phone: "Ölkə kodu ilə 7–15 rəqəm daxil edin.",
      service: "Siyahıdan bir istiqamət seçin.",
      project: "Layihəni 20–3000 simvolla təsvir edin.",
      consent: "Göndərmək üçün məlumatların emalına razılıq verin.",
    },
    status: {
      accepted:
        "Məktub xidməti sorğunuzu qəbul etdi. Göstərdiyiniz e-poçt ünvanına cavab verəcəyik.",
      tested: "Sınaq sorğusu qəbul edildi. E-poçt göndərilmədi.",
      validation: "İşarələnmiş sahələri yoxlayın.",
      limited:
        "Qısa müddətdə çoxlu sorğu göndərilib. 15 dəqiqə sonra yenidən cəhd edin.",
      unavailable:
        "Forma hazırda əlçatan deyil. E-poçt və ya WhatsApp vasitəsilə bizimlə əlaqə saxlayın.",
      provider:
        "Məktub xidməti sorğunu qəbul etmədi. Bir qədər sonra yenidən cəhd edin.",
      unknown:
        "Məktub xidmətindən təsdiq alınmadı. Eyni sorğunu dəyişmədən yenidən yoxlaya bilərsiniz.",
      network:
        "Şəbəkə bağlantısı kəsildi. Bağlantını yoxlayın və eyni sorğunu dəyişmədən təkrar göndərin.",
      expired:
        "Bu cəhdin vəziyyətini artıq təhlükəsiz yoxlamaq olmur. E-poçt və ya WhatsApp vasitəsilə bizimlə əlaqə saxlayın.",
      invalidRequest:
        "Sorğunu yoxlamaq mümkün olmadı. E-poçt və ya WhatsApp vasitəsilə bizə yazın.",
    },
  },
  ru: {
    label: "Контакты",
    title: "Обсудим ваш следующий шаг.",
    intro: "Кратко опишите задачу, которую вы хотите решить.",
    formTitle: "О вашем проекте",
    optional: "необязательно",
    form: {
      name: "Имя",
      company: "Компания",
      email: "Электронная почта",
      phone: "Телефон",
      service: "Услуга",
      project: "О проекте",
      consent: "Я соглашаюсь на обработку данных для ответа на мою заявку.",
    },
    services: {
      "digital-marketing": "Цифровой маркетинг",
      "ai-automation": "AI-автоматизация",
      "ai-architecture": "AI-архитектура",
      "data-analytics": "Данные и аналитика",
      other: "Другое",
    },
    choose: "Выберите направление",
    example: "Какой процесс вы хотите улучшить?",
    privacy: "Политика конфиденциальности",
    send: "Отправить заявку",
    sending: "Отправляем…",
    noJs: "Напишите нам по электронной почте или в WhatsApp либо позвоните.",
    errors: {
      name: "Имя должно содержать от 2 до 120 символов.",
      company: "Сократите название компании до 160 символов.",
      email: "Укажите корректный адрес длиной до 254 символов.",
      phone: "Введите от 7 до 15 цифр с кодом страны.",
      service: "Выберите направление из списка.",
      project: "Опишите задачу в пределах 20–3000 символов.",
      consent: "Для отправки подтвердите согласие на обработку данных.",
    },
    status: {
      accepted:
        "Почтовый сервис принял заявку. Ответим на указанную вами почту.",
      tested: "Тестовая заявка принята. Письмо не отправлялось.",
      validation: "Проверьте отмеченные поля.",
      limited:
        "Слишком много запросов за короткое время. Повторите попытку через 15 минут.",
      unavailable:
        "Форма сейчас недоступна. Напишите нам по электронной почте или в WhatsApp.",
      provider: "Почтовый сервис отклонил запрос. Попробуйте ещё раз позже.",
      unknown:
        "Подтверждение от почтового сервиса не получено. Вы можете повторно проверить ту же заявку без изменений.",
      network:
        "Связь прервалась. Проверьте подключение и повторите отправку с тем же текстом.",
      expired:
        "Безопасно проверить статус этой попытки уже нельзя. Свяжитесь с нами по электронной почте или в WhatsApp.",
      invalidRequest:
        "Не удалось проверить запрос. Свяжитесь с нами по электронной почте или в WhatsApp.",
    },
  },
  en: {
    label: "Contact",
    title: "Let’s discuss your next step.",
    intro: "Tell us briefly about the problem you want to solve.",
    formTitle: "Your project",
    optional: "optional",
    form: {
      name: "Name",
      company: "Company",
      email: "Email",
      phone: "Phone",
      service: "Service",
      project: "About your project",
      consent:
        "I agree to the processing of my details so SKYX can respond to this enquiry.",
    },
    services: {
      "digital-marketing": "Digital marketing",
      "ai-automation": "AI automation",
      "ai-architecture": "AI architecture",
      "data-analytics": "Data and analytics",
      other: "Other",
    },
    choose: "Select a discipline",
    example: "Which process would you like to improve?",
    privacy: "Privacy policy",
    send: "Send enquiry",
    sending: "Sending…",
    noJs: "You can reach us directly by email, WhatsApp or phone.",
    errors: {
      name: "Enter a name between 2 and 120 characters.",
      company: "Use up to 160 characters for the company name.",
      email: "Enter a valid email address of up to 254 characters.",
      phone: "Enter 7–15 digits, including your country code.",
      service: "Choose an option from the list.",
      project: "Describe your project in 20–3000 characters.",
      consent: "Please give consent so we can respond to your enquiry.",
    },
    status: {
      accepted:
        "Our mail service accepted your enquiry. We’ll reply to the email address you provided.",
      tested: "Test enquiry accepted. No email was sent.",
      validation: "Check the marked fields.",
      limited: "Too many requests in a short time. Try again in 15 minutes.",
      unavailable:
        "The form is currently unavailable. Please contact us by email or WhatsApp.",
      provider:
        "The mail service declined the request. Please try again later.",
      unknown:
        "The mail service has not confirmed the result. Retry the same enquiry without editing it to check its status.",
      network:
        "The connection was interrupted. Check your connection and retry the same enquiry without changing it.",
      expired:
        "We can no longer safely verify this attempt. Contact us by email or WhatsApp.",
      invalidRequest:
        "We could not verify this request. Please reach us by email or WhatsApp.",
    },
  },
};
