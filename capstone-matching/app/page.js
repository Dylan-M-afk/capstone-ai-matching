import Link from 'next/link'

export default function Home() {
  return (
    <div className="home-container">
      <p className="page-header">Home Page</p>
      <div className="home-content-container drop-shadow-2xl">
        <p className="home-header-text">Opportunity Starts Here</p>
        <p className="home-body-text">Create and account or sign in to discover new career opportunities</p>
          <Link href="/login">
            <button className="home-login-btn drop-shadow-lg">Get Started</button>  
          </Link>

      </div>

    </div>
  );
}
