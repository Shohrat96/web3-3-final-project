import { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import CoinsManagePage from "./pages/Coins"
import EditPage from "./pages/EditPage/indexs"
import LoginPage from "./pages/Login"

const AdminPanel = () => {
  const [islogged, setIsLogged] = useState(false)

  return islogged ? (
    <Routes>
      <Route path="/" element={<CoinsManagePage/>} />
      <Route path="/add" element={<EditPage/>} />
    </Routes>
  ) : <Navigate to="/login" />
}
export default AdminPanel