// Navbar.jsx

import './navbar.css';
import { AiFillCloseCircle } from 'react-icons/ai';
import { TbGridDots } from 'react-icons/tb';
import { MdOutlineRealEstateAgent } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwt_decode from "jwt-decode";


const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
  console.log(token);

    if (token) {
      setIsLoggedIn(true);

      const decodedToken = jwt_decode(token);
      fetchUserName(decodedToken.id);
    }
  }, []);


  const fetchUserName = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3001/username?id=${userId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user name');
        }
        const data = await response.json();
        setUsername(data.username); // set username in state
    } catch (error) {
        console.error('Error fetching user name:', error);
    }
};


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Here you would also make a request to your 'logout' endpoint, if necessary, to invalidate the session on the server.
  };

  const [active, setActive] = useState('navBar');

  const showNav = () => {
    setActive('navBar activeNavbar');
  };

  const removeNav = () => {
    setActive('navBar');
  };

  return (
    <section className='navBarSection'>
      <header className="header flex">
        
        <div className="logoDiv">
          <a href="#" className="logo flex"><h1><MdOutlineRealEstateAgent className='icon' />  HomeTradeExchange.</h1></a>
        </div>

        <div className={active}>
          <ul onClick={removeNav} className="navLists flex">


            {isLoggedIn ? (
              <>
              <li className="navItem">
               {username && <span>สวัสดีคุณ {username}</span>}
              </li>
              <li className="navItem">
              <a href="/PropertyForm" className="navLink">ลงประกาศฟรี</a>
              </li>
              <button className="btn" onClick={handleLogout}>
                ออกจากระบบ
              </button>
              </>
            ) : (
              <>
              <li className="navItem">
              <a href="/Register" className="navLink">ลงทะเบียน</a>
              </li>
              <button className="btn">
                <Link to="/LoginForm">เข้าสู่ระบบ</Link>
              </button>
              </>
            )}
          </ul>
          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className='icon'/>
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className='icon'/>
        </div>
      </header>
    </section>
  );
};

export default Navbar;
