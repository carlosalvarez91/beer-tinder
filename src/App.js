import React, { useState, useEffect } from 'react'
import './App.css'
import TinderCard from 'react-tinder-card'
import firebase from 'firebase/app';
import 'firebase/firestore';


export default function App () {
  const [lastDirection, setLastDirection] = useState()
  const [beers, setBeers] = useState([])
  const [last, setLast] = useState(false)
  const messagesRef = firebase.firestore().collection('swipes')

  const swiped = async (direction, name, index) => {
    console.log('removing: ' + name)
    console.log('direction: ' + direction)

    setLastDirection(direction)

    let liked = false
    if (direction === 'right' || direction === 'up'){
      liked = true
    }

    await messagesRef.add({
      name: name,
      liked: liked,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })

    if (index === 0){
      setLast(true)
    }

  }

  const getBeers = () =>{
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
      if (req.readyState === XMLHttpRequest.DONE) {
        setBeers(JSON.parse(req.responseText))
      }
    };
    req.open("GET", "https://api.jsonbin.io/b/61145a52d5667e403a406192", true);
    req.setRequestHeader("secret-key", "$2b$10$qtZ/ZtPBBC5dEOrtq/qiPew3L7Nmm2cCc/qjLctWa8Gy47gxVOnH2");
    req.send();
  }

  useEffect(() => {
    getBeers()
  }, []);

  return (
    <div className='app'>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Beer Tinder</h1>
      <div className='cardContainer'>
        {beers.map((beer, index) =>
          <TinderCard className='swipe' key={beer.name} onSwipe={(dir) => swiped(dir, beer.name, index)}>
            <div style={{ backgroundImage: 'url(' + beer.url + ')' }} className='card'>
              <h3>{beer.name}</h3>
            </div>
          </TinderCard>
        )}
        {last && <h3>No more beers</h3>}
      </div>
      {lastDirection && <h2 className='infoText'>You swiped {lastDirection}</h2>}
    </div>
  )
}
