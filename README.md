# Weather widget

Стек:
- Vue3
- Typescript
- Webpack + Babel
- SCSS

**Dev mode**:
```bash
npm run dev
```

**Production build**
```bash
npm run build
```

**Использование виджета**:
```html
<weather-widget api-key="<API_KEY_OPENWEATHERMAP>" layout="column | row (default - column)" />
<script type="text/javascript" src="weather-widget.js" />
```

Проект собирается в один файл, с стилями внутри билда (корневой компонент объявляется как customElement). Финальный билд лежит в корне репозитория.

**Ключевые возможности**
- Просмотр погоды по нескольким городам
- Добавление городов через настройки (настройки сохраняются в localStorage)
- Порядок городов можно изменить через drag-and-drop сортировку
- При добавлении города валидируется название через Openweather API, сохраняется с названием страны