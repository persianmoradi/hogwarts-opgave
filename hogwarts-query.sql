--
-- PostgreSQL database dump
--

\restrict ZqzzF94bfBjshCKY1RZQVrQBBkoLQWky7BAzpWEnYUf9c61K9oo56eazS1vrpSc

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

-- Started on 2026-11-17 01:27:31 CET

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 227 (class 1259 OID 16680)
-- Name: course_students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.course_students (
    course_id integer NOT NULL,
    student_id integer NOT NULL
);


--
-- TOC entry 226 (class 1259 OID 16672)
-- Name: courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.courses (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    teacher_id integer,
    type character varying(20) NOT NULL,
    level character varying(4) NOT NULL,
    school_year integer NOT NULL,
    CONSTRAINT courses_level_check CHECK (((level)::text = ANY ((ARRAY['OWL'::character varying, 'NEWT'::character varying])::text[]))),
    CONSTRAINT courses_level_year_check CHECK (((((level)::text = 'OWL'::text) AND (school_year <= 5)) OR (((level)::text = 'NEWT'::text) AND (school_year >= 6)))),
    CONSTRAINT courses_school_year_check CHECK (((school_year >= 1) AND (school_year <= 7))),
    CONSTRAINT courses_type_check CHECK (((type)::text = ANY ((ARRAY['core'::character varying, 'elective'::character varying, 'extra-curricular'::character varying])::text[])))
);


--
-- TOC entry 225 (class 1259 OID 16671)
-- Name: courses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.courses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3894 (class 0 OID 0)
-- Dependencies: 225
-- Name: courses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.courses_id_seq OWNED BY public.courses.id;


--
-- TOC entry 230 (class 1259 OID 16813)
-- Name: exams; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.exams (
    id integer NOT NULL,
    course_id integer NOT NULL,
    student_id integer NOT NULL,
    grade character(1) NOT NULL
);


--
-- TOC entry 229 (class 1259 OID 16812)
-- Name: exams_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.exams_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3895 (class 0 OID 0)
-- Dependencies: 229
-- Name: exams_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.exams_id_seq OWNED BY public.exams.id;


--
-- TOC entry 228 (class 1259 OID 16801)
-- Name: grades; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grades (
    letter character(1) NOT NULL,
    name character varying(30) NOT NULL,
    description text NOT NULL,
    passed boolean NOT NULL
);


--
-- TOC entry 220 (class 1259 OID 16645)
-- Name: houses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.houses (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    colors character varying(100),
    founder character varying(100)
);


--
-- TOC entry 219 (class 1259 OID 16644)
-- Name: houses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.houses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3896 (class 0 OID 0)
-- Dependencies: 219
-- Name: houses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.houses_id_seq OWNED BY public.houses.id;


--
-- TOC entry 224 (class 1259 OID 16663)
-- Name: students; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.students (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    school_year integer NOT NULL,
    house_id integer,
    birthday date NOT NULL,
    CONSTRAINT students_school_year_check CHECK (((school_year >= 1) AND (school_year <= 7)))
);


--
-- TOC entry 223 (class 1259 OID 16662)
-- Name: students_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.students_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3897 (class 0 OID 0)
-- Dependencies: 223
-- Name: students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.students_id_seq OWNED BY public.students.id;


--
-- TOC entry 222 (class 1259 OID 16654)
-- Name: teachers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.teachers (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    house_id integer,
    employment_start date NOT NULL,
    currently_active boolean DEFAULT true NOT NULL,
    deceased boolean DEFAULT false NOT NULL
);


--
-- TOC entry 221 (class 1259 OID 16653)
-- Name: teachers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.teachers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 3898 (class 0 OID 0)
-- Dependencies: 221
-- Name: teachers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.teachers_id_seq OWNED BY public.teachers.id;


--
-- TOC entry 3703 (class 2604 OID 16675)
-- Name: courses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses ALTER COLUMN id SET DEFAULT nextval('public.courses_id_seq'::regclass);


--
-- TOC entry 3704 (class 2604 OID 16816)
-- Name: exams id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams ALTER COLUMN id SET DEFAULT nextval('public.exams_id_seq'::regclass);


--
-- TOC entry 3698 (class 2604 OID 16648)
-- Name: houses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.houses ALTER COLUMN id SET DEFAULT nextval('public.houses_id_seq'::regclass);


--
-- TOC entry 3702 (class 2604 OID 16666)
-- Name: students id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_id_seq'::regclass);


--
-- TOC entry 3699 (class 2604 OID 16657)
-- Name: teachers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teachers ALTER COLUMN id SET DEFAULT nextval('public.teachers_id_seq'::regclass);


--
-- TOC entry 3885 (class 0 OID 16680)
-- Dependencies: 227
-- Data for Name: course_students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.course_students (course_id, student_id) FROM stdin;
1	1
1	2
2	1
\.


--
-- TOC entry 3884 (class 0 OID 16672)
-- Dependencies: 226
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.courses (id, name, teacher_id, type, level, school_year) FROM stdin;
1	Potions	1	core	OWL	1
2	Transfiguration	2	core	OWL	2
3	Charms	3	core	OWL	3
\.


--
-- TOC entry 3888 (class 0 OID 16813)
-- Dependencies: 230
-- Data for Name: exams; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.exams (id, course_id, student_id, grade) FROM stdin;
1	1	1	E
2	1	2	O
3	2	1	A
\.


--
-- TOC entry 3886 (class 0 OID 16801)
-- Dependencies: 228
-- Data for Name: grades; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grades (letter, name, description, passed) FROM stdin;
O	Outstanding	Excellent work. The highest grade, and a pass.	t
E	Exceeds Expectations	Very good work, above what is expected. A pass.	t
A	Acceptable	You have met the standard required. A pass, but only just.	t
P	Poor	You have narrowly failed. This may have been due to factors outside your control.	f
D	Dreadful	You have failed clearly. The work was well below the required standard.	f
T	Troll	The lowest grade. A complete and total failure.	f
\.


--
-- TOC entry 3878 (class 0 OID 16645)
-- Dependencies: 220
-- Data for Name: houses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.houses (id, name, colors, founder) FROM stdin;
1	Gryffindor	Scarlet and gold	Godric Gryffindor
2	Slytherin	Green and silver	Salazar Slytherin
3	Ravenclaw	Blue and bronze	Rowena Ravenclaw
4	Hufflepuff	Yellow and black	Helga Hufflepuff
5	Empty house	\N	\N
\.


--
-- TOC entry 3882 (class 0 OID 16663)
-- Dependencies: 224
-- Data for Name: students; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.students (id, name, school_year, house_id, birthday) FROM stdin;
1	Harry Potter	3	1	1980-07-31
2	Draco Malfoy	3	2	1980-06-05
3	Luna Lovegood	2	3	1981-02-13
4	Cedric Diggory	5	4	1977-09-01
\.


--
-- TOC entry 3880 (class 0 OID 16654)
-- Dependencies: 222
-- Data for Name: teachers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.teachers (id, name, house_id, employment_start, currently_active, deceased) FROM stdin;
4	Severus Snape	2	1981-09-01	t	f
8	Remus Lupin	1	1981-09-01	t	f
9	Charity Burbage	1	1981-09-01	t	f
10	Albus Percival Wulfric Brian Dumbledore	1	1981-09-01	t	f
11	Horace Slughorn	2	1981-09-01	t	f
12	Dolores Umbridge	2	1981-09-01	t	f
13	Quirinus Quirrell	3	1981-09-01	t	f
14	Gilderoy Lockhart	3	1981-09-01	t	f
15	Sybill Trelawney	3	1981-09-01	t	f
16	Pomona Sprout	4	1981-09-01	t	f
17	Silvanus Kettleburn	4	1981-09-01	t	f
18	Bathsheda Babbling	\N	1981-09-01	t	f
19	Aurora Sinistra	\N	1981-09-01	t	f
20	Alastor Moody	\N	1981-09-01	t	f
21	Rolanda Hooch	\N	1981-09-01	t	f
22	Cuthbert Binns	\N	1981-09-01	t	f
23	Septima Vector	\N	1981-09-01	t	f
24	Wilhelmina Grubbly-Plank	\N	1981-09-01	t	f
25	Rubeus Hagrid	\N	1981-09-01	t	f
26	Firenze	\N	1981-09-01	t	f
2	Minerva McGonagall	1	1981-09-01	t	f
3	Severus Snape	1	1981-09-01	t	f
\.


--
-- TOC entry 3899 (class 0 OID 0)
-- Dependencies: 225
-- Name: courses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.courses_id_seq', 5, true);


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 229
-- Name: exams_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.exams_id_seq', 3, true);


--
-- TOC entry 3901 (class 0 OID 0)
-- Dependencies: 219
-- Name: houses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.houses_id_seq', 5, true);


--
-- TOC entry 3902 (class 0 OID 0)
-- Dependencies: 223
-- Name: students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.students_id_seq', 5, true);


--
-- TOC entry 3903 (class 0 OID 0)
-- Dependencies: 221
-- Name: teachers_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.teachers_id_seq', 26, true);


--
-- TOC entry 3719 (class 2606 OID 16686)
-- Name: course_students course_students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.course_students
    ADD CONSTRAINT course_students_pkey PRIMARY KEY (course_id, student_id);


--
-- TOC entry 3717 (class 2606 OID 16679)
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- TOC entry 3723 (class 2606 OID 16824)
-- Name: exams exams_course_id_student_id_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_course_id_student_id_key UNIQUE (course_id, student_id);


--
-- TOC entry 3725 (class 2606 OID 16822)
-- Name: exams exams_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_pkey PRIMARY KEY (id);


--
-- TOC entry 3721 (class 2606 OID 16811)
-- Name: grades grades_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grades
    ADD CONSTRAINT grades_pkey PRIMARY KEY (letter);


--
-- TOC entry 3711 (class 2606 OID 16652)
-- Name: houses houses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.houses
    ADD CONSTRAINT houses_pkey PRIMARY KEY (id);


--
-- TOC entry 3715 (class 2606 OID 16670)
-- Name: students students_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);


--
-- TOC entry 3713 (class 2606 OID 16661)
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (id);


--
-- TOC entry 3727 (class 2606 OID 16825)
-- Name: exams exams_course_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_course_id_fkey FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- TOC entry 3728 (class 2606 OID 16835)
-- Name: exams exams_grade_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_grade_fkey FOREIGN KEY (grade) REFERENCES public.grades(letter);


--
-- TOC entry 3729 (class 2606 OID 16830)
-- Name: exams exams_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.exams
    ADD CONSTRAINT exams_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.students(id) ON DELETE CASCADE;


--
-- TOC entry 3726 (class 2606 OID 16781)
-- Name: teachers teachers_houses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.teachers
    ADD CONSTRAINT teachers_houses_id_fk FOREIGN KEY (house_id) REFERENCES public.houses(id) NOT VALID;


-- Completed on 2026-11-17 01:27:31 CET

--
-- PostgreSQL database dump complete
--

\unrestrict ZqzzF94bfBjshCKY1RZQVrQBBkoLQWky7BAzpWEnYUf9c61K9oo56eazS1vrpSc

