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

                    <h1 className="home-hero-title">من هنا تبدأ فرصتك</h1>
                    <p className="home-hero-subtitle">من الملعب الصغير ...لفرص كبيرة تستاهلها</p>
                    <div className="hero-btns home-hero-btns">
                        <Link to="/seize-opportunity" className="btn-green home-hero-btn">اغتنم فرصتك</Link>
                        <Link to="/players" className="btn-white home-hero-btn">استعراض اللاعبين</Link>
                    </div>
                </div>
            </section>

            <section className="players">
                <h2 className="section-title">أبرز اللاعبين</h2>
                <div className="players-grid">
                    {players?.slice(0, 4)?.map((player, index) => (
                        <div 
                            className="player-card reveal" 
                            key={player.id} 
                            style={{cursor: 'pointer', '--delay': `${index * 0.2}s` }} 
                            onClick={() => navigate(`/player/${player.id}`)}
                        >
                            <img src={player.image} alt={player.name} />
                            <h3>{player.name}</h3>
                            <p className="year">{player.year}</p>
                            <p className="pos">{player.position}</p>
                            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                <button className="view-btn" style={{padding: 0, flex: 1}} onClick={(e) => e.stopPropagation()}>
                                    <Link to={`/player/${player.id}`} style={{color: 'white', textDecoration: 'none', display: 'block', padding: '10px'}}>عرض بيانات اللاعب</Link>
                                </button>
                                {user && user.role === 'admin' && (
                                    <button 
                                        onClick={(e) => handleDelete(e, player.id, player.name)}
                                        className="view-btn" 
                                        style={{ 
                                            flex: 1, padding: '10px', background: 'linear-gradient(135deg, #e74c3c, #c0392b)', 
                                            cursor: 'pointer', border: 'none', color: 'white', 
                                            borderRadius: '10px', fontSize: '14px', fontWeight: 'bold',
                                            boxShadow: '0 4px 15px rgba(231, 76, 60, 0.2)'
                                        }}
                                    >
                                        حذف
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="show-all reveal" onClick={() => navigate('/players')} style={{marginTop: '40px', border: 'none', cursor: 'pointer', '--delay': '0.6s'}}>عرض كل اللاعبين</button>
            </section>

            <section className="cta home-cta" style={{ 
                background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('/Download Football stadium inside at night with lights Post-Production for free.jfif')`
            }}>
                <div className="cta-content">
                    <h2 className="home-cta-title">سجل الآن وابدأ رحلتك نحو الاحتراف</h2>
                    <Link to="/seize-opportunity" className="cta-btn home-cta-btn">أغتنم الفرصة</Link>
                </div>
            </section>
        </Layout>
    );
};

export default Home;
