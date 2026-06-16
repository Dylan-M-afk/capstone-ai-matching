import NavbarWrapper from './navbarWrapper'

export default function Header({ role }) {
  return (
    <div className='nav-header'>
      <p className='nav-header-text'>Capstone Project</p>
        {/* Wrapper ensures navbar refreshes on auth changes */}
        <NavbarWrapper initialRole={role} />
    </div>
  )
}