import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PlayersContext } from '../context/PlayersContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);
    const { applications } = useContext(PlayersContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* Social Top Bar */}
            <div className="social-topbar">
                <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
                <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            </div>

            <header style={{ top: '32px' }}>
                <nav>
                    <div className="logo">
                        <Link to="/" className="logo-text" style={{textDecoration: 'none'}}>
                            <img src="/logo.jpeg" alt="فرصة" style={{ height: '60px', objectFit: 'contain' }} />
                        </Link>
                    </div>

                    <div className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>

                    <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <li><Link to="/" onClick={() => setIsMenuOpen(false)}>الرئيسية</Link></li>
                        <li><Link to="/players" onClick={() => setIsMenuOpen(false)}>اللاعبين</Link></li>
                        
                        {user && user.role === 'player' && (
                            <li><Link to="/seize-opportunity" onClick={() => setIsMenuOpen(false)}>اغتنم فرصتك</Link></li>
                        )}

                        {user && user.role === 'admin' && (
                            <>
                                <li><Link to="/register-opportunity" onClick={() => setIsMenuOpen(false)}>إضافة لاعب</Link></li>
                                <li>
                                    <Link to="/admin/applications" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        طلبات الانضمام
                                        {applications.length > 0 && (
                                            <span style={{ 
                                                background: '#d63031', color: 'white', fontSize: '10px', 
                                                padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' 
                                            }}>
                                                {applications.length}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            </>
                        )}
                        
                        <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>من نحن</Link></li>
                        <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>تواصل معنا</Link></li>
                        {user ? (
                            <li className="nav-auth">
                                <span>أهلا {user.fullName}</span>
                                <a href="#" className="nav-logout-btn" onClick={handleLogout}>تسجيل خروج</a>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="nav-btn-login" onClick={() => setIsMenuOpen(false)}>
                                        انشاء حساب
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="nav-btn-create" onClick={() => setIsMenuOpen(false)}>
                                        تسجيل الدخول
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default Header;
