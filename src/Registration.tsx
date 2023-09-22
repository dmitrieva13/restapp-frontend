import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode"
import './style/Registration.css'
import TopHolderLogin from './TopHolderLogin'

function Registration() {
    const [username, usernameSet] = useState("")
    const [password, passwordSet] = useState("")
    const [passwordCheck, passwordCheckSet] = useState("")
    const [error, errorSet] = useState("")

    const navigate = useNavigate()

    let goToElogin = () => {
        navigate("/elogin")
    }

    let goToLogin = () => {
      navigate("/login")
    }

    let setError = (inputName: string) => {
        let input = document.querySelector("."+inputName)
        // console.log(input)
        if (input != null) {
          input.className += " invalid"
          input.addEventListener("click", e => {
            let found = document.querySelector("."+inputName)
            if (found != null) {
              found.className = inputName
            }
          })
        }
      }

      let checkPassword = (second: string) => {
        if (second != password) {
            errorSet("Пароли не совпадают!")
            setError("userPasswordCheckInput")
        }
    }

    let makeVisisble = (className: string) => {
        let divClass = document.querySelector("." + className)
        if (divClass != null) {
          divClass.className = className
        }
      }
    
      let makeInvisisble = (className: string) => {
        let divClass = document.querySelector("." + className)
        if (divClass != null) {
          divClass.className += " invisible"
        }
      }

    let registration = () => {
        // fetch("https://restapp.onrender.com/login", {
        //       method: "POST",
        //       body: JSON.stringify({
        //             email: username,
        //             password: password
        //         }),
        //       headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //       }
        //   }
        //   ).then(res=>res.json())
        //   .then(response=>{
        //     console.log("AA")
        //     console.log(response)
        //     if(!response?.user){
        //         console.log("CASA BONITA")
        //         errorSet(response.message)
        //         setError("userUsernameInput")
        //         setError("userPasswordInput")
        //         makeVisisble("loginError")
        //         // setTimeout(function(){
        //         // makeInvisisble("loginError")
        //         // }, 10000)
        //     } else {
        //         let decode : {restaurant_id: string, role: string, email: string} 
        //             = jwt_decode(response.user.accessToken)
        //         console.log(decode)
        //         localStorage.setItem("accessToken", response.user.accessToken)
        //         localStorage.setItem("refreshToken", response.user.refreshToken)
        //         localStorage.setItem("restaurant", decode.restaurant_id)
        //         localStorage.setItem("role", decode.role)
        //         localStorage.setItem("username", decode.email)
        //         navigate("/")
        //     }
        //   })
        //   .catch(er=>{
        //     console.log(er.message)
        // })
        if (username.length == 0) {
          setError("userUsernameInput")
          errorSet('Имя пользователя не может быть пустым')
          return
      }
      if (password.length == 0) {
          setError("userPasswordInput")
          errorSet('Пароль не может быть пустым')
          return
      }
      if (password != passwordCheck) {
          setError("userPasswordInput")
          setError("userPasswordCheckInput")
          errorSet('Пароли не совпадают')
          return
      }
        localStorage.setItem("username", username)
        localStorage.setItem("role", "")
        localStorage.setItem("restaurant", '')
        localStorage.setItem("bonuses", "0")
        navigate("/")
    }

    return(
        <div className="userRegPage">
            <TopHolderLogin />
            <div className="regTitle">
                ЗАРЕГИСТРИРОВАТЬСЯ
            </div>
            <div className="userInputsBlock">
                <div className="userEmaiInputBlock">
                    <div className="userRegTextBlock">
                        Email:
                    </div>
                    <input className="userUsernameInput" maxLength={200}
                        value={username} type="text"
                        onChange={e => {
                            usernameSet(e.target.value)
                            errorSet("")
                            }}/>
                </div>
                <div className="userPasswordInputBlock">
                    <div className="userRegTextBlock">
                    Пароль:
                    </div>
                    <input className="userPasswordInput" maxLength={200}
                        value={password} type="text"
                        onChange={e => {
                            passwordSet(e.target.value)
                            errorSet("")
                            }}/>
                </div>
                <div className="userPasswordCheckInputBlock">
                    <div className="userRegTextBlock">
                    Повторите пароль:
                    </div>
                    <input className="userPasswordCheckInput" maxLength={200}
                        value={passwordCheck} type="text"
                        onChange={e => {
                            passwordCheckSet(e.target.value)
                            errorSet("")
                            checkPassword(e.target.value)
                            }}/>
                </div>
                {/* {error ? <div>Error<div> : <div></div>} */}
                <div className='loginError'>{error}</div>
                
            </div>
            <div className="userButtonBlock">
                <button className='registrationButton' onClick={registration}>ЗАРЕГИСТРИРОВАТЬСЯ</button>      
            </div>
            <div className="toLoginBlock">
              <button className='toLoginButton' onClick={goToLogin}>Уже есть аккаунт? Войти</button>
            </div>
            <div className="toEmployeeBlock">
                <button className='toEmployeeButton' onClick={goToElogin}>ВОЙТИ КАК РАБОТНИК</button>
            </div>
        </div>
    )
}

export default Registration