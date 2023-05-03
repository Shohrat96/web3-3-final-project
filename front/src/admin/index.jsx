import { Navigate, Route, Routes } from "react-router-dom"
import LoginPage from "./pages/Login"
import { useState } from "react"

const AdminPanel = () => {
    const [logged, setLogged] = useState(false)
    return logged ? (
        <Routes>
            <Route path="login" element={<LoginPage />} />
        </Routes>
    ) : <Navigate to="login" />
}
export default AdminPanel