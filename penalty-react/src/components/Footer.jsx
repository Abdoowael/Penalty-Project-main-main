const Footer = () => {
    return (
        <footer style={{ 
            background: '#0D2A0D', 
            padding: '40px 50px 30px',
            borderTop: '2px solid #39FF14'
        }}>
            <div className="footer-container">
                <div className="social-icons">
                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                    <a href="https://whatsapp.com/channel/0029Vb0mEhS9WtC1Gpl6ur1d" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp Channel"><i className="fab fa-whatsapp"></i></a>
                </div>
                <div className="footer-right">
                    <div className="footer-tagline">منصة قري مصر للرياضة</div>
                    <div className="footer-brand">
                        <img src="/logo.jpeg" alt="فرصة" style={{ height: '80px', objectFit: 'contain' }} />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
