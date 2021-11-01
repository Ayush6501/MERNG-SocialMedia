import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import {Container} from "semantic-ui-react";

function App() {
  return (
    <Router>
        <Container>
            <Navbar />
            <Route path='/' exact component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
        </Container>
    </Router>
  );
}

export default App;
