import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import './css/home.css'
import Detail from './components/Detail';
import CreatePokemon from './components/CreatePokemon';
import CreatePokemon2 from './components/CreatePokemon2';




function App() {
  
  
  

  return (
    <BrowserRouter>
      <div className=''>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path= "/home" component ={Home} />
          <Route exact path="/pokemons/:id" component={Detail} />
          <Route exact path="/pokemons" component={CreatePokemon} />
          <Route exact path="/pruebaCreate" component={CreatePokemon2} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
