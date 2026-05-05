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
            <header style={{ top: '0' }}>
                <nav>
                    <div className="logo">
                        <Link to="/" className="logo-text" style={{textDecoration: 'none'}}>
                            <img src="/Logo.png" alt="فرصة" style={{ width: '280px', height: 'auto', objectFit: 'contain' }} />
                        </Link>
                    </div>

                    <div className={`menu-toggle ${isMenuOpen ? 'is-active' : ''}`} onClick={toggleMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>

                    <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                        <ul className="nav-links">
                            <li><Link to="/" className="nav-btn-login" style={{ margin: '0 5px' }} onClick={() => setIsMenuOpen(false)}>الرئيسية</Link></li>
                            <li><Link to="/players" className="nav-btn-login" style={{ margin: '0 5px' }} onClick={() => setIsMenuOpen(false)}>اللاعبين</Link></li>
                            
                            {user && user.role === 'player' && (
                                <li><Link to="/seize-opportunity" className="nav-btn-login" style={{ margin: '0 5px' }} onClick={() => setIsMenuOpen(false)}>اغتنم فرصتك</Link></li>
                            )}

                            {user && user.role === 'admin' && (
                                <>
                                    <li><Link to="/register-opportunity" className="nav-btn-login" style={{ margin: '0 5px' }} onClick={() => setIsMenuOpen(false)}>إضافة لاعب</Link></li>
                                    <li>
                                        <Link to="/admin/applications" className="nav-btn-login" onClick={() => setIsMenuOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: '5px', margin: '0 5px' }}>
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
                            <li><Link to="/contact" className="nav-btn-login" style={{ margin: '0 5px' }} onClick={() => setIsMenuOpen(false)}>تواصل معنا</Link></li>
                        </ul>

                        <div className="nav-auth">
                            {user ? (
                                <div className="auth-user">
                                    <span>أهلا {user.fullName}</span>
                                    <a href="#" className="nav-logout-btn" onClick={handleLogout}>تسجيل خروج</a>
                                </div>
                            ) : (
                                <div className="auth-btns">
                                    <Link to="/signup" className="nav-btn-login" onClick={() => setIsMenuOpen(false)}>
                                        انشاء حساب
                                    </Link>
                                    <Link to="/login" className="nav-btn-create" onClick={() => setIsMenuOpen(false)}>
                                        تسجيل الدخول
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </nav>
            </header>
        </>
    );
};

export default Header;
