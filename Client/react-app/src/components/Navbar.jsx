import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <>
            <nav className="navbar bg-dark navbar-expand-lg bg-body-tertiary h-10" data-bs-theme="dark">
                <div className="container-fluid">
                    <Link to="/main-app" className="nav-link" aria-current="page">JWTSocial</Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav">
                            <li className="nav-item ml-2">
                                <Link to='/display-posts' className="nav-link active" aria-current="page" >Your Posts</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/profile" className="nav-link" >Your Profile</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar