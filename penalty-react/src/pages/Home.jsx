import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PlayersContext } from '../context/PlayersContext';
import Layout from '../components/Layout';

const Home = () => {
    const { user } = useContext(AuthContext);
    const { players, deletePlayer } = useContext(PlayersContext);
    const navigate = useNavigate();

    const handleDelete = (e, id, name) => {
        e.stopPropagation();
        deletePlayer(id);
    };

    return (
        <Layout>
            <section className="hero">
                <div className="hero-content">
                    <h1 className="hero-brand" style={{fontSize: '5rem', marginBottom: '0'}}>فر<span>صة</span></h1>
                    <p style={{marginTop: '-10px', fontSize: '1.5rem'}}>هنا تبدأ قصه اللاعب</p>
                    <div className="hero-btns" style={{marginTop: '30px'}}>
                        <button className="btn-green" onClick={() => navigate('/players')}>أستعرض اللاعبين</button>
                    </div>
                </div>
            </section>

            <section className="players">
                <h2 className="section-title">أبرز اللاعبين</h2>
                <div className="players-grid">
                    {players.slice(0, 4).map(player => (
                        <div className="player-card" key={player.id} style={{cursor: 'pointer'}} onClick={() => navigate(`/player/${player.id}`)}>
                            <img src={player.image} alt={player.name} />
                            <h3>{player.name}</h3>
                            <p className="year">{player.year}</p>
                            <p className="pos">{player.position}</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button className="view-btn" style={{padding: 0, flex: 1}} onClick={(e) => e.stopPropagation()}>
                                    <Link to={`/player/${player.id}`} style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px'}}>عرض</Link>
                                </button>
                                {user && user.role === 'admin' && (
                                    <button 
                                        onClick={(e) => handleDelete(e, player.id, player.name)}
                                        className="view-btn" 
                                        style={{ 
                                            flex: 1, padding: '10px', background: '#d63031', 
                                            cursor: 'pointer', border: 'none', color: 'white', 
                                            borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' 
                                        }}
                                    >
                                        حذف
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="show-all" onClick={() => navigate('/players')} style={{marginTop: '40px', border: 'none', cursor: 'pointer'}}>عرض كل اللاعبين</button>
            </section>

            {user && user.role === 'admin' && (
                <section className="cta">
                    <div className="cta-overlay">
                        <h2>لديك الصلاحية لإضافة لاعبين جدد للمنصة</h2>
                        <button className="cta-btn"><Link to="/register-opportunity" style={{color: 'white', textDecoration: 'none'}}>إضافة لاعب جديد</Link></button>
                    </div>
                </section>
            )}
        </Layout>
    );
};

export default Home;
