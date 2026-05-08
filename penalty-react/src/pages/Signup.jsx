import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';

const Signup = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        city: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'junior'
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'الاسم مطلوب.';
        if (!formData.age.trim()) newErrors.age = 'العمر مطلوب.';
        if (!formData.city.trim()) newErrors.city = 'المدينة مطلوبة.';
        if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف مطلوب.';
        if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'كلمات المرور غير متطابقة.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            login({ fullName: formData.fullName, role: 'player', playerType: formData.role });
            navigate('/');
        }
    };

    return (
        <Layout>
            <main className="register-page" style={{ 
                minHeight: '100vh',
                background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url('/stadium-bg.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '180px 20px 60px'
            }}>
                <div className="hero-content" style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <img src="/Logo Forsa.png" alt="فرصة" className="signup-logo-media" style={{ marginBottom: '15px' }} />
                    <h2 style={{ color: '#39FF14', fontSize: '1.5rem', fontWeight: 'bold' }}>من هنا تبدأ فرصتك</h2>
                </div>

                <section className="register-container" style={{
                    background: 'rgba(13, 42, 13, 0.95)',
                    padding: '40px',
                    borderRadius: '20px',
                    width: '100%',
                    maxWidth: '500px',
                    border: '1px solid rgba(57, 255, 20, 0.1)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}>
                    <h1 style={{ textAlign: 'center', color: 'white', marginBottom: '30px', fontSize: '2rem', fontWeight: '800' }}>سجل الآن</h1>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>الاسم</label>
                            <input 
                                type="text" name="fullName" value={formData.fullName} onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#333' }}
                            />
                            {errors.fullName && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.fullName}</span>}
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>العمر</label>
                            <input 
                                type="text" name="age" value={formData.age} onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#333' }}
                            />
                            {errors.age && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.age}</span>}
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>المدينة</label>
                            <input 
                                type="text" name="city" value={formData.city} onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#333' }}
                            />
                            {errors.city && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.city}</span>}
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>رقم الهاتف</label>
                            <input 
                                type="text" name="phone" value={formData.phone} onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#333' }}
                            />
                            {errors.phone && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.phone}</span>}
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>كلمة المرور</label>
                            <input 
                                type="password" name="password" value={formData.password} onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#333' }}
                            />
                            {errors.password && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: 'white', marginBottom: '8px', fontSize: '14px' }}>تأكيد كلمة المرور</label>
                            <input 
                                type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: 'white', color: '#333' }}
                            />
                            {errors.confirmPassword && <span style={{ color: '#ff4444', fontSize: '12px' }}>{errors.confirmPassword}</span>}
                        </div>

                        <div className="form-group">
                            <label style={{ display: 'block', color: 'white', marginBottom: '12px', fontSize: '14px', textAlign: 'center' }}>حدد فئتك كلاعب</label>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <div 
                                    onClick={() => setFormData({ ...formData, role: 'junior' })}
                                    style={{
                                        flex: 1, padding: '12px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer',
                                        border: formData.role === 'junior' ? '2px solid #39FF14' : '1px solid rgba(255, 255, 255, 0.1)',
                                        background: formData.role === 'junior' ? 'rgba(57, 255, 20, 0.1)' : 'transparent',
                                        color: formData.role === 'junior' ? '#39FF14' : 'white',
                                        transition: 'all 0.3s', fontSize: '14px'
                                    }}
                                >
                                    لاعب ناشئ
                                </div>
                                <div 
                                    onClick={() => setFormData({ ...formData, role: 'independent' })}
                                    style={{
                                        flex: 1, padding: '12px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer',
                                        border: formData.role === 'independent' ? '2px solid #39FF14' : '1px solid rgba(255, 255, 255, 0.1)',
                                        background: formData.role === 'independent' ? 'rgba(57, 255, 20, 0.1)' : 'transparent',
                                        color: formData.role === 'independent' ? '#39FF14' : 'white',
                                        transition: 'all 0.3s', fontSize: '14px'
                                    }}
                                >
                                    لاعب مستقل
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="login-btn" style={{ width: '100%', marginTop: '10px', padding: '15px', background: '#39FF14', color: 'black', fontWeight: 'bold' }}>
                            سجل الآن
                        </button>

                        <div style={{ textAlign: 'center', marginTop: '15px' }}>
                            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                                لديك حساب؟ <Link to="/login" style={{ color: '#39FF14', textDecoration: 'none', fontWeight: 'bold' }}>سجل دخول</Link>
                            </p>
                        </div>
                    </form>
                </section>
            </main>
        </Layout>
    );
};

export default Signup;
