

const auth = {
    login : '/auth/login',
    studentRegister : '/auth/register',
    teacherRegister : '/auth/register/teacher',
    forgotPassword : '/auth/forgot-password',
}

const dashboards = {
    admin : {
        professors : {
            allProfessors : '/dashboard/all-professors',
            addProfessor  : '/dashboard/add-professor',
        },
        students : {
            all : '/dashboard/admin/all-students',
            add : '/dashboard/admin/add-student'
        }
    }
}

const URLs = {
    HOST : 'http://127.0.0.1:4545',
    index : '/',
    auth : auth,
    dashboards : dashboards,
}

module.exports.URLs = URLs;
