# mysiepysie.pl

## Inicjalizacja

Wywołaj w terminalu następujące komendy:

```
git clone git@github.com:mysiepysie/mysiepysie.pl.git mysiepysie
cd mysiepysie
npm install
npm install hexo-cli -g
```

## Podgląd

1. Wywołaj w terminalu:
```
hexo server
```
2. Otwórzy `localhost:4000` w przeglądarce.

3. Żeby przerwać podgląd wciśnij `Ctrl`+`C`.

## Dodanie artykuły

1. Wywołaj w terminalu:
```
hexo new <tytuł artykułu>
```
lub ręcznie stwórzy plik `<nazwa pliku z artykułem>.md` w katalogu `source/_posts`.

2. Dodaj do katalogu `source/_posts` grafikę będącą nagłówkiem artykułu. Ustaw nazwę tej grafiki na zgodną z nazwą artykułu.

3. Ustaw pole `image` w nagłówku pliku z artykułem (plik o rozszerzeniu `.md`) na nazwę pliku z dodaną grafiką.

4. Napisz artykuł w [fromacie Markdown](https://www.markdownguide.org/basic-syntax/).

5. Uruchom podgląd.

6. Gdy wszystko jest gotowe zrób deploy.

## Dodanie zdjęć do galerii

1. Dodaj folder z plikami do galerii do `source/galeria`.

2. Uruchom w terminalu:
```
node refresh-gallery.js
```
żeby odświerzyć indeks galerii znajdujący się w pliku `source/galeria/index.md`.

3. Otwórzy plik `source/galeria/index.md` i ustaw nazwę galerii (pole `name`). Możesz też zmienić kolejność zdjęć w galerii zmieniając kolejność wpisów w indeksie.

4. Uruchom podgląd.

5. Gdy wszystko jest gotowe zrób deploy.

## Deploy

1. Wywołaj w terminalu:
```
node deploy.js
```
2. Odczekaj kilkanaście sekund.
3. Sprawdź [mysiepysie.pl](https://mysiepysie.pl) czy zawiera odświerzoną zawartość.
