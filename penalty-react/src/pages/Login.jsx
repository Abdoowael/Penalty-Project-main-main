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
            <div className="login-header">
                <span className="login-brand">فرصة</span>
            </div>
            <section className="login-wrapper">
                <h1>تسجيل الدخول</h1>
                <p className="login-subtitle">سجل دخولك وابدأ رحلتك مع فرصة</p>
                <form onSubmit={handleSubmit} noValidate>
                    <label htmlFor="full_name">الاسم</label>
                    <input id="full_name" name="full_name" type="text" value={formData.full_name} onChange={handleChange} placeholder="ادخل الاسم" />
                    {errors.full_name && <span className="field-error">{errors.full_name}</span>}

                    <label htmlFor="email">البريد الإلكتروني</label>
                    <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ادخل البريد الإلكتروني" />
                    {errors.email && <span className="field-error">{errors.email}</span>}

                    <label htmlFor="password">كلمة المرور</label>
                    <input id="password" name="password" type="password" value={formData.password} onChange={handleChange} placeholder="ادخل كلمة المرور" />
                    {errors.password && <span className="field-error">{errors.password}</span>}

                    <label>نوع الحساب</label>
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                        <div 
                            onClick={() => setFormData({ ...formData, role: 'player' })}
                            style={{
                                flex: 1, padding: '15px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer',
                                border: formData.role === 'player' ? '2px solid #28a745' : '1px solid rgba(40, 167, 69, 0.2)',
                                background: formData.role === 'player' ? 'rgba(40, 167, 69, 0.12)' : 'rgba(255,255,255,0.03)',
                                color: formData.role === 'player' ? '#28a745' : 'rgba(255,255,255,0.7)',
                                fontWeight: 'bold', transition: 'all 0.3s'
                            }}
                        >
                            <i className="fas fa-user" style={{display: 'block', fontSize: '24px', marginBottom: '8px'}}></i>
                            لاعب
                        </div>
                        <div 
                            onClick={() => setFormData({ ...formData, role: 'admin' })}
                            style={{
                                flex: 1, padding: '15px', textAlign: 'center', borderRadius: '10px', cursor: 'pointer',
                                border: formData.role === 'admin' ? '2px solid #d63031' : '1px solid rgba(214, 48, 49, 0.2)',
                                background: formData.role === 'admin' ? 'rgba(214, 48, 49, 0.12)' : 'rgba(255,255,255,0.03)',
                                color: formData.role === 'admin' ? '#ff6b6b' : 'rgba(255,255,255,0.7)',
                                fontWeight: 'bold', transition: 'all 0.3s'
                            }}
                        >
                            <i className="fas fa-user-shield" style={{display: 'block', fontSize: '24px', marginBottom: '8px'}}></i>
                            مسؤول
                        </div>
                    </div>

                    <button type="submit">دخول</button>
                    
                    <div style={{ textAlign: 'center', marginTop: '15px' }}>
                        <button 
                            type="button" 
                            onClick={() => {
                                login({ fullName: 'زائر', role: 'guest' });
                                navigate('/');
                            }}
                            style={{ 
                                background: 'transparent', color: '#28a745', border: '1px solid #28a745', 
                                padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', width: '100%' 
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
