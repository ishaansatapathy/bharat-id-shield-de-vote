import Dashboard from "./Dashboard"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Index = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const raw = localStorage.getItem("auth-state")
    const isAuthed = raw ? Boolean(JSON.parse(raw).isAuthenticated) : false
    if (!isAuthed) navigate("/auth", { replace: true })
  }, [navigate])
  return <Dashboard />
};

export default Index;
