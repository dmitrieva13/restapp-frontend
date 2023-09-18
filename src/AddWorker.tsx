import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/AddWorker.css'
import TopHolderBasic from './TopHolderBasic'

function AddWorker() {
  const [restaurant, restaurantSet] = useState("")
  const [role, roleSet] = useState("")
  const [username, usernameSet] = useState("")
  const [password, passwordSet] = useState("")
  const [passwordCheck, passwordCheckSet] = useState("")
  const [roleOptions, roleOptionsSet] = useState<any[]>([])
  const [loaded, loadedSet] = useState(0)
  const [error, errorSet] = useState("")
  const [errortotal, errortotalSet] = useState("")

  const navigate = useNavigate()

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

  useEffect(() => {
    if (!loaded) {
        loadedSet(1)
        if (localStorage.restaurant) {
            restaurantSet(localStorage.restaurant)
        }
        let roles = ['chef', 'waiter']
        if (localStorage.role == 'owner') {
            roles.push('manager')
        }
        roleOptionsSet(roles)
        usernameSet("")
        passwordSet("")
        passwordCheckSet("")
        roleSet("")
    }
  })

  let addWorkerButtonClicked = () => {
    if (username.length == 0) {
        setError("addWorkerUserInput")
        errortotalSet('Username не может быть пустым')
        return
    }
    if (password.length == 0) {
        setError("addWorkerPasswordInput")
        errortotalSet('Пароль не может быть пустым')
        return
    }
    if (password != passwordCheck) {
        setError("addWorkerPasswordInput")
        setError("addWorkerCheckInput")
        errortotalSet('Пароли не совпадают')
        return
    }
    makeVisisble('createdSuccesfullyBlock')
    makeInvisisble('AddWorkerInputsBlock')
    setTimeout(() => {
        navigate("/")
    }, 2000)
}

  return (
    <div className="AddWorkerScreen">
        <TopHolderBasic />
        <div className="createdSuccesfullyBlock invisible">
            <div className="successText">
              Работник {username} успешно добавлен!
            </div>
        </div>
        <div className="AddWorkerInputsBlock">
            <div className="titleBlock">
                <div className="title">ДОБАВЛЕНИЕ РАБОТНИКА</div>
            </div>
            <div className="restaurantBlock">
                <div className="text">ID ресторана:</div>
                <div className="textInfo">{localStorage.restaurant}</div>
            </div>
            <div className="roleBlock">
                <div className="text">Должность:</div>
                <select className='selection' onChange={e => roleSet(e.target.value)}>
                    {roleOptions.map((option: any, i: number) => {
                        return(
                        <option key={i} value={option}>
                            {option}
                        </option>
                    )})}
                </select>
            </div>
            <div className="usernameBlock">
                <div className="text">Username работника:</div>
                <input className="addWorkerUserInput" type="text" maxLength={30} value={username}
                                onChange={e => usernameSet(e.target.value.replace(/[^A-Za-z0-9.@_]/ig, ''))} />
            </div>
            <div className="passwordBlock">
                <div className="text">Пароль для работника:</div>
                <input className="addWorkerPasswordInput" type="text" maxLength={50} value={password}
                                onChange={e => passwordSet(e.target.value.replace(/[^A-Za-z0-9?!-.,_]/ig, ''))} />
            </div>
            <div className="passwordCheckBlock">
                <div className="text">Повторите пароль:</div>
                <div className="passwordCheckInputBlock">
                    <input className="addWorkerCheckInput" type="text" maxLength={50} value={passwordCheck}
                                    onChange={e => {
                                        passwordCheckSet(e.target.value)
                                        errorSet("")
                                        checkPassword(e.target.value)
                                        }} />
                    <div className='addWorkerError'>{error}</div>
                </div>
            </div>
            <div className="buttonBlock">
                <div className="addWorkerError">{errortotal}</div>
                <button className='addButton' onClick={addWorkerButtonClicked}>
                    ДОБАВИТЬ РАБОТНИКА
                </button>
            </div>
        </div>
    </div>
  )
}

export default AddWorker