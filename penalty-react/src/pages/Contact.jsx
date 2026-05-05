import Layout from '../components/Layout';

const Contact = () => {
    return (
        <Layout>
            <section className="hero" style={{
                height: '350px',
                background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7), #000000), url('/stadium-bg.jpeg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <div className="hero-content">
                    <div style={{marginBottom: '10px'}}>
                        <img src="/logo.jpeg" alt="فرصة" style={{ height: '130px', objectFit: 'contain' }} />
                    </div>
                    <h1 style={{fontSize: '2rem', marginBottom: '10px'}}>تواصل معنا</h1>
                    <p style={{fontSize: '1.1rem', color: 'rgba(255,255,255,0.55)'}}>نحن هنا لمساعدتك</p>
                </div>
            </section>

            <div style={{
                padding: '60px 20px 80px',
                background: '#000000',
                direction: 'rtl'
            }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px', marginBottom: '50px' }}>
                        <div style={{
                            background: '#0D2A0D',
                            border: '1px solid rgba(57, 255, 20, 0.15)',
                            borderRadius: '16px',
                            padding: '30px 20px',
                            textAlign: 'center'
                        }}>
                            <i className="fas fa-map-marker-alt" style={{ fontSize: '28px', color: '#39FF14', marginBottom: '15px', display: 'block' }}></i>
                            <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: '700' }}>العنوان</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>مصر - القاهرة</p>
                        </div>

                        <div style={{
                            background: '#0D2A0D',
                            border: '1px solid rgba(57, 255, 20, 0.15)',
                            borderRadius: '16px',
                            padding: '30px 20px',
                            textAlign: 'center'
                        }}>
                            <i className="fas fa-phone" style={{ fontSize: '28px', color: '#39FF14', marginBottom: '15px', display: 'block' }}></i>
                            <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: '700' }}>رقم الهاتف</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', direction: 'ltr' }}>+20 123 456 7890</p>
                        </div>

                        <div style={{
                            background: '#0D2A0D',
                            border: '1px solid rgba(57, 255, 20, 0.15)',
                            borderRadius: '16px',
                            padding: '30px 20px',
                            textAlign: 'center'
                        }}>
                            <i className="fas fa-envelope" style={{ fontSize: '28px', color: '#39FF14', marginBottom: '15px', display: 'block' }}></i>
                            <h3 style={{ color: 'white', fontSize: '16px', marginBottom: '8px', fontWeight: '700' }}>البريد الإلكتروني</h3>
                            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>info@penalty-platform.com</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '30px' }}>
                        <h3 style={{ color: 'white', fontSize: '18px', marginBottom: '20px', fontWeight: '700' }}>تابعنا على</h3>
                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                            <a href="#" style={{
                                width: '50px', height: '50px', borderRadius: '50%',
                                background: '#0D2A0D', border: '1px solid rgba(57, 255, 20, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#39FF14', fontSize: '20px', textDecoration: 'none',
                                transition: 'all 0.3s'
                            }}>
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" style={{
                                width: '50px', height: '50px', borderRadius: '50%',
                                background: '#0D2A0D', border: '1px solid rgba(57, 255, 20, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#39FF14', fontSize: '20px', textDecoration: 'none',
                                transition: 'all 0.3s'
                            }}>
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="https://whatsapp.com/channel/0029Vb0mEhS9WtC1Gpl6ur1d" target="_blank" rel="noopener noreferrer" style={{
                                width: '50px', height: '50px', borderRadius: '50%',
                                background: '#0D2A0D', border: '1px solid rgba(57, 255, 20, 0.2)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: '#39FF14', fontSize: '20px', textDecoration: 'none',
                                transition: 'all 0.3s'
                            }}>
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
