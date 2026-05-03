import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { PlayersContext } from '../context/PlayersContext';
import '../assets/css/f.css';

const Register = () => {
    const { addPlayer } = useContext(PlayersContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        position: '',
        year: '',
        height: '',
        weight: '',
        image: '',
        youtube: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.position) {
            alert('يرجى تعبئة الاسم والمركز على الأقل');
            return;
        }
        
        addPlayer({
            name: formData.name,
            position: formData.position,
            year: formData.year || '2024',
            height: formData.height,
            weight: formData.weight,
            image: formData.image,
            youtube: formData.youtube
        });
        
        alert('تم تسجيل اللاعب بنجاح!');
        navigate('/players');
    };

    return (
        <Layout>
            <div className="register-page">
                <div className="register-wrapper">
                    <h1 className="register-title">تسجيل لاعب جديد</h1>
                    <p className="register-subtitle">سجل بياناتك لإضافتك في قائمة اللاعبين</p>
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label>الاسم الرباعي</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="الاسم الرباعي" required />
                        </div>
                        
                        <div className="form-group">
                            <label>رقم الهاتف</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="رقم الهاتف" />
                        </div>
                        
                        <div className="form-group">
                            <label>سنة الميلاد</label>
                            <input type="number" name="year" value={formData.year} onChange={handleChange} placeholder="مثال: 2005" required />
                        </div>

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label>الطول (سم)</label>
                                <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="مثال: 175" />
                            </div>
                            <div className="form-group half-width">
                                <label>الوزن (كجم)</label>
                                <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="مثال: 70" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>المركز</label>
                            <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="المركز في الملعب" required />
                        </div>
                        
                        <div className="form-group">
                            <label>صورة اللاعب (رابط)</label>
                            <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="https://example.com/image.jpg" />
                        </div>
                        
                        <div className="form-group">
                            <label>فيديو يوتيوب (اختياري)</label>
                            <input type="url" name="youtube" value={formData.youtube} onChange={handleChange} placeholder="https://www.youtube.com/embed/..." />
                        </div>
                        
                        <button type="submit" className="submit-btn">
                            تسجيل اللاعب
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
