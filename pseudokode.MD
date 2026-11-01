# Pseudokode for endpoints

Alle endpoints er `async` (asynkrone funktioner) og pakket i `try/catch` dvs. fanger vi en fejl, logges den, og der svares med en fejlbesked.

Controllers håndterer HTTP request og response & repos håndterer SQL koden.

---

## Mønster 1: GET alle (liste)

**Gælder:** `GET /houses`, `GET /teachers`, `GET /students`, `GET /courses`

```text
Med GET hender vi alle rækker fra tabellen og får svar 200 eller en tom liste hvis der ikke er noget i tabellen.
```

---

## Mønster 2: GET én via id

**Gælder:** `GET /houses/:id`, `GET /teachers/:id`, `GET /students/:id`

```text
Med GET via ID bliver id'et læst fra URL'en og hentet fra databasen.

Hvis den ikke findes:
    svar 404 ("House not found", "Teacher not found", "Student not found")
Ellers:
    svar 200 med rækken
```

---

## Mønster 3: POST opret

**Gælder:** `POST /teachers`, `POST /students`, `POST /courses`

```text
Med POST bliver data læst fra body'en (name og evt. year, house_id eller teacher_id), og der oprettes en ny række i databasen.

Hvis name mangler:
    svar 400 ("name is required")
Hvis house_id eller teacher_id er med, men ikke findes:
    svar 404 ("House not found", "Teacher not found")
Ellers:
    svar 201 med den nye række
```

---

## Mønster 4: PUT opdater

**Gælder:** `PUT /teachers/:id`, `PUT /students/:id`, `PUT /courses/:id`

```text
Med PUT bliver id'et læst fra URL'en og de nye værdier fra body'en. Først findes rækken i databasen, og derefter bliver den ændret.
(teacher: name og house, student: name, year og house, course: kun name)

Hvis name mangler:
    svar 400 ("name is required")
Hvis rækken ikke findes:
    svar 404 ("Teacher not found", "Student not found", "Course not found")
Hvis house_id er med (kun teacher og student), men ikke findes:
    svar 404 ("House not found")
Ellers:
    svar 200 med den opdaterede række
```

---

## Mønster 5: DELETE slet

**Gælder:** `DELETE /teachers/:id`, `DELETE /students/:id`, `DELETE /courses/:id`

```text
Med DELETE bliver id'et læst fra URL'en, og rækken med det id bliver slettet fra databasen.

Hvis den ikke findes:
    svar 404 ("Teacher not found", "Student not found", "Course not found")
Ellers:
    svar 200 ("Teacher deleted", "Student deleted", "Course deleted")
```

---

## Courses: særlige endpoints

### `GET /courses/:id`

```text
Med GET via ID bliver id'et læst fra URL'en, og course'et hentes sammen med navnet på dets teacher. Derefter hentes listen af students på course'et fra koblingstabellen course_students og lægges på course'et.

Hvis course'et ikke findes:
    svar 404 ("Course not found")
Ellers:
    svar 200 med course'et (students er en tom liste hvis der ingen er)
```
