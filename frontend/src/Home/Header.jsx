import './Header.css';
import { Link } from 'react-router-dom';
import logo from "../assets/Logo.png";

const Header = () => (
    <header className="header">
        <Link to="/Homepage"><img src={logo} className='logo' /></Link>
        <nav className="navigation">
            <ul>
                <li><Link to="/Homepage"><div className='headerSection '>Home</div></Link></li>
                <li><Link to="/v2/PasswordManager"><div className='headerSection'>Passwords</div></Link></li>
                <li><Link to="/v2/generate-password"><div className='headerSection'>Generate Password</div></Link></li>
                <li><Link to="/user/logout"><div className='headerSection'>Logout</div ></Link></li>
            </ul>
        </nav>
    </header>
);

export default Header;
