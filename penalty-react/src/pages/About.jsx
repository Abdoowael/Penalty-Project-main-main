import Layout from '../components/Layout';

const About = () => {
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
                    <div className="hero-logo-text" style={{marginBottom: '10px'}}>
                        <img src="/logo.jpeg" alt="فرصة" style={{ height: '140px', objectFit: 'contain' }} />
                    </div>
                    <p style={{fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)'}}>تعرف علينا أكثر</p>
                </div>
            </section>

            <div style={{
                padding: '80px 20px',
                minHeight: '50vh',
                textAlign: 'center',
                background: '#0a0a0a',
                direction: 'rtl'
            }}>
                <h2 style={{
                    fontSize: '36px',
                    fontWeight: '800',
                    marginBottom: '15px',
                    color: 'white'
                }}>من نحن</h2>
                
                <div style={{
                    width: '60px',
                    height: '3px',
                    background: 'linear-gradient(90deg, #39FF14, #39FF14)',
                    margin: '0 auto 40px',
                    borderRadius: '2px'
                }}></div>

                <div style={{
                    background: 'linear-gradient(145deg, #0D2A0D, #0D2A0D)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '20px',
                    padding: '50px 40px',
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'right',
                    lineHeight: '2'
                }}>
                    <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.75)', marginBottom: '20px'}}>
                        منصة <span style={{color: '#39FF14', fontWeight: '700'}}>فرصة</span> هي المنصة الأولى لاكتشاف المواهب الكروية في مصر والوطن العربي.
                    </p>
                    <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.75)', marginBottom: '20px'}}>
                        نحن نهدف إلى توفير فرصة لكل لاعب موهوب لإبراز مهاراته والوصول إلى أندية الاحتراف بسهولة وشفافية.
                    </p>
                    <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.75)'}}>
                        من خلال منصتنا، يمكن للاعبين عرض ملفاتهم الشخصية ومقاطع الفيديو الخاصة بهم، مما يتيح للأندية والمدربين اكتشاف المواهب الجديدة بسهولة.
                    </p>
                </div>

                <div style={{marginTop: '40px'}}>
                    <img src="/logo.jpeg" alt="فرصة" style={{ height: '80px', objectFit: 'contain', opacity: 0.6 }} />
                    <p style={{color: 'rgba(255,255,255,0.3)', marginTop: '10px', fontSize: '14px'}}>منصة قري مصر للرياضة</p>
                </div>
            </div>
        </Layout>
    );
};

export default About;
