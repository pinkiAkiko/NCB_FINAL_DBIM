import { NavLink } from "react-router-dom";

import "../styles/Footer.scss";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="container footer-grid">
                    {/* Brand Section */}
                    <div className="footer-brand-column">
                        <div className="footer-brand-center">
                            <img src="/logo.svg" alt="NCB Logo" className="footer-logo-main" />
                            <h2 className="footer-org-name">NARCOTICS CONTROL BUREAU</h2>
                            <p className="footer-motto">Commitment to a Drug Free India.</p>

                            <div className="email-pill-container">
                                <a href="mailto:info@ncb.gov.in" className="email-pill">
                                    <div className="email-pill-icon">
                                        <i className="bi bi-envelope-fill"></i>
                                    </div>
                                    <span className="email-address">info@ncb.gov.in</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Quick links consolidated */}
                    <div className="footer-column">
                        <h4 className="footer-heading-gold">RESOURCES</h4>
                        <ul className="footer-links-list">
                            <li><NavLink to="/feedback">Feedback</NavLink></li>
                            <li><NavLink to="/recruitments">Recruitments</NavLink></li>
                            <li><NavLink to="/tenders">Tenders</NavLink></li>
                            <li><NavLink to="/citizen-charter">Citizen Charter</NavLink></li>
                            <li><NavLink to="/faq">Help & FAQ's</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h4 className="footer-heading-gold">ADMINISTRATION</h4>
                        <ul className="footer-links-list">
                            <li><NavLink to="/archive">Archive</NavLink></li>
                            <li><NavLink to="/sitemap">Sitemap</NavLink></li>
                            <li><NavLink to="/rti">RTI</NavLink></li>
                            <li><NavLink to="/vigilance">Vigilance</NavLink></li>
                            <li><NavLink to="/contact">Contact Us</NavLink></li>
                        </ul>
                    </div>

                    {/* Helpline & Social */}
                    <div className="footer-column">
                        <h4 className="footer-heading-gold">HELPLINE</h4>
                        <ul className="footer-links-list">
                            <li className="helpline-item">
                                <span className="label">Women Helpline</span>
                                <a href="tel:1091" className="val">1091</a>
                            </li>
                            <li className="helpline-item">
                                <span className="label">Drug De-addiction</span>
                                <a href="tel:14446" className="val">14446</a>
                            </li>
                        </ul>

                        <div className="footer-social-circles">
                            <a href="https://instagram.com/india.ncb" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-link-external social-circle-btn"><i className="bi bi-instagram"></i></a>
                            <a href="https://facebook.com/narcoticscontrolbureauindia" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-link-external social-circle-btn"><i className="bi bi-facebook"></i></a>
                            <a href="https://youtube.com/channel/UCb3-9pF4m0BbLpW-yfR1Ipg" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="social-link-external social-circle-btn"><i className="bi bi-youtube"></i></a>
                            <a href="https://x.com/narcoticsbureau" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="social-link-external social-circle-btn"><i className="bi bi-twitter-x"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-policy-bar">
                <div className="container">
                    <ul className="policy-links">
                        <li><NavLink to="/accessibility-statement">Accessibility Statement</NavLink></li>
                        <li><NavLink to="/privacy-policy">Privacy Policy</NavLink></li>
                        <li><NavLink to="/hyperlink-policy">Hyperlink Policy</NavLink></li>
                        <li><NavLink to="/copyright-policy">Copyright Policy</NavLink></li>
                        <li><NavLink to="/disclaimer">Disclaimer</NavLink></li>
                        <li><NavLink to="/terms-conditions">Terms & Conditions</NavLink></li>
                        <li><NavLink to="/web-info-manager">Web Information Manager</NavLink></li>
                        <li><NavLink to="/content-review-policy">CRP</NavLink></li>
                        <li><NavLink to="/content-archival-policy">CAP</NavLink></li>
                        <li><NavLink to="/monitoring-plan">Website Monitoring Plan</NavLink></li>
                        <li><NavLink to="/contingency-plan">CMP</NavLink></li>
                        <li><NavLink to="/security-policy">Security Policy</NavLink></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom-bar">
                <div className="container footer-bottom-flex">
                    <div className="bottom-left-info">
                        <p>© 2025 This site is <strong>designed, developed and maintained by Narcotics Control Bureau</strong></p>
                        <p>Ministry of Home Affairs, Govt. of India</p>
                    </div>

                    <div className="bottom-right-stats">
                        <div className="stat-item">
                            <span>Total Visitors: <strong>1,24,65,879</strong></span>
                        </div>
                        <div className="stat-sep">|</div>
                        <div className="stat-item">
                            <span>Last Updated Date: <strong>09 March, 2026</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;