import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { PlayersContext } from '../context/PlayersContext';
import '../assets/css/profile.css';

const PlayerDetails = () => {
    const { user } = useContext(AuthContext);
    const { players, deletePlayer } = useContext(PlayersContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const player = players.find(p => p.id === parseInt(id));

    // Track local video candidate source and fallback attempts.
    const [videoSourceIndex, setVideoSourceIndex] = useState(0);
    const [localVideoFailed, setLocalVideoFailed] = useState(false);

    const handleDelete = () => {
        deletePlayer(player.id);
        navigate('/players');
    };

    const localVideoSources = useMemo(() => {
        if (!player) return [];

        const fileName = (player.videoFile || '').trim();
        if (!fileName) return [];

        const encodedName = encodeURI(fileName);
        const directPath = `/${encodedName}`;
        const videosFolderPath = `/videos/${encodedName}`;

        // Try both common locations inside public.
        return [directPath, videosFolderPath];
    }, [player]);

    const activeLocalVideoSrc = localVideoSources[videoSourceIndex] || '';

    useEffect(() => {
        setVideoSourceIndex(0);
        setLocalVideoFailed(false);
    }, [id]);

    const handleLocalVideoError = () => {
        if (videoSourceIndex < localVideoSources.length - 1) {
            setVideoSourceIndex((prev) => prev + 1);
            return;
        }
        setLocalVideoFailed(true);
    };

    if (!player) {
        return (
            <Layout>
                <div style={{textAlign: 'center', padding: '150px 20px', minHeight: '60vh'}}>
                    <h2 style={{color: '#28a745', fontSize: '2rem'}}>اللاعب غير موجود</h2>
                    <p style={{color: 'rgba(255,255,255,0.6)', marginTop: '15px'}}>عذراً، لم نتمكن من العثور على بيانات هذا اللاعب</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="hero" style={{ height: '400px', background: `linear-gradient(rgba(7, 26, 16, 0.5), rgba(7, 26, 16, 0.8)), url('/tyt.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div className="hero-content">
                    <div className="hero-logo-text" style={{fontSize: '56px'}}>فرصة</div>
                    <p style={{fontSize: '1.3rem', color: 'rgba(255,255,255,0.8)'}}>اكتشف موهبتك بنفسك للوصول إلى الاحتراف</p>
                </div>
            </section>

            <main className="player-profile">
                <div className="star-badge">النجم</div>
                <h3 className="player-name">{player.name}</h3>

                <div className="profile-container">
                    <div className="player-info">
                        <div className="info-row">
                            <span className="label">سنة الميلاد</span>
                            <span className="value">{player.year}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">المركز</span>
                            <span className="value">{player.position}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">الطول</span>
                            <span className="value">{player.height ? `${player.height} سم` : '175 سم'}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">الوزن</span>
                            <span className="value">{player.weight || '70 كجم'}</span>
                        </div>
                        <div className="about-player">
                            <h3>عن اللاعب</h3>
                            <p>{player.description}</p>
                        </div>

                        {user && user.role === 'admin' && (
                            <div style={{marginTop: '20px', textAlign: 'center'}}>
                                <button 
                                    className="delete-player-btn" 
                                    onClick={handleDelete}
                                    style={{
                                        background: '#d63031', color: 'white', border: 'none',
                                        padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                                        fontWeight: 'bold', fontSize: '14px'
                                    }}
                                >
                                    حذف اللاعب
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="player-image">
                        <img src={player.image} alt={player.name} />
                    </div>
                </div>

                {localVideoSources.length > 0 && !localVideoFailed && (
                    <div className="video-gallery" style={{display: 'block', marginTop: '40px'}}>
                        <h2 style={{color: '#28a745', marginBottom: '20px', textAlign: 'right'}}>فيديو مهارات اللاعب (محلي)</h2>
                        <div className="video-placeholder" style={{padding: '0', background: 'transparent', aspectRatio: 'auto'}}>
                            <video 
                                key={activeLocalVideoSrc}
                                src={activeLocalVideoSrc}
                                width="100%" 
                                controls 
                                style={{borderRadius: '15px', maxHeight: '500px', backgroundColor: '#000'}}
                                onError={handleLocalVideoError}
                            >
                                متصفحك لا يدعم تشغيل الفيديوهات.
                            </video>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
};

export default PlayerDetails;
