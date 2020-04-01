PGDMP         #                x            ManagerAbsent    12.2    12.2 W    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
    create_date timestamp without time zone DEFAULT now() NOT NULL,
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
       public         heap    postgres    false            �            1259    16923    Class    TABLE     ~  CREATE TABLE public."Class" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    teacher_id integer,
    status smallint,
    created_date timestamp without time zone DEFAULT now(),
    is_active integer DEFAULT 1,
    start_date timestamp without time zone DEFAULT now(),
    end_date timestamp without time zone,
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
    created_date timestamp without time zone DEFAULT now(),
    absent_id integer,
    content character varying(1) DEFAULT ''::character varying
);
     DROP TABLE public."Notication";
       public         heap    postgres    false            �            1259    16947    Room    TABLE     �   CREATE TABLE public."Room" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    created_date timestamp without time zone DEFAULT now(),
    is_active integer DEFAULT 1
);
    DROP TABLE public."Room";
       public         heap    postgres    false            �            1259    16955    Schedule_class    TABLE     .  CREATE TABLE public."Schedule_class" (
    id integer NOT NULL,
    class_id integer,
    start_time timestamp without time zone DEFAULT now(),
    end_time timestamp without time zone,
    room_id integer,
    created_date timestamp without time zone DEFAULT now(),
    is_active integer DEFAULT 1
);
 $   DROP TABLE public."Schedule_class";
       public         heap    postgres    false            �            1259    16963    Student_class    TABLE     �   CREATE TABLE public."Student_class" (
    id integer NOT NULL,
    student_id integer,
    class_id integer,
    note text DEFAULT ''::text,
    created_date timestamp without time zone DEFAULT now(),
    is_active integer DEFAULT 1
);
 #   DROP TABLE public."Student_class";
       public         heap    postgres    false            �            1259    16974    Students    TABLE     [  CREATE TABLE public."Students" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    phone character(30) DEFAULT ''::bpchar,
    birthday timestamp without time zone DEFAULT now(),
    password character varying(200) NOT NULL,
    address character varying(200) DEFAULT ''::character varying,
    email character varying(200) DEFAULT ''::character varying,
    sex integer,
    created_date timestamp without time zone DEFAULT now(),
    deviceid text,
    tocken text,
    url_avatar text,
    mark1 real DEFAULT 0,
    mark2 real DEFAULT 0,
    mssv integer
);
    DROP TABLE public."Students";
       public         heap    postgres    false            �            1259    16990    Subject    TABLE     �   CREATE TABLE public."Subject" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    create_date timestamp without time zone DEFAULT now(),
    is_active integer DEFAULT 1
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
       public         heap    postgres    false            �            1259    17006    Teacher    TABLE     �  CREATE TABLE public."Teacher" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    phone character(30) DEFAULT ''::bpchar,
    password character varying(200) NOT NULL,
    birthday timestamp without time zone DEFAULT now(),
    address character varying(200) DEFAULT ''::character varying,
    email character varying(200) DEFAULT ''::character varying,
    status smallint,
    created_date timestamp without time zone DEFAULT now(),
    is_active integer DEFAULT 1,
    subject_id integer,
    note text DEFAULT ''::text,
    deviceid text,
    tocken text,
    url_avatar text,
    sex smallint
);
    DROP TABLE public."Teacher";
       public         heap    postgres    false            �            1259    17022    User    TABLE     �  CREATE TABLE public."User" (
    id integer NOT NULL,
    user_name character varying(200) DEFAULT ''::character varying,
    password character varying(200) NOT NULL,
    email character varying(200) DEFAULT ''::character varying,
    created_date timestamp without time zone DEFAULT now(),
    is_active integer DEFAULT 1,
    name character varying(200),
    tocken character varying(200)
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
            public          postgres    false    210            �            1259    16953    room_id_seq    SEQUENCE     �   ALTER TABLE public."Room" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.room_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    212            �            1259    16961    schedule_class_id_seq    SEQUENCE     �   ALTER TABLE public."Schedule_class" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.schedule_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    214            �            1259    16972    student_class_id_seq    SEQUENCE     �   ALTER TABLE public."Student_class" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.student_class_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    216            �            1259    16988    students_id_seq    SEQUENCE     �   ALTER TABLE public."Students" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.students_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    218            �            1259    16996    subject_id_seq    SEQUENCE     �   ALTER TABLE public."Subject" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.subject_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    220            �            1259    17004    sysdiagrams_diagram_id_seq    SEQUENCE     �   ALTER TABLE public."Sysdiagrams" ALTER COLUMN diagram_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.sysdiagrams_diagram_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    222            �            1259    17020    teacher_id_seq    SEQUENCE     �   ALTER TABLE public."Teacher" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.teacher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    224            �            1259    17032    user_id_seq    SEQUENCE     �   ALTER TABLE public."User" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    226            �          0    16908    Absent 
   TABLE DATA           t   COPY public."Absent" (id, class_id, create_date, status, teacher_id, user_update_id, schedule_class_id) FROM stdin;
    public          postgres    false    202   �u       �          0    16912    Absent_detail 
   TABLE DATA           �   COPY public."Absent_detail" (id, student_id, absent_id, status, comment, user_update_id, gps_latitude, gps_longitude, ssid_id) FROM stdin;
    public          postgres    false    203   v       �          0    16923    Class 
   TABLE DATA           z   COPY public."Class" (id, name, teacher_id, status, created_date, is_active, start_date, end_date, subject_id) FROM stdin;
    public          postgres    false    206   -v       �          0    16932 	   List_ssid 
   TABLE DATA           F   COPY public."List_ssid" (id, ssid_name, absent_detail_id) FROM stdin;
    public          postgres    false    208   Jv       �          0    16937 
   Notication 
   TABLE DATA           �   COPY public."Notication" (id, type, student_id, teacher_id, user_id, device_address, link, is_viewed, created_date, absent_id, content) FROM stdin;
    public          postgres    false    210   gv       �          0    16947    Room 
   TABLE DATA           C   COPY public."Room" (id, name, created_date, is_active) FROM stdin;
    public          postgres    false    212   �v       �          0    16955    Schedule_class 
   TABLE DATA           p   COPY public."Schedule_class" (id, class_id, start_time, end_time, room_id, created_date, is_active) FROM stdin;
    public          postgres    false    214   �v       �          0    16963    Student_class 
   TABLE DATA           b   COPY public."Student_class" (id, student_id, class_id, note, created_date, is_active) FROM stdin;
    public          postgres    false    216   �v       �          0    16974    Students 
   TABLE DATA           �   COPY public."Students" (id, name, phone, birthday, password, address, email, sex, created_date, deviceid, tocken, url_avatar, mark1, mark2, mssv) FROM stdin;
    public          postgres    false    218   �v       �          0    16990    Subject 
   TABLE DATA           E   COPY public."Subject" (id, name, create_date, is_active) FROM stdin;
    public          postgres    false    220   �w       �          0    16998    Sysdiagrams 
   TABLE DATA           \   COPY public."Sysdiagrams" (name, principal_id, diagram_id, version, definition) FROM stdin;
    public          postgres    false    222   �w       �          0    17006    Teacher 
   TABLE DATA           �   COPY public."Teacher" (id, name, phone, password, birthday, address, email, status, created_date, is_active, subject_id, note, deviceid, tocken, url_avatar, sex) FROM stdin;
    public          postgres    false    224   �w       �          0    17022    User 
   TABLE DATA           g   COPY public."User" (id, user_name, password, email, created_date, is_active, name, tocken) FROM stdin;
    public          postgres    false    226   �x       �           0    0    absent_detail_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.absent_detail_id_seq', 1, false);
          public          postgres    false    204            �           0    0    absent_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.absent_id_seq', 1, false);
          public          postgres    false    205            �           0    0    class_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.class_id_seq', 1, false);
          public          postgres    false    207            �           0    0    list_ssid_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.list_ssid_id_seq', 1, false);
          public          postgres    false    209            �           0    0    notication_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.notication_id_seq', 1, false);
          public          postgres    false    211            �           0    0    room_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.room_id_seq', 1, false);
          public          postgres    false    213            �           0    0    schedule_class_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.schedule_class_id_seq', 1, false);
          public          postgres    false    215            �           0    0    student_class_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.student_class_id_seq', 1, false);
          public          postgres    false    217            �           0    0    students_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.students_id_seq', 17, false);
          public          postgres    false    219            �           0    0    subject_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.subject_id_seq', 1, false);
          public          postgres    false    221            �           0    0    sysdiagrams_diagram_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.sysdiagrams_diagram_id_seq', 1, false);
          public          postgres    false    223            �           0    0    teacher_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.teacher_id_seq', 3, true);
          public          postgres    false    225            �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 4, false);
          public          postgres    false    227            �
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
       public            postgres    false    208                       2606    17043 )   Notication pk__noticati__3214ec27ebaf2350 
   CONSTRAINT     i   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT pk__noticati__3214ec27ebaf2350 PRIMARY KEY (id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT pk__noticati__3214ec27ebaf2350;
       public            postgres    false    210                       2606    17045    Room pk__room__3214ec2787430e7d 
   CONSTRAINT     _   ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT pk__room__3214ec2787430e7d PRIMARY KEY (id);
 K   ALTER TABLE ONLY public."Room" DROP CONSTRAINT pk__room__3214ec2787430e7d;
       public            postgres    false    212                       2606    17047 -   Schedule_class pk__schedule__3214ec2791c70de7 
   CONSTRAINT     m   ALTER TABLE ONLY public."Schedule_class"
    ADD CONSTRAINT pk__schedule__3214ec2791c70de7 PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public."Schedule_class" DROP CONSTRAINT pk__schedule__3214ec2791c70de7;
       public            postgres    false    214                       2606    17049 ,   Student_class pk__student___3214ec2795cf21e4 
   CONSTRAINT     l   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT pk__student___3214ec2795cf21e4 PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT pk__student___3214ec2795cf21e4;
       public            postgres    false    216            	           2606    17051 '   Students pk__students__3214ec27850f81f0 
   CONSTRAINT     g   ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT pk__students__3214ec27850f81f0 PRIMARY KEY (id);
 S   ALTER TABLE ONLY public."Students" DROP CONSTRAINT pk__students__3214ec27850f81f0;
       public            postgres    false    218                       2606    17053 %   Subject pk__subject__3214ec2767a9ec83 
   CONSTRAINT     e   ALTER TABLE ONLY public."Subject"
    ADD CONSTRAINT pk__subject__3214ec2767a9ec83 PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."Subject" DROP CONSTRAINT pk__subject__3214ec2767a9ec83;
       public            postgres    false    220                       2606    17055 *   Sysdiagrams pk__sysdiagr__c2b05b61865f01ac 
   CONSTRAINT     r   ALTER TABLE ONLY public."Sysdiagrams"
    ADD CONSTRAINT pk__sysdiagr__c2b05b61865f01ac PRIMARY KEY (diagram_id);
 V   ALTER TABLE ONLY public."Sysdiagrams" DROP CONSTRAINT pk__sysdiagr__c2b05b61865f01ac;
       public            postgres    false    222                       2606    17057 %   Teacher pk__teacher__3214ec2724e07fbd 
   CONSTRAINT     e   ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT pk__teacher__3214ec2724e07fbd PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."Teacher" DROP CONSTRAINT pk__teacher__3214ec2724e07fbd;
       public            postgres    false    224                       2606    17059    User pk__user__3214ec27a5f05b52 
   CONSTRAINT     _   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT pk__user__3214ec27a5f05b52 PRIMARY KEY (id);
 K   ALTER TABLE ONLY public."User" DROP CONSTRAINT pk__user__3214ec27a5f05b52;
       public            postgres    false    226                       1259    17060    uk_principal_name    INDEX     `   CREATE UNIQUE INDEX uk_principal_name ON public."Sysdiagrams" USING btree (principal_id, name);
 %   DROP INDEX public.uk_principal_name;
       public            postgres    false    222    222                       2606    17061 %   Absent fk__absent__class_id__7a672e12    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT fk__absent__class_id__7a672e12 FOREIGN KEY (class_id) REFERENCES public."Class"(id);
 Q   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT fk__absent__class_id__7a672e12;
       public          postgres    false    202    206    2813                       2606    17066 %   Absent fk__absent__schedule__7b5b524b    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT fk__absent__schedule__7b5b524b FOREIGN KEY (schedule_class_id) REFERENCES public."Schedule_class"(id);
 Q   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT fk__absent__schedule__7b5b524b;
       public          postgres    false    2821    214    202                       2606    17071 %   Absent fk__absent__teacher___7c4f7684    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT fk__absent__teacher___7c4f7684 FOREIGN KEY (teacher_id) REFERENCES public."Teacher"(id);
 Q   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT fk__absent__teacher___7c4f7684;
       public          postgres    false    224    2832    202                       2606    17076 %   Absent fk__absent__user_upd__7d439abd    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent"
    ADD CONSTRAINT fk__absent__user_upd__7d439abd FOREIGN KEY (user_update_id) REFERENCES public."User"(id);
 Q   ALTER TABLE ONLY public."Absent" DROP CONSTRAINT fk__absent__user_upd__7d439abd;
       public          postgres    false    202    226    2834                       2606    17081 ,   Absent_detail fk__absent_de__absen__02084fda    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent_detail"
    ADD CONSTRAINT fk__absent_de__absen__02084fda FOREIGN KEY (absent_id) REFERENCES public."Absent"(id);
 X   ALTER TABLE ONLY public."Absent_detail" DROP CONSTRAINT fk__absent_de__absen__02084fda;
       public          postgres    false    203    2809    202                       2606    17086 ,   Absent_detail fk__absent_de__stude__02fc7413    FK CONSTRAINT     �   ALTER TABLE ONLY public."Absent_detail"
    ADD CONSTRAINT fk__absent_de__stude__02fc7413 FOREIGN KEY (student_id) REFERENCES public."Students"(id);
 X   ALTER TABLE ONLY public."Absent_detail" DROP CONSTRAINT fk__absent_de__stude__02fc7413;
       public          postgres    false    203    2825    218                       2606    17091 $   Class fk__class__subject_i__74ae54bc    FK CONSTRAINT     �   ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT fk__class__subject_i__74ae54bc FOREIGN KEY (subject_id) REFERENCES public."Subject"(id);
 P   ALTER TABLE ONLY public."Class" DROP CONSTRAINT fk__class__subject_i__74ae54bc;
       public          postgres    false    206    2827    220                       2606    17096 $   Class fk__class__teacher_i__75a278f5    FK CONSTRAINT     �   ALTER TABLE ONLY public."Class"
    ADD CONSTRAINT fk__class__teacher_i__75a278f5 FOREIGN KEY (teacher_id) REFERENCES public."Teacher"(id);
 P   ALTER TABLE ONLY public."Class" DROP CONSTRAINT fk__class__teacher_i__75a278f5;
       public          postgres    false    224    2832    206                       2606    17101 (   List_ssid fk__list_ssid__absen__208cd6fa    FK CONSTRAINT     �   ALTER TABLE ONLY public."List_ssid"
    ADD CONSTRAINT fk__list_ssid__absen__208cd6fa FOREIGN KEY (absent_detail_id) REFERENCES public."Absent_detail"(id);
 T   ALTER TABLE ONLY public."List_ssid" DROP CONSTRAINT fk__list_ssid__absen__208cd6fa;
       public          postgres    false    2811    208    203                       2606    17106 )   Notication fk__noticatio__absen__7e37bef6    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT fk__noticatio__absen__7e37bef6 FOREIGN KEY (absent_id) REFERENCES public."Absent"(id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT fk__noticatio__absen__7e37bef6;
       public          postgres    false    210    202    2809                       2606    17111 )   Notication fk__noticatio__stude__7f2be32f    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT fk__noticatio__stude__7f2be32f FOREIGN KEY (student_id) REFERENCES public."Students"(id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT fk__noticatio__stude__7f2be32f;
       public          postgres    false    210    218    2825                       2606    17116 )   Notication fk__noticatio__teach__00200768    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT fk__noticatio__teach__00200768 FOREIGN KEY (teacher_id) REFERENCES public."Teacher"(id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT fk__noticatio__teach__00200768;
       public          postgres    false    2832    210    224                       2606    17121 )   Notication fk__noticatio__user___01142ba1    FK CONSTRAINT     �   ALTER TABLE ONLY public."Notication"
    ADD CONSTRAINT fk__noticatio__user___01142ba1 FOREIGN KEY (user_id) REFERENCES public."User"(id);
 U   ALTER TABLE ONLY public."Notication" DROP CONSTRAINT fk__noticatio__user___01142ba1;
       public          postgres    false    226    210    2834                        2606    17126 -   Schedule_class fk__schedule___class__787ee5a0    FK CONSTRAINT     �   ALTER TABLE ONLY public."Schedule_class"
    ADD CONSTRAINT fk__schedule___class__787ee5a0 FOREIGN KEY (class_id) REFERENCES public."Class"(id);
 Y   ALTER TABLE ONLY public."Schedule_class" DROP CONSTRAINT fk__schedule___class__787ee5a0;
       public          postgres    false    214    206    2813            !           2606    17131 -   Schedule_class fk__schedule___room___797309d9    FK CONSTRAINT     �   ALTER TABLE ONLY public."Schedule_class"
    ADD CONSTRAINT fk__schedule___room___797309d9 FOREIGN KEY (room_id) REFERENCES public."Room"(id);
 Y   ALTER TABLE ONLY public."Schedule_class" DROP CONSTRAINT fk__schedule___room___797309d9;
       public          postgres    false    214    212    2819            "           2606    17136 ,   Student_class fk__student_c__class__76969d2e    FK CONSTRAINT     �   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT fk__student_c__class__76969d2e FOREIGN KEY (class_id) REFERENCES public."Class"(id);
 X   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT fk__student_c__class__76969d2e;
       public          postgres    false    216    206    2813            #           2606    17141 ,   Student_class fk__student_c__stude__778ac167    FK CONSTRAINT     �   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT fk__student_c__stude__778ac167 FOREIGN KEY (student_id) REFERENCES public."Students"(id);
 X   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT fk__student_c__stude__778ac167;
       public          postgres    false    218    216    2825            �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �      x������ � �      �   �   x�u����@��٧�Z�2��I�Tj�	b!r�M���+�)�>��������2�H��
z���T��)�j��U�^6��; �6���o��8 � Qr(�&��W����J)��������3�Y�y!��h��@�P�R�&� �Q3�V�
ɆV�F���Ͽ?/?����x����0�Ïj��>osHgY��od�2�|7z�2�b*��8O9      �      x������ � �      �      x������ � �      �   �   x������@��٧�Z�2������JARb�&gD��y;m}�<�or����<�p��)���G�h�r�\�
0�ˏ�d!_O ���bg#�����9��~;������.ն*J��+U�@��9b��<�NY�.���!�!���C��:r�|QO�����z{�ʌ4@V�-E�ҝ�;��#M�+��-�a���3����*!�Ok`�      �   Z   x�3�LL��̃�9�%E�y�)�y醖��zI�鹉�9z����FF�ƺF
�V@dj�g`d�iȩ���裠����Ns��qqq �U�     