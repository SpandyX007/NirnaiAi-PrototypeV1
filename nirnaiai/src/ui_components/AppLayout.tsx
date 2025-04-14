import { Outlet } from "react-router-dom"
import LegalAssistanceApp from "./SideBar"

const AppLayout = () => {
  return (
    <main>
        <LegalAssistanceApp/>
        <Outlet/>
    </main>
  )
}

export default AppLayout