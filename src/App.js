import React, { useState } from 'react'
import './App.css'
import TinderCard from 'react-tinder-card'
import firebase from 'firebase/app';
import 'firebase/firestore';

const beers = [
  {
    name: 'Heineken',
    url: './img/heineken.jpeg'
  },
  {
    name: 'Estrella Damm',
    url: './img/estrella-damm.jpeg'
  },
  {
    name: 'Coors Light',
    url: './img/coors-light.jpeg'
  },
  {
    name: 'Estrella Galicia',
    url: './img/estrella-galicia.jpg'
  },
  {
    name: 'Corona',
    url: './img/corona.jpeg'
  }
]

function App () {
  const [lastDirection, setLastDirection] = useState()
  const messagesRef = firebase.firestore().collection('swipes')

  const swiped = async (direction, name) => {
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

  }

  return (
    <div className='app'>
      <link href='https://fonts.googleapis.com/css?family=Damion&display=swap' rel='stylesheet' />
      <link href='https://fonts.googleapis.com/css?family=Alatsi&display=swap' rel='stylesheet' />
      <h1>Beer Tinder</h1>
      <div className='cardContainer'>
        {beers.map((beer) =>
          <TinderCard className='swipe' key={beer.name} onSwipe={(dir) => swiped(dir, beer.name)}>
            <div style={{ backgroundImage: 'url(' + beer.url + ')' }} className='card'>
              <h3>{beer.name}</h3>
            </div>
          </TinderCard>
        )}
      </div>
      {lastDirection ? <h2 className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText' />}
    </div>
  )
}

export default App
