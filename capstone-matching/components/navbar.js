import Link from 'next/link'


export default function NavBar() {
  const navLocations =  [
        {"name":"Home", "href":"/"},
        {"name":"Login/Register", "href":"/login"},
        {"name":"Dashboard", "href":"/dashboard"},
        {"name":"profile", "href":"/profile"},
    ]
 
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