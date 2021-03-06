PGDMP         "                x            ManagerAbsent    12.2    12.2 G    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16907    ManagerAbsent    DATABASE     �   CREATE DATABASE "ManagerAbsent" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "ManagerAbsent";
                postgres    false            �            1259    16908    Absent_Class    TABLE     �  CREATE TABLE public."Absent_Class" (
    id integer NOT NULL,
    class_id integer,
    create_date date DEFAULT now() NOT NULL,
    status smallint DEFAULT 1 NOT NULL,
    date_absent date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    time_start time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    time_end time without time zone,
    gps_latitude real,
    gps_longitude real,
    is_active smallint DEFAULT 1 NOT NULL
);
 "   DROP TABLE public."Absent_Class";
       public         heap    postgres    false            �            1259    16912    Absent_Student    TABLE     A  CREATE TABLE public."Absent_Student" (
    id bigint NOT NULL,
    student_id integer,
    absent_class_id integer,
    status smallint DEFAULT 0 NOT NULL,
    gps_latitude real,
    gps_longitude real,
    class_id bigint,
    date_absent date,
    time_absent time without time zone,
    device_id character varying
);
 $   DROP TABLE public."Absent_Student";
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
       public         heap    postgres    false            �            1259    16937    Notification    TABLE     b  CREATE TABLE public."Notification" (
    id integer NOT NULL,
    type smallint,
    student_id integer,
    teacher_id integer,
    user_id integer,
    device_address character varying(200) DEFAULT ''::character varying,
    created_date date DEFAULT now() NOT NULL,
    class_id integer,
    content character varying DEFAULT ''::character varying
);
 "   DROP TABLE public."Notification";
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
       public         heap    postgres    false            �            1259    16974    Students    TABLE     !  CREATE TABLE public."Students" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    phone character varying DEFAULT ''::bpchar,
    birthday date DEFAULT now(),
    password character varying(200) NOT NULL,
    address character varying(200) DEFAULT ''::character varying,
    email character varying(200) DEFAULT ''::character varying,
    sex integer,
    created_date timestamp without time zone DEFAULT now(),
    device_id text,
    token text,
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
       public         heap    postgres    false            �            1259    17006    Teacher    TABLE       CREATE TABLE public."Teacher" (
    id integer NOT NULL,
    name character varying(200) DEFAULT ''::character varying,
    phone character varying DEFAULT ''::bpchar,
    password character varying(200) NOT NULL,
    birthday date DEFAULT now(),
    address character varying(200) DEFAULT ''::character varying,
    email character varying(200) DEFAULT ''::character varying,
    note text DEFAULT ''::text,
    device_id text,
    token text,
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
       public         heap    postgres    false            �            1259    17022    User    TABLE     n  CREATE TABLE public."User" (
    id integer NOT NULL,
    user_name character varying(200) DEFAULT ''::character varying,
    password character varying(200) NOT NULL,
    email character varying(200) DEFAULT ''::character varying,
    created_date date DEFAULT now(),
    is_active integer DEFAULT 1,
    name character varying(200),
    token character varying
);
    DROP TABLE public."User";
       public         heap    postgres    false            �            1259    16919    absent_detail_id_seq    SEQUENCE     �   ALTER TABLE public."Absent_Student" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.absent_detail_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    203            �            1259    16921    absent_id_seq    SEQUENCE     �   ALTER TABLE public."Absent_Class" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
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
            public          postgres    false    208            �            1259    16945    notication_id_seq    SEQUENCE     �   ALTER TABLE public."Notification" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
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
            public          postgres    false    224            �          0    16908    Absent_Class 
   TABLE DATA           �   COPY public."Absent_Class" (id, class_id, create_date, status, date_absent, time_start, time_end, gps_latitude, gps_longitude, is_active) FROM stdin;
    public          postgres    false    202   �[       �          0    16912    Absent_Student 
   TABLE DATA           �   COPY public."Absent_Student" (id, student_id, absent_class_id, status, gps_latitude, gps_longitude, class_id, date_absent, time_absent, device_id) FROM stdin;
    public          postgres    false    203   �[       �          0    16923    Class 
   TABLE DATA           �   COPY public."Class" (id, teacher_id, status, created_date, is_active, start_date, end_date, class_code, subject_id) FROM stdin;
    public          postgres    false    206   �[       �          0    16932 	   List_ssid 
   TABLE DATA           F   COPY public."List_ssid" (id, ssid_name, absent_detail_id) FROM stdin;
    public          postgres    false    208   �\       �          0    16937    Notification 
   TABLE DATA           �   COPY public."Notification" (id, type, student_id, teacher_id, user_id, device_address, created_date, class_id, content) FROM stdin;
    public          postgres    false    210   �\       �          0    16955    Schedule_class 
   TABLE DATA           f   COPY public."Schedule_class" (id, class_id, day_of_week, time_start, time_end, room_name) FROM stdin;
    public          postgres    false    212   k]       �          0    16963    Student_class 
   TABLE DATA           ~   COPY public."Student_class" (id, student_id, class_id, note, created_date, is_active, mid_semester, end_semester) FROM stdin;
    public          postgres    false    214   ^       �          0    16974    Students 
   TABLE DATA           �   COPY public."Students" (id, name, phone, birthday, password, address, email, sex, created_date, device_id, token, url_avatar, mssv) FROM stdin;
    public          postgres    false    216   �^       �          0    16990    Subject 
   TABLE DATA           }   COPY public."Subject" (id, subject_name, create_date, is_active, subject_code, credit_hour, "time", coefficient) FROM stdin;
    public          postgres    false    218   e       �          0    16998    Sysdiagrams 
   TABLE DATA           \   COPY public."Sysdiagrams" (name, principal_id, diagram_id, version, definition) FROM stdin;
    public          postgres    false    220   �e       �          0    17006    Teacher 
   TABLE DATA           �   COPY public."Teacher" (id, name, phone, password, birthday, address, email, note, device_id, token, url_avatar, sex, status, salary) FROM stdin;
    public          postgres    false    222   �e       �          0    17237    Teacher_subject 
   TABLE DATA           G   COPY public."Teacher_subject" (id, teacher_id, subject_id) FROM stdin;
    public          postgres    false    227   �g       �          0    17022    User 
   TABLE DATA           f   COPY public."User" (id, user_name, password, email, created_date, is_active, name, token) FROM stdin;
    public          postgres    false    224   �g       �           0    0    absent_detail_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.absent_detail_id_seq', 34, true);
          public          postgres    false    204            �           0    0    absent_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.absent_id_seq', 16, true);
          public          postgres    false    205            �           0    0    class_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.class_id_seq', 14, true);
          public          postgres    false    207            �           0    0    list_ssid_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.list_ssid_id_seq', 1, false);
          public          postgres    false    209            �           0    0    notication_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.notication_id_seq', 16, true);
          public          postgres    false    211            �           0    0    schedule_class_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.schedule_class_id_seq', 18, true);
          public          postgres    false    213            �           0    0    student_class_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.student_class_id_seq', 24, true);
          public          postgres    false    215            �           0    0    students_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.students_id_seq', 41, true);
          public          postgres    false    217            �           0    0    subject_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.subject_id_seq', 7, true);
          public          postgres    false    219            �           0    0    sysdiagrams_diagram_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.sysdiagrams_diagram_id_seq', 1, false);
          public          postgres    false    221            �           0    0    teacher_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.teacher_id_seq', 17, true);
          public          postgres    false    223            �           0    0    teacher_subject_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.teacher_subject_id_seq', 1, true);
          public          postgres    false    226            �           0    0    user_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.user_id_seq', 4, false);
          public          postgres    false    225            �
           2606    17035 )   Absent_Class pk__absent__3214ec27984fa8b5 
   CONSTRAINT     i   ALTER TABLE ONLY public."Absent_Class"
    ADD CONSTRAINT pk__absent__3214ec27984fa8b5 PRIMARY KEY (id);
 U   ALTER TABLE ONLY public."Absent_Class" DROP CONSTRAINT pk__absent__3214ec27984fa8b5;
       public            postgres    false    202            �
           2606    17322 -   Absent_Student pk__absent_d__3214ec2749a37502 
   CONSTRAINT     m   ALTER TABLE ONLY public."Absent_Student"
    ADD CONSTRAINT pk__absent_d__3214ec2749a37502 PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public."Absent_Student" DROP CONSTRAINT pk__absent_d__3214ec2749a37502;
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
           2606    17043 +   Notification pk__noticati__3214ec27ebaf2350 
   CONSTRAINT     k   ALTER TABLE ONLY public."Notification"
    ADD CONSTRAINT pk__noticati__3214ec27ebaf2350 PRIMARY KEY (id);
 W   ALTER TABLE ONLY public."Notification" DROP CONSTRAINT pk__noticati__3214ec27ebaf2350;
       public            postgres    false    210            �
           2606    17047 -   Schedule_class pk__schedule__3214ec2791c70de7 
   CONSTRAINT     m   ALTER TABLE ONLY public."Schedule_class"
    ADD CONSTRAINT pk__schedule__3214ec2791c70de7 PRIMARY KEY (id);
 Y   ALTER TABLE ONLY public."Schedule_class" DROP CONSTRAINT pk__schedule__3214ec2791c70de7;
       public            postgres    false    212                        2606    17049 ,   Student_class pk__student___3214ec2795cf21e4 
   CONSTRAINT     l   ALTER TABLE ONLY public."Student_class"
    ADD CONSTRAINT pk__student___3214ec2795cf21e4 PRIMARY KEY (id);
 X   ALTER TABLE ONLY public."Student_class" DROP CONSTRAINT pk__student___3214ec2795cf21e4;
       public            postgres    false    214                       2606    17051 '   Students pk__students__3214ec27850f81f0 
   CONSTRAINT     g   ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT pk__students__3214ec27850f81f0 PRIMARY KEY (id);
 S   ALTER TABLE ONLY public."Students" DROP CONSTRAINT pk__students__3214ec27850f81f0;
       public            postgres    false    216                       2606    17053 %   Subject pk__subject__3214ec2767a9ec83 
   CONSTRAINT     e   ALTER TABLE ONLY public."Subject"
    ADD CONSTRAINT pk__subject__3214ec2767a9ec83 PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."Subject" DROP CONSTRAINT pk__subject__3214ec2767a9ec83;
       public            postgres    false    218                       2606    17055 *   Sysdiagrams pk__sysdiagr__c2b05b61865f01ac 
   CONSTRAINT     r   ALTER TABLE ONLY public."Sysdiagrams"
    ADD CONSTRAINT pk__sysdiagr__c2b05b61865f01ac PRIMARY KEY (diagram_id);
 V   ALTER TABLE ONLY public."Sysdiagrams" DROP CONSTRAINT pk__sysdiagr__c2b05b61865f01ac;
       public            postgres    false    220            	           2606    17057 %   Teacher pk__teacher__3214ec2724e07fbd 
   CONSTRAINT     e   ALTER TABLE ONLY public."Teacher"
    ADD CONSTRAINT pk__teacher__3214ec2724e07fbd PRIMARY KEY (id);
 Q   ALTER TABLE ONLY public."Teacher" DROP CONSTRAINT pk__teacher__3214ec2724e07fbd;
       public            postgres    false    222                       2606    17059    User pk__user__3214ec27a5f05b52 
   CONSTRAINT     _   ALTER TABLE ONLY public."User"
    ADD CONSTRAINT pk__user__3214ec27a5f05b52 PRIMARY KEY (id);
 K   ALTER TABLE ONLY public."User" DROP CONSTRAINT pk__user__3214ec27a5f05b52;
       public            postgres    false    224                       2606    17241 $   Teacher_subject teacher_subject_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public."Teacher_subject"
    ADD CONSTRAINT teacher_subject_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public."Teacher_subject" DROP CONSTRAINT teacher_subject_pkey;
       public            postgres    false    227                       1259    17060    uk_principal_name    INDEX     `   CREATE UNIQUE INDEX uk_principal_name ON public."Sysdiagrams" USING btree (principal_id, name);
 %   DROP INDEX public.uk_principal_name;
       public            postgres    false    220    220                       2606    17323 (   List_ssid fk__list_ssid__absen__208cd6fa    FK CONSTRAINT     �   ALTER TABLE ONLY public."List_ssid"
    ADD CONSTRAINT fk__list_ssid__absen__208cd6fa FOREIGN KEY (absent_detail_id) REFERENCES public."Absent_Student"(id);
 T   ALTER TABLE ONLY public."List_ssid" DROP CONSTRAINT fk__list_ssid__absen__208cd6fa;
       public          postgres    false    203    2806    208            �      x������ � �      �      x������ � �      �   �   x�����0�P���C���p�N������n�	$��R�
�&2}�׀I`�*E��?>yx�A�Fo��	j=	����ڀ�r��hbi7���z��N�Z�;+:5��&��j3w'c�����N�jm�`���җ�Oi����_�}B�      �      x������ � �      �   �   x��ұ�0��<��c; &H�� )�h��	�%-�d����eɒ����T��h����MH�m%�n��W����1��������/j��V�pː�����ԨZ�r:�sV��7���H��1��-�ZQ������Ȍ]4e9ڎ�� ���Y�����9��#9�      �   �   x�]�;�0Dk��3,T�>B���Y$����.6�e����nr�K�+\VrDG
�S�2���`�R�9t'A�����C���Qfi�2��8�K���)�6��Ϭ���O`+N��]1�r��@�}�]?/U�nz(�      �   �   x�u���0�󸗬` 'nb+H�u���JF�����(�C�����f5��"�C�"GA�_�	�
�`,h�� 0*S�JS¼2��?˽���Ee���*ga����va�/�e�|Q�h��|Zl����"�^*      �   ]  x��Vˊc�}���H��>oA �2v'�.:�l��<�ʭ�R�%��,��	t�(�@:&�6���IJ�T��O�ϕT-uʯ*4(���Yk��v�ds���9�]s�N8#Jc,���!�!W,kP��R� -p[ @��������곮e��,�?�|�'�Q�=f�� ����Rc���`�b��\k�� �ӃI�6?[���rKiSa�!�
��P���{�.j�|(<F#��]���6�?M�/�1����w��	���Ϛ��u��e{��*��UZ�-*pt��%'�&�]F����&���\}>i�z��t���ɭ�4\��&p#��7Gȸr nD�Xn���U!�^,����PUJ�L�Ĥ��!第�*�\x��g���y������-��I�1�#a�C��j����d:�~�Ξ.Ƃ~�d9��|:�����b�r�8� �r����h>��5]��r+z�E�{���肇b��I�,J�N�<�T�X�E�~1i��I^\ԃ���~��f�F�'�vF��v�G�Џ�aE�F��MU��g�%m��ۙ���v`�6(�Ҍ��D�y���Տ�����W�2�
��w$��/E+���\�R���Zǃ2A&�Q�].����X�}-g[CJ;F>N펡i�� ;[�\����n}�r��T�|H�)FscC��	\
�eW,�9��t=�u�ی���-�E��>k��r��K�/k��1�Y���m��)�4��u�A%aw4�".��#\�]E�d7�f�k��_>۬~��8��} S��$�"mHMT(�H��ע��Գ�}#(��Gܡ��<�J��u�d�U�#H�^�%e�A�%��1�mΒf�5�E=�n<)G���/�_bR��5�l��yA�"%�E(�V���E�:e�Q�����QU��1Sfd���ϝun@$�[�g��mЛ��3�M��%f]B
�h[@A��!x����w�p'��yU��V��	�݅�^�C˻���F��
�f]�t�ZY�ڄ6�)e������ ܬ�H���mܓ�7qO�C�Ƒ0q"J%�"!��>���2Q�zK"�u����S�bA�z ����T@Ψ�6.����f�:,m	a8x/)�i���S6�ۖ�)��M݂��Ԁ%���Q�B�7��إ���2������l�d ��Ͷ��g���Ceɷ;��d�xP9d�g��{."��֖k�5�R/vq����3��������v���l���#p4I�ī�`��->���[���`����ng���4�����I�|O��k��u�!����QoT?! x�����Iݓ}T��\*��Є���<�Q���"� �
�տ������$wݣ;�R�� `I�� yk\��"��u��M���r̖�$�.m�ԠEp���?�N�<OwZ���E�v��|]?߷�S8�_���cI�v�RL@K��NP�O>�DX1�������no7$��3�����cC����;��}��O�ż9�@}a��������}	u��rU�;؎��Fư �_R�!)C�"f����g���O�;<���<xv�:���~���g�����3}�������?����c��	�>��+g�      �   �   x�e�=�@��z�[J1dg��@)L,���lbh�&rbMb��p����HT2���	k몛�YS�	'�B
iې	P�
%
<0LA{uUa����� �l�W_b����{W��_F_9��}��4��������'�����ʌ���_r�q���ՠ�ɄK�>z�cO�4MQ      �      x������ � �      �   �  x����n�@��٧p�l����DB
� �	bI(�����k���B�hh頄7 ˋ�M�n"-H4p祐��a�d�5�����u%��y�Y��2�+m��.� %�+�S�c��ͧd:�+������fe���w]�n2�h_ؐz�]ʈc�1���s���Ea���_�g/_`uz�\�[�����7prT��>j˓�cەog�mTƸ<�󺵺.�U<� �w˺�.�k��g�s���nPB/�T��r�0"��M�@�yw5���燡�b�Y5|�ьB��!<V؃��'�a����J9�r+d��MH�|Ӹ�������6�@qݴ��ǘ�C�>9�oɝ�9�=C	�aZ�0��h��ا� RBP9r4;ݔM\���3�.�`q5�����H n�_d���d�͋      �      x�3�4�4����� �X      �   �   x���
�0 ��oOᵡl�&�����2#eE7˟a�Z=}]�dȱE��_ǂ'Rh��P�V��=^�ԣ5L�8���tׇ�8 R��&�����|���z�iySl��YzpoqW��+�U�(s�긌>�i��Sr	!?j|(�     