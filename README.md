# Руководство по запуску проекта AKVPN

## Информация о проекте

**Сайт проекта**: [AKVPN - Бесплатный VPN сервис](https://akvpn.lovable.app)

**Автор**: [Ваше имя/никнейм или название команды]

## Как редактировать этот проект?

### Способ 1: Через Lovable
1. Перейдите в [Lovable Project](https://lovable.dev/projects/aeb3df22-dfab-4328-9ac3-97e9ee0e31ae)
2. Используйте подсказки для внесения изменений
3. Все изменения автоматически сохранятся в репозиторий

### Способ 2: Локальная разработка
Для работы на своем компьютере:

1. Установите Node.js и npm (рекомендуем через [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
2. Выполните в терминале:

```sh
# Клонируем репозиторий
git clone  https://github.com/TETRIX8/akvpn.git
# Переходим в папку проект
cd akvpn-project

# Устанавливаем зависимости
npm install

# Запускаем сервер разработки
npm run dev
```

После этого проект будет доступен по адресу `http://localhost:5173`

### Способ 3: Прямое редактирование в GitHub
1. Найдите нужный файл в репозитории
2. Нажмите иконку карандаша (Edit)
3. Внесите изменения и сохраните (Commit)

### Способ 4: Использование GitHub Codespaces
1. Откройте главную страницу репозитория
2. Нажмите зеленую кнопку "Code"
3. Выберите вкладку "Codespaces"
4. Создайте новое окружение кнопкой "New codespace"
5. Редактируйте файлы прямо в браузере

## Описание проекта AKVPN

AKVPN - это демонстрационный проект VPN-сервиса с:
- Бесплатными ключами доступа
- Простым интерфейсом подключения
- Быстрыми серверами
- Защитой приватности

**Основной URL**: [https://akvpn.lovable.app](https://akvpn.lovable.app)

## Используемые технологии
- **Vite** - быстрый сборщик проекта
- **TypeScript** - язык программирования
- **React** - библиотека для интерфейсов
- **shadcn-ui** - компоненты интерфейса
- **Tailwind CSS** - стилизация



## Использование собственного домена

В текущей версии Lovable не поддерживает кастомные домены. Для развертывания под своим доменом рекомендуем использовать Netlify. Подробнее в [документации](https://docs.lovable.dev/tips-tricks/custom-domain/).
