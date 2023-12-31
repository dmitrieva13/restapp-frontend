import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './style/User.css'
import TopHolderUser from './TopHolderUser'
import LoadingPage from './LoadingPage'

function User() {
    const [fetched, fetchedSet] = useState(0)
    const [username, usernameSet] = useState("")
    const [role, roleSet] = useState("")
    const [restId, restIdSet] = useState("")
    const [restName, restNameSet] = useState("")
    const [bonuses, bonusesSet] = useState("")
    const [employeesList, employeesListSet] = useState<any[]>([])

    // let userData = {
    //     username: 'michaelis',
    //     icon: 'icon',
    //     job: 'Владелец',
    //     restauramt: [
    //         {id:'dorsia',
    //          restaurantName: 'Dorsia'
    //     }, {
    //         id:'casabonita',
    //         restaurantName: 'Casa Bonita'
    //     }],
    //     bonuses: null
    // }

    const navigate = useNavigate()

    let goToRestaurantEdit = (rid: string) => {
        navigate("/edit/" + rid)
    }

    let goToRestaurantPage = (id: string) => {
        navigate("/" + id)
    }

    let goToAddWorker = () => {
        navigate("/addworker")
    }

    useEffect(() => {
        let roleInfo = localStorage.getItem("role") || ""
        let bonusesInfo = localStorage.getItem("bonuses") || ""
        let id = localStorage.getItem("restaurant") || ""
        usernameSet(localStorage.getItem("username") || "")
        roleSet(localStorage.getItem("role") || "")
        restIdSet(localStorage.getItem("restaurant") || "")
        bonusesSet(localStorage.getItem("bonuses") || "")
            if (roleInfo.length == 0) {
                let jobClass = document.querySelector(".userJob")
                if (jobClass != null) {
                    jobClass.className += " invisible"
                }
            } else {
                if (!fetched) {
                    // fetchedSet(1)
                    fetch("https://restapp.onrender.com/restaurant", {
                        method: "POST",
                        body: JSON.stringify({restaurant_id: id}),
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                    }
                    ).then(res=>res.json())
                    .then(response=>{
              
                      fetchedSet(1)
                      restNameSet(response.name)
              
                      console.log(response)
                      // addessSet(response.restaurant.address)
                      // contactsSet(response.restaurant.contacts)
                      // descriptonSet(response.restaurant.description)
              
                      // let wh = response.restaurant.working_hours
                      // workingHoursSet(wh.split("\n"))
                    })
                    .catch(error=>{console.log(error)})

                    if (roleInfo == "admin") {
                    fetch("https://restapp.onrender.com/show_employees", {
                        method: "POST",
                        body: JSON.stringify({
                            restaurant_id: id,
                            access_token: localStorage.getItem('accessToken'),
                            refresh_token: localStorage.getItem('refreshToken'),
                        }),
                        headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                        }
                    }
                    ).then(res=>res.json())
                    .then(response=>{
              
              
                      console.log(response)

                      localStorage.setItem('accessToken', response.user.access_token)
                      localStorage.setItem('refreshToken', response.user.refresh_token)
                      
                      employeesListSet(response.employees)
                    })
                    .catch(error=>{console.log(error)})
                }
                }
            }
            if (bonusesInfo.length == 0) {
                let bonusesClass = document.querySelector(".userBonuses")
                if (bonusesClass != null) {
                    bonusesClass.className += " invisible"
                }
            }
            if (roleInfo.length == 0 || roleInfo != 'waiter') {
                let orderClass = document.querySelector(".takeOrder")
                if (orderClass != null) {
                    orderClass.className += " invisible"
                }
            }
            if (roleInfo.length == 0 || roleInfo != 'admin') {
                let addRestClass = document.querySelector(".editRestaurant")
                if (addRestClass != null) {
                    addRestClass.className += " invisible"
                }
                let addWorkerClass = document.querySelector(".addWorker")
                if (addWorkerClass != null) {
                    addWorkerClass.className += " invisible"
                }
            }
        }
    )
    
    if (fetched || role.length == 0) {
    return(
        <div className="userPage">
            <TopHolderUser />
            <div className="userIcon">
            </div>
            <div className="userName">
                {username}
            </div>
            <div className="userJob">
                {role.length > 0 ? 
                <div className='jobInfo'>
                    <div>{role} в ресторане </div>
                    <div className="userRestaurantName" onClick={e => goToRestaurantPage(restId)}>
                        {restName}
                    </div>
                    {/* {userData.restauramt.map((rest, i) => {
                        return(
                            <div key={i} className="userRestaurantName">{rest.restaurantName}</div>
                        )
                    })} */}
                </div>

                 : ''}
            </div>
            <div className="userBonuses">
                {bonuses.length > 0 ? "На вашем счету " + bonuses + " бонусов" : ''}
            </div>
            <div className="userButtons">
                <button className='userButton takeOrder'>
                    ПРИНЯТЬ ЗАКАЗ
                </button>
                <button className='userButton editRestaurant' onClick={e => goToRestaurantEdit(restId)}>
                    РЕДАКТИРОВАТЬ РЕСТОРАН
                </button>
                <button className='userButton addWorker' onClick={goToAddWorker}>
                    ДОБАВИТЬ РАБОТНИКА
                </button>
            </div>
            <div className='employees'>
                <div className='employeesBlock'>
                    {
                        employeesList.length > 0 && 
                        <div>
                            <div className="employeeText Title">Список сотрудников ресторана {restName}</div>
                            <div className="employeeInfoBlock">
                                <div className="employeeText Bold">Имя сотрудника:</div>
                                <div className="employeeText Bold">Имя пользователя:</div>
                                <div className="employeeText Bold">Роль:</div>
                            </div>
                        </div>
                    }
                    {
                        employeesList.map((employee, i) => {
                            return(
                                <div key={i} className='employeeInfoBlock'>
                                    <div className='employeeText'>
                                        {employee.name}
                                    </div>
                                    <div className='employeeText'>
                                        {employee.email}
                                    </div>
                                    <div className='employeeText'>
                                        {employee.role}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
    } else {
        return(
            <LoadingPage />
        )
    }
}

export default User