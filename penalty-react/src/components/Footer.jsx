const Footer = () => {
    return (
        <footer style={{ 
            background: '#0D2A0D', 
            padding: '40px 50px 30px',
            borderTop: '2px solid #39FF14'
        }}>
            <div className="footer-container" style={{
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                flexWrap: 'wrap-reverse',
                gap: '20px'
            }}>
                <div className="social-icons" style={{ flex: '1 1 auto', justifyContent: 'center' }}>
                    <a href="https://www.facebook.com/DVlottery0" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="https://whatsapp.com/channel/0029Vb0mEhS9WtC1Gpl6ur1d" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel"><i className="fab fa-whatsapp"></i></a>
                </div>
                <div className="footer-right" style={{ flex: '1 1 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="footer-tagline">منصة قري مصر للرياضة</div>
                    <div className="footer-brand">
                        <img src="/Logo.png" alt="فرصة" style={{ height: '100px', objectFit: 'contain' }} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
