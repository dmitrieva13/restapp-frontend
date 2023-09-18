import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './style/CreateRestPage.css'
import NewScreen from './NewScreen'
import TopHolderBasic from './TopHolderBasic'

function EditRest() {
  const navigate = useNavigate()

//   let goToUser = () => {
//       navigate("/user/" + props.name)
//   }
    const emptyInfo = {
        title: "",
        text: "",
        images: []
    }

    const emptyScreen = {
        titles: [] as any,
        texts: [] as any,
        images: [] as any
    }

    const { restaurantId } = useParams();

    const [restaurantName, restaurantNameSet] = useState("")
    const [restaurantID, restaurantIDSet] = useState("")
    const [screens, screensSet] = useState<any[5]>([emptyScreen,emptyScreen,emptyScreen,emptyScreen,emptyScreen])
    const [scrIndex, scrIndexSet] = useState(-1)
    const [colors, colorsSet] = useState<any[5]>(["rgb(100, 100, 100)","rgb(100, 100, 100)", "rgb(100, 100, 100)", "rgb(100, 100, 100)", "rgb(100, 100, 100)"])
    const [screensVisible, screensVisibleSet] = useState(1)
    const [fetched, fetchedSet] = useState(0)
    const [workingHours, workingHoursSet] = useState("")
    const [address, addressSet] = useState('')
    const [contacts, contactsSet] = useState('')
    const [description, descriptionSet] = useState('')
    const [mainImages, mainImagesSet] = useState<any[3]>(['','',''])
    const [loaded, loadedSet] = useState(false)

    const weekdays = ['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье']

    useEffect(() => {
        if(!fetched) {
            // fetchedSet(1)
            fetch("https://restapp.onrender.com/restaurant", {
                method: "POST",
                body: JSON.stringify({restaurant_id: restaurantId}),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }
            ).then(res=>res.json())
            .then(response=>{
      
              fetchedSet(1)
              restaurantNameSet(response.name)
              restaurantIDSet(restaurantId != null ? restaurantId : "")
              addressSet(response.address)
              contactsSet(response.contacts)
              descriptionSet(response.description)
              let whArr = response.working_hours.split('\n')
              let whFormatted = ''
              whArr.map((wh: any, i: number) => {
                whFormatted += i == 0 ? wh : '\\n' + wh
              })
              workingHoursSet(whFormatted)
              
              let mainImgs = ['','','']
              let screenArr = [emptyScreen,emptyScreen,emptyScreen,emptyScreen,emptyScreen]
              response.screens.map((scr: any, i: number) => {
                if (scr.type == "main") {
                    console.log("main", scr.info[0].images)
                    if (scr.info[0].images != null) {
                        scr.info[0].images.map((img: any, img_i: number) => {
                            console.log("img: ", img);
                            
                            mainImgs[img_i] = img
                        })
                    }
                    mainImagesSet(mainImgs)
                } else {

                    let newScreen = {
                        titles: [] as any,
                        texts: [] as any,
                        images: [] as any
                    }
                    if (scr.info != null && scr.info.length > 0) {
                        scr.info.map((information: any, scr_i: number) => {

                        console.log(scr);
                            // let newScreen = emptyScreen
                            newScreen.titles.push(information.title)
                            newScreen.texts.push(information.text)
                            let newImg = ['','','']
                            information.images.map((image: any, i_i: number) => {
                                newImg[i_i] = image
                            })
                            newScreen.images.push(newImg)

    
                        })
                        console.log('new ',newScreen);
                        screenArr[i - 1] = newScreen
                    }
                }
              })
              console.log("screenarr ",screenArr);
              screensSet(screenArr)
              console.log("FIRING")
      
            //   screensArrSet(response.screens)
            //   screenCountSet(response.screens.length)
              

            })
            .catch(error=>{console.log(error)})
        }
    })

    let maimImagesChanged = (link: any, i: number) => {
        let newArr = [...mainImages]
        newArr[i] = link
        mainImagesSet(newArr)
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

    let setScreen = (scr: any, i: number) => {
        let newArr = [...screens]
        newArr[i] = scr
        screensSet(newArr)
    }

    let colorScreen = (i: number) => {
        let newArr = [...colors]
        newArr.map((color: any, indx: number) => {
            if (indx == i) {
                newArr[indx] = "rgb(0, 0, 0)"
            } 
            else {
                newArr[indx] = "rgb(100, 100, 100)"
            }
        })
        colorsSet(newArr)
    }

    let selectScreen = (i: number) => {
        scrIndexSet(i)
        colorScreen(i)
        console.log("screens: ", screens)
    }

    let idInputClicked = () => {
        let idInput = document.querySelector(".newRestIdInput")
        if (idInput != null) {
            idInput.className = "newRestIdInput"
        }
        let idError = document.querySelector(".Error")
        if (idError != null) {
            idError.className += " invisible"
        }
        let idInfo = document.querySelector(".IDinfo")
        if (idInfo != null) {
            idInfo.className = "smallTextBlock IDinfo"
        }
    }

    // let workingHoursChanged = (i: number, value: any) => {
    //     let newArr = [...workingHours]
    //     newArr[i] = value
    //     workingHoursSet(newArr)
    //     console.log(workingHours);
    // }

    let newScreenButtonClicked = () => {
        let screensCount = screensVisible + 1
        screensVisibleSet(screensCount)
        let screenDivs = Array.from(document.querySelectorAll(".createScreenText"))
        screenDivs.map((sDiv: any, i: number) => {
            if (sDiv.id < screensCount.toString()) {
                sDiv.className = "createScreenText"
            } else {
                sDiv.className = "createScreenText invisible"
            }
        })
        if (screensCount >= 5){
            let buttonDiv = document.querySelector(".newScreenButton")
            if (buttonDiv != null) {
                buttonDiv.className += " invisible"
            }
        }
        selectScreen(screensCount - 1)
    }

    let createRestButtonClicked = () => {
        let isEmpty = false
        if (restaurantName.length == 0) {
            let nameInput = document.querySelector(".newRestNameInput")
            if (nameInput != null) {
                nameInput.className += " invalid"
            }
            isEmpty = true
        }
        if (restaurantID.length == 0) {
            let idInput = document.querySelector(".newRestIdInput")
            if (idInput != null) {
                idInput.className += " invalid"
            }
            isEmpty = true
        }
        if (isEmpty) {
            return
        }
        
            fetch("https://restapp.onrender.com/restaurant", {
                method: "POST",
                body: JSON.stringify({restaurant_id: restaurantID}),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }
            ).then(res=>res.json())
            .then(response=>{
              console.log(response)
              if (restaurantID != restaurantId && response) {
                let idInput = document.querySelector(".newRestIdInput")
                if (idInput != null) {
                    idInput.className += " invalid"
                }
                let idError = document.querySelector(".Error")
                if (idError != null) {
                    idError.className = "smallTextBlock Error"
                }
                let idInfo = document.querySelector(".IDinfo")
                if (idInfo != null) {
                    idInfo.className += " invisible"
                }
              } else {
                let finalScreens = []
                let finalMainImgs = [] as any[]
                mainImages.map((img: any, i: number) => {
                    if (img != null && img.length > 0) {
                        finalMainImgs.push(img)
                    }
                })
                finalScreens.push({
                    info: [{
                        title: null,
                        text: null,
                        images: finalMainImgs
                    }],
                    type: "main"
                })
                for (let i = 0; i < screens.length; i++) {
                    let count = 0
                    // let tArr = []
                    // let txtArr = []
                    // let imArr = []
                    let finalInfoArr = []
                    for (let ti = 0; ti < screens[i].titles.length; ti++) {
                        if (screens[i].titles[ti].length > 0) {
                            console.log("screen ",screens[i])
                            // tArr.push(screens[i].titles[ti])
                            // txtArr.push(screens[i].texts[ti])
                            // imArr.push(screens[i].images[ti])
                            // count++
                            let finalInfo = {
                                title: screens[i].titles[ti],
                                text: screens[i].texts[ti],
                                images: screens[i].images[ti]
                            }
                            finalInfoArr.push(finalInfo)
                        }
                    }
                    if (finalInfoArr.length > 0) {
                        finalScreens.push({
                            info: finalInfoArr,
                            type: "description"
                        })
                    }
                }

                let newRest = {
                    id: restaurantId,
                    name: restaurantName,
                    screens: finalScreens,
                    address: address,
                    working_hours: workingHours,
                    description: description,
                    contacts: contacts
                }

                console.log("new", newRest)

                makeInvisisble("CreateRestPage")
                makeInvisisble("createButtonHolder")
                makeVisisble("createdSuccesfullyBlock")
                setTimeout(function(){
                    makeVisisble("CreateRestPage")
                    makeVisisble("createButtonHolder")
                    makeInvisisble("createdSuccesfullyBlock")
                }, 2000)
                navigate("/")
              }
              // addessSet(response.restaurant.address)
              // contactsSet(response.restaurant.contacts)
              // descriptonSet(response.restaurant.description)
      
              // let wh = response.restaurant.working_hours
              // workingHoursSet(wh.split("\n"))
            })
    }

    let openHelp = () => {
        let window = document.getElementById("helpWindow")
        if (window != null) {
            window.style.display = "block"
        }
        console.log("screens ", screens)
    }

    let closeHelp = () => {
        let window = document.getElementById("helpWindow")
        if (window != null) {
            window.style.display = "none"
        }
    }

  return (
    <div className='CreateRest'>
        <TopHolderBasic />
        <div className="createdSuccesfullyBlock invisible">
            <div className="successText">
              Изменения успешно сохранены!
            </div>
        </div>
        <div className="helpIconBlock">
            <div className="titleText">РЕДАКТИРОВАНИЕ РЕСТОРАНА</div>
                <button className="helpButton" onClick={openHelp}>?</button>
        </div>
        <div id="helpWindow" className="helpWindow" onClick={e => {
            let win = document.getElementById("helpWindow")
            if (win != null && e.target == win) {
                closeHelp()
            }
        }}>
            <div className="helpContent" id="helpContent">
                <button className="closeButton" onClick={closeHelp}>&times;</button>
                <div className="helpText" id="helpText">
                    <p>Пожалуйста, заполните всю возможную информацию о ресторане!
                         Поля "Название ресторана" и "ID ресторана" обязательны 
                         для заполнения. ID ресторана будет отображаться в ссылке и не 
                         может дублировать уже существующее. ID может содержать только латинские 
                         буквы и цифры.
                    </p>
                    <br />
                    <p>После заполнения информации о ресторане заполните экраны. 
                        Экран создан для отображения дополнительной информации, 
                        которую вы хотите рассказать посетителям - например, концепция 
                        вашего ресторана, интерьер или кухня. Каждый экран содержит от одной 
                        до пяти мини-статей, каждая из которых может иметь заголовок, текст и до трех 
                        изображений. Изображения загружайте в виде ссылок. Заголовок обязателен, без него 
                        вся статья не сохранится. 
                        </p>
                    <br />
                    <h4>Обратите внимание!</h4>
                     <p>Обязательно нажмите кнопку "СОХРАНИТЬ" перед добавлением нового экрана или 
                        перед созданием ресторана. Иначе экран не сохранится, и все введенные 
                        вами данные будут утеряны.
                    </p>
                </div>
            </div>

</div>
        <div className='CreateRestPage'>
            <div className="createRestInfoBlock">
                <div className="createRestName">
                    <div className="createRestTextBlock">Название ресторана:</div>
                    <input className="newRestNameInput" type="text" maxLength={30} value={restaurantName}
                                onChange={e => restaurantNameSet(e.target.value)} />
                </div>
                <div className="createRestId">
                    <div className="createRestTextBlock">ID ресторана:</div>
                    <div className="IdInputBlock">
                        <input className="newRestIdInput" type="text" maxLength={30} value={restaurantID}
                                onChange={e => {
                                    let val = e.target.value.replace(/[^A-Za-z0-9]/ig, '')
                                    restaurantIDSet(val)}} 
                                onClick={idInputClicked} />
                        <div className="smallTextBlock Error invisible">ресторан с таким ID уже существует!</div>
                        <div className="smallTextBlock IDinfo">будет отображаться в ссылке</div>
                    </div>
                </div>
                <div className="createRestAddress">
                    <div className="createRestTextBlock">Адрес ресторана:</div>
                    <input className="newRestAddressInput" type="text" maxLength={500} value={address}
                                onChange={e => addressSet(e.target.value.replace(/[^A-Za-z0-9?.,!-\s]/ig, ''))} />
                </div>
                <div className="createRestContacts">
                    <div className="createRestTextBlock">Контакты ресторана:</div>
                    <input className="newRestContactsInput" type="text" maxLength={500} value={contacts}
                                onChange={e => contactsSet(e.target.value.replace(/[^A-Za-z0-9?.,:;!@_+-\s]/ig, ''))} />
                </div>
                <div className="createRestWH">
                    <div className="createRestTextBlock">Часы работы:</div>
                    <input className="whDayInput" type="text" maxLength={50} value={workingHours}
                                        onChange={e => workingHoursSet(e.target.value)} />
                    {/* <div className="WorkingHoursBlock">
                        {weekdays.map((day: any, i: number) => {
                            let k1 = "block" + i
                            let k2 = "text" + i
                            let k3 = "input" + i
                            return(
                                <div className="workingHours" key={k1}>
                                    <div className="weekdayText" key={k2}>{day}</div>
                                    <input className="whDayInput" key={k3} type="text" maxLength={50} value={workingHours[i]}
                                        onChange={e => workingHoursChanged(i, e.target.value)} />
                                </div>)
                        })}
                    </div> */}
                </div>
                <div className="createRestDescription">
                    <div className="createRestTextBlock">Описание:</div>
                    <input className="newRestDescrInput" type="text" maxLength={1000} value={description}
                                onChange={e => descriptionSet(e.target.value)} />
                </div>
                <div className="createRestMainImages">
                    <div className="createRestTextBlock">Изображения для главной страницы:</div>
                    <div className="mainImages">
            {/* <input className="newTextInput" type="text" maxLength={2000} value={textArr[index]}
                    onChange={e => changeText(e.target.value, index)} /> */}
                <input className="newImageInput" id="0" maxLength={200}
                    value={mainImages[0]} type="text"
                    onChange={e => maimImagesChanged(e.target.value, 0)}/>
                    <input className="newImageInput" id="1" maxLength={200}
                    value={mainImages[1]} type="text"
                    onChange={e => maimImagesChanged(e.target.value, 1)}/>
                    <input className="newImageInput" id="2" maxLength={200}
                    value={mainImages[2]} type="text"
                    onChange={e => maimImagesChanged(e.target.value, 2)}/>
            </div>
                </div>
                <div className='createRestScreensBlock'>
                    <div className='createRestTextBlock'>Экраны:</div>
                    {screens.map((scr: any, i: number) => {
                        console.log(i)
                        let idStr = i.toString()
                        let cname = i == 0 ? "createScreenText" : "createScreenText invisible"
                        return(
                            <div className={cname} key={i} id={idStr}
                            style={{color: `${colors[i]}`}}
                            onClick={e => selectScreen(i)}>
                                Экран {i + 1}
                            </div>
                        )
                    })}
                    <button className='newScreenButton' onClick={newScreenButtonClicked}>ДОБАВИТЬ ЭКРАН</button>
                </div>
            </div>
            {scrIndex >= 0 &&
            <div className="triangleBlock" style={{marginTop: `${500 + (scrIndex >= 0 ? scrIndex * 50 : 0)}px`}}>
                {/* <div className="verticalBorder"></div> */}
            </div>}
            {scrIndex >= 0 &&
            <NewScreen screenIndex={scrIndex} infos={screens[scrIndex]} 
            infosChange={setScreen}/>
            }
        </div>
        <div className="createButtonHolder">
            <button className='saveRestButton' onClick={createRestButtonClicked}>СОХРАНИТЬ РЕСТОРАН</button>
        </div>
    </div>
  )
}

export default EditRest