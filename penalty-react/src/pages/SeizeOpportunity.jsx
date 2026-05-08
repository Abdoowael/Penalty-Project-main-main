import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { PlayersContext } from '../context/PlayersContext';
import { useNavigate } from 'react-router-dom';
import '../assets/css/f.css'; // Reusing register styles

const SeizeOpportunity = () => {
    const { submitApplication } = useContext(PlayersContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        year: '',
        position: '',
        height: '',
        weight: '',
        residence: '',
        club: '',
        image: '',
        youtube: '',
        description: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submitApplication(formData);
        setSubmitted(true);
        setTimeout(() => navigate('/'), 3000);
    };

    if (submitted) {
        return (
            <Layout>
                <div style={{ padding: '150px 20px', textAlign: 'center', minHeight: '60vh' }}>
                    <div style={{ 
                        background: 'rgba(57, 255, 20, 0.06)', 
                        padding: '40px', 
                        borderRadius: '20px', 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        border: '1px solid rgba(57, 255, 20, 0.3)'
                    }}>
                        <i className="fas fa-check-circle" style={{ fontSize: '64px', color: '#39FF14', marginBottom: '20px' }}></i>
                        <h2 style={{ color: 'white', marginBottom: '10px' }}>تم إرسال طلبك بنجاح!</h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)' }}>سيقوم المسؤولون بمراجعة مهاراتك والرد عليك في أقرب وقت. سيتم تحويلك للصفحة الرئيسية...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div style={{
                position: 'relative',
                minHeight: '100vh',
                backgroundImage: `url('/IMG-20260420-WA0019.jpg')`,
                backgroundSize: '100% 100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}>
                {/* Dark overlay - very light to show image clearly */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.25)',
                    zIndex: 1
                }}></div>

                {/* Content on top */}
                <div style={{ position: 'relative', zIndex: 2, padding: '120px 20px 60px' }}>
                    <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '10px', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>اغتنم فرصتك</h1>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>اعرض مهاراتك وانضم إلى نجوم فرصة</p>
                    </div>

                    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 20px' }}>
                        <div style={{ background: 'transparent', padding: '0' }}>
                            <h2 style={{ color: 'white', textAlign: 'center', fontSize: '1.5rem', marginBottom: '5px', textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>بيانات اللاعب</h2>
                            <p style={{ color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: '30px', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>املأ البيانات بدقة لزيادة فرص قبولك</p>
                            
                            <form onSubmit={handleSubmit}>
                                {/* Two-column grid */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>الاسم الكامل</label>
                                        <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="ادخل اسمك الثلاثي" 
                                            style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>سنة الميلاد</label>
                                        <input type="number" name="year" value={formData.year} onChange={handleChange} required placeholder="مثال: 2005" 
                                            style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>المركز</label>
                                        <input type="text" name="position" value={formData.position} onChange={handleChange} required placeholder="مثال: مهاجم" 
                                            style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>الطول (سم)</label>
                                        <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="مثال: 180" 
                                            style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>الوزن (كجم)</label>
                                        <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="مثال: 75" 
                                            style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>محل الإقامة</label>
                                        <input type="text" name="residence" value={formData.residence} onChange={handleChange} placeholder="مثال: تلبانة" 
                                            style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>الأكاديمية / النادي</label>
                                        <input type="text" name="club" value={formData.club} onChange={handleChange} placeholder="مثال: أكاديمية المنصورة" 
                                            style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>رابط الصورة الشخصية</label>
                                        <input type="url" name="image" value={formData.image} onChange={handleChange} required placeholder="رابط مباشر لصورة واضحة" 
                                            style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                    </div>
                                </div>

                                {/* Full-width fields below the grid */}
                                <div style={{ marginTop: '20px' }}>
                                    <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>رابط فيديو المهارات (YouTube أو Google Drive)</label>
                                    <input type="url" name="youtube" value={formData.youtube} onChange={handleChange} placeholder="مثال: https://www.youtube.com/watch?v=... أو رابط Drive" 
                                        style={{ width: '100%', padding: '14px', background: 'white', border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', color: 'black', fontFamily: 'Cairo', backdropFilter: 'blur(5px)', outline: 'none' }} />
                                </div>

                                <div style={{ marginTop: '20px' }}>
                                    <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontWeight: 'bold', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>عنك (وصف مختصر)</label>
                                    <textarea 
                                        name="description" 
                                        value={formData.description} 
                                        onChange={handleChange} 
                                        style={{
                                            width: '100%', padding: '14px', background: 'white', 
                                            border: '1px solid rgba(255,255,255,0.4)', borderRadius: '10px', 
                                            color: 'black', fontFamily: 'Cairo', minHeight: '100px', backdropFilter: 'blur(5px)', outline: 'none'
                                        }}
                                        placeholder="اكتب نبذة عن مسيرتك الكروية..."
                                    ></textarea>
                                </div>

                                <button type="submit" style={{
                                    width: '100%', padding: '16px', marginTop: '25px',
                                    background: '#39FF14', color: '#000', fontWeight: 'bold', fontSize: '1.1rem',
                                    border: 'none', borderRadius: '12px', cursor: 'pointer', fontFamily: 'Cairo',
                                    transition: 'all 0.3s', boxShadow: '0 4px 15px rgba(57, 255, 20, 0.3)'
                                }}>إرسال الطلب</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default SeizeOpportunity;
