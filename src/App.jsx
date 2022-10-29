import { Header } from "./components";
import { Switch, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFound from "./pages/NotFound";
import NewsPage from "./pages/NewsPage";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route path="/news/:id" component={NewsPage} />
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
