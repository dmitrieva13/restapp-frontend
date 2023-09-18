import { useState, useEffect, useRef } from 'react'
import './style/AllRestPage.css'
import TopHolderAll from './TopHolderAllRests'
import RestaurantDisplay from './RestaurantDisplay'
import LoadingPage from './LoadingPage'

function AllResturants() {
    const [fetched, fetchedSet] = useState(0)

    const [restaurantsArr, restaurantsArrSet] = useState<any[]>([])

    useEffect(() => {
        // console.log("fetch "+fetched)
        if(!fetched) {
            fetch("https://restapp.onrender.com/restaurants", {
                method: "POST",
                body: "",
                headers: {
                    "Content-Type": "text/plain"
                }
            }).
            then(res=>res.json())
            .then(response=>{
                fetchedSet(1)
                console.log(response.restaurant)
                restaurantsArrSet(response.restaurant)
            }).catch(error=>{console.log(error)})
        }
    })
let restArr = [
    {
        id: "dorsia",
        name: "Dorsia",
        address: "NY, Main st",
        image: "dorsia img"
},
{
    id: "casabonita",
        name: "Casa Bonita",
        address: "Chickago, Leaf st 14",
        image: "cb img"
}
]

    if(fetched){
    return(
        <div className="AllRestPage">
            <TopHolderAll name={localStorage.getItem("username") || ""} />
            <div className="restaurants">
                {restaurantsArr.map((restaurant, index) => {
                    return(
                        <RestaurantDisplay key={index} id={restaurant.id} 
                        name={restaurant.name} 
                        address={restaurant.address} img={restaurant.image} 
                        desc={restaurant.description} wh={restaurant.working_hours} 
                        contacts={restaurant.contacts}/>
                    )
                })}
            </div>
        </div>
    )   
    } else {
        return(
        <LoadingPage />
        )
  }
}
export default AllResturants