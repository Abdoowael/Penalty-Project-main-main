import { useState, useContext } from 'react';
import Layout from '../components/Layout';
import { PlayersContext } from '../context/PlayersContext';
import { useNavigate } from 'react-router-dom';
import '../assets/css/f.css';

const Register = () => {
    const { addPlayer } = useContext(PlayersContext);
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addPlayer(formData);
        navigate('/players');
    };

    return (
        <Layout>
            <section className="hero" style={{ height: '300px', background: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8), #000000), url('/stadium-bg.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="hero-content">
                    <h1 style={{ fontSize: '3rem' }}>إضافة لاعب جديد</h1>
                    <p>أضف بيانات الموهبة الجديدة إلى المنصة</p>
                </div>
            </section>

            <div className="register-page" style={{ padding: '50px 20px' }}>
                <div className="register-wrapper">
                    <h2 className="register-title">بيانات اللاعب</h2>
                    <p className="register-subtitle">املأ كافة الحقول لإدراج اللاعب في القائمة</p>
                    
                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label>الاسم الكامل</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="ادخل اسم اللاعب" />
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

                        <div className="form-row">
                            <div className="form-group half-width">
                                <label>محل الإقامة</label>
                                <input type="text" name="residence" value={formData.residence} onChange={handleChange} placeholder="مثال: تلبانة" />
                            </div>
                            <div className="form-group half-width">
                                <label>الأكاديمية / النادي</label>
                                <input type="text" name="club" value={formData.club} onChange={handleChange} placeholder="مثال: أكاديمية المنصورة" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>رابط الصورة</label>
                            <input type="url" name="image" value={formData.image} onChange={handleChange} placeholder="رابط مباشر لصورة اللاعب" />
                        </div>

                        <div className="form-group">
                            <label>رابط الفيديو (YouTube)</label>
                            <input type="url" name="youtube" value={formData.youtube} onChange={handleChange} placeholder="رابط فيديو مهارات اللاعب" />
                        </div>

                        <div className="form-group">
                            <label>وصف اللاعب</label>
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                onChange={handleChange} 
                                style={{
                                    width: '100%', padding: '14px', background: 'rgba(255,255,255,0.04)', 
                                    border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', 
                                    color: 'white', fontFamily: 'Cairo', minHeight: '100px'
                                }}
                                placeholder="اكتب نبذة عن مهارات وإمكانيات اللاعب..."
                            ></textarea>
                        </div>

                        <button type="submit" className="submit-btn">إضافة اللاعب</button>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default Register;
