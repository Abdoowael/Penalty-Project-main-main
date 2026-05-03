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
            <section className="hero" style={{height: '50vh', backgroundPosition: 'top'}}>
                <div className="hero-content">
                </div>
            </section>

            <div className="stadium-header">
                <div className="shadow-overlay"></div>
            </div>

            <div className="main-content">
                <div className="container">
                    <div className="players-grid">
                        {players.map(player => (
                            <div className="player-card" key={player.id} style={{cursor: 'pointer'}} onClick={() => navigate(`/player/${player.id}`)}>
                                <div className="image-wrapper">
                                    <img src={player.image} alt="لاعب" />
                                </div>
                                <div className="player-data">
                                    <h3>{player.name}</h3>
                                    <span className="year">{player.year}</span>
                                    <p className="position">{player.position}</p>
                                    <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                        <button className="details-btn" style={{ flex: 1, marginTop: '0', padding: '0' }} onClick={(e) => e.stopPropagation()}>
                                            <Link to={`/player/${player.id}`} style={{color: 'white', textDecoration: 'none', display: 'block', padding: '8px 0'}}>عرض</Link>
                                        </button>
                                        {user && user.role === 'admin' && (
                                            <button 
                                                onClick={(e) => handleDelete(e, player.id, player.name)}
                                                className="details-btn" 
                                                style={{ 
                                                    flex: 1, marginTop: '0', background: '#d63031', 
                                                    cursor: 'pointer', border: 'none' 
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
