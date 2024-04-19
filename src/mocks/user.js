export const logoutMock = () => {
  console.log("Logout user")
  return {
    status: 200,
  }
}

export const signInMock = (login, password) => {
  console.log(`Sign in user\nlogin: ${login}\npassword: ${password}`)
  return {
    status: 200,
    data: {
      login: login,
      message: "клиент успешно авторизован",
      userId: "00000000-0000-0000-0000-000000000000",
    }
  }
}

export const signUpMock = (login, password) => {
  console.log(`Sign up user\nlogin: ${login}\npassword: ${password}`)
}
