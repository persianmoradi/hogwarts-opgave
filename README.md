# Hogwarts Course Management System

- AI er brugt til at gøre mine to .md filer flotte og overskuelige, vi har ikke rigtigt lært at skrive md filer endnu bare lige en obs.

Serveren kører på `http://localhost:3000`.

---

## Nogle tanker omkring mit arbejdet

Jeg følte igennem hele opgaven at alt var meget lige til, og var koblet rigtig godt til undervisningen, jeg fik ikke lavet courses helt færdig da jeg ikke rigtig har forstået det at skulle skrive kode for JOIN's, men jeg forstår det visuelt og hvorfor det bliver brugt. Jeg oplevede nogle udfordringer da jeg sad og arbejdede med Courses og dets endpoint, men jeg kom frem til en løsning så langt så jeg forstår, via. research og youtube, men det var en del kringlet, men ellers har det været ret lige til og let forståeligt, selvfølgelig ikke uden udfordringer og koncentration, men det har været tilpas forståeligt, da det har været en perfekt rød tråd til hvad vi har arbejdet med i undervisningen.

---

## Info

Når man læser endpointsene i filen så står det som følgende: `Metode | Route | Beskrivelse`

---

## Houses

| Metode | Route | Beskrivelse |
|:---|:---|:---|
| `GET` | `/houses` | Hent alle houses |
| `GET` | `/houses/:id` | Hent et house |

## Teachers

| Metode | Route | Beskrivelse |
|:---|:---|:---|
| `GET` | `/teachers` | Hent alle teachers |
| `GET` | `/teachers/:id` | Hent en teacher |
| `POST` | `/teachers` | Opret en teacher |
| `PUT` | `/teachers/:id` | Opdater en teacher (name og house) |
| `DELETE` | `/teachers/:id` | Slet en teacher |

## Students

| Metode | Route | Beskrivelse |
|:---|:---|:---|
| `GET` | `/students` | Hent alle students |
| `GET` | `/students/:id` | Hent en student |
| `POST` | `/students` | Opret en student |
| `PUT` | `/students/:id` | Opdater en student (name, year og house) |
| `DELETE` | `/students/:id` | Slet en student |

## Courses

| Metode | Route | Beskrivelse |
|:---|:---|:---|
| `GET` | `/courses` | Hent alle courses |
| `GET` | `/courses/:id` | Hent et course, inkl. teacher og students |
| `POST` | `/courses` | Opret et course |
| `PUT` | `/courses/:id` | Ændr navnet på et course |
| `DELETE` | `/courses/:id` | Slet et course |

---

## Endpoint-tests

Testene ligger i mappen (`hogwarts-api-test`) og er en sat op med **Bruno** med én request for hvert endpoint, delt op i mapperne Houses, Teachers, Students og Courses.

1. Sørg for at databasen er sat op (kør `hogwarts-query.sql`), og at `.env` er udfyldt se `.env.example`.
2. Start serveren med `npm run dev` i terminalen.
3. Åbn **Bruno** og og vælg mappen for endpoint-testen du vil kører.
4. Vælg en request i venstre side og tryk på **run/send**.

Requests til `POST` og `PUT` har en JSON-body, som du kan rette under fanen **Body**. Id'erne i URL'erne (fx `/teachers/1`) er faste, så ret dem, hvis rækken ikke findes i din database, men alt burde være lige til og fungerere.

---

## Fejlkoder

- **400** - Der mangler data i body'en.
  - `name is required`
- **404** - Det man leder efter findes ikke i databasen.
  - `House not found`
  - `Teacher not found`
  - `Student not found`
  - `Course not found`
- **500** - Fejl i databasen.
  - `Error connecting to database`
