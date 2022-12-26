import { createBrowserRouter } from "react-router-dom";
import GameBord from "../Pages/GameBord/GameBord";
import Home from "../Pages/Home/Home";
import Joining from "../Pages/Joining/Joining";
import Login from "../Pages/Login/Login";
import Main from "../Pages/Main/Main";
import SignUp from "../Pages/Signup/SignUp";
import YourGames from "../Pages/YourGames/YourGames";
import Private from "./Private";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/Login",
        element: <Login></Login>,
      },
      {
        path: "/SignUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/GameBord/:id",
        element: <Private><GameBord></GameBord></Private>,
        loader:({params})=>{
return fetch(`https://tic-tac-toe-server-pi.vercel.app/game/${params?.id}`)
        }
      },
      {
        path: "/YourGames",
        element:<Private><YourGames></YourGames></Private> ,
      },
      {
        path: "/Joining",
        element: <Private><Joining></Joining></Private>,
      },
    ],
  },
]);
export default router;
