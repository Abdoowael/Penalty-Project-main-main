import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { PlayersContext } from '../context/PlayersContext';
import '../assets/css/players.css';

const Players = () => {
    const { user } = useContext(AuthContext);
    const { players, deletePlayer } = useContext(PlayersContext);
    const navigate = useNavigate();

    const handleDelete = (e, id, name) => {
        e.stopPropagation();
        deletePlayer(id);
    };

    return (
        <Layout>
            <section className="hero" style={{height: '45vh', backgroundPosition: 'top'}}>
                <div className="hero-content">
                    <h1 style={{fontSize: '2.5rem'}}>اللاعبين</h1>
                    <p>اكتشف نجوم منصة فرصة</p>
                </div>
            </section>

            <div className="main-content" style={{marginTop: '0'}}>
                <div className="container">
                    <div className="players-grid">
                        {players?.map((player, index) => (
                            <div 
                                className="player-card reveal" 
                                key={player.id} 
                                style={{cursor: 'pointer', '--delay': `${(index % 8) * 0.2}s` }} 
                                onClick={() => navigate(`/player/${player.id}`)}
                            >
                                <div className="image-wrapper">
                                    <img src={player.image} alt={player.name} />
                                </div>
                                <div className="player-data">
                                    <h3>{player.name}</h3>
                                    <span className="year">مواليد {player.year}</span>
                                    <p className="position">{player.position}</p>
                                    {player.videoFile && (
                                        <p style={{ fontSize: '11px', color: 'rgba(57,255,20,0.5)', marginBottom: '8px' }}>
                                            <i className="fas fa-video" style={{marginLeft: '5px'}}></i>
                                            يوجد فيديو مهارات
                                        </p>
                                    )}
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                                        <button className="details-btn" style={{ flex: 1, marginTop: '0', padding: '0' }} onClick={(e) => e.stopPropagation()}>
                                            <Link to={`/player/${player.id}`} style={{color: '#000', textDecoration: 'none', display: 'block', padding: '8px 0', fontWeight: '700'}}>عرض بيانات اللاعب</Link>
                                        </button>
                                        {user && user.role === 'admin' && (
                                            <button 
                                                onClick={(e) => handleDelete(e, player.id, player.name)}
                                                className="details-btn" 
                                                style={{ 
                                                    flex: 1, marginTop: '0', background: '#d63031', 
                                                    cursor: 'pointer', border: 'none', color: 'white' 
                                                }}
                                            >
                                                حذف
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Players;
