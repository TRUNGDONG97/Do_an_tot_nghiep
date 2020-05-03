import createError from 'http-errors';
import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import indexRouter from './routes/IndexRouter'
import usersRouter from './routes/Users'
// import teacherRouter from './routes/teacher'
import authRouter from './routes/AuthRouter'
import homeRouter from './routes/HomeRouter'
import studentRouter from './routes/StudentRouter'
import teacherRouter from './routes/TeacherRouter'
import classRouter from './routes/ClassRouter'
import AuthMiddleware from './middlewares/AuthMiddleware'
import logoutRouter from './routes/LogoutRouter'
import teacher from './routes/Teacher'
// console.log(process.env)
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12312fdf'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user',  usersRouter);
app.use('/teacher', AuthMiddleware.requireAuth, teacherRouter);
app.use('/login', authRouter);
app.use('/home', AuthMiddleware.requireAuth, homeRouter);
app.use('/student', AuthMiddleware.requireAuth, studentRouter);
app.use('/class', AuthMiddleware.requireAuth, classRouter);
app.use('/logout', logoutRouter);

app.use('/api/teacher', teacher);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('ErrorView',{
        error:err
    });
});



module.exports = app;