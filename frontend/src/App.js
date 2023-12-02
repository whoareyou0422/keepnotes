import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import './App.css';
import Header from './components/Header';
import NotesList from './pages/NotesList';
import MyNote from './pages/MyNote';
import Login from './pages/Login';
import Register from './pages/Register';


function App() {
  return (
    <div className='container dark'>
      <div className="app">
      <Router>
        <AuthProvider>
                <Header />
                <Routes>
                  <Route element={<PrivateRoute />}>
                    <Route exact path='/' element={<NotesList />}></Route>
                  </Route>
                  <Route path='/my_note/:id' element={<MyNote />}></Route>

                  <Route path='/login' element={<Login />}></Route>
                  <Route path='/register' element={<Register />}></Route>
                </Routes>
        </AuthProvider>
      </Router>
      </div>
    </div>
  );
}

export default App;
