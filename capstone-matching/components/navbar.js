import Link from 'next/link'


export default function NavBar({ role }) {
    let navLocations = []

    let guestLocations = [
        { "name": "Home", "href": "/" },
        { "name": "Login/Register", "href": "/login" },
    ]

    let studentLocations = [
        { "name": "Home", "href": "/" },
        { "name": "Student Dashboard", "href": "/user/dashboard" },
    ]

    let companyLocations = [
        { "name": "Home", "href": "/" },
        { "name": "Company Dashboard", "href": "/company/dashboard" },
    ]

    let adminLocations = [
        { "name": "Home", "href": "/" },
        { "name": "Admin Dashboard", "href": "/admin/dashboard" },
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
                        {x != navLocations.length - 1 ? "|" : ""}
                    </div>


                )
            }
        </div>
    )
}