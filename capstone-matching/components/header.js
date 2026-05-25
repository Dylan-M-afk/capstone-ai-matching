import Navbar from '../components/navbar'

export default function Header({role}) {
 
  return (
    <div className='nav-header'>
        <p className='nav-header-text'>Capstone Project</p>
        <Navbar role={role}></Navbar>
    </div>
  )
}