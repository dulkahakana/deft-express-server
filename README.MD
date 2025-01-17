# Dictionary English Express JS server

### Обновление 1.5.0
Из репозитория (отслеживания git) была убрана папка **db** в которой находились *ENGLISH.JSON*, *ENGLISH_v2.JSON*.
Для работы сервера необходимо создать каталог **db** и поместить туда файл из каталога **db-template**: **DEFD-DB-teplate.JSON**
или прописать новый путь для словаря и имя файла словаря в **defd-server.js**

## Немного о проекте
Я заполнял файл *ENGLISH.JSON* вручную, для лучшего запоминания слов.
После был написан *createNewJSONFormat.js* (нет на GitHub) для изменения структуры *ENGLISH.JSON*, для подготовки его к работе c сервером. 
Итоговый файл *ENGLISH_v2.JSON*, заменяет серверу базу данных.
Во время запроса происходит асинхронное чтение/запись и сортировка по ключу `english` - файла *ENGLISH_v2.JSON*.

## Запуск
`npm run start`

Сервер запускается по умолчанию на *http://localhost:5000*.
При запуске выдает в логах время запуска, используя *service/date.serviсe.js* и описание возможных запросов. Для вывода в консоль используется *service/mylog.service.js*.
## Роуты:
- **app.get()**
    1. `/` - собранное React приложение, [deft-react-app](https://github.com/dulkahakana/defd-react-app);
    2. `/dictionary/API` - все содержимое *ENGLISH_v2.JSON*;
    3. `/dictionary/API/sectionslist` - список названий секций (алфавит);
    4. `/dictionaty/API/quantitywords` - кол-во слов в словаре;
    5. `/dictionary/API/:section` - содержимое секции, переданной в параметрах. Выводит в консоль время запроса и имя, запрашиваемой секции;
- **app.post**
    1. `/dictionary/API` - добавляет переданное слово (объект {english, russian}) в словарь. Выводит в консоль время запроса и добавленное слово;
- **app.delete**
    1. `/dictionary/API` - удаляет переданное слово (объект {english, russian}) в словаре, используя значение `req.body.english`. Выводит в консоль время запроса и удаленное слово;


## Клиентская часть на React 18 [deft-react-app](https://github.com/dulkahakana/defd-react-app)
