import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
// import DistanceCalculator from 'distance-calculator-js';

import { getEvents } from '../store/actions';

import Authentification from './Authentification';
import CreateAccount from './CreateAccount';
import CreateEvent from './CreateEvent';
import Fav from './Fav';
import Feed from './Feed';
import Filters from './Filters';
import FriendsList from './FriendsList';
import Nav from './Nav';
import Page from './Page';
import Profile from './Profile';
import Search from './Search';
import Error404 from './Error404';
import EventCardDescription from './EventCardDescription';

import '../styles/App.scss';

/*
// Test data
const Tokyo = { lat: 35.652832, long: 139.839478 };
const NewYork = { lat: 40.730610, long: -73.935242 };
// Use of Haversine formula 
// Result converted from meters to kilometers
const m = DistanceCalculator.calculate(Tokyo, NewYork)/1000;
console.log(m);
*/

function App() {
  
  const dispatch = useDispatch();

  // const [isLocationLoading, setIsLocationLoading] = useState(false);
  // const [latitude, setLatitude] = useState([]);
  // const [longitude, setLongitude] = useState([]);

  // useEffect(() => {

  //   function successCallback (userPosition) {
  //     setLatitude(userPosition.coords.latitude);
  //     setLongitude(userPosition.coords.longitude);
  //     setIsLocationLoading(false);
  //   };
    
  //   function errorCallback (err) {
  //     console.error(err);
  //   }; 

  //   setIsLocationLoading(true);
  //   navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  // }, []);

  // Necessary to get events on page refresh
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  return (
    <div className='App'>
      <Routes>
        <Route
          path='/'
          element={(
            <Page title="SoNow">
              <Authentification />
            </Page>
          )}
        />
        <Route
          path='/creer-un-compte'
          element={(
            <Page title="Creer un compte | SoNow">
              <CreateAccount />
            </Page>
          )}
        />
        <Route
          path='/feed'
          element={(
            <Page title="Feed | SoNow">
              <Feed />
              <Nav />
            </Page>
          )}
        />
        <Route
          path='/favoris'
          element={(
            <Page title="Favoris | SoNow">
              <Fav />
              <Nav />
            </Page>
          )}
        />
        <Route
          path='/autour-de-moi'
          element={(
            <Page title="Rechercher les événements autour de moi | SoNow">
              <Search />
              <Nav />
            </Page>
          )}
        />
        <Route
          path='/autour-de-moi/filtres'
          element={(
            <Page title="Rechercher les événements autour de moi | SoNow">
              <Filters />
              <Nav />
            </Page>
          )}
        />
        <Route
          path='/creer-un-evenement'
          element={(
            <Page title="Créer un événement | SoNow">
              <CreateEvent />
              <Nav />
            </Page>
          )}
        />
        <Route
          path='/mon-compte'
          element={(
            <Page title="Mon compte | SoNow">
              <Profile  />
              <Nav />
            </Page>
          )}
        />
        <Route
          path='/mon-compte/amis'
          element={(
            <Page title="Mes amis | SoNow">
              <FriendsList />
              <Nav />
            </Page>
          )}
        />
        <Route
          path="/event/:slug"
          element={(
            <Page title="Événement | SoNow">
              <EventCardDescription />
              <Nav />
            </Page>
          )}
        />
        <Route
          path='*'
          element={(
            <Page title="404 Page introuvable | SoNow">
              <Error404 />
              <Nav />
            </Page>
          )}
        />
      </Routes>
    </div>
  );
}

export default App;
