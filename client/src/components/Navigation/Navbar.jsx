import { useRef ,useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const navRef = useRef();
    const [isNavVisible, setIsNavVisible] = useState(false);
    const { user, logoutUser } = useAuth();
    const navigate = useNavigate();

    const showNavbar = () => {
        setIsNavVisible(!isNavVisible);
        navRef.current.classList.toggle("hidden");
    };

    const handleLogout = async () => {
        try {
            await logoutUser();
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header className="bg-purple-500">
            <div className="container mx-auto p-6 flex justify-between items-center">
            <div className="text-2xl font-bold text-white">
                    <a href="/">MindMend</a>
                </div> 
                <nav ref={navRef} className="hidden md:flex md:items-center md:space-x-4">
                    <ul className="flex flex-col md:flex-row md:space-x-4">
                        <li className="navbar-item">
                            <a href="/" className="text-white hover:text-gray-200 font-bold">Home</a>
                        </li>
                        <li className="navbar-item">
                            <NavLink to="/chat" className="text-white hover:text-gray-200 font-bold">Chat</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink to="/helplines" className="text-white hover:text-gray-200 font-bold">Helplines</NavLink>
                        </li>
                        {user ? (
                            <>
                                <li className="navbar-item">
                                    <span className="text-white font-bold">Welcome, {user.firstname}!</span>
                                </li>
                                <li className="navbar-item">
                                    <button 
                                        onClick={handleLogout}
                                        className="text-white border-white border-2 p-2 rounded-xl hover:text-gray-200 font-bold"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="navbar-item">
                                    <NavLink to="/signin" className="text-white border-white border-2 p-2 rounded-xl hover:text-gray-200 font-bold">Signin</NavLink>
                                </li>
                                <li className="navbar-item">
                                    <NavLink to="/signup" className="text-purple-500 bg-white border-2 p-2 rounded-xl hover:text-purple-400 font-bold">Signup</NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
                <button onClick={showNavbar} className="md:hidden text-white">
                  {isNavVisible ? <FaTimes /> : <FaBars />}
                </button>
            </div>
            <div ref={navRef} className="hidden flex-col items-center md:hidden bg-purple-500 w-full ml-16 pb-12">
                {}
                <ul className="flex flex-col space-y-4 ml-2">
                    <li className="navbar-item">
                        <a href="/" className="text-white hover:text-gray-200 font-bold">Home</a>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/chat" className="text-white hover:text-gray-200 font-bold">Chat</NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink to="/helplines" className="text-white hover:text-gray-200 font-bold">Helplines</NavLink>
                    </li>
                    {user ? (
                        <>
                            <li className="navbar-item pt-4 pb-4">
                                <span className="text-white font-bold">Welcome, {user.firstname}!</span>
                            </li>
                            <li className="navbar-item pt-2">
                                <button 
                                    onClick={handleLogout}
                                    className="text-white border-white border-2 p-2 rounded-xl hover:text-gray-200 font-bold"
                                >
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="navbar-item pt-4 pb-4">
                                <NavLink to="/signin" className="text-white border-white border-2 p-2 rounded-xl hover:text-gray-200 font-bold ">Signin</NavLink>
                            </li>
                            <li className="navbar-item pt-2">
                                <NavLink to="/signup" className="text-purple-500 bg-white border-2 p-2 rounded-xl hover:text-purple-400 font-bold">Signup</NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default Navbar;




