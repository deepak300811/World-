import "./App.css"
import CountriesGrid from "./components/CountriesGrid"
import Header from "./components/Header"
import { Route, Switch } from "react-router-dom"
import Details from "./components/Details"

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Route path="/country/:filter/:input/:name" exact component={Details} />
        <Route path="/countrydetails/:name" exact component={Details} />

        <Route
          path="/:filterName/:countryName"
          exact
          component={CountriesGrid}
        />
        <Route path="/:countryName" exact component={CountriesGrid} />
        <Route path="/" exact component={CountriesGrid} />
      </Switch>
    </div>
  )
}

export default App
