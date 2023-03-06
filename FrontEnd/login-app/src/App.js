import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Details from './screens/Login/Details';
import Login from './screens/Login/Login';
import Register from './screens/Login/Register';
import Success from './screens/Login/Success';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      <Route index element={<Login />} />
      <Route path="signup" element={<Register />} />
      <Route path="success" element={<Success />} />
      <Route path="details/:id" element={<Details />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
