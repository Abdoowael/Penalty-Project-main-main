import Layout from '../components/Layout';

const About = () => {
    return (
        <Layout>
            <section className="hero" style={{
                height: '350px', 
                background: `linear-gradient(rgba(7, 26, 16, 0.6), rgba(7, 26, 16, 0.85)), url('/hero-stadium.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <div className="hero-content">
                    <div className="hero-logo-text" style={{fontSize: '56px'}}>فرصة</div>
                    <p style={{fontSize: '1.2rem', color: 'rgba(255,255,255,0.8)'}}>تعرف علينا أكثر</p>
                </div>
            </section>

            <div style={{
                padding: '80px 20px',
                minHeight: '50vh',
                textAlign: 'center',
                background: '#071a10',
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
                    background: '#28a745',
                    margin: '0 auto 40px',
                    borderRadius: '2px'
                }}></div>

                <div style={{
                    background: 'linear-gradient(145deg, #0d2618, #0a1f14)',
                    border: '1px solid rgba(40, 167, 69, 0.15)',
                    borderRadius: '20px',
                    padding: '50px 40px',
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'right',
                    lineHeight: '2'
                }}>
                    <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '20px'}}>
                        منصة <span style={{color: '#28a745', fontWeight: '700'}}>فرصة</span> هي المنصة الأولى لاكتشاف المواهب الكروية في مصر والوطن العربي.
                    </p>
                    <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.85)', marginBottom: '20px'}}>
                        نحن نهدف إلى توفير فرصة لكل لاعب موهوب لإبراز مهاراته والوصول إلى أندية الاحتراف بسهولة وشفافية.
                    </p>
                    <p style={{fontSize: '18px', color: 'rgba(255,255,255,0.85)'}}>
                        من خلال منصتنا، يمكن للاعبين عرض ملفاتهم الشخصية ومقاطع الفيديو الخاصة بهم، مما يتيح للأندية والمدربين اكتشاف المواهب الجديدة بسهولة.
                    </p>
                </div>

                <div style={{marginTop: '40px'}}>
                    <span style={{
                        fontSize: '48px',
                        fontWeight: '900',
                        color: '#28a745',
                        fontFamily: "'Cairo', sans-serif"
                    }}>فرصة</span>
                    <p style={{color: 'rgba(255,255,255,0.5)', marginTop: '10px', fontSize: '14px'}}>منصة قري مصر للرياضة</p>
                </div>
            </div>
        </Layout>
    );
};

export default About;
