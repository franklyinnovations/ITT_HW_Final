# IT Talents Финален проект

[Презентация](https://github.com/SmolnikovAM/ITT_HW_Final/blob/master/doc/presentation.pdf)

1.  Задача
2.  Архитектура и Requirements analysis
3.  Requirements analysis База дани
4.  Requirements analysis на видеа
5.  Технологии на FrontEnd и BackEnd
6.  Принцип на работа (SoftSkills)
7.  TODO
8.  Install & run

## Задача

* Логин и регистрация на
  потребител.
* Потребители
* Качване на клип.
* Създаване на плейлист с клипове.
* Преглед на качени клипове.
* Преглед на плейлисти.
* Търсене на клип, плейлист или на потребител по име.
* Подреждане по лайкове и дата на качване.
* Пускане на клип чрез плейър.
* Харесване, не харесване и репорт на клип.
* Коментари под клипа.
* Следване на потребител.
* Възможност за харесване нехаресване на коментар.
* Допълнително :
  1.  Логин чрез фейсбук и гугъл.
  2.  Шерване на клип във фейсбук.

## Архитектура и Requirements analysis

![](https://github.com/SmolnikovAM/ITT_HW_Final/blob/master/doc/tech.JPG)

## Requirements analysis База дани

![](https://github.com/SmolnikovAM/ITT_HW_Final/blob/master/doc/db.JPG)

## Requirements analysis на видеа

**Проблем:**

* Има ограничение за ползване на video и audio формати в браузери.
* User-а може да качи видеа с много голям размер.
* Слаба интернет връзка

**Решение:**

* Конвертация за всяко видео в един
  формат с различно качеството

**Бизнес-процесс**

1.  Качване на видеа
2.  Фонова конвертиртация
3.  Публикуване и нотификация на user

## Технологии на FrontEnd и BackEnd

Списък с използваните езици, технологии, библиотеки и патерни

1.  JavaScript
1.  CSS
1.  NodeJS
1.  Apache
1.  RESTful service
1.  Amazon Cloud Service
1.  Sqlite Database
1.  GitHub
1.  DBdesigner
1.  UML diagram
1.  AngularJS
1.  Bootstrap
1.  FFMPEG
1.  Passport JS
1.  Facebook SDK
1.  Patterns:
1.  Repository
1.  Singleton
1.  MVC

## Принцип на работа (SoftSkills)

**Проблем:**

* Голямо разстояние между членовете на екипа – различни градове
* Различни интереси и начини на изпъление на задачите
* Езикова бариера

**Решение:**

* Точно планиране на работа
* Правилно разпределение на задачите предвид силните страни на всеки един.
* Инструменти за бърза коммуникация
* Уговорка за стил на кодване

**Интрументи:**

* GIT
* wireframe.cc - макет на сайт
* dbdesigner.net - дизайн на БД
* draw.io - UML диаграми
* Messenger.com & Skype
* wetransfer.com -file exchange

## TODO

* Online streaming
* Server Side Rendering
* AutoTest
* SQLite миграция към MySql
* End Point нотификации
* Админа да може да изтрива и коригира
  коментари на юзери
* Добавяне на повече типове формати за
  гледане.
* Скорост на гледане
* Споделяне в социалните мрежи
* Емайл верификация на акаунт

## Install & run

За инсталиране трябва да

```bash
npm install
```

```bash
npm start
```

в база данни `./src/config/dbs/project.db` трябва да изтрия всички тестови данни
