import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
  return (
    <section className='h-screen w-full'>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <Outlet />
      </div>
    </section>
  )
}

export default MainLayout