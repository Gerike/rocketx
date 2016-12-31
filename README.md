# RocketX - Alkalmazások fejlesztése / Játékfejlesztés beadandó 2016 ELTE - Dokumentáció
Készítette: Kovács Gergő Richárd - RAHMBF

###1. Követelményanalízis
####1.1 Célkítűzés, projektindító dokumentum
A program legfőbb célja, egy webes alkalmazás létrehozása ahol a felhasználóknak regisztráció után lehetőségük nyílik egy 2D-s űrhajós shooterrel játszani, elkészíteni a saját űrhajójukat, és versenyezni a többi játékossal.
#####Funkcionális követelmények:
* Regisztráció
* Bejelentkezés
* Csak bejelentkezett felhasználók által elérhető funkciók
-Üzenet küldése a többi felhasználónak
-Saját űrhajók elkészítése, módosítása
-Játék

#####Nem funkcionális követelmények:
* Könnyű áttekinthetőség: Szép, ergonomikus felület.
* Használhatóság: Könnyű áttekinthetőség, ésszerű elrendezés, könnyen kezelhetőség
* Megbízhatóság: jelszóval védett funkciók, és a jelszavak védelme a háttérben. Hibásan bevitt adatok esetén a program jól láthatóan jelezzen a felhasználónak, és emelje ki a hibás beviteli mezőket. A jól bevitt adatok maradjanak az űrlapban.
* Karbantarthatóság: könnyen lehessen bővíteni, a különböző típusú fájlok külön csoportosítva, ésszerűen legyenek felbontva, a könnyebb fejleszthetőség miatt

####1.2 Használatieset-modell, funkcionális követelményekre
**Vendég**: Csak a publikus oldalakat éri el

* Főoldal
* Bejelentkezés
* Regisztráció

**Bejelentkezett felhasználó**: A publikus oldalak elérésén felül egyéb funkciókhoz is hozzáfér.

* Játék elindítása
* Űrhajók vásárlása, szerkesztése
* Üzenetek küldése más felhasználóknak, és tőlük üzenetek fogadása


####2.1 Oldaltérkép:
**Publikus**
* Főoldal
* Bejelentkezés
* Regisztráció

**Bejelentkezett felhasználó**
* Főoldal
* Játék oldal

#####2.2 Végpontok:
* GET/: főoldal
* POST/login: bejelentkező adatok elküldése
* GET/register: regisztrációs oldal
* POST/register: regisztrációs adatok elküldése
* GET/logout: kijelentkező oldal
* GET/messages: Saját üzenetek megtekintése
* POST/messages/new: Üzenet elküldése más felhasználónak
* GET/messages/new: Üzenet küldése más felhasználónak űrlap
* GET/rest/scores/:x: Legutóbbi x legjobb eredmény lekérése. (maximum 100)

#####2.3 Osztálymodell
**Adatbázisterv**

![](docs/images/datamodel.PNG)

#####2.4 Felhasználói felület terve

**Főoldal**
![](docs/images/index.PNG)

**Regisztráció**
![](docs/images/registration.PNG)

**Játék oldala**
![](docs/images/gameindex.PNG)

**Üzenetek**
![](docs/images/messages.PNG)
