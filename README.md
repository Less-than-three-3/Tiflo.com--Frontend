# Tiflo.com Frontend

### Get Started (dev)

Для всего этого шаманства нужен NodeJS (у меня версия 18.15.0, можно и старше по идее)

Если его нет, то ставим. [вот ссылка на инструкцию](https://nodejs.org/en/download/package-manager)

Проверяем NodeJS командой `node -v`

1. Клонируем репу `git clone https://github.com/Less-than-three-3/Tiflo.com--Frontend.git`
2. В корне проекта устанавливаем зависимости `npm install`
3. Для разработки нужно две команды (выполняем также в корне проекта):
    - `npm run start` - запускаем сервер фронта
    - `npm run tw-w` - запускаем watcher тайлвинда. Нужен для автоматической генерации стилей из css-файлов и из верстки. 
