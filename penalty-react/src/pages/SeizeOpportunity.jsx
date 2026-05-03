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
                        background: 'rgba(40, 167, 69, 0.1)', 
                        padding: '40px', 
                        borderRadius: '20px', 
                        maxWidth: '600px', 
                        margin: '0 auto',
                        border: '1px solid #28a745'
                    }}>
                        <i className="fas fa-check-circle" style={{ fontSize: '64px', color: '#28a745', marginBottom: '20px' }}></i>
                        <h2 style={{ color: 'white', marginBottom: '10px' }}>تم إرسال طلبك بنجاح!</h2>
                        <p style={{ color: 'rgba(255,255,255,0.7)' }}>سيقوم المسؤولون بمراجعة مهاراتك والرد عليك في أقرب وقت. سيتم تحويلك للصفحة الرئيسية...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <section className="hero" style={{ height: '300px', background: 'linear-gradient(rgba(7, 26, 16, 0.6), rgba(7, 26, 16, 0.8)), url("/hero-stadium.jpg")' }}>
                <div className="hero-content">
                    <h1 style={{ fontSize: '3rem' }}>اغتنم فرصتك</h1>
                    <p>اعرض مهاراتك وانضم إلى نجوم فرصة</p>
                </div>
            </section>

            <div className="register-page" style={{ padding: '50px 20px' }}>
                <div className="register-wrapper">
                    <h2 className="register-title">بيانات اللاعب</h2>
                    <p className="register-subtitle">املأ البيانات بدقة لزيادة فرص قبولك</p>
                    
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label>الاسم الكامل</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="ادخل اسمك الثلاثي" />
                        </div>

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label>سنة الميلاد</label>
                                <input type="number" name="year" value={formData.year} onChange={handleChange} required placeholder="مثال: 2005" />
                            </div>
                            <div className="form-group half-width">
                                <label>المركز</label>
                                <input type="text" name="position" value={formData.position} onChange={handleChange} required placeholder="مثال: مهاجم" />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label>الطول (سم)</label>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="مثال: 180" />
                            </div>
                            <div className="form-group half-width">
                                <label>الوزن (كجم)</label>
                                <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="مثال: 75" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>رابط الصورة الشخصية</label>
                            <input type="url" name="image" value={formData.image} onChange={handleChange} required placeholder="رابط مباشر لصورة واضحة" />
                        </div>

                        <div className="form-group">
                            <label>رابط فيديو المهارات (يوتيوب أو جوجل درايف)</label>
                            <input type="url" name="youtube" value={formData.youtube} onChange={handleChange} placeholder="رابط فيديو يعرض مهاراتك" />
                        </div>

                        <div className="form-group">
                            <label>عنك (وصف مختصر)</label>
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                style={{
                                    width: '100%', padding: '14px', background: 'rgba(255,255,255,0.05)', 
                                    border: '1px solid rgba(40, 167, 69, 0.2)', borderRadius: '10px', 
                                    color: 'white', fontFamily: 'Cairo', minHeight: '100px'
                                }}
                                placeholder="اكتب نبذة عن مسيرتك الكروية..."
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">إرسال الطلب</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default SeizeOpportunity;
