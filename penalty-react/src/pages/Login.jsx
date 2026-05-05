import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../assets/css/f2.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ full_name: '', email: '', password: '', role: 'player' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.full_name.trim()) newErrors.full_name = 'الاسم مطلوب.';
        else if (formData.full_name.length < 3) newErrors.full_name = 'الاسم يجب أن يكون 3 أحرف على الأقل.';

        if (!formData.email.trim()) newErrors.email = 'البريد الإلكتروني مطلوب.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'صيغة البريد الإلكتروني غير صحيحة.';

        if (!formData.password) newErrors.password = 'كلمة المرور مطلوبة.';
        else if (formData.password.length < 6) newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            login({ fullName: formData.full_name, role: formData.role });
            navigate('/');
        }
    };

    return (
        <main className="login-page">

            <section className="login-wrapper">
                <h1>انشاء حساب / تسجيل الدخول</h1>
                <p className="login-subtitle">سجل دخولك وابدأ رحلتك مع فرصة</p>
                <form onSubmit={handleSubmit} noValidate className="login-box">
                    <div className="input-group">
                        <label htmlFor="full_name">الاسم</label>
                        <input id="full_name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} placeholder="ادخل الاسم" />
                        {errors.full_name && <span className="field-error" style={{color: '#ff4444', fontSize: '12px'}}>{errors.full_name}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">البريد الإلكتروني</label>
                        <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ادخل البريد الإلكتروني" />
                        {errors.email && <span className="field-error" style={{color: '#ff4444', fontSize: '12px'}}>{errors.email}</span>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">كلمة المرور</label>
                        <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="ادخل كلمة المرور" />
                        {errors.password && <span className="field-error" style={{color: '#ff4444', fontSize: '12px'}}>{errors.password}</span>}
                    </div>

                    <div className="input-group" style={{ marginBottom: '20px' }}>
                        <label>نوع الحساب</label>
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div 
                                onClick={() => setFormData({ ...formData, role: 'player' })}
                                style={{
                                    flex: 1, padding: '15px', textAlign: 'center', borderRadius: '12px', cursor: 'pointer',
                                    border: formData.role === 'player' ? '2px solid #39FF14' : '1px solid rgba(255, 255, 255, 0.08)',
                                    background: formData.role === 'player' ? 'rgba(57, 255, 20, 0.08)' : 'rgba(255,255,255,0.02)',
                                    color: formData.role === 'player' ? '#39FF14' : 'rgba(255,255,255,0.5)',
                                    fontWeight: 'bold', transition: 'all 0.3s'
                                }}
                            >
                                <i className="fas fa-user" style={{display: 'block', fontSize: '24px', marginBottom: '8px'}}></i>
                                لاعب
                            </div>
                            <div 
                                onClick={() => setFormData({ ...formData, role: 'admin' })}
                                style={{
                                    flex: 1, padding: '15px', textAlign: 'center', borderRadius: '12px', cursor: 'pointer',
                                    border: formData.role === 'admin' ? '2px solid #e74c3c' : '1px solid rgba(255, 255, 255, 0.08)',
                                    background: formData.role === 'admin' ? 'rgba(231, 76, 60, 0.08)' : 'rgba(255,255,255,0.02)',
                                    color: formData.role === 'admin' ? '#e74c3c' : 'rgba(255,255,255,0.5)',
                                    fontWeight: 'bold', transition: 'all 0.3s'
                                }}
                            >
                                <i className="fas fa-user-shield" style={{display: 'block', fontSize: '24px', marginBottom: '8px'}}></i>
                                مسؤول
                            </div>
                        </div>
                    </div>

                    <button type="submit" className="login-btn">دخول</button>
                    
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <button 
                            type="button" 
                            onClick={() => {
                                login({ fullName: 'زائر', role: 'guest' });
                                navigate('/');
                            }}
                            className="login-btn"
                            style={{ 
                                width: '100%',
                                background: 'transparent',
                                border: '1px solid rgba(57, 255, 20, 0.3)'
                            }}
                        >
                            الدخول كـ "زائر" (Guest)
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Login;
