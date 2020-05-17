PGDMP                         x            ManagerAbsent    12.2    12.2 X    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16907    ManagerAbsent    DATABASE     �   CREATE DATABASE "ManagerAbsent" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "ManagerAbsent";
                postgres    false            �            1259    16908    Absent    TABLE     �   CREATE TABLE public."Absent" (
    id integer NOT NULL,
    class_id integer,
    create_date date DEFAULT now() NOT NULL,
    status smallint,
    teacher_id integer,
    user_update_id integer,
    schedule_class_id integer
);
    DROP TABLE public."Absent";
       public         heap    postgres    false            �            1259    16912    Absent_detail    TABLE       CREATE TABLE public."Absent_detail" (
    id integer NOT NULL,
    student_id integer,
    absent_id integer,
    status smallint,
    comment text DEFAULT ''::text,
    user_update_id integer,
    gps_latitude real,
    gps_longitude real,
    ssid_id integer
);
 #   DROP TABLE public."Absent_detail";
       public         heap    postgres    false            �            1259    16923    Class    TABLE     7  CREATE TABLE public."Class" (
    id integer NOT NULL,
    teacher_id integer,
    status smallint,
    created_date timestamp without time zone DEFAULT now(),
    is_active integer DEFAULT 1,
    start_date date DEFAULT now(),
    end_date date,
    class_code character varying(50),
    subject_id integer
);
    DROP TABLE public."Class";
       public         heap    postgres    false            �            1259    16932 	   List_ssid    TABLE        CREATE TABLE public."List_ssid" (
    id integer NOT NULL,
    ssid_name character varying(1),
    absent_detail_id integer
);
    DROP TABLE public."List_ssid";
       public         heap    postgres    false            �            1259    16937 
   Notication    TABLE     �  CREATE TABLE public."Notication" (
    id integer NOT NULL,
    type smallint,
    student_id integer,
    teacher_id integer,
    user_id integer,
    device_address character varying(200) DEFAULT ''::character varying,
    link character varying(200) DEFAULT ''::character varying,
    is_viewed smallint DEFAULT 0,
    created_date date DEFAULT now(),
    absent_id integer,
    content character varying(1) DEFAULT ''::character varying
);
     DROP TABLE public."Notication";
       public         heap    postgres    false            �            1259    16955    Schedule_class    TABLE     �   CREATE TABLE public."Schedule_class" (
    id integer NOT NULL,
    class_id integer,
    day_of_week character varying,
    time_start character varying,
    time_end character varying,
    room_name character varying
);
 $   DROP TABLE public."Schedule_class";
       public         heap    postgres    false            �            1259    16963    Student_class    TABLE       CREATE TABLE public."Student_class" (
    id integer NOT NULL,
    student_id integer,
    class_id integer,
    note text DEFAULT ''::text,
    created_date date DEFAULT now(),
    is_active integer DEFAULT 1,
    mid_semester real,
    end_semester real
);
 #   DROP TABLE public."Student_class";
       public         heap    postgres    false            �            1259    16974    Students    TABLE       CREATE TABLE public."Students" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    phone character(30) DEFAULT ''::bpchar,
    birthday date DEFAULT now(),
    password character varying(200) NOT NULL,
    address character varying(200) DEFAULT ''::character varying,
    email character varying(200) DEFAULT ''::character varying,
    sex integer,
    created_date timestamp without time zone DEFAULT now(),
    deviceid text,
    tocken text,
    url_avatar text,
    mssv character varying(8)
);
    DROP TABLE public."Students";
       public         heap    postgres    false            �            1259    16990    Subject    TABLE     N  CREATE TABLE public."Subject" (
    id integer NOT NULL,
    subject_name character varying(200) DEFAULT ''::character varying,
    create_date date DEFAULT now(),
    is_active integer DEFAULT 1,
    subject_code character varying(20),
    credit_hour character(1),
    "time" character varying,
    coefficient character varying
);
    DROP TABLE public."Subject";
       public         heap    postgres    false            �            1259    16998    Sysdiagrams    TABLE     �   CREATE TABLE public."Sysdiagrams" (
    name character varying(128) NOT NULL,
    principal_id integer NOT NULL,
    diagram_id integer NOT NULL,
    version integer,
    definition bytea
);
 !   DROP TABLE public."Sysdiagrams";
       public         heap    postgres    false            �            1259    17006    Teacher    TABLE       CREATE TABLE public."Teacher" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    phone character(30) DEFAULT ''::bpchar,
    password character varying(200) NOT NULL,
    birthday date DEFAULT now(),
    address character varying(200) DEFAULT ''::character varying,
    email character varying(200) DEFAULT ''::character varying,
    note text DEFAULT ''::text,
    deviceid text,
    tocken text,
    url_avatar text,
    sex smallint,
    status smallint,
    salary numeric
);
    DROP TABLE public."Teacher";
       public         heap    postgres    false            �            1259    17237    Teacher_subject    TABLE     �   CREATE TABLE public."Teacher_subject" (
    id integer NOT NULL,
    teacher_id integer NOT NULL,
    subject_id integer NOT NULL
);
 %   DROP TABLE public."Teacher_subject";
       public         heap    postgres    false            �            1259    17022    User    TABLE     s  CREATE TABLE public."User" (
    id integer NOT NULL,
    user_name character varying(200) DEFAULT ''::character varying,
    password character varying(200) NOT NULL,
    email character varying(200) DEFAULT ''::character varying,
    created_date date DEFAULT now(),
    is_active integer DEFAULT 1,
    name character varying(200),
    token character varying(200)
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    16919    absent_detail_id_seq    SEQUENCE     �   ALTER TABLE public."Absent_detail" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.absent_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    203            �            1259    16921    absent_id_seq    SEQUENCE     �   ALTER TABLE public."Absent" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.absent_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    202            �            1259    16930    class_id_seq    SEQUENCE     �   ALTER TABLE public."Class" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    206            �            1259    16935    list_ssid_id_seq    SEQUENCE     �   ALTER TABLE public."List_ssid" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.list_ssid_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    208            �            1259    16945    notication_id_seq    SEQUENCE     �   ALTER TABLE public."Notication" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.notication_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    210            �            1259    16961    schedule_class_id_seq    SEQUENCE     �   ALTER TABLE public."Schedule_class" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.schedule_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    16972    student_class_id_seq    SEQUENCE     �   ALTER TABLE public."Student_class" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.student_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    16988    students_id_seq    SEQUENCE     �   ALTER TABLE public."Students" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    16996    subject_id_seq    SEQUENCE     �   ALTER TABLE public."Subject" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.subject_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    17004    sysdiagrams_diagram_id_seq    SEQUENCE     �   ALTER TABLE public."Sysdiagrams" ALTER COLUMN diagram_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.sysdiagrams_diagram_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    17020    teacher_id_seq    SEQUENCE     �   ALTER TABLE public."Teacher" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.teacher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    17235    teacher_subject_id_seq    SEQUENCE     �   ALTER TABLE public."Teacher_subject" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.teacher_subject_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    227            �            1259    17032    user_id_seq    SEQUENCE     �   ALTER TABLE public."User" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �          0    16908    Absent 
   TABLE DATA           t   COPY public."Absent" (id, class_id, create_date, status, teacher_id, user_update_id, schedule_class_id) FROM stdin;
    public          postgres    false    202   �v       �          0    16912    Absent_detail 
   TABLE DATA           �   COPY public."Absent_detail" (id, student_id, absent_id, status, comment, user_update_id, gps_latitude, gps_longitude, ssid_id) FROM stdin;
    public          postgres    false    203   �v       �          0    16923    Class 
   TABLE DATA           �   COPY public."Class" (id, teacher_id, status, created_date, is_active, start_date, end_date, class_code, subject_id) FROM stdin;
    public          postgres    false    206   �v       �          0    16932 	   List_ssid 
   TABLE DATA           F   COPY public."List_ssid" (id, ssid_name, absent_detail_id) FROM stdin;
    public          postgres    false    208   [w       �          0    16937 
   Notication 
   TABLE DATA           �   COPY public."Notication" (id, type, student_id, teacher_id, user_id, device_address, link, is_viewed, created_date, absent_id, content) FROM stdin;
    public          postgres    false    210   xw       �          0    16955    Schedule_class 
   TABLE DATA           f   COPY public."Schedule_class" (id, class_id, day_of_week, time_start, time_end, room_name) FROM stdin;
    public          postgres    false    212   �w       �          0    16963    Student_class 
   TABLE DATA           ~   COPY public."Student_class" (id, student_id, class_id, note, created_date, is_active, mid_semester, end_semester) FROM stdin;
    public          postgres    false    214   x       �          0    16974    Students 
   TABLE DATA           �   COPY public."Students" (id, name, phone, birthday, password, address, email, sex, created_date, deviceid, tocken, url_avatar, mssv) FROM stdin;
    public          postgres    false    216   9x       �          0    16990    Subject 
   TABLE DATA           }   COPY public."Subject" (id, subject_name, create_date, is_active, subject_code, credit_hour, "time", coefficient) FROM stdin;
    public          postgres    false    218   )}       �          0    16998    Sysdiagrams 
   TABLE DATA           \   COPY public."Sysdiagrams" (name, principal_id, diagram_id, version, definition) FROM stdin;
    public          postgres    false    220   ~       �          0    17006    Teacher 
   TABLE DATA           �   COPY public."Teacher" (id, name, phone, password, birthday, address, email, note, deviceid, tocken, url_avatar, sex, status, salary) FROM stdin;
    public          postgres    false    222   )~       �          0    17237    Teacher_subject 
   TABLE DATA           G   COPY public."Teacher_subject" (id, teacher_id, subject_id) FROM stdin;
    public          postgres    false    227   �       �          0    17022    User 
   TABLE DATA           f   COPY public."User" (id, user_name, password, email, created_date, is_active, name, token) FROM stdin;
    public          postgres    false    224   �       �           0    0    absent_detail_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.absent_detail_id_seq', 1, false);
          public          postgres    false    204            �           0    0    absent_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.absent_id_seq', 1, false);
          public          postgres    false    205            �           0    0    class_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.class_id_seq', 10, true);
          public          postgres    false    207            �           0    0    list_ssid_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.list_ssid_id_seq', 1, false);
          public          postgres    false    209            �           0    0    notication_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.notication_id_seq', 1, false);
          public          postgres    false    211            �           0    0    schedule_class_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.schedule_class_id_seq', 4, true);
          public          postgres    false    213            �           0    0    student_class_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.student_class_id_seq', 2, true);
          public          postgres    false    215            �           0    0    students_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.students_id_seq', 40, true);
          public          postgres    false    217            �           0    0    subject_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.subject_id_seq', 7, true);
          public          postgres    false    219            �           0    0    sysdiagrams_diagram_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.sysdiagrams_diagram_id_seq', 1, false);
          public          postgres    false    221            �           0    0    teacher_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.teacher_id_seq', 17, true);
          public          postgres    false    223            �           0    0    teacher_subject_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.teacher_subject_id_seq', 1, true);
          public          postgres    false    226            �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 4, false);
          public          postgres    false    225            �
           2606    17035 #   Absent pk__absent__3214ec27984fa8b5 
   CONSTRAINT     c   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT pk__absent__3214ec27984fa8b5 PRIMARY KEY (id);
 O   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT pk__absent__3214ec27984fa8b5;
       public            postgres    false    202            �
           2606    17037 ,   Absent_detail pk__absent_d__3214ec2749a37502 
   CONSTRAINT     l   ALTER TABLE ONLY public."Absent_detail"
    ADD CONSTRAINT pk__absent_d__3214ec2749a37502 PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Absent_detail" DROP CONSTRAINT pk__absent_d__3214ec2749a37502;
       public            postgres    false    203            �
           2606    17039 !   Class pk__class__3214ec272dda2175 
   CONSTRAINT     a   ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT pk__class__3214ec272dda2175 PRIMARY KEY (id);
 M   ALTER TABLE ONLY public."Class" DROP CONSTRAINT pk__class__3214ec272dda2175;
       public            postgres    false    206            �
           2606    17041 (   List_ssid pk__list_ssi__3214ec27d52c2167 
   CONSTRAINT     h   ALTER TABLE ONLY public."List_ssid"
    ADD CONSTRAINT pk__list_ssi__3214ec27d52c2167 PRIMARY KEY (id);
 T   ALTER TABLE ONLY public."List_ssid" DROP CONSTRAINT pk__list_ssi__3214ec27d52c2167;
       public            postgres    false    208            �
           2606    17043 )   Notication pk__noticati__3214ec27ebaf2350 
   CONSTRAINT     i   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT pk__noticati__3214ec27ebaf2350 PRIMARY KEY (id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT pk__noticati__3214ec27ebaf2350;
       public            postgres    false    210            �
           2606    17047 -   Schedule_class pk__schedule__3214ec2791c70de7 
   CONSTRAINT     m   ALTER TABLE ONLY public."Schedule_class"
    ADD CONSTRAINT pk__schedule__3214ec2791c70de7 PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public."Schedule_class" DROP CONSTRAINT pk__schedule__3214ec2791c70de7;
       public            postgres    false    212            �
           2606    17049 ,   Student_class pk__student___3214ec2795cf21e4 
   CONSTRAINT     l   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT pk__student___3214ec2795cf21e4 PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT pk__student___3214ec2795cf21e4;
       public            postgres    false    214            �
           2606    17051 '   Students pk__students__3214ec27850f81f0 
   CONSTRAINT     g   ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT pk__students__3214ec27850f81f0 PRIMARY KEY (id);
 S   ALTER TABLE ONLY public."Students" DROP CONSTRAINT pk__students__3214ec27850f81f0;
       public            postgres    false    216                        2606    17053 %   Subject pk__subject__3214ec2767a9ec83 
   CONSTRAINT     e   ALTER TABLE ONLY public."Subject"
    ADD CONSTRAINT pk__subject__3214ec2767a9ec83 PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."Subject" DROP CONSTRAINT pk__subject__3214ec2767a9ec83;
       public            postgres    false    218                       2606    17055 *   Sysdiagrams pk__sysdiagr__c2b05b61865f01ac 
   CONSTRAINT     r   ALTER TABLE ONLY public."Sysdiagrams"
    ADD CONSTRAINT pk__sysdiagr__c2b05b61865f01ac PRIMARY KEY (diagram_id);
 V   ALTER TABLE ONLY public."Sysdiagrams" DROP CONSTRAINT pk__sysdiagr__c2b05b61865f01ac;
       public            postgres    false    220                       2606    17057 %   Teacher pk__teacher__3214ec2724e07fbd 
   CONSTRAINT     e   ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT pk__teacher__3214ec2724e07fbd PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."Teacher" DROP CONSTRAINT pk__teacher__3214ec2724e07fbd;
       public            postgres    false    222                       2606    17059    User pk__user__3214ec27a5f05b52 
   CONSTRAINT     _   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT pk__user__3214ec27a5f05b52 PRIMARY KEY (id);
 K   ALTER TABLE ONLY public."User" DROP CONSTRAINT pk__user__3214ec27a5f05b52;
       public            postgres    false    224            	           2606    17241 $   Teacher_subject teacher_subject_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Teacher_subject"
    ADD CONSTRAINT teacher_subject_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Teacher_subject" DROP CONSTRAINT teacher_subject_pkey;
       public            postgres    false    227                       1259    17060    uk_principal_name    INDEX     `   CREATE UNIQUE INDEX uk_principal_name ON public."Sysdiagrams" USING btree (principal_id, name);
 %   DROP INDEX public.uk_principal_name;
       public            postgres    false    220    220            
           2606    17061 %   Absent fk__absent__class_id__7a672e12    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT fk__absent__class_id__7a672e12 FOREIGN KEY (class_id) REFERENCES public."Class"(id);
 Q   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT fk__absent__class_id__7a672e12;
       public          postgres    false    2804    202    206                       2606    17066 %   Absent fk__absent__schedule__7b5b524b    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT fk__absent__schedule__7b5b524b FOREIGN KEY (schedule_class_id) REFERENCES public."Schedule_class"(id);
 Q   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT fk__absent__schedule__7b5b524b;
       public          postgres    false    2810    202    212                       2606    17071 %   Absent fk__absent__teacher___7c4f7684    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT fk__absent__teacher___7c4f7684 FOREIGN KEY (teacher_id) REFERENCES public."Teacher"(id);
 Q   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT fk__absent__teacher___7c4f7684;
       public          postgres    false    222    2821    202                       2606    17076 %   Absent fk__absent__user_upd__7d439abd    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT fk__absent__user_upd__7d439abd FOREIGN KEY (user_update_id) REFERENCES public."User"(id);
 Q   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT fk__absent__user_upd__7d439abd;
       public          postgres    false    224    2823    202                       2606    17081 ,   Absent_detail fk__absent_de__absen__02084fda    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent_detail"
    ADD CONSTRAINT fk__absent_de__absen__02084fda FOREIGN KEY (absent_id) REFERENCES public."Absent"(id);
 X   ALTER TABLE ONLY public."Absent_detail" DROP CONSTRAINT fk__absent_de__absen__02084fda;
       public          postgres    false    203    202    2800                       2606    17086 ,   Absent_detail fk__absent_de__stude__02fc7413    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent_detail"
    ADD CONSTRAINT fk__absent_de__stude__02fc7413 FOREIGN KEY (student_id) REFERENCES public."Students"(id);
 X   ALTER TABLE ONLY public."Absent_detail" DROP CONSTRAINT fk__absent_de__stude__02fc7413;
       public          postgres    false    203    216    2814                       2606    17096 $   Class fk__class__teacher_i__75a278f5    FK CONSTRAINT     �   ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT fk__class__teacher_i__75a278f5 FOREIGN KEY (teacher_id) REFERENCES public."Teacher"(id);
 P   ALTER TABLE ONLY public."Class" DROP CONSTRAINT fk__class__teacher_i__75a278f5;
       public          postgres    false    2821    206    222                       2606    17101 (   List_ssid fk__list_ssid__absen__208cd6fa    FK CONSTRAINT     �   ALTER TABLE ONLY public."List_ssid"
    ADD CONSTRAINT fk__list_ssid__absen__208cd6fa FOREIGN KEY (absent_detail_id) REFERENCES public."Absent_detail"(id);
 T   ALTER TABLE ONLY public."List_ssid" DROP CONSTRAINT fk__list_ssid__absen__208cd6fa;
       public          postgres    false    2802    203    208                       2606    17106 )   Notication fk__noticatio__absen__7e37bef6    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT fk__noticatio__absen__7e37bef6 FOREIGN KEY (absent_id) REFERENCES public."Absent"(id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT fk__noticatio__absen__7e37bef6;
       public          postgres    false    210    2800    202                       2606    17111 )   Notication fk__noticatio__stude__7f2be32f    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT fk__noticatio__stude__7f2be32f FOREIGN KEY (student_id) REFERENCES public."Students"(id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT fk__noticatio__stude__7f2be32f;
       public          postgres    false    216    210    2814                       2606    17116 )   Notication fk__noticatio__teach__00200768    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT fk__noticatio__teach__00200768 FOREIGN KEY (teacher_id) REFERENCES public."Teacher"(id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT fk__noticatio__teach__00200768;
       public          postgres    false    2821    210    222                       2606    17121 )   Notication fk__noticatio__user___01142ba1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT fk__noticatio__user___01142ba1 FOREIGN KEY (user_id) REFERENCES public."User"(id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT fk__noticatio__user___01142ba1;
       public          postgres    false    210    224    2823                       2606    17136 ,   Student_class fk__student_c__class__76969d2e    FK CONSTRAINT     �   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT fk__student_c__class__76969d2e FOREIGN KEY (class_id) REFERENCES public."Class"(id);
 X   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT fk__student_c__class__76969d2e;
       public          postgres    false    2804    214    206                       2606    17141 ,   Student_class fk__student_c__stude__778ac167    FK CONSTRAINT     �   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT fk__student_c__stude__778ac167 FOREIGN KEY (student_id) REFERENCES public."Students"(id);
 X   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT fk__student_c__stude__778ac167;
       public          postgres    false    216    214    2814                       2606    17242 #   Student_class fk_student_clas_class    FK CONSTRAINT     �   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT fk_student_clas_class FOREIGN KEY (class_id) REFERENCES public."Class"(id);
 O   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT fk_student_clas_class;
       public          postgres    false    2804    206    214                       2606    17247 %   Student_class fk_student_clas_student    FK CONSTRAINT     �   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT fk_student_clas_student FOREIGN KEY (student_id) REFERENCES public."Students"(id);
 Q   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT fk_student_clas_student;
       public          postgres    false    2814    216    214                       2606    17262 &   Teacher_subject fk_teacher_sub_subject    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_subject"
    ADD CONSTRAINT fk_teacher_sub_subject FOREIGN KEY (subject_id) REFERENCES public."Subject"(id);
 R   ALTER TABLE ONLY public."Teacher_subject" DROP CONSTRAINT fk_teacher_sub_subject;
       public          postgres    false    227    218    2816                       2606    17252 &   Teacher_subject fk_teacher_sub_teacher    FK CONSTRAINT     �   ALTER TABLE ONLY public."Teacher_subject"
    ADD CONSTRAINT fk_teacher_sub_teacher FOREIGN KEY (teacher_id) REFERENCES public."Teacher"(id);
 R   ALTER TABLE ONLY public."Teacher_subject" DROP CONSTRAINT fk_teacher_sub_teacher;
       public          postgres    false    2821    227    222            �      x������ � �      �      x������ � �      �   r   x�����0��^@�?-J������HR�L vw��Y؊�A�����kc�fa��Sq!z��p��OA~��8��%�\�	��M>���!.�򬞞�/���y�]�̞��-�      �      x������ � �      �      x������ � �      �   ^   x�M���0�*h��>rhZpH�FTC'�,��hf�v>�5)�b��mO�B�<� R<�Z�����m�vRVr,_:v	9Bޢ�t�D��s>      �   &   x�3�44�4��4202�54�50�4��"�=... R�'      �   �  x��V]kG}�����|��>;PCl�Q�(Y�n��U�݀K)%��K�J)�-�8�4��Tz胄�������^Y�	=��̙s�=�R�u��y5�Ơ��/�qr����Q�,6C�P�!f��5�h�;�t��(&�x� ���?�^a!L2~0�i���ww0�P�0���0�Ċ�i�~6X>7�zg%�z�����4c\�p-�!p��%Z����7��u��9�ŋ�//�S��Ϊ��&A�����B�-�h�����՗��D�B�T5��b������G��"��P�GJ	/���/��k�x�$-�]J�|�2V5�j�MJ'�h�m�d�.h��P;�	�y��d'Rȧ�{X����׵��Bmf�o�RN�^2�L���O�� '/w)���'��r��U��j���j��~amr�B�B��Ov!�|Ƽ�8G���_���U��T���mv8ր�lI�C붫E��0I��z�FDDB� (豖�-��l\�ޡ^R6	n��6�Ń��D�Z{G�58�	P�3�Xk)�HE�EBJK�6#�S��� �j��k!rs8�B:�:�I�ʁ�Ɋ��f�|F�?��sQ���b[�x�hw-�dX;�@ۼ���(#J���+"Y4��Z��L��4iy_��iIpK��<�u�� Bɘ�8��쎏��i���k�ߍ���eJAu�ܔ�c;U��Ɣ��tź��X����������8����~�%��"bp�^9���d/~�ٓ�<�boy�O¥�͜���Wͅ��N�:����U�u�\��� @��V�[^��<0�`63�a"0�~�X*�j3c�,���af��p�q��S�?\��99�b<\��	_�����E�IZH���}:��p�Zi�
1�Ϳ�~[M�}H���~�G��8i��_��8N�bl�w}�Bi���(z�C/,��=6x6|p�w̵gaQ(�}�><+��4�7>��v3�~��"?-T�J�0���ORW=�{�+0LR¡��A#�*��l5a�3�"6}��GaۛA�n�F�NaS���uL������`�	����`>ش�@�.�{���fϖ0�u+�]��A�p��ٿiM
���J�-O�+���;f�ɞ�'�ݑ4���a�O�#o���y{d�q?)�ϰ�HY(�I�87��s��ϟ�ۢ٠ز��a�<�.4�_�� �ee��hw����0.\���-?wG4}�(�O���}}�F      �   �   x�e�;
�@@��Sli������-4�`��R�Mc!����`� 	�co�F���oޛ04�8�U�8��θb��I�9H�-���&�-rC׶���@�LJ[ncZ�=�η<]|�a��C7���zG�(H3T�R=!�R*�af�SF���G����#/U�|2�^ '���I�)�\�1��*�<��&�|8p��/p�y�r��^�      �      x������ � �      �   Y  x����R�@���S�$�K�P�6J#c�s&!9'����� V6�vR�H
|���G ÌШ�nu�����iA?Q�|h�V�#���wt"R�����ڳ�615��U�́�Tȼ��gVX� ���S)'�Ί�ei1�cl�IV��f3&�ݥTQ,�����f�u3I �k�g���
���fnSJ=J�#�;[3��I�I��o���u�q�'l�'���h�,����7t�Z�+�������~�kܖ��n�i�~�;S<��NJ+USiő�f����f]L��w���?�|���x�����VGN����������BD��a3���3��2����-      �      x�3�4�4����� �X      �   m   x�3�LL����42426J3�4O4�DscK�D�T�DôdcΜԒ�Ҽ����tCKKs��t��������\N##]c]#NCN-�� OG-$&v�+F��� D!l     