import { useRef ,useState} from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const navRef = useRef();
    const [isNavVisible, setIsNavVisible] = useState(false);

    const showNavbar = () => {
        setIsNavVisible(!isNavVisible);
        navRef.current.classList.toggle("hidden");
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
                            <NavLink to="/findtherapists" className="text-white hover:text-gray-200 font-bold">Find Therapists</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink to="/api/signin" className="text-white border-white border-2 p-2 rounded-xl hover:text-gray-200 font-bold">Signin</NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink to="/signup" className="text-purple-500 bg-white border-2 p-2 rounded-xl hover:text-purple-400 font-bold">Signup</NavLink>
                        </li>
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
                        <NavLink to="/findtherapists" className="text-white hover:text-gray-200 font-bold">Find Therapists</NavLink>
                    </li>
                    <li className="navbar-item pt-4 pb-4">
                        <NavLink to="/api/signin" className="text-white border-white border-2 p-2 rounded-xl hover:text-gray-200 font-bold ">Signin</NavLink>
                    </li>
                    <li className="navbar-item pt-2">
                        <NavLink to="/signup" className="text-purple-500 bg-white border-2 p-2 rounded-xl hover:text-purple-400 font-bold">Signup</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;




