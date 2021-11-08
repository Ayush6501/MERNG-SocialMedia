import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import {Container} from "semantic-ui-react";
import {AuthProvider} from "./context/auth-context";
import AuthRoute from './components/authRoute';
import './app.css';
import SinglePost from "./components/SinglePost";

function App() {
  return (
    <AuthProvider>
        <Router>
            <Container>
                <Navbar />
                <Route path='/' exact component={Home} />
                <AuthRoute path='/login' component={Login} />
                <AuthRoute path='/register' component={Register} />
                <Route exact path='/posts/:postId' component={SinglePost} />
            </Container>
        </Router>
    </AuthProvider>
  );
}

export default App;
