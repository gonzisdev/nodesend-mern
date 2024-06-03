import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout = () => {
  return (
        <div className='container mx-auto'>
          <Header />
          <Outlet />
        </div>    
  )
}

export default Layout