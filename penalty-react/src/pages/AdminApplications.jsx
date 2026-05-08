import { useContext } from 'react';
import Layout from '../components/Layout';
import { PlayersContext } from '../context/PlayersContext';

const AdminApplications = () => {
    const { applications, approveApplication, rejectApplication } = useContext(PlayersContext);

    return (
        <Layout>
            <section className="hero" style={{ height: '250px', background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8), #000000), url('/stadium-bg.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="hero-content">
                    <h1>طلبات الانضمام</h1>
                    <p>مراجعة وقبول اللاعبين الجدد</p>
                </div>
            </section>

            <div style={{ padding: '50px 20px', minHeight: '60vh', background: '#0a0a0a' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    {applications.length === 0 ? (
                        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', padding: '50px' }}>
                            <i className="fas fa-inbox" style={{ fontSize: '48px', marginBottom: '20px' }}></i>
                            <h3>لا توجد طلبات معلقة حالياً</h3>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '25px' }}>
                            {applications.map(app => (
                                <div key={app.id} style={{ 
                                    background: 'linear-gradient(145deg, #0D2A0D, #0D2A0D)', 
                                    border: '1px solid rgba(255, 255, 255, 0.06)', 
                                    borderRadius: '16px', 
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px'
                                }}>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <img src={app.image} alt={app.name} style={{ width: '100px', height: '100px', borderRadius: '10px', objectFit: 'cover' }} />
                                        <div>
                                            <h3 style={{ color: 'white', marginBottom: '5px' }}>{app.name}</h3>
                                            <p style={{ color: '#39FF14', fontSize: '14px' }}>{app.position} - مواليد {app.year}</p>
                                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>تاريخ الطلب: {new Date(app.date).toLocaleDateString('ar-EG')}</p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                                        <strong>الوصف:</strong> {app.description || 'لا يوجد وصف'}
                                    </div>

                                    {app.youtube && (
                                        <div style={{ borderRadius: '10px', overflow: 'hidden', aspectRatio: '16 / 9', width: '100%' }}>
                                            <iframe 
                                                width="100%" 
                                                height="100%" 
                                                src={app.youtube.replace('watch?v=', 'embed/')} 
                                                title="Player Skills" 
                                                frameBorder="0" 
                                                allowFullScreen
                                                style={{ display: 'block', width: '100%', height: '100%', border: '0' }}
                                            ></iframe>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                                        <button 
                                            onClick={() => approveApplication(app.id)}
                                            style={{ 
                                                flex: 1, padding: '12px', background: 'linear-gradient(135deg, #39FF14, #39FF14)', color: 'white', 
                                                border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold',
                                                boxShadow: '0 4px 15px rgba(57, 255, 20, 0.2)'
                                            }}
                                        >
                                            قبول اللاعب
                                        </button>
                                        <button 
                                            onClick={() => rejectApplication(app.id)}
                                            style={{ 
                                                flex: 1, padding: '12px', background: 'rgba(231, 76, 60, 0.08)', color: '#e74c3c', 
                                                border: '1px solid rgba(231, 76, 60, 0.2)', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' 
                                            }}
                                        >
                                            رفض الطلب
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default AdminApplications;
