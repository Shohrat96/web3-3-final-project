import { useContext, useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import CoinsManagePage from "./pages/Coins"
import EditPage from "./pages/EditPage/indexs"
import LoginPage from "./pages/Login"
import { UserContext } from "../context/userContext"

const AdminPanel = () => {

    const { loggedIn } = useContext(UserContext);

    return loggedIn ? (
        <Routes>
            <Route path="/" element={<CoinsManagePage />} />
            <Route path="/add" element={<EditPage />} />
            <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
    ) : <Navigate to="/login" />
}
export default AdminPanel