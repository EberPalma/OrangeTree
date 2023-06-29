
"use client"

//* Imports
import Link from "next/link"
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome"
import { useSession, signIn } from "next-auth/react"

export default function Nav () {
    const {
        data: session
    } = useSession()

    const pages = [
        {
            page: "home",
            route: "/"
        },
        {
            page: "products",
            route: "/products"
        }
    ]

    let button

    if (session) {
        button = (
            <Link key={session.user.email} className='btn btn-light bnt-profile' href='/client'>
                {session.user.name}
            </Link>
        )
    } else {
        button = <button key='not-logged-yet' className=' btn btn-light btn-profile' onClick={() => { signIn() }}>Sign in</button>
    }

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand' href='/'>Orange Tree</Link>
                <button type='button' className='navbar-toggler btn btn-profile' data-bs-toggle='collapse' data-bs-target='#navbarCollapse'>
                    <Icon icon='far-regular fa-bars' />
                </button>
                <div className='collapse navbar-collapse' id='navbarCollapse'>
                    <div className='navbar-nav'>
                        {pages.map((item) =>
                            (<li className='nav-item active' key={item.route}>
                                <Link className='nav-link' href={item.route}>  {item.page}</Link>
                            </li>)
                        )}
                    </div>
                    <div className='navbar-nav ms-auto'>
                        {button}
                    </div>
                </div>
            </div>
        </nav>
        /* <div className='navbar navbar-expand-sm navbar-light bg-light'>
          <Link className="navbar-brand" href={'/'}>Orange Tree</Link>

          <div className="collapse navbar-collapse">
            <ul className='navbar-nav mr-auto'>
              {pages.map((item) =>
              (<li className={'nav-item active'} key={item.route}>
                <Link className={'nav-link'} href={item.route}>  {item.page}</Link>
              </li>)
              )}
            </ul>
          </div>

          <div className=''>
            {button}
          </div>
        </div> */
    )
}
