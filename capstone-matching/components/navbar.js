import Link from 'next/link'
import SignOutButton from './signOutButton'
import { signOut } from '@/app/login/actions'


export default function NavBar({ role }) {
    let navLocations = []

    let guestLocations = [
        { "name": "Home", "href": "/" },
        { "name": "Login/Register", "href": "/login" },
    ]

    let studentLocations = [
        { "name": "Home", "href": "/" },
        { "name": "Student Dashboard", "href": "/user/dashboard" },
        { "name": "Student Profile", "href": "/user/profile" },
        { "name": "Job Board", "href": "/user/jobBoard"}
    ]

    let companyLocations = [
        { "name": "Home", "href": "/" },
        { "name": "Company Dashboard", "href": "/company/dashboard" },
        { "name": "Company Postings", "href": "/company/postings" },
        { "name": "Create Postings", "href": "/company/create-posting" },
    ]

    let adminLocations = [
        { "name": "Home", "href": "/" },
        { "name": "Admin Dashboard", "href": "/admin/dashboard" },
        { "name": "Student Management", "href": "/admin/user-list" },
        { "name": "Company Management", "href": "/admin/company-list" },
        { "name": "Create Company", "href": "/admin/account-management" }
    ]

    if (role == 'student') {
        navLocations = studentLocations;
    } else if (role == 'company') {
        navLocations = companyLocations;
    } else if (role == 'admin') {
        navLocations = adminLocations;
    } else {
        navLocations = guestLocations;
    }

    return (
        <div className='navbar'>
            {
                navLocations.map(
                    (item, x) => <div key={item.name}>
                        <Link className="nav-item" href={item.href} key={item.name}>
                            <button key={item.name}>{item.name}</button>
                        </Link>
                        {x != navLocations.length - 1 || role ? "|" : ""}
                    </div>
                )
            }
            {role && (
                <div>
                    <SignOutButton />
                </div>
            )}
        </div>
    )
}
