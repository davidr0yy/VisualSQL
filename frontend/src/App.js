import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Homepage from './component/Homepage';
import Dashboard from './component/Dashboard';
import Navbar from './component/Navbar';
import Modules from './component/Modules';
import AuthPage from './component/AuthPage';
import Visprogpage from './component/Visprogpage';
import Quizcomp from './component/Quizcomp';


function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Switch>
          <Route component={Homepage} path="/" exact />
          <Route component={AuthPage} path="/authpage" exact />
          <Route component={Modules} path="/modules" exact />
          <Route component={Visprogpage} path="/visprogpage" exact />
          <Route component={Quizcomp} path="/quizcomp" exact />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
