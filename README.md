# Запуск 
```
npm i
node script.js
```
# Задание

Для поддержания нашей базы БИК нужно автоматизировать актуализацию. Актуальные данные по БИК можно взять с сайта центробанка.
База будет актуализироваться как по расписанию, так и ручным запуском скрипта.
Нам нужна функция которая будет собирать список БИК и формировать данные для записи в БД, дальше мы сами реализуем пути ее использования.

Описание для написания кода.

Нужно сделать функцию код которая будет выкачивать файл
http://www.cbr.ru/s/newbik (ссылка на этой странице http://www.cbr.ru/PSystem/payment_system/#a_44305), разархивирует zip, распарсит XML, подготовит и вернет массив объектов для записи в БД

в BICDirectoryEntry может быть несколько Accounts . на каждый Accounts нужен свой объект в возвращаемом массиве. если Accounts  нет, то такой BICDirectoryEntry не интересен


`[{bic: $1, name: $2, corrAccount: $3}, ...]`

То есть в БД должны будут записаться строки

bic:123, name: банк1, corrAccount: 001
bic:123, name: банк1, corrAccount: 002
bic:123, name: банк1, corrAccount: 003
bic:321, name: банк2, corrAccount: 001

NPM пакеты с которыми мы одобряем для использования
- https://www.npmjs.com/package/adm-zip
- https://www.npmjs.com/package/node-fetch
- https://www.npmjs.com/package/iconv-lite
