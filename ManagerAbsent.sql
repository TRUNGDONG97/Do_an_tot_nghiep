	USE [master]
	GO
/****** Object:  Database [ManagerAbsent]    Script Date: 02/25/2020 16:14:52 ******/
CREATE DATABASE [ManagerAbsent1] ON  PRIMARY 
( NAME = N'ManagerAbsent1', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ManagerAbsent1.mdf' , SIZE = 2304KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'ManagerAbsent1_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.SQLEXPRESS\MSSQL\DATA\ManagerAbsent1_log.LDF' , SIZE = 832KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [ManagerAbsent1] SET COMPATIBILITY_LEVEL = 100
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ManagerAbsent1].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ManagerAbsent1] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE [ManagerAbsent1] SET ANSI_NULLS OFF
GO
ALTER DATABASE [ManagerAbsent1] SET ANSI_PADDING OFF
GO
ALTER DATABASE [ManagerAbsent1] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE [ManagerAbsent1] SET ARITHABORT OFF
GO
ALTER DATABASE [ManagerAbsent1] SET AUTO_CLOSE OFF
GO
ALTER DATABASE [ManagerAbsent1] SET AUTO_CREATE_STATISTICS ON
GO
ALTER DATABASE [ManagerAbsent1] SET AUTO_SHRINK OFF
GO
ALTER DATABASE [ManagerAbsent1] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE [ManagerAbsent1] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE [ManagerAbsent1] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE [ManagerAbsent1] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE [ManagerAbsent1] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE [ManagerAbsent1] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE [ManagerAbsent1] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE [ManagerAbsent1] SET  ENABLE_BROKER
GO
ALTER DATABASE [ManagerAbsent1] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE [ManagerAbsent1] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE [ManagerAbsent1] SET TRUSTWORTHY OFF
GO
ALTER DATABASE [ManagerAbsent1] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE [ManagerAbsent1] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE [ManagerAbsent1] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE [ManagerAbsent1] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE [ManagerAbsent1] SET  READ_WRITE
GO
ALTER DATABASE [ManagerAbsent1] SET RECOVERY FULL
GO
ALTER DATABASE [ManagerAbsent1] SET  MULTI_USER
GO
ALTER DATABASE [ManagerAbsent1] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE [ManagerAbsent1] SET DB_CHAINING OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'ManagerAbsent1', N'ON'
GO
USE [ManagerAbsent1]
GO
/****** Object:  Table [dbo].[USER]   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[USER](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[USER_NAME] [nvarchar](200) NULL,
	[PASSWORD] [varchar](200) NOT NULL,
	[EMAIL] [nvarchar](200) NULL,
	[CREATED_DATE] [datetime] NULL,
	[IS_ACTIVE] [int] NULL,
	[NAME] [nvarchar](200) NULL,
	[TOCKEN] [nvarchar](200) NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[STUDENTS]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[STUDENTS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [nvarchar](200) NULL,
	[PHONE] [char](30) NULL,
	[BIRTHDAY] [datetime] NULL,
	[PASSWORD] [nvarchar](200) NOT NULL,
	[ADDRESS] [nvarchar](200) NULL,
	[EMAIL] [varchar](200) NULL,
	[SEX] [int] NULL,
	[CREATED_DATE] [datetime] NULL,
	[DEVICEID] [nvarchar](max) NULL,
	[TOCKEN] [nvarchar](max) NULL,
	[URL_AVATAR] [nvarchar](max) NULL,
	[MARK1] [float] NULL,
	[MARK2] [float] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TEACHER]   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[TEACHER](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [nvarchar](200) NULL,
	[PHONE] [char](30) NULL,
	[PASSWORD] [nvarchar](200) NOT NULL,
	[BIRTHDAY] [datetime] NULL,
	[ADDRESS] [nvarchar](200) NULL,
	[EMAIL] [nvarchar](200) NULL,
	[STATUS] [tinyint] NULL,
	[CREATED_DATE] [datetime] NULL,
	[IS_ACTIVE] [int] NULL,
	[SUBJECT_ID] [int] NULL,
	[PERSONID_CODE] [char](30) NULL,
	[NOTE] [nvarchar](max) NULL,
	[DEVICEID] [nvarchar](max) NULL,
	[TOCKEN] [nvarchar](max) NULL,
	[DATE_LOGIN] [datetime] NULL,
	[URL_AVATAR] [nvarchar](max) NULL,
	[SEX] [tinyint] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CLASS]   ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CLASS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [nvarchar](200) NULL,
	[TEACHER_ID] [int] NULL,
	[STATUS] [tinyint] NULL,
	[CREATED_DATE] [datetime] NULL,
	[IS_ACTIVE] [int] NULL,
	[START_DATE] [datetime] NULL,
	[END_DATE] [datetime] NULL,
	[SUBJECT_ID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[STUDENT_CLASS]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[STUDENT_CLASS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[STUDENT_ID] [int] NULL,
	[CLASS_ID] [int] NULL,
	[NOTE] [nvarchar](max) NULL,
	[CREATED_DATE] [datetime] NULL,
	[IS_ACTIVE] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SUBJECT]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SUBJECT](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [nvarchar](200) NULL,
	[CREATE_DATE] [datetime] NULL,
	[IS_ACTIVE] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ABSENT]    Script Date: 02/25/2020 16:14:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ABSENT](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CLASS_ID] [int] NULL,
	[CREATE_DATE] [datetime] NOT NULL,
	[STATUS] [tinyint] NULL,
	[TEACHER_ID] [int] NULL,
	[USER_UPDATE_ID] [int] NULL,
	[SCHEDULE_CLASS_ID] [int] NULL,
	
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[ABSENT_DETAIL]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ABSENT_DETAIL](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[STUDENT_ID] [int] NULL,
	[ABSENT_ID] [int] NULL,
	[MODIFIER_DATE] [datetime] NULL,
	[STATUS] [tinyint] NULL,
	[COMMENT] [nvarchar](max) NULL,
	[USER_UPDATE_ID] [int] NULL,
	[SSID] [nvarchar] NULL,
	[GPS] [nvarchar] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ROOM]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ROOM](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NAME] [nvarchar](200) NULL,
	[CREATED_DATE] [datetime] NULL,
	[IS_ACTIVE] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SCHEDULE_CLASS]    ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SCHEDULE_CLASS](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[CLASS_ID] [int] NULL,
	[START_TIME] [datetime] NULL,
	[END_TIME] [datetime] NULL,
	[ROOM_ID] [int] NULL,
	[CREATED_DATE] [datetime] NULL,
	[IS_ACTIVE] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO


/****** Object:  Table [dbo].[NOTICATION]     ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NOTICATION](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[TYPE] [tinyint] NULL,
	[STUDENT_ID] [int] NULL,
	[TEACHER_ID] [int] NULL,
	[USER_ID] [int] NULL,
	[DEVICE_ADDRESS] [nvarchar](200) NULL,
	[LINK] [nvarchar](200) NULL,
	[IS_VIEWED] [tinyint] NULL,
	[CREATED_DATE] [datetime] NULL,
	[ABSENT_ID] [int] NULL,
	[CONTENT] [nvarchar] NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Default [DF__USER__USER_NAME]   ******/
ALTER TABLE [dbo].[USER] ADD  DEFAULT ('') FOR [USER_NAME]
GO
/****** Object:  Default [DF__USER__EMAIL]     ******/
ALTER TABLE [dbo].[USER] ADD  DEFAULT ('') FOR [EMAIL]
GO
/****** Object:  Default [DF__USER__CREATED_DATE]     ******/
ALTER TABLE [dbo].[USER] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
/****** Object:  Default [DF__USER__IS_ACTIVE]  ******/
ALTER TABLE [dbo].[USER] ADD  DEFAULT ((1)) FOR [IS_ACTIVE]
GO

/****** Object:  Default [DF__SUBJECT__NAME]    ******/
ALTER TABLE [dbo].[SUBJECT] ADD  DEFAULT ('') FOR [NAME]
GO
/****** Object:  Default [DF__SUBJECT__CREATE]    ******/
ALTER TABLE [dbo].[SUBJECT] ADD  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
/****** Object:  Default [DF__SUBJECT__IS_ACTI]    ******/
ALTER TABLE [dbo].[SUBJECT] ADD  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
ALTER TABLE [dbo].[STUDENTS] ADD  DEFAULT ('') FOR [NAME]
GO
/****** Object:  Default [DF__STUDENTS__PHONE]   ******/
ALTER TABLE [dbo].[STUDENTS] ADD  DEFAULT ('') FOR [PHONE]
GO
/****** Object:  Default [DF__STUDENTS__STUDENT]    ******/
ALTER TABLE [dbo].[STUDENTS] ADD  DEFAULT (getdate()) FOR [BIRTHDAY]
GO
/****** Object:  Default [DF__STUDENTS__ADDRESS] ******/
ALTER TABLE [dbo].[STUDENTS] ADD  DEFAULT ('') FOR [ADDRESS]
GO
/****** Object:  Default [DF__STUDENTS__EMAIL]     ******/
ALTER TABLE [dbo].[STUDENTS] ADD  DEFAULT ('') FOR [EMAIL]
GO
/****** Object:  Default [DF__STUDENTS__CREATED] ******/
ALTER TABLE [dbo].[STUDENTS] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
/****** Object:  Default [DF__STUDENTS__MARK1]    ******/
ALTER TABLE [dbo].[STUDENTS] ADD  DEFAULT ((0)) FOR [MARK1]
GO
/****** Object:  Default [DF__STUDENTS__MARK2]     ******/
ALTER TABLE [dbo].[STUDENTS] ADD  DEFAULT ((0)) FOR [MARK2]
GO

/****** Object:  Default [DF__ROOM__NAME]     ******/
ALTER TABLE [dbo].[ROOM] ADD  DEFAULT ('') FOR [NAME]
GO
/****** Object:  Default [DF__ROOM__CREATED_DATE]  ******/
ALTER TABLE [dbo].[ROOM] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
/****** Object:  Default [DF__ROOM__IS_ACTIVE]  ******/
ALTER TABLE [dbo].[ROOM] ADD  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
/****** Object:  Default [DF__TEACHER__NAME]  ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT ('') FOR [NAME]
GO
/****** Object:  Default [DF__TEACHER__PHONE]    ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT ('') FOR [PHONE]
GO
/****** Object:  Default [DF__TEACHER__BIRTHDA]  ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT (getdate()) FOR [BIRTHDAY]
GO
/****** Object:  Default [DF__TEACHER__ADDRESS__6E01572D] ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT ('') FOR [ADDRESS]
GO
/****** Object:  Default [DF__TEACHER__EMAIL]     ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT ('') FOR [EMAIL]
GO
/****** Object:  Default [DF__TEACHER__CREATED]    ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
/****** Object:  Default [DF__TEACHER__IS_ACTI]  ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
/****** Object:  Default [DF__TEACHER__PERSONI]    ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT ('') FOR [PERSONID_CODE]
GO
/****** Object:  Default [DF__TEACHER__NOTE]  ******/
ALTER TABLE [dbo].[TEACHER] ADD  DEFAULT ('') FOR [NOTE]
GO
/****** Object:  Default [DF__CLASS__NAME]  ******/
ALTER TABLE [dbo].[CLASS] ADD  DEFAULT ('') FOR [NAME]
GO
/****** Object:  Default [DF__CLASS__CREATED_D]    ******/
ALTER TABLE [dbo].[CLASS] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
/****** Object:  Default [DF__CLASS__IS_ACTIVE]    ******/
ALTER TABLE [dbo].[CLASS] ADD  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
/****** Object:  Default [DF__CLASS__START_DAT]   ******/
ALTER TABLE [dbo].[CLASS] ADD  DEFAULT (getdate()) FOR [START_DATE]
GO
/****** Object:  Default [DF__STUDENT_CL__NOTE]    ******/
ALTER TABLE [dbo].[STUDENT_CLASS] ADD  DEFAULT ('') FOR [NOTE]
GO
/****** Object:  Default [DF__STUDENT_C__CREAT]   ******/
ALTER TABLE [dbo].[STUDENT_CLASS] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
/****** Object:  Default [DF__STUDENT_C__IS_AC]   ******/
ALTER TABLE [dbo].[STUDENT_CLASS] ADD  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
/****** Object:  Default [DF__SCHEDULE___START]    ******/
ALTER TABLE [dbo].[SCHEDULE_CLASS] ADD  DEFAULT (getdate()) FOR [START_TIME]
GO
/****** Object:  Default [DF__SCHEDULE___CREAT]    ******/
ALTER TABLE [dbo].[SCHEDULE_CLASS] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
/****** Object:  Default [DF__SCHEDULE___IS_AC]   ******/
ALTER TABLE [dbo].[SCHEDULE_CLASS] ADD  DEFAULT ((1)) FOR [IS_ACTIVE]
GO
/****** Object:  Default [DF__ABSENT__CREATE_D]    ******/
ALTER TABLE [dbo].[ABSENT] ADD  DEFAULT (getdate()) FOR [CREATE_DATE]
GO
/****** Object:  Default [DF__NOTICATIO__CONTE]    ******/
ALTER TABLE [dbo].[NOTICATION] ADD  DEFAULT ('') FOR [CONTENT]
GO
/****** Object:  Default [DF__NOTICATIO__DEVIC]    ******/
ALTER TABLE [dbo].[NOTICATION] ADD  DEFAULT ('') FOR [DEVICE_ADDRESS]
GO
/****** Object:  Default [DF__NOTICATION__LINK]    ******/
ALTER TABLE [dbo].[NOTICATION] ADD  DEFAULT ('') FOR [LINK]
GO
/****** Object:  Default [DF__NOTICATIO__IS_VI] ******/
ALTER TABLE [dbo].[NOTICATION] ADD  DEFAULT ((0)) FOR [IS_VIEWED]
GO
/****** Object:  Default [DF__NOTICATIO__CREAT]    ******/
ALTER TABLE [dbo].[NOTICATION] ADD  DEFAULT (getdate()) FOR [CREATED_DATE]
GO
/****** Object:  Default [DF__ABSENT_DE__MODIF]    ******/
ALTER TABLE [dbo].[ABSENT_DETAIL] ADD  DEFAULT (getdate()) FOR [MODIFIER_DATE]
GO
/****** Object:  Default [DF__ABSENT_DE__COMME]   ******/
ALTER TABLE [dbo].[ABSENT_DETAIL] ADD  DEFAULT ('') FOR [COMMENT]
GO
/****** Object:  ForeignKey [FK__TEACHER__SUBJECT]    ******/
ALTER TABLE [dbo].[CLASS]  WITH CHECK ADD FOREIGN KEY([SUBJECT_ID])
REFERENCES [dbo].[SUBJECT] ([ID])
GO
/****** Object:  ForeignKey [FK__CLASS__TEACHER_I]    ******/
ALTER TABLE [dbo].[CLASS]  WITH CHECK ADD FOREIGN KEY([TEACHER_ID])
REFERENCES [dbo].[TEACHER] ([ID])
/****** Object:  ForeignKey [FK__STUDENT_C__CLASS]     ******/
ALTER TABLE [dbo].[STUDENT_CLASS]  WITH CHECK ADD FOREIGN KEY([CLASS_ID])
REFERENCES [dbo].[CLASS] ([ID])
GO
/****** Object:  ForeignKey [FK__STUDENT_C__STUDE]    ******/
ALTER TABLE [dbo].[STUDENT_CLASS]  WITH CHECK ADD FOREIGN KEY([STUDENT_ID])
REFERENCES [dbo].[STUDENTS] ([ID])
GO
/****** Object:  ForeignKey [FK__SCHEDULE___CLASS]   ******/
ALTER TABLE [dbo].[SCHEDULE_CLASS]  WITH CHECK ADD FOREIGN KEY([CLASS_ID])
REFERENCES [dbo].[CLASS] ([ID])
GO
/****** Object:  ForeignKey [FK__SCHEDULE___ROOM]    ******/
ALTER TABLE [dbo].[SCHEDULE_CLASS]  WITH CHECK ADD FOREIGN KEY([ROOM_ID])
REFERENCES [dbo].[ROOM] ([ID])
GO
/****** Object:  ForeignKey [FK__ABSENT__CLASS_ID]     ******/
ALTER TABLE [dbo].[ABSENT]  WITH CHECK ADD FOREIGN KEY([CLASS_ID])
REFERENCES [dbo].[CLASS] ([ID])
GO
/****** Object:  ForeignKey [FK__ABSENT__SCHEDULE]     ******/
ALTER TABLE [dbo].[ABSENT]  WITH CHECK ADD FOREIGN KEY([SCHEDULE_CLASS_ID])
REFERENCES [dbo].[SCHEDULE_CLASS] ([ID])
GO
/****** Object:  ForeignKey [FK__ABSENT__TEACHER]    ******/
ALTER TABLE [dbo].[ABSENT]  WITH CHECK ADD FOREIGN KEY([TEACHER_ID])
REFERENCES [dbo].[TEACHER] ([ID])
GO
/****** Object:  ForeignKey [FK__ABSENT__USER_UPD]     ******/
ALTER TABLE [dbo].[ABSENT]  WITH CHECK ADD FOREIGN KEY([USER_UPDATE_ID])
REFERENCES [dbo].[USER] ([ID])
GO

ALTER TABLE [dbo].[NOTICATION]  WITH CHECK ADD FOREIGN KEY([ABSENT_ID])
REFERENCES [dbo].[ABSENT] ([ID])
GO
/****** Object:  ForeignKey [FK__NOTICATIO__PAREN]     ******/
ALTER TABLE [dbo].[NOTICATION]  WITH CHECK ADD FOREIGN KEY([STUDENT_ID])
REFERENCES [dbo].[STUDENTS] ([ID])
GO

/****** Object:  ForeignKey [FK__NOTICATIO__TEACH]   ******/
ALTER TABLE [dbo].[NOTICATION]  WITH CHECK ADD FOREIGN KEY([TEACHER_ID])
REFERENCES [dbo].[TEACHER] ([ID])
GO

/****** Object:  ForeignKey [FK__NOTICATIO__USER]     ******/
ALTER TABLE [dbo].[NOTICATION]  WITH CHECK ADD FOREIGN KEY([USER_ID])
REFERENCES [dbo].[USER] ([ID])
GO

/****** Object:  ForeignKey [FK__ABSENT_DE__ABSEN]    ******/
ALTER TABLE [dbo].[ABSENT_DETAIL]  WITH CHECK ADD FOREIGN KEY([ABSENT_ID])
REFERENCES [dbo].[ABSENT] ([ID])
GO

/****** Object:  ForeignKey [FK__ABSENT_DE__PAREN]    ******/
ALTER TABLE [dbo].[ABSENT_DETAIL]  WITH CHECK ADD FOREIGN KEY([STUDENT_ID])
REFERENCES [dbo].[STUDENTS] ([ID])
GO
