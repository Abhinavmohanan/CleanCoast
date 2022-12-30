import React,{useContext, useEffect, useState} from 'react'
import "./Collect.css"
import { db, storage } from '../../firebaseConfig';
import { addDoc, collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL, listAll} from "firebase/storage"
import { AuthUserContext } from '../../Context/AuthContext';
import {useNavigate} from "react-router-dom"
import { MapContainer, TileLayer, useMap ,Marker,Popup} from 'react-leaflet'
import Geocode from "react-geocode";




export const Collect = () => {
    // const [lng, setLng] = useState(54.37585762735543);
    // const [lat, setLat] = useState(24.45677614934833);
    const [viewState,setViewState] = useState({longitude: 54,latitude:24,zoom:11})
    const [images,setImage] = useState([]);
    const [disabled,setDisabled] = useState([]);
    const [AuthUser] = useContext(AuthUserContext);
    const navigate = useNavigate();
    const newimgarray = []



    const getList = () => {
        if(images.length !== 0){
        return ((images[0]).map((image)=>{
            console.log(image.address)
            if(!image.collected){
                return(<div className='img-list'>
                    <div className='image'><img src={image.link} alt="Waste" className='img'/></div>
                    Location :{image.address}
                </div>)
            }else{
                console.log("Waste collected")
                return <></>
            }
          }))
        }
    }  
    const getMarkers = () => {
        if(images.length !== 0){
        return ((images[0]).map((image)=>{
            console.log(image.address)
            if(!image.collected){
                return(<Marker position={[image.coordinate.lat,image.coordinate.lng]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>)
            }else{
                console.log("Waste collected")
                return <></>
            }
          }))
        }
    }  
    
    useEffect(()=>{
        let unsubscribed = false;

    getDocs(collection(db, "users"))
        .then((querySnapshot) => {
            if (unsubscribed) return; // unsubscribed? do nothing.
      const newimgarray = querySnapshot.docs
        .map((doc) => doc.get("images"));
      setImage(prev=>[...prev,...newimgarray]);

      // need to remove duplicates? use this instead:
      // const firstNamesSet = new Set();
      // querySnapshot
      //   .forEach((doc) => firstNamesSet.add(doc.get("firstName")));
      // 
      // setFirstNamesArray([...firstNamesSet]);
    })
    .catch((err) => {
        if (unsubscribed) return; // unsubscribed? do nothing.

        // TODO: Handle errors
        console.error("Failed to retrieve data", err);
        });
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
        
        return () => unsubscribed  = true;  


      },[])
    
      return (
        <div className='report'>
            <MapContainer center={[viewState.latitude,viewState.longitude]} zoom={13} scrollWheelZoom={true} className='leaflet-container' style={{
    width: "500px",
    height: "90vh",
    borderRadius: "15px",
    }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {getMarkers()}
            </MapContainer>
          <div className='map-details'>
                  {getList()}
          </div>
      </div>
      );
}