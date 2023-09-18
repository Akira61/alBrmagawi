const apiBaseURL = "http://127.0.0.1:4545";

export const apiURLs = {
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
};
export const URLs = {};
console.log(URLs);
