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
                        <div className="skills-video-section">
                            <h2 className="skills-video-title">🎬 فيديو المهارات</h2>

                            {/* Local MP4 Video */}
                            {videoFile && (
                                <div className="skills-video-card">
                                    <video key={videoFile} className="skills-video-element" width="100%" controls preload="metadata">
                                        <source src={`/videos/${videoFile}`} type="video/mp4" />
                                        <source src={`/videos/${encodeURIComponent(videoFile)}`} type="video/mp4" />
                                        متصفحك لا يدعم تشغيل الفيديوهات.
                                    </video>
                                </div>
                            )}

                            {/* External YouTube/Drive Video */}
                            {embedUrl && (
                                <div className="skills-video-embed-wrap">
                                    {/* Delete button - visible to everyone for testing */}
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
                                    <div className="skills-video-embed-card">
                                        <iframe src={embedUrl} title="فيديو اللاعب" frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen className="skills-video-embed-frame">
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
                                            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
                                            backgroundColor: 'rgba(0, 0, 0, 0.8)', zIndex: 9999,
                                            display: 'flex', justifyContent: 'center', alignItems: 'center',
                                            padding: '20px'
                                        }}>
                                            <div style={{
                                                background: 'linear-gradient(145deg, #0a1f0a, #0d2a0d)',
                                                borderRadius: '20px', padding: '30px', border: '1px solid #39FF14',
                                                boxShadow: '0 15px 50px rgba(0,0,0,0.8), 0 0 20px rgba(57,255,20,0.2)',
                                                maxWidth: '500px', width: '100%', position: 'relative'
                                            }}>
                                                <h3 style={{color: 'white', marginBottom: '15px', fontSize: '20px', textAlign: 'center'}}>إضافة رابط فيديو اللاعب</h3>
                                                <p style={{color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '25px', textAlign: 'center'}}>
                                                    قم بلصق رابط من YouTube أو Google Drive ليتم عرضه في ملف اللاعب.
                                                </p>
                                                <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                                    <input
                                                        type="url"
                                                        value={videoInput}
                                                        onChange={(e) => setVideoInput(e.target.value)}
                                                        placeholder="https://www.youtube.com/watch?v=..."
                                                        style={{
                                                            width: '100%', padding: '14px 18px', borderRadius: '12px',
                                                            border: '1px solid rgba(57,255,20,0.4)', background: 'rgba(0,0,0,0.6)',
                                                            color: 'white', fontSize: '15px', outline: 'none',
                                                            direction: 'ltr', transition: 'border-color 0.3s'
                                                        }}
                                                        onFocus={(e) => e.target.style.borderColor = '#39FF14'}
                                                        onBlur={(e) => e.target.style.borderColor = 'rgba(57,255,20,0.4)'}
                                                    />
                                                    <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
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
                                                                flex: 2, background: '#39FF14', color: '#000', border: 'none',
                                                                padding: '14px 20px', borderRadius: '12px', cursor: 'pointer',
                                                                fontWeight: 'bold', fontSize: '16px', transition: 'background 0.3s'
                                                            }}
                                                            onMouseEnter={(e) => e.target.style.background = '#32e612'}
                                                            onMouseLeave={(e) => e.target.style.background = '#39FF14'}
                                                        >
                                                            حفظ الرابط
                                                        </button>
                                                        <button
                                                            onClick={() => { setShowVideoForm(false); setVideoInput(''); }}
                                                            style={{
                                                                flex: 1, background: 'transparent', color: '#ff4444',
                                                                border: '1px solid rgba(255,68,68,0.5)',
                                                                padding: '14px 16px', borderRadius: '12px', cursor: 'pointer',
                                                                fontSize: '15px', fontWeight: 'bold', transition: 'all 0.3s'
                                                            }}
                                                            onMouseEnter={(e) => { e.target.style.background = 'rgba(255,68,68,0.1)'; e.target.style.borderColor = '#ff4444'; }}
                                                            onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.borderColor = 'rgba(255,68,68,0.5)'; }}
                                                        >
                                                            إلغاء
                                                        </button>
                                                    </div>
                                                </div>
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
