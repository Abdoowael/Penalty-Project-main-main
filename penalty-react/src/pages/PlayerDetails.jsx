import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { AuthContext } from '../context/AuthContext';
import { PlayersContext } from '../context/PlayersContext';
import '../assets/css/profile.css';

// ربط ثابت بين id اللاعب وملف الفيديو - يعمل بغض النظر عن localStorage
const PLAYER_VIDEOS = {
    1: 'محمد احمد جمعه.mp4',
    2: 'احمد عزمي محمود.mp4',
    3: 'يوسف سامح يوسف عماره.mp4',
    5: 'عبدالله فارس.mp4',
    6: 'حمدي محمد ابراهيم صبري.mp4',
    7: 'علي محمد السيد ابو المعاطي.mp4',
    8: 'ابراهيم عبد الباسط جمال عبدة.mp4',
    9: 'عبد الرحمن جميل.mp4',
    10: 'مصطفي زينهم رشاد.mp4',
    11: 'عمر الخطيب.mp4',
    12: 'زياد احمد مصطفي ابراهيم.mp4',
};

const PlayerDetails = () => {
    const { user } = useContext(AuthContext);
    const { players, deletePlayer, updatePlayerVideo } = useContext(PlayersContext);
    const [videoInput, setVideoInput] = useState('');
    const [videoSaved, setVideoSaved] = useState(false);
    const [showVideoForm, setShowVideoForm] = useState(false);
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

    const getEmbedUrl = (url) => {
        if (!url) return null;
        const driveMatch = url.match(/\/(?:d|open)\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
            return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
        }
        const ytMatch = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (ytMatch) {
            return `https://www.youtube.com/embed/${ytMatch[1]}`;
        }
        return null;
    };

    const embedUrl = getEmbedUrl(player?.youtube);

    const localVideoSources = useMemo(() => {
        if (!player || !player.videoFile) return [];
        const fileName = player.videoFile.trim();
        return [
            `/videos/${fileName}`,
            `/videos/${encodeURIComponent(fileName)}`,
            `/${fileName}`
        ];
    }, [player]);

    const activeLocalVideoSrc = localVideoSources[videoSourceIndex] || '';

    useEffect(() => {
        setVideoSourceIndex(0);
        setLocalVideoFailed(false);
    }, [id, player]);

    const handleLocalVideoError = () => {
        console.log(`Failed to load video: ${activeLocalVideoSrc}`);
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
                    <h2 style={{color: '#39FF14', fontSize: '2rem'}}>اللاعب غير موجود</h2>
                    <p style={{color: 'rgba(255,255,255,0.5)', marginTop: '15px'}}>عذراً، لم نتمكن من العثور على بيانات هذا اللاعب</p>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="hero" style={{ height: '400px', background: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7), #000000), url('/stadium-bg.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <div className="hero-content">
                    <p style={{fontSize: '1.3rem', color: 'rgba(255,255,255,0.6)'}}>اكتشف موهبتك بنفسك للوصول إلى الاحتراف</p>
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
                        <div className="info-row">
                            <span className="label">محل الإقامة</span>
                            <span className="value">{player.residence || 'تلبانة'}</span>
                        </div>
                        <div className="info-row">
                            <span className="label">الأكاديمية / النادي</span>
                            <span className="value">{player.club || 'أكاديمية المنصورة'}</span>
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
                                        background: 'linear-gradient(135deg, #e74c3c, #c0392b)', color: 'white', border: 'none',
                                        padding: '10px 20px', borderRadius: '10px', cursor: 'pointer',
                                        fontWeight: 'bold', fontSize: '14px',
                                        boxShadow: '0 4px 15px rgba(231, 76, 60, 0.2)'
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

                {/* Video Section */}
                {(() => {
                    const videoFile = PLAYER_VIDEOS[player.id] || player.videoFile || '';
                    const externalUrl = player.youtube || '';
                    const getEmbed = (url) => {
                        if (!url) return null;
                        const drive = url.match(/\/(?:d|open)\/([a-zA-Z0-9_-]+)/);
                        if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;
                        const yt = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
                        if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
                        return null;
                    };
                    const embedUrl = getEmbed(externalUrl);

                    return (
                        <div style={{marginTop: '40px', borderTop: '1px solid rgba(57,255,20,0.3)', paddingTop: '30px'}}>
                            <h2 style={{color: '#39FF14', marginBottom: '20px', textAlign: 'right', fontSize: '22px'}}>🎬 فيديو المهارات</h2>

                            {/* Local MP4 Video */}
                            {!embedUrl && videoFile && (
                                <div style={{background: '#000', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(57,255,20,0.2)', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', marginBottom: '20px'}}>
                                    <video key={videoFile} width="100%" controls preload="metadata" style={{display: 'block', maxHeight: '560px'}}>
                                        <source src={`/videos/${videoFile}`} type="video/mp4" />
                                        <source src={`/videos/${encodeURIComponent(videoFile)}`} type="video/mp4" />
                                        متصفحك لا يدعم تشغيل الفيديوهات.
                                    </video>
                                </div>
                            )}

                            {/* External YouTube/Drive Video */}
                            {embedUrl && (
                                <div style={{position: 'relative', marginBottom: '20px'}}>
                                    {/* Delete button - visible to admin & player */}
                                    {user && (user.role === 'admin' || user.role === 'player') && (
                                        <button
                                            onClick={() => updatePlayerVideo(player.id, '')}
                                            title="حذف الفيديو"
                                            style={{
                                                position: 'absolute', top: '12px', left: '12px',
                                                zIndex: 10,
                                                background: 'rgba(200, 0, 0, 0.85)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '36px', height: '36px',
                                                fontSize: '18px', fontWeight: 'bold',
                                                cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={e => e.target.style.background = 'rgba(255,0,0,1)'}
                                            onMouseLeave={e => e.target.style.background = 'rgba(200,0,0,0.85)'}
                                        >
                                            ✕
                                        </button>
                                    )}
                                    <div style={{borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(57,255,20,0.2)', boxShadow: '0 10px 40px rgba(0,0,0,0.6)'}}>
                                        <iframe width="100%" height="500" src={embedUrl} title="فيديو اللاعب" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen style={{display: 'block'}}>
                                        </iframe>
                                    </div>
                                </div>
                            )}

                            {!videoFile && !embedUrl && (
                                <div style={{padding: '30px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px dashed rgba(255,255,255,0.15)', textAlign: 'center'}}>
                                    <p style={{color: 'rgba(255,255,255,0.4)'}}>لا يوجد فيديو مهارات متاح لهذا اللاعب حالياً.</p>
                                </div>
                            )}

                            {/* Add Video Form - Always visible for testing/demo */}
                            <div style={{marginTop: '20px'}}>
                                    {!showVideoForm ? (
                                        <button
                                            onClick={() => setShowVideoForm(true)}
                                            style={{
                                                background: 'transparent', color: '#39FF14', border: '1px solid #39FF14',
                                                padding: '10px 24px', borderRadius: '25px', cursor: 'pointer',
                                                fontSize: '14px', fontWeight: '600', transition: 'all 0.3s',
                                                display: 'flex', alignItems: 'center', gap: '8px'
                                            }}
                                        >
                                            ➕ إضافة رابط فيديو (YouTube / Drive)
                                        </button>
                                    ) : (
                                        <div style={{
                                            background: 'rgba(13,42,13,0.95)', borderRadius: '16px',
                                            padding: '24px', border: '1px solid rgba(57,255,20,0.2)'
                                        }}>
                                            <h3 style={{color: 'white', marginBottom: '15px', fontSize: '16px'}}>إضافة رابط فيديو</h3>
                                            <p style={{color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '15px'}}>
                                                ضع رابط YouTube أو Google Drive للفيديو
                                            </p>
                                            <div style={{display: 'flex', gap: '10px'}}>
                                                <input
                                                    type="url"
                                                    value={videoInput}
                                                    onChange={(e) => setVideoInput(e.target.value)}
                                                    placeholder="https://www.youtube.com/watch?v=... أو رابط Drive"
                                                    style={{
                                                        flex: 1, padding: '12px 16px', borderRadius: '10px',
                                                        border: '1px solid rgba(57,255,20,0.3)', background: 'rgba(0,0,0,0.5)',
                                                        color: 'white', fontSize: '14px', outline: 'none',
                                                        direction: 'ltr'
                                                    }}
                                                />
                                                <button
                                                    onClick={() => {
                                                        if (videoInput.trim()) {
                                                            updatePlayerVideo(player.id, videoInput.trim());
                                                            setVideoSaved(true);
                                                            setVideoInput('');
                                                            setShowVideoForm(false);
                                                            setTimeout(() => setVideoSaved(false), 3000);
                                                        }
                                                    }}
                                                    style={{
                                                        background: '#39FF14', color: '#000', border: 'none',
                                                        padding: '12px 20px', borderRadius: '10px', cursor: 'pointer',
                                                        fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap'
                                                    }}
                                                >
                                                    حفظ
                                                </button>
                                                <button
                                                    onClick={() => { setShowVideoForm(false); setVideoInput(''); }}
                                                    style={{
                                                        background: 'transparent', color: 'rgba(255,255,255,0.5)',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        padding: '12px 16px', borderRadius: '10px', cursor: 'pointer', fontSize: '14px'
                                                    }}
                                                >
                                                    إلغاء
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                    {videoSaved && (
                                        <p style={{color: '#39FF14', marginTop: '10px', fontSize: '14px'}}>✅ تم حفظ الفيديو بنجاح!</p>
                                    )}
                                </div>
                        </div>
                    );
                })()}
            </main>
        </Layout>
    );
};

export default PlayerDetails;
