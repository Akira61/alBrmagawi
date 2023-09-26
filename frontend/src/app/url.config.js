const apiBaseURL = "http://127.0.0.1:4545";

export const apiURLs = {
  baseURL: "http://127.0.0.1:4545",
  auth: {
    login: {
      post: apiBaseURL + "/auth/login",
    },
    register: {
      teacher: {
        post: apiBaseURL + "/auth/register/teacher",
      },
      student: {
        post: apiBaseURL + "/auth/register",
      },
    },
    resetPassword: {
      post: apiBaseURL + "/auth/forgot-password",
    },
  },
  dashboard: {
    teachers: {
      all: apiBaseURL + "/dashboard/all-professors-info",
    },
  },
};
export const configURL = {
  dashboard: {
    admin: {
      teacher: {
        all: "/dashboard/admin/teachers/all-teachers",
        acceptDenaied: "/dashboard/admin/teachers/accept-denaied",
        add: "/dashboard/admin/teachers/add",
      },
      student: {
        all: "/dashboard/admin/students/all",
        add: "/dashboard/admin/students/add"
      }
    },
  },
};
