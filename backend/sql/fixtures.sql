--
-- PostgreSQL database dump
--

-- Dumped from database version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.9 (Ubuntu 12.9-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: profissional_tipo; Type: TABLE DATA; Schema: public; Owner: maxxidata
--

INSERT INTO public.profissional_tipo VALUES (1, 'Analista de BI', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (2, 'Coordenador de Desenvolvimento de Sistemas', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (3, 'Scrum Master', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (4, 'Tech Recruiter', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (5, 'Data Engineer', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (6, 'Engenheiro Devops', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (7, 'Desenvolvedor Javascript', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (8, 'Desenvolvedor Javascript Sr.', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (9, 'Analista de Recursos Humanos', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (10, 'Tech Lead Developer', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (11, 'Engenheiro de Dados Sênior', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (12, 'Desenvolvedor Rust', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (13, 'Analista de Suporte TI Jr.', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (14, 'Analista de Engenharia TI Sênior', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (15, 'Arquiteto de Soluções de TI', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (16, 'Médico', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (17, 'Enfermeiro', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (18, 'Fisioterapêuta', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (19, 'Dentista', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');
INSERT INTO public.profissional_tipo VALUES (20, 'Farmacêutico', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00');


--
-- Data for Name: profissional; Type: TABLE DATA; Schema: public; Owner: maxxidata
--

INSERT INTO public.profissional VALUES (1, 'Jennifer Mcbride', '(12) 14543250', 'welchchristopher@example.com', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 1);
INSERT INTO public.profissional VALUES (2, 'Cynthia Brennan', '(11) 11111111', 'ykennedy@example.com', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 2);
INSERT INTO public.profissional VALUES (3, 'Eric Avery', '(12) 16077485', 'williamsjeremy@example.org', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 3);
INSERT INTO public.profissional VALUES (4, 'Melissa Alexander', '(12) 52817062', 'heidikirby@example.org', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 4);
INSERT INTO public.profissional VALUES (5, 'Leslie Cherry', '(91) 04476891', 'brianjohnson@example.org', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 5);
INSERT INTO public.profissional VALUES (6, 'Lori Turner', '(91) 86795290', 'ryanmacias@example.com', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 6);
INSERT INTO public.profissional VALUES (7, 'Danielle Elliott', '(91) 95445579', 'angela72@example.com', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 7);
INSERT INTO public.profissional VALUES (8, 'Russell Shah', '(91) 36096434', 'jennifergonzales@example.org', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 7);
INSERT INTO public.profissional VALUES (9, 'Rita Ramirez', '(91) 13202972', 'millsmonica@example.net', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 8);
INSERT INTO public.profissional VALUES (10, 'Kimberly Hall', '(91) 01431085', 'jerry65@example.com', true, '2021-11-16 00:00:00', '2021-11-16 00:00:00', 9);


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: maxxidata
--

INSERT INTO public."user" VALUES (1, 'admin', '$2b$10$NeB7XnIMdXzEvGvwbfmL1Ol/quB8mc5QcxG/YeSRo0TfuwSRDo7aO', 'Admin', 'Admin', 'admin@localhost', NULL, 'pt-br', NULL, '2021-11-16 23:03:30.141432', NULL, '2021-11-16 23:03:30.141432', '{ROLE_USER,ROLE_ADMIN}');
INSERT INTO public."user" VALUES (2, 'guest', '$2b$10$luuz3l3lQ71gwiZeje0sU.bu7ojqDPPwfffThOA8pJk50TojPiZN2', 'Guest', 'Guest', 'guest@localhost', NULL, 'pt-br', NULL, '2021-11-16 23:04:29.665801', NULL, '2021-11-16 23:04:29.665801', '{ROLE_USER}');


--
-- Name: profissional_id_seq; Type: SEQUENCE SET; Schema: public; Owner: maxxidata
--

SELECT pg_catalog.setval('public.profissional_id_seq', 10, true);


--
-- Name: profissional_tipo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: maxxidata
--

SELECT pg_catalog.setval('public.profissional_tipo_id_seq', 20, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: maxxidata
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--

