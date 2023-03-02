import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import User from './components/users/User';
import Login from './components/login/Login';



function App() {


  return (

    <Router>
      <div className='App'>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/user' element={<User/>} >

        </Route>
      </Routes>
      </div>
    </Router>

  );
}

// //protected routes
// import { Navigate, Outlet } from "react-router-dom"
// export const ProtectedRoutes = ({ user, isAllowed,children, redirecTo='/'}) => {
//     if(!isAllowed){
//        return <Navigate to={redirecTo} />
//     }
//   return children? children: <Outlet/>
// }
//  // ruta protegida
// <Route path='/indexUser' element={
//               <ProtectedRoutes isAllowed={!!user}>
//                 <IndexUser />
//               </ProtectedRoutes>

//             }></Route>
//             <Route element={<ProtectedRoutes user={user} isAllowed={!!user && user.permission.includes('analize')} />}>
//               <Route path='/indexAdmin' element={<IndexAmin />}></Route>
//               <Route path='/dashboard' element={<Dashboar />}></Route>
//             </Route>
export default App;
