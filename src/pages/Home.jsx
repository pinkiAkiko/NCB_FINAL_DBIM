import { useState, useEffect, useCallback, useRef } from "react";
import "../styles/Home.scss";

// Importing slider images
import slider1 from "../assets/slider/slider1.jpg";
import slider2 from "../assets/slider/slider2.png";
import slider3 from "../assets/slider/slider3.jpg";
import slider4 from "../assets/slider/apexncord.jpg";
import dgProfile from "../assets/profile.jpeg";

// Importing Gallery Images
import g1 from "../assets/gallary-img/10trainee-bsf.jpeg";
import g2 from "../assets/gallary-img/11apppa-51batch.jpeg";
import g3 from "../assets/gallary-img/12induction-training-si.jpeg";
import g4 from "../assets/gallary-img/1mou-ncb-capt-bprd.jpeg";
import g5 from "../assets/gallary-img/2mou-ncb-bprdcapt.jpeg";
import g6 from "../assets/gallary-img/3mou-ncb-capt.jpeg";
import g7 from "../assets/gallary-img/3ncbdg.jpeg";
import g8 from "../assets/gallary-img/4antf.jpeg";
import g9 from "../assets/gallary-img/4ncbadg.jpeg";
import g10 from "../assets/gallary-img/5martime.jpeg";
import g11 from "../assets/gallary-img/8trainee-bsf.jpeg";
import g12 from "../assets/gallary-img/9trainee-iis.jpeg";

// Portal Logos
import manasLogo from "../assets/link-img/MANAS_LogoE.jpeg";
import pmnrfLogo from "../assets/link-img/PMNRF.png";
import dataGovLogo from "../assets/link-img/data-gov.png";
import goLogo from "../assets/link-img/go.png";
import iigLogo from "../assets/link-img/iig.png";
import indiaGovLogo from "../assets/link-img/india-gov.png";
import myGovLogo from "../assets/link-img/mygov.png";
import nidaanLogo from "../assets/link-img/niddan.png";
import swachhLogo from "../assets/link-img/swach-bharat.png";
import ncbLogo from "../assets/logo.svg";


const slides = [
    {
        id: 1,
        image: slider1,
        title: "Securing the Nation from Narcotics",
        description: "The Narcotics Control Bureau is committed to a drug-free India through persistent enforcement and awareness."
    },
    {
        id: 2,
        image: slider2,
        title: "Modern Intelligence & Enforcement",
        description: "Utilizing state-of-the-art technology and intelligence networks to dismantle global drug trafficking rings."
    },
    {
        id: 3,
        image: slider3,
        title: "Awareness & Community Engagement",
        description: "Empowering the youth and communities to resist drug abuse through nationwide educational programs."
    },
    {
        id: 4,
        image: slider4,
        title: "Strategic Cooperation & NCORD",
        description: "Strengthening the institutional mechanism for multi-agency coordination in drug law enforcement."
    }
];

function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isTickerPaused, setIsTickerPaused] = useState(false);

    const [activeOfferTab, setActiveOfferTab] = useState("National Initiatives");
    const [isNewsPlaying, setIsNewsPlaying] = useState(true);
    const [isPressPlaying, setIsPressPlaying] = useState(true);
    const [isActivityPlaying, setIsActivityPlaying] = useState(true);

    // Hover states for scrolling boxes
    const [isNewsHovered, setIsNewsHovered] = useState(false);
    const [isPressHovered, setIsPressHovered] = useState(false);
    const [isActivityHovered, setIsActivityHovered] = useState(false);

    // Refs for scroll containers
    const newsScrollRef = useRef(null);
    const pressScrollRef = useRef(null);
    const activityScrollRef = useRef(null);
    const portalsScrollRef = useRef(null);
    const socialScrollRef = useRef(null);

    // Dynamic refs for real-time hover status in animation loops
    const newsHoverRef = useRef(false);
    const pressHoverRef = useRef(false);
    const activityHoverRef = useRef(false);

    // Draggable Portals Slider Logic
    const [isPortalsDragging, setIsPortalsDragging] = useState(false);
    const [isPortalsHovered, setIsPortalsHovered] = useState(false);
    const [isPortalsPlaying, setIsPortalsPlaying] = useState(true);
    const [portalsStartX, setPortalsStartX] = useState(0);
    const [portalsScrollLeft, setPortalsScrollLeft] = useState(0);

    const handleExternalLink = (e, url) => {
        e.preventDefault();
        const confirmExit = window.confirm("You are being redirected to an external website. Do you want to continue?");
        if (confirmExit) {
            window.open(url, "_blank", "noopener,noreferrer");
        }
    };

    const handlePortalsMouseDown = (e) => {
        setIsPortalsDragging(true);
        setPortalsStartX(e.pageX - portalsScrollRef.current.offsetLeft);
        setPortalsScrollLeft(portalsScrollRef.current.scrollLeft);
    };

    const handlePortalsMouseMove = (e) => {
        if (!isPortalsDragging) return;
        e.preventDefault();
        const x = e.pageX - portalsScrollRef.current.offsetLeft;
        const walk = (x - portalsStartX) * 2; // Drag speed multiplier
        portalsScrollRef.current.scrollLeft = portalsScrollLeft - walk;
    };

    const stopPortalsDragging = () => {
        setIsPortalsDragging(false);
    };

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(nextSlide, 5000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, nextSlide]);


    // JS Scroll Animation Effect
    useEffect(() => {
        let animationFrameId;
        const scrollStep = 1.5; // Optimized for a clear, fluid sliding effect that is reliable across browsers

        const performScroll = () => {
            const boxes = [
                { ref: newsScrollRef, playing: isNewsPlaying, hovered: newsHoverRef.current },
                { ref: pressScrollRef, playing: isPressPlaying, hovered: pressHoverRef.current },
                { ref: activityScrollRef, playing: isActivityPlaying, hovered: activityHoverRef.current }
            ];

            boxes.forEach(box => {
                const container = box.ref.current;
                if (container && box.playing && !box.hovered) {
                    const scrollHeight = container.scrollHeight;
                    const clientHeight = container.clientHeight;

                    if (scrollHeight > clientHeight + 5) {
                        container.scrollTop += 0.8;

                        if (container.scrollTop >= (scrollHeight / 2)) {
                            container.scrollTop = 0;
                        }
                    }
                }
            });

            // Horizontal scroll for portals
            if (portalsScrollRef.current && !isPortalsDragging && !isPortalsHovered && isPortalsPlaying) {
                const container = portalsScrollRef.current;
                container.scrollLeft += 0.8; // Portals speed
                if (container.scrollLeft >= container.scrollWidth / 2) {
                    container.scrollLeft = 0;
                }
            }

            animationFrameId = requestAnimationFrame(performScroll);
        };

        animationFrameId = requestAnimationFrame(performScroll);
        return () => cancelAnimationFrame(animationFrameId);
    }, [isNewsPlaying, isPressPlaying, isActivityPlaying, isPortalsHovered, isPortalsDragging, isPortalsPlaying]);

    // GALLERY CAROUSEL LOGIC
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [isGalleryPlaying, setIsGalleryPlaying] = useState(true);
    const galleryImages = [g1, g2, g3, g4, g5, g6, g7, g8, g9, g10, g11, g12];

    const nextGallery = useCallback(() => {
        setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, [galleryImages.length]);

    const prevGallery = () => {
        setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    };

    useEffect(() => {
        let interval;
        if (isGalleryPlaying) {
            interval = setInterval(nextGallery, 3000);
        }
        return () => clearInterval(interval);
    }, [isGalleryPlaying, nextGallery]);

    const togglePlay = () => setIsPlaying(!isPlaying);

    const handleSocialPrev = () => {
        if (socialScrollRef.current) {
            const card = socialScrollRef.current.querySelector('.social-card');
            const cardWidth = card.getBoundingClientRect().width + 20; // card width + gap
            socialScrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
        }
    };

    const handleSocialNext = () => {
        if (socialScrollRef.current) {
            const card = socialScrollRef.current.querySelector('.social-card');
            const cardWidth = card.getBoundingClientRect().width + 20; // card width + gap
            socialScrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
    };

    return (
        <div className="home-container">
            {/* Hero Slider Section */}
            <section className="hero-slider" aria-label="Hero Image Slider">
                <div className="slider-track"
                    style={{ "--current-slide": currentIndex }} >
                    {slides.map((slide) => (
                        <div key={slide.id} className="slide">
                            {/* Blurred Background Layer to fill space */}
                            <div className="slide-bg-blur">
                                <img src={slide.image} alt="" aria-hidden="true" />
                            </div>
                            <div className="slide-image-container">
                                <img src={slide.image} alt={slide.title} className="foreground-img" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Slider Navigation Controls - Matching Screenshot (Black blocks) */}
                <button
                    className="slider-control prev-btn"
                    onClick={prevSlide}
                    aria-label="Previous Slide" >
                    <i className="bi bi-chevron-left"></i>
                </button>
                <button
                    className="slider-control next-btn"
                    onClick={nextSlide}
                    aria-label="Next Slide" >
                    <i className="bi bi-chevron-right"></i>
                </button>

                {/* Dot Indicators & Play/Pause - Positioned Right bottom as in screenshot */}
                <div className="slider-utility-row">
                    <div className="slider-dots">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                className={`dot ${index === currentIndex ? "active" : ""}`}
                                onClick={() => setCurrentIndex(index)}
                                aria-label={`Go to slide ${index + 1}`}
                                aria-current={index === currentIndex ? "true" : "false"}
                            />
                        ))}
                    </div>
                    <button className={`slider-play-pause ${isPlaying ? "playing" : "paused"}`}
                        onClick={togglePlay}
                        aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
                    >
                        {isPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                    </button>
                </div>
            </section>

            {/* Announcement Ticker Section - MeitY / CDAC Style */}
            <section className="meity-announcement-ticker">
                <div className="container ticker-flex">
                    <div className="ticker-label">
                        Announcements
                    </div>
                    <div className="ticker-scroll-field">
                        <div className={`ticker-track ${isTickerPaused ? "paused" : ""}`}>
                            <p>Submission of Expression of Interest (EoI) for Transfer of Technology (ToT) under the Ministry of Electronics and Information Technology programs. <span className="sep">|</span> Narcotics Control Bureau: Commitment to a Drug-Free India through multi-agency coordination (NCORD). <span className="sep">|</span> Help Desk Numbers: 011-26761000, 26761144.</p>
                        </div>
                    </div>
                    <button className="ticker-action-btn" aria-label={isTickerPaused ? "Play" : "Pause"} onClick={() => setIsTickerPaused(!isTickerPaused)}>
                        {isTickerPaused ? <i className="bi bi-play-fill"></i> : <i className="bi bi-pause-fill"></i>}
                    </button>
                </div>
            </section>

            {/* Redesigned DG Message Section - Moving after Announcement as requested */}
            <section className="dg-message-portal-section">
                <div className="container dg-portal-flex">
                    <div className="dg-portal-image">
                        <div className="dg-circle-frame">
                            <img src={dgProfile} alt="Shri Anurag Garg" />
                        </div>
                    </div>
                    <div className="dg-portal-text">
                        <i className="bi bi-quote quote-icon-portal"></i>
                        <h2 className="dg-portal-quote-text">
                            "The Narcotics Control Bureau is the guardian of our nation's future, protecting youth and families from the scourge of drugs through intelligence and coordination."
                        </h2>
                        <div className="dg-portal-divider"></div>
                        <div className="dg-portal-footer">
                            <div className="dg-portal-identity">
                                <span className="dg-portal-event-name">Director General's Message</span>
                                <span className="dg-portal-name">Shri Anurag Garg, IPS | Director General</span>
                            </div>
                            <button className="dg-portal-view-btn">
                                <i className="bi bi-box-arrow-up-right"></i> READ MESSAGE
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* About NCB - MeitY / CDAC Exact Design Redesign */}
            <section className="about-meity-section" id="about-us">
                <div className="container about-meity-grid">

                    {/* Left Column: About Info & Quick Links */}
                    <div className="about-meity-left">
                        <div className="about-meity-header">
                            <i className="bi bi-diagram-3-fill meity-icon"></i>
                            <h2 className="meity-title">About Narcotics Control Bureau</h2>
                        </div>

                        <div className="meity-description">
                            <p>
                                The Narcotics Control Bureau (NCB), under <strong>Ministry of Home Affairs</strong>, is the nodal agency responsible for coordinating drug law enforcement throughout the country. It is rooted in <strong>Article 47</strong> of the Indian Constitution, directing the State to endeavour to bring about prohibition of the consumption of intoxicating drugs injurious to health.
                            </p>
                            <p>
                                As the Central Authority, NCB dismantles illicit networks and coordinates with international conventions including the 1961 Single Convention on Narcotic Drugs and the 1971 Convention on Psychotropic Substances.
                            </p>
                        </div>

                        <div className="meity-quick-boxes">
                            <div className="meity-box">
                                <i className="bi bi-people-fill"></i>
                                <span>Our Team</span>
                            </div>
                            <div className="meity-box">
                                <i className="bi bi-grid-3x3-gap-fill"></i>
                                <span>Legislative Policy</span>
                            </div>
                            <div className="meity-box">
                                <i className="bi bi-bar-chart-fill"></i>
                                <span>Our Performance</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Key Motto Card */}
                    <div className="about-meity-right">
                        <div className="meity-profile-card">
                            <div className="profile-img-box">
                                <div className="placeholder-emblem">
                                    <i className="bi bi-shield-check"></i>
                                </div>
                            </div>
                            <div className="profile-info">
                                <span className="profile-name">Zero Tolerance</span>
                                <span className="profile-designation">DRUG-FREE INDIA</span>
                            </div>
                        </div>
                    </div>

                </div>
            </section>


            {/* Key Offerings & What's New Section - MeitY / CDAC Exact Design */}
            <section className="key-offerings-news-section">
                <div className="container">
                    <div className="row offerings-news-grid">
                        {/* Left Side: Key Offerings with Tabs */}
                        <div className="col-lg-8 mb-4 mb-lg-0">
                            <div className="key-offerings-column">
                                <div className="offering-header-flex">
                                    <i className="bi bi-clipboard2-check offering-main-icon"></i>
                                    <h2>Key Offerings</h2>
                                </div>

                                <div className="offerings-tab-container">
                                    <div className="offerings-tabs-row">
                                        <button className={`offer-tab ${activeOfferTab === "National Initiatives" ? "active" : ""}`} onClick={() => setActiveOfferTab("National Initiatives")}>National Initiatives</button>
                                        <button className={`offer-tab ${activeOfferTab === "Join the Force" ? "active" : ""}`} onClick={() => setActiveOfferTab("Join the Force")}>Join the Force</button>
                                        <button className={`offer-tab ${activeOfferTab === "Tenders" ? "active" : ""}`} onClick={() => setActiveOfferTab("Tenders")}>Tenders</button>
                                    </div>

                                    <div className="offerings-tab-content">
                                        {activeOfferTab === "National Initiatives" && (
                                            <ul className="offering-list">
                                                <li><span>Assistance to States for Drug Law Enforcement (ASDLE)</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Financial Assistance to NGOs for Awareness Programs</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Scheme for Rewards to Informers & Government Officers</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Modernization of Drug Law Enforcement Mechanism</span> <i className="bi bi-chevron-right"></i></li>
                                            </ul>
                                        )}
                                        {activeOfferTab === "Join the Force" && (
                                            <ul className="offering-list">
                                                <li><span>Recruitment for the post of Junior Intelligence Officer 2025</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Deputation of Sub-Inspectors in NCB Zonal Offices</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Engagement of Consultants on Contract Basis for Academy</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Rolling Advertisement for Various Deputation Posts</span> <i className="bi bi-chevron-right"></i></li>
                                            </ul>
                                        )}
                                        {activeOfferTab === "Tenders" && (
                                            <ul className="offering-list">
                                                <li><span>Tender for Supply of Desktop Computers & Peripherals</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Notice for Maintenance of Network Infrastructure at HQ</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Result: Technical bid for IT Forensic Lab Services</span> <i className="bi bi-chevron-right"></i></li>
                                                <li><span>Auction of Unserviceable Items at Zonal Office Mumbai</span> <i className="bi bi-chevron-right"></i></li>
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="offerings-footer">
                                    <button className="meity-view-more-btn">VIEW MORE <i className="bi bi-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: What's New Box */}
                        <div className="col-lg-4">
                            <div className="whats-new-column">
                                <div className="offering-header-flex">
                                    <i className="bi bi-stars offering-main-icon"></i>
                                    <h2>What's New</h2>
                                    <button className="play-pause-header-btn ms-auto" onClick={() => setIsNewsPlaying(!isNewsPlaying)} title={isNewsPlaying ? "Pause" : "Play"}>
                                        {isNewsPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                                    </button>
                                </div>

                                <div className="whats-new-dark-box"
                                    onMouseEnter={() => { newsHoverRef.current = true; setIsNewsHovered(true); }}
                                    onMouseLeave={() => { newsHoverRef.current = false; setIsNewsHovered(false); }}>
                                    <div className="update-scroll-container" ref={newsScrollRef}>
                                        <ul className="whats-new-list">
                                            {[
                                                { title: "Training program on darknet investigation concludes at NCB Academy.", isAlert: false },
                                                { title: "MOU signed with Coast Guard for enhanced maritime surveillance.", isAlert: false },
                                                { title: "Warning regarding new psychoactive substances detected in market.", isAlert: true },
                                                { title: "Reporting of suspicious activities across various states.", isAlert: false },
                                                { title: "Financial Assistance for Drug Law Enforcement Mechanism 2025.", isAlert: false },
                                                { title: "Major achievements of NCB for the month of February, 2025.", isAlert: false },
                                                { title: "Advisory: Stay safe from online medicine fraud and illegal pharmacies.", isAlert: true },
                                                { title: "Director General chairs high-level review meeting on border security.", isAlert: false },
                                                { title: "New recruitment notice for Intelligence Officers released.", isAlert: false },
                                                { title: "NCB Academy announces advanced course on digital forensics.", isAlert: false },
                                                { title: "Special operation 'Clean Sweep' results in major drug bust.", isAlert: false },
                                                { title: "Public alert: Rise in synthetic drug trafficking via darknet.", isAlert: true }
                                            ].concat([
                                                { title: "Training program on darknet investigation concludes at NCB Academy.", isAlert: false },
                                                { title: "MOU signed with Coast Guard for enhanced maritime surveillance.", isAlert: false },
                                                { title: "Warning regarding new psychoactive substances detected in market.", isAlert: true },
                                                { title: "Reporting of suspicious activities across various states.", isAlert: false },
                                                { title: "Financial Assistance for Drug Law Enforcement Mechanism 2025.", isAlert: false },
                                                { title: "Major achievements of NCB for the month of February, 2025.", isAlert: false },
                                                { title: "Advisory: Stay safe from online medicine fraud and illegal pharmacies.", isAlert: true },
                                                { title: "Director General chairs high-level review meeting on border security.", isAlert: false },
                                                { title: "New recruitment notice for Intelligence Officers released.", isAlert: false },
                                                { title: "NCB Academy announces advanced course on digital forensics.", isAlert: false },
                                                { title: "Special operation 'Clean Sweep' results in major drug bust.", isAlert: false },
                                                { title: "Public alert: Rise in synthetic drug trafficking via darknet.", isAlert: true }
                                            ]).map((item, i) => (
                                                <li key={i}>
                                                    <div className="list-item-with-dot">
                                                        {item.isAlert ? <span className="red-dot-indicator"></span> : <span className="blue-dot-placeholder"></span>}
                                                        <span>{item.title}</span>
                                                    </div>
                                                    <i className="bi bi-chevron-right"></i>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="offerings-footer">
                                    <button className="meity-view-more-btn">VIEW MORE <i className="bi bi-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Documents, Personas & Important Links Section - Exact UI from Screenshot */}
            <section className="docs-personas-links-section">
                <div className="container">
                    <div className="row">
                        {/* Column 1: Recent Documents */}
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <div className="offering-header-flex">
                                <i className="bi bi-file-earmark-check-fill offering-main-icon"></i>
                                <h2>Recent Documents</h2>
                            </div>
                            <div className="docs-grid">
                                <div className="doc-card">
                                    <div className="doc-card-top">
                                        <i className="bi bi-journal-text doc-type-icon"></i>
                                        <h4>NDPS Act & Legislations</h4>
                                    </div>
                                    <p>Access the NDPS Act 1985 along with all critical Amendment Acts (1989-2021).</p>
                                </div>
                                <div className="doc-card">
                                    <div className="doc-card-top">
                                        <i className="bi bi-bell doc-type-icon"></i>
                                        <h4>Latest Notifications</h4>
                                    </div>
                                    <p>Official inclusions of new substances under NDPS schedules and amendments.</p>
                                </div>
                                <div className="doc-card">
                                    <div className="doc-card-top">
                                        <i className="bi bi-shield-check doc-type-icon"></i>
                                        <h4>PITNDPS Act, 1988</h4>
                                    </div>
                                    <p>Prevention of Illicit Traffic in Narcotic Drugs and Psychotropic Substances Act.</p>
                                </div>
                                <div className="doc-card">
                                    <div className="doc-card-top">
                                        <i className="bi bi-file-earmark-ruled doc-type-icon"></i>
                                        <h4>Circulars & Orders</h4>
                                    </div>
                                    <p>Procedural directives and administrative orders regulating field operations.</p>
                                </div>
                                <div className="doc-card">
                                    <div className="doc-card-top">
                                        <i className="bi bi-balance doc-type-icon"></i>
                                        <h4>Important Judgments</h4>
                                    </div>
                                    <p>Precedent-setting legal rulings by the Supreme Court and High Courts on NDPS cases.</p>
                                </div>
                                <div className="doc-card">
                                    <div className="doc-card-top">
                                        <i className="bi bi-bar-chart-line doc-type-icon"></i>
                                        <h4>Annual Reports</h4>
                                    </div>
                                    <p>Yearly analysis of seizures, enforcement, and drug coordinate success.</p>
                                </div>
                            </div>
                            <div className="offerings-footer">
                                <button className="meity-view-more-btn">VIEW MORE <i className="bi bi-chevron-right"></i></button>
                            </div>
                        </div>

                        {/* Column 2: Recent Activities (replacing Personas) */}
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <div className="whats-new-column">
                                <div className="offering-header-flex">
                                    <i className="bi bi-activity offering-main-icon"></i>
                                    <h2>Recent Activities</h2>
                                    <button className="play-pause-header-btn ms-auto" onClick={() => setIsActivityPlaying(!isActivityPlaying)} title={isActivityPlaying ? "Pause" : "Play"}>
                                        {isActivityPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                                    </button>
                                </div>

                                <div className="whats-new-light-box"
                                    onMouseEnter={() => { activityHoverRef.current = true; setIsActivityHovered(true); }}
                                    onMouseLeave={() => { activityHoverRef.current = false; setIsActivityHovered(false); }}>
                                    <div className="update-scroll-container" ref={activityScrollRef}>
                                        <ul className="whats-new-list">
                                            {[
                                                { title: "Destruction of 1500kg seized narcotics at designated facility.", isAlert: false },
                                                { title: "Review meeting chaired by Director General regarding border security.", isAlert: false },
                                                { title: "Training session on cyber-forensics for new recruits conducted.", isAlert: false },
                                                { title: "NCB officials participate in international anti-drug coordinate meeting.", isAlert: false },
                                                { title: "Major operational success in dismantling interstate drug trafficking syndicate.", isAlert: true },
                                                { title: "Collaborative workshop with international narcotics control boards.", isAlert: false }
                                            ].concat([
                                                { title: "Destruction of 1500kg seized narcotics at designated facility.", isAlert: false },
                                                { title: "Review meeting chaired by Director General regarding border security.", isAlert: false },
                                                { title: "Training session on cyber-forensics for new recruits conducted.", isAlert: false },
                                                { title: "NCB officials participate in international anti-drug coordinate meeting.", isAlert: false },
                                                { title: "Major operational success in dismantling interstate drug trafficking syndicate.", isAlert: true },
                                                { title: "Collaborative workshop with international narcotics control boards.", isAlert: false }
                                            ]).concat([
                                                { title: "Destruction of 1500kg seized narcotics at designated facility.", isAlert: false },
                                                { title: "Review meeting chaired by Director General regarding border security.", isAlert: false },
                                                { title: "Training session on cyber-forensics for new recruits conducted.", isAlert: false },
                                                { title: "NCB officials participate in international anti-drug coordinate meeting.", isAlert: false },
                                                { title: "Major operational success in dismantling interstate drug trafficking syndicate.", isAlert: true },
                                                { title: "Collaborative workshop with international narcotics control boards.", isAlert: false }
                                            ]).map((item, i) => (
                                                <li key={i}>
                                                    <div className="list-item-with-dot">
                                                        {item.isAlert ? <span className="red-dot-indicator"></span> : <span className="blue-dot-placeholder"></span>}
                                                        <span>{item.title}</span>
                                                    </div>
                                                    <i className="bi bi-chevron-right"></i>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="offerings-footer">
                                    <button className="meity-view-more-btn">VIEW MORE <i className="bi bi-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Press Releases (using What's New Design/Style) */}
                        <div className="col-lg-3">
                            <div className="whats-new-column">
                                <div className="offering-header-flex">
                                    <i className="bi bi-file-earmark-text offering-main-icon"></i>
                                    <h2>Press Releases</h2>
                                    <button className="play-pause-header-btn ms-auto" onClick={() => setIsPressPlaying(!isPressPlaying)} title={isPressPlaying ? "Pause" : "Play"}>
                                        {isPressPlaying ? <i className="bi bi-pause-fill"></i> : <i className="bi bi-play-fill"></i>}
                                    </button>
                                </div>

                                <div className="whats-new-light-box"
                                    onMouseEnter={() => { pressHoverRef.current = true; setIsPressHovered(true); }}
                                    onMouseLeave={() => { pressHoverRef.current = false; setIsPressHovered(false); }}>
                                    <div className="update-scroll-container" ref={pressScrollRef}>
                                        <ul className="whats-new-list">
                                            {[
                                                { title: "Clarification issued regarding compliance for online pharmacies.", isAlert: false },
                                                { title: "Recruitment notice for the post of Junior Intelligence Officer 2025.", isAlert: false },
                                                { title: "Public Advisory: Identifying and reporting suspicious activities online.", isAlert: true },
                                                { title: "Press Release regarding major operational success in Western Zone.", isAlert: false },
                                                { title: "Notification regarding rewards policy for informers - 2025 update.", isAlert: false },
                                                { title: "Annual report on narcotics seizure and enforcement actions released.", isAlert: false }
                                            ].concat([
                                                { title: "Clarification issued regarding compliance for online pharmacies.", isAlert: false },
                                                { title: "Recruitment notice for the post of Junior Intelligence Officer 2025.", isAlert: false },
                                                { title: "Public Advisory: Identifying and reporting suspicious activities online.", isAlert: true },
                                                { title: "Press Release regarding major operational success in Western Zone.", isAlert: false },
                                                { title: "Notification regarding rewards policy for informers - 2025 update.", isAlert: false },
                                                { title: "Annual report on narcotics seizure and enforcement actions released.", isAlert: false }
                                            ]).concat([
                                                { title: "Clarification issued regarding compliance for online pharmacies.", isAlert: false },
                                                { title: "Recruitment notice for the post of Junior Intelligence Officer 2025.", isAlert: false },
                                                { title: "Public Advisory: Identifying and reporting suspicious activities online.", isAlert: true },
                                                { title: "Press Release regarding major operational success in Western Zone.", isAlert: false },
                                                { title: "Notification regarding rewards policy for informers - 2025 update.", isAlert: false },
                                                { title: "Annual report on narcotics seizure and enforcement actions released.", isAlert: false }
                                            ]).map((item, i) => (
                                                <li key={i}>
                                                    <div className="list-item-with-dot">
                                                        {item.isAlert ? <span className="red-dot-indicator"></span> : <span className="blue-dot-placeholder"></span>}
                                                        <span>{item.title}</span>
                                                    </div>
                                                    <i className="bi bi-chevron-right"></i>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="offerings-footer">
                                    <button className="meity-view-more-btn">VIEW MORE <i className="bi bi-chevron-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Media Section */}
            <section className="social-media-section">
                <div className="container">
                    <div className="social-header-flex">
                        <div className="social-header-left">
                            <div className="social-icon-wrapper">
                                <i className="bi bi-globe"></i>
                                <div className="play-overlay">
                                    <i className="bi bi-play-fill"></i>
                                </div>
                            </div>
                            <h2>Social Media</h2>
                        </div>
                        <div className="social-nav-controls">
                            <button className="social-nav-btn prev" onClick={handleSocialPrev} aria-label="Previous social card">
                                <i className="bi bi-chevron-left"></i>
                            </button>
                            <button className="social-nav-btn next" onClick={handleSocialNext} aria-label="Next social card">
                                <i className="bi bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                    <div className="social-viewport">
                        <div className="social-grid" ref={socialScrollRef}>
                            {/* Column 1: X (Twitter) */}
                            <div className="social-card x-card">
                                <div className="social-card-header">
                                    <h3>X</h3>
                                </div>
                                <div className="social-card-body">
                                    <iframe
                                        className="social-iframe"
                                        src="https://syndication.twitter.com/srv/timeline-profile/screen-name/narcoticsbureau"
                                        title="X/Twitter Feed"
                                    ></iframe>
                                    <div className="embed-placeholder">
                                        <i className="bi bi-twitter-x"></i>
                                        <p>Follow @narcoticsbureau</p>
                                        <a href="https://x.com/narcoticsbureau" target="_blank" rel="noopener noreferrer" className="visit-social-btn">VIEW ON X</a>
                                    </div>
                                </div>
                            </div>

                            {/* Column 2: Youtube */}
                            <div className="social-card youtube-card">
                                <div className="social-card-header">
                                    <h3>Youtube</h3>
                                </div>
                                <div className="social-card-body">
                                    <iframe
                                        className="social-iframe"
                                        src="https://www.youtube.com/embed/7V-Xv_Y0E6o?si=_2z_L4e_o8e_o8e_"
                                        title="YouTube video player"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="embed-placeholder">
                                        <i className="bi bi-youtube"></i>
                                        <p>NCB Official Channel</p>
                                        <a href="https://www.youtube.com/channel/UCb3-9pF4m0BbLpW-yfR1Ipg" target="_blank" rel="noopener noreferrer" className="visit-social-btn">WATCH VIDEOS</a>
                                    </div>
                                </div>
                            </div>

                            {/* Column 3: Facebook */}
                            <div className="social-card facebook-card">
                                <div className="social-card-header">
                                    <h3>Facebook</h3>
                                </div>
                                <div className="social-card-body">
                                    <iframe
                                        className="social-iframe"
                                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fnarcoticscontrolbureauindia&tabs=timeline&width=340&height=500&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=false&appId"
                                        title="Facebook Feed"
                                    ></iframe>
                                    <div className="embed-placeholder">
                                        <i className="bi bi-facebook"></i>
                                        <p>Connect on Facebook</p>
                                        <a href="https://www.facebook.com/narcoticscontrolbureauindia" target="_blank" rel="noopener noreferrer" className="visit-social-btn">VISIT PAGE</a>
                                    </div>
                                </div>
                            </div>

                            {/* Column 4: Instagram */}
                            <div className="social-card instagram-card">
                                <div className="social-card-header">
                                    <h3>Instagram</h3>
                                </div>
                                <div className="social-card-body instagram-mock-body">
                                    <div className="insta-profile-header">
                                        <div className="insta-avatar">
                                            <img src="/logo.svg" alt="NCB" />
                                        </div>
                                        <div className="insta-user-info">
                                            <div className="insta-username">india.ncb <i className="bi bi-patch-check-fill"></i></div>
                                            <div className="insta-followers">Social Awareness</div>
                                        </div>
                                        <a href="https://www.instagram.com/india.ncb" target="_blank" rel="noopener noreferrer" className="insta-view-profile-link">View profile</a>
                                    </div>
                                    <div className="insta-post-preview">
                                        <img src="https://images.unsplash.com/photo-1541873676947-9dc60f748d90?q=80&w=1000&auto=format&fit=crop" alt="NCB Activity" />
                                        <div className="insta-type-icon"><i className="bi bi-display"></i></div>
                                    </div>
                                    <div className="insta-card-footer">
                                        <p><strong>india.ncb</strong> Mission Spandan: Spreading awareness against drug abuse across schools... <span className="more-link">more</span></p>
                                        <a href="https://www.instagram.com/india.ncb" target="_blank" rel="noopener noreferrer" className="insta-action-btn">VIEW ON INSTAGRAM</a>
                                    </div>
                                    <div className="embed-placeholder">
                                        <i className="bi bi-instagram"></i>
                                        <p>Official Instagram Feed</p>
                                        <a href="https://www.instagram.com/india.ncb" target="_blank" rel="noopener noreferrer" className="visit-social-btn">VIEW PROFILE</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Photo Gallery Carousel Section */}
            <section className="photo-gallery-carousel-section">
                <div className="container">
                    <div className="gallery-header-flex">
                        <div className="gallery-title-area">
                            <span className="gallery-tag">MEDIA GALLERY</span>
                            <h2>Glimpses of NCB Activities</h2>
                        </div>
                        <div className="gallery-controls">
                            <button className="gallery-nav-btn prev" onClick={prevGallery} aria-label="Previous image"><i className="bi bi-chevron-left"></i></button>
                            <button className="gallery-stop-btn" onClick={() => setIsGalleryPlaying(!isGalleryPlaying)} aria-label={isGalleryPlaying ? "Pause Gallery" : "Play Gallery"}>
                                {isGalleryPlaying ? (
                                    <i className="bi bi-pause-fill"></i>
                                ) : (
                                    <i className="bi bi-play-fill"></i>
                                )}
                            </button>
                            <button className="gallery-nav-btn next" onClick={nextGallery} aria-label="Next image"><i className="bi bi-chevron-right"></i></button>
                        </div>
                    </div>

                    <div className="gallery-slider-viewport">
                        <div className="gallery-slider-track"
                            style={{ transform: `translateX(-${galleryIndex * (100 / (window.innerWidth > 992 ? 4 : 2))}%)` }}>
                            {galleryImages.concat(galleryImages.slice(0, 5)).map((img, i) => (
                                <div key={i} className="gallery-slide-item">
                                    <div className="gallery-img-wrapper">
                                        <img src={img} alt={`Gallery ${i + 1}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* Combined National Presence & Contact Dashboard */}
            <section className="integrated-presence-contact" id="contact">
                <div className="container">
                    <div className="presence-integrated-grid">
                        {/* Row 1, Col 1: Presence Info */}
                        <div className="presence-info-dash">
                            <span className="network-badge"><i className="bi bi-broadcast"></i> LIVE NETWORK</span>
                            <h2 className="network-title">National <span className="blue-gradient-text">Presence</span></h2>
                            <p className="network-desc">Executing intelligence-led operations through a strategic network of <strong>30 Zonal Offices</strong> across the Indian subcontinent.</p>

                            <div className="network-features-grid">
                                <div className="net-feat-card">
                                    <div className="feat-icon-box"><i className="bi bi-shield-check"></i></div>
                                    <div className="feat-text">
                                        <h4>24/7 Tactical Monitoring</h4>
                                        <p>Executing tactical monitoring operations through 24/7 vigilant surveillance systems.</p>
                                    </div>
                                </div>
                                <div className="net-feat-card">
                                    <div className="feat-icon-box"><i className="bi bi-diagram-3"></i></div>
                                    <div className="feat-text">
                                        <h4>Inter-State Coordination</h4>
                                        <p>Comprehensive inter-state and inter-department coordination for smooth enforcement.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Row 1, Col 2: Cities Box */}
                        <div className="presence-cities-dash">
                            <div className="network-tags-block">
                                <div className="glass-pill-cloud">
                                    {["Agartala", "Ahmedabad", "Amritsar", "Bangalore", "Bhopal", "Bhubaneswar", "Chandigarh", "Chennai", "Cochin", "Dehradun", "Delhi", "Goa", "Gorakhpur", "Guwahati", "Hyderabad", "Imphal", "Indore", "Itanagar", "Jaipur", "Jammu", "Jodhpur", "Kolkata", "Lucknow", "Mumbai", "Patna", "Raipur", "Ranchi", "Siliguri", "Srinagar", "Vishakhapatnam"].map(city => (
                                        <span key={city} className="premium-city-tag">{city}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Row 2, Col 1: Dark Contact Card */}
                        <div className="presence-contact-dash">
                            <div className="hq-modern-card">
                                <div className="hq-card-header">
                                    <span className="hq-pin-label"><i className="bi bi-geo-alt-fill"></i> Headquarters</span>
                                </div>

                                <div className="hq-main-info">
                                    <h3 className="hq-org-title">Narcotics Control Bureau</h3>
                                    <address className="hq-address-text">
                                        West Block No. 1, Wing No. 5,<br />
                                        R.K. Puram, New Delhi - 110066
                                    </address>
                                </div>

                                <div className="hq-contact-flex-row">
                                    <div className="hq-info-row">
                                        <div className="info-label">CONTROL ROOM</div>
                                        <div className="info-values">
                                            <a href="tel:+911126761000">+91-11-26761000</a>
                                            <a href="tel:+911126761144">+91-11-26761144</a>
                                        </div>
                                    </div>

                                    <div className="hq-info-row">
                                        <div className="info-label">EMAIL SUPPORT</div>
                                        <div className="info-values">
                                            <a href="mailto:ddge-ncb@nic.in">ddge-ncb@nic.in</a>
                                            <a href="mailto:adenf-ncb@nic.in">adenf-ncb@nic.in</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="hq-card-bottom">
                                    <div className="hq-bottom-left">
                                        <div className="hq-footer-title">General Enquiry</div>
                                        <a href="mailto:adops-ncb@nic.in" className="hq-ops-mail">adops-ncb@nic.in</a>
                                        <span className="hq-ops-label">Operations Division</span>
                                    </div>
                                    <img src="/logo.svg" alt="NCB Emblem" className="hq-card-emblem" />
                                </div>
                            </div>
                        </div>

                        {/* Row 2, Col 2: Map */}
                        <div className="presence-map-dash">
                            <div className="map-container-frame">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.435706599427!2d77.16912384737213!3d28.580796850624022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1d7350c33a2d%3A0xe5a3c2688701049b!2sNarcotics%20Control%20Bureau!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    title="NCB Headquarters Map"
                                ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Portals Slider - Matching Screenshot */}
            <section className="portals-slider-section">
                <div className="container">
                    <div className="portals-header-area">
                        <h3 className="portals-title">Important <span>Websites</span></h3>
                        <button
                            className={`portal-control-btn ${!isPortalsPlaying ? 'is-paused' : ''}`}
                            onClick={() => setIsPortalsPlaying(!isPortalsPlaying)}
                            aria-label={isPortalsPlaying ? "Pause Portals Slider" : "Play Portals Slider"}
                        >
                            <i className={`bi ${isPortalsPlaying ? 'bi-pause-circle-fill' : 'bi-play-circle-fill'}`}></i>
                        </button>
                    </div>

                    <div className="portals-viewport"
                        ref={portalsScrollRef}
                        onMouseEnter={() => setIsPortalsHovered(true)}
                        onMouseLeave={() => {
                            setIsPortalsHovered(false);
                            stopPortalsDragging();
                        }}
                        onMouseDown={handlePortalsMouseDown}
                        onMouseMove={handlePortalsMouseMove}
                        onMouseUp={stopPortalsDragging}
                        onTouchStart={(e) => {
                            setIsPortalsDragging(true);
                            setPortalsStartX(e.touches[0].pageX - portalsScrollRef.current.offsetLeft);
                            setPortalsScrollLeft(portalsScrollRef.current.scrollLeft);
                        }}
                        onTouchMove={(e) => {
                            if (!isPortalsDragging) return;
                            const x = e.touches[0].pageX - portalsScrollRef.current.offsetLeft;
                            const walk = (x - portalsStartX) * 2;
                            portalsScrollRef.current.scrollLeft = portalsScrollLeft - walk;
                        }}
                        onTouchEnd={stopPortalsDragging}
                    >
                        <div className="portals-track">
                            {[
                                { name: "NIDAAN", url: "https://nidaan.ncb.gov.in/", logo: nidaanLogo },
                                { name: "MANAS", url: "https://www.narcoordindia.gov.in/", logo: manasLogo },
                                { name: "Swachh Bharat", url: "https://swachhbharatmission.gov.in/", logo: swachhLogo },
                                { name: "PMNRF", url: "https://pmnrf.gov.in/", logo: pmnrfLogo },
                                { name: "Data portal", url: "https://data.gov.in/", logo: dataGovLogo },
                                { name: "MyGov", url: "https://www.mygov.in/", logo: myGovLogo },
                                { name: "India.gov.in", url: "https://www.india.gov.in/", logo: indiaGovLogo },
                                { name: "G-20", url: "http://goidirectory.nic.in/", logo: goLogo },
                                { name: "IIG", url: "https://iig.gov.in/", logo: iigLogo },
                                { name: "NCB", url: "https://ncb.gov.in/", logo: ncbLogo }
                            ].concat([
                                { name: "NIDAAN", url: "https://nidaan.ncb.gov.in/", logo: nidaanLogo },
                                { name: "MANAS", url: "https://www.narcoordindia.gov.in/", logo: manasLogo },
                                { name: "Swachh Bharat", url: "https://swachhbharatmission.gov.in/", logo: swachhLogo },
                                { name: "PMNRF", url: "https://pmnrf.gov.in/", logo: pmnrfLogo },
                                { name: "Data portal", url: "https://data.gov.in/", logo: dataGovLogo },
                                { name: "MyGov", url: "https://www.mygov.in/", logo: myGovLogo },
                                { name: "India.gov.in", url: "https://www.india.gov.in/", logo: indiaGovLogo },
                                { name: "G-20", url: "http://goidirectory.nic.in/", logo: goLogo },
                                { name: "IIG", url: "https://iig.gov.in/", logo: iigLogo },
                                { name: "NCB", url: "https://ncb.gov.in/", logo: ncbLogo }
                            ]).map((portal, i) => (
                                <a
                                    href={portal.url}
                                    key={i}
                                    className="portal-logo-item"
                                    onClick={(e) => handleExternalLink(e, portal.url)}
                                >
                                    <div className="logo-white-bg">
                                        <img src={portal.logo} alt={portal.name} title={portal.name} draggable="false" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </section >



        </div >
    );
}

export default Home;