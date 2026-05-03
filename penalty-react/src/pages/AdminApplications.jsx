import { useContext } from 'react';
import Layout from '../components/Layout';
import { PlayersContext } from '../context/PlayersContext';

const AdminApplications = () => {
    const { applications, approveApplication, rejectApplication } = useContext(PlayersContext);

    return (
        <Layout>
            <section className="hero" style={{ height: '250px', background: 'linear-gradient(rgba(7, 26, 16, 0.7), rgba(7, 26, 16, 0.9)), url("/hero-stadium.jpg")' }}>
                <div className="hero-content">
                    <h1>طلبات الانضمام</h1>
                    <p>مراجعة وقبول اللاعبين الجدد</p>
                </div>
            </section>

            <div style={{ padding: '50px 20px', minHeight: '60vh', background: '#071a10' }}>
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
                                    background: 'linear-gradient(145deg, #0d2618, #0a1f14)', 
                                    border: '1px solid rgba(40, 167, 69, 0.15)', 
                                    borderRadius: '15px', 
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '15px'
                                }}>
                                    <div style={{ display: 'flex', gap: '15px' }}>
                                        <img src={app.image} alt={app.name} style={{ width: '100px', height: '100px', borderRadius: '10px', objectFit: 'cover' }} />
                                        <div>
                                            <h3 style={{ color: 'white', marginBottom: '5px' }}>{app.name}</h3>
                                            <p style={{ color: '#28a745', fontSize: '14px' }}>{app.position} - مواليد {app.year}</p>
                                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>تاريخ الطلب: {new Date(app.date).toLocaleDateString('ar-EG')}</p>
                                        </div>
                                    </div>
                                    
                                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px' }}>
                                        <strong>الوصف:</strong> {app.description || 'لا يوجد وصف'}
                                    </div>

                                    {app.youtube && (
                                        <div style={{ borderRadius: '10px', overflow: 'hidden' }}>
                                            <iframe 
                                                width="100%" 
                                                height="200" 
                                                src={app.youtube.replace('watch?v=', 'embed/')} 
                                                title="Player Skills" 
                                                frameBorder="0" 
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    )}

                                    <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                                        <button 
                                            onClick={() => approveApplication(app.id)}
                                            style={{ 
                                                flex: 1, padding: '12px', background: '#28a745', color: 'white', 
                                                border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
                                            }}
                                        >
                                            قبول اللاعب
                                        </button>
                                        <button 
                                            onClick={() => rejectApplication(app.id)}
                                            style={{ 
                                                flex: 1, padding: '12px', background: 'rgba(214, 48, 49, 0.1)', color: '#ff6b6b', 
                                                border: '1px solid rgba(214, 48, 49, 0.3)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' 
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
