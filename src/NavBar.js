
function NavBar() {

    return (

        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand">
                        <i className="bi bi-lightning-charge-fill"></i>
                        threepics
                    </a>
                    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#collapseNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-collapse collapse" id="collapseNavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="fs-5 text-decoration-none text-dark " href="./login.html">
                                <i className="bi bi-person-circle"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
  }
  
  export default NavBar;