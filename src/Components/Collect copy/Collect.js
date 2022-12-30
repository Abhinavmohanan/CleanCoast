import React,{useContext, useEffect, useState} from 'react'
import Map,{FullscreenControl, GeolocateControl, Marker,NavigationControl} from 'react-map-gl'
import "./Collect.css"
import "mapbox-gl/dist/mapbox-gl.css";
import { db, storage } from '../../firebaseConfig';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL, listAll} from "firebase/storage"
import { AuthUserContext } from '../../Context/AuthContext';
import {useNavigate} from "react-router-dom"
import { async } from '@firebase/util';




export const Collect = () => {
    // const [lng, setLng] = useState(54.37585762735543);
    // const [lat, setLat] = useState(24.45677614934833);
    const [viewState,setViewState] = useState({longitude: 54,latitude:24,zoom:11})
    const [image,setImage] = useState(null);
    const [disabled,setDisabled] = useState(false);
    const [AuthUser] = useContext(AuthUserContext);
    const navigate = useNavigate();
    const images= []


    
    useEffect(()=>{
        const getLinks= async()=>{
            const dbref = collection(db,"users")
            const snapshot = await dbref.get()
            snapshot.forEach(doc => {
                images = [...images,doc.data().images]
                console.log(doc.id, '=>', doc.data().images);
              });
        }
        getLinks()  
      const n = navigator.geolocation.watchPosition(position=>{
        console.log("Firing")
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
          setViewState(prev=>({...prev,latitude:position.coords.latitude
          ,longitude:position.coords.longitude}))
        })
      navigator.geolocation.getCurrentPosition(position=>{
          console.log("Firing")
          console.log(position.coords.latitude)
          setViewState(prev=>({...prev,latitude:position.coords.latitude
            ,longitude:position.coords.longitude}))
        })

        // return(()=>{navigator.geolocation.clearWatch(n)})


      },[])
    
      return (
        <div className='report'>
            <div>
              <Map
              onMove={(evt)=>{setViewState(evt.viewState)}}
                  mapboxAccessToken={"pk.eyJ1IjoiYWJoaW5hdm1vaGFuYW4iLCJhIjoiY2xjOHZxMXg0MnJ0ZzNxcW0zdjA2ejJxayJ9.w_KDoAyh92Wwt8LQaQVd5A"}
                style={{
                  width: "500px",
                  height: "90vh",
                  borderRadius: "15px",
                  }}
                  
                  initialViewState={viewState}
                  
                  mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                  <Marker longitude={viewState.latitude} latitude={viewState.longitude} />
            </Map>
            </div>
          <div className='map-details'>
                  {images.map((image)=>{
                    if(!image.collected){
                        return(<div>
                            <img src={image.link} alt="Waste"/>
                            Coordinates : {image.coordinate.lat} and {image.coordinate.lng}
                        </div>)
                    }else{
                        console.log("Waste collected")
                    }
                  })}
          </div>
      </div>
      );
}