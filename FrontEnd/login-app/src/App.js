import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import Register from './screens/Login/Register';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" >
      {/* <Route index element={<Login />} /> */}
      <Route path="signup" element={<Register />} />
    </Route>
  )
)

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
