import Link from 'next/link'

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-content-container drop-shadow-2xl">
        <p className="home-header-text">READY TO CONNECT?</p>
        <p className="home-body-text">Here at [COMPANY NAME], we strive to
           improve the job market by connecting
          companies looking to hire with talented students using the power of LLMs to match applicants to the roles
          best suited to their abilities.</p>
          <Link href="/login">
            <button className="home-login-btn drop-shadow-lg">Login/Register</button>  
          </Link>

      </div>

    </div>
  );
}
