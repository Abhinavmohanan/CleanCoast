import React,{useContext, useEffect, useState} from 'react'
import Map,{FullscreenControl, GeolocateControl, Marker,NavigationControl} from 'react-map-gl'
import "./Report.css"
import "mapbox-gl/dist/mapbox-gl.css";
import { db, storage } from '../../firebaseConfig';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL, listAll} from "firebase/storage"
import { AuthUserContext } from '../../Context/AuthContext';
import {useNavigate} from "react-router-dom"
import { async } from '@firebase/util';




export const Report = () => {
    const [lng, setLng] = useState(54.37585762735543);
    const [lat, setLat] = useState(24.45677614934833);
    const [image,setImage] = useState(null);
    const [disabled,setDisabled] = useState(false);
    const [AuthUser] = useContext(AuthUserContext);
    const navigate = useNavigate();

    const uploadImage = ()=>{
      var size = 0;
      if(image == null){alert("Please select an image");return;};
      setDisabled(true);
      console.log("Disabled" + disabled)
      listAll(storage).then((response)=>{
        size = response.items.length;
        console.log(response.items.length)
      })
      const imgref = ref(storage,`image/${AuthUser.uid}/${size}`)
      uploadBytes(imgref,image).then((snapshot)=>{
        getDownloadURL(snapshot.ref).then(async (link)=>{
          const dbref = collection(db,"users")
          const docref = doc(db,"users",`${AuthUser.uid}`)
          var requestOptions = {
                method: 'GET',
          };
            const endpoint = "https://api.geoapify.com/v1/geocode/reverse?lat=" + lat + "&lon=" + lng + '&apiKey=3d4dd61171494b39890e3adfc32a2c25'
            console.log(endpoint)
          const address =  await fetch(endpoint, requestOptions)
      .then(response => response.json())
      .then(result => {
        return (result.features[0].properties.address_line1 +  result.features[0].properties.address_line2)
    })
      .catch(error => console.log('error', error))

          try{
            const snapData = await getDoc(docref);
            console.log("Snap Data:")
            console.log(snapData)
            if(snapData.exists()){
              console.log(snapData.data())
              const snapimage = snapData.data().images
              console.log("Snap Image" + snapimage)
              updateDoc(docref,{images:[...snapimage,{link:link,collected:false,coordinate:{lat:lat,lng:lng},address:address}]})
            }
            else{
              setDoc(docref,{name:AuthUser.displayName,email:AuthUser.email,images:[{link:link,collected:false,coordinate:{lat:lat,lng:lng},address:address}]})
            }
          }
          catch (e){
            console.log("Error"+e);
          }
        
        })
        navigate("/")
        alert("Waste Reported")
      })
    }
    
    useEffect(()=>{
      navigator.geolocation.watchPosition(position=>{
        console.log("Firing")
        console.log(position.coords.latitude)
          setLat(position.coords.latitude)
          setLng(position.coords.longitude)})
      navigator.geolocation.getCurrentPosition(position=>{
          console.log("Firing")
          console.log(position.coords.latitude)
            setLat(position.coords.latitude)
            setLng(position.coords.longitude)
        })
      },[])
    
      return (
        <div className='report'>
            <div>
              <Map
                  mapboxAccessToken={"pk.eyJ1IjoiYWJoaW5hdm1vaGFuYW4iLCJhIjoiY2xjOHZxMXg0MnJ0ZzNxcW0zdjA2ejJxayJ9.w_KDoAyh92Wwt8LQaQVd5A"}
                  style={{
                  width: "500px",
                  height: "90vh",
                  borderRadius: "15px",
                  }}
                  viewState={{
                      longitude: lng,
                      latitude: lat,
                      }}
                  initialViewState={{
                  longitude: lng,
                  latitude: lat,
                  zoom:15
                  }}
                  mapStyle="mapbox://styles/mapbox/streets-v9"
              >
                  <Marker longitude={lng} latitude={lat} />
                  <GeolocateControl position='bottom-left'/>
                        </Map>
            </div>
          <div className='map-details'>
            Selected details:
                Location: {}
                Upload image: <input type="file" onChange={e=>{setImage(e.target.files[0])}}/>

            <button className='confirm' onClick={uploadImage} disabled={disabled}>Confirm</button>
          </div>
      </div>
      );
}