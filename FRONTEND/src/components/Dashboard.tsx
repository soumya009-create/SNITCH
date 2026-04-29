import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'home' | 'profile'>('home');

    useEffect(() => {
        if (!document.getElementById('material-symbols-outlined')) {
            const link = document.createElement('link');
            link.id = 'material-symbols-outlined';
            link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
        if (!document.getElementById('inter-font')) {
            const link = document.createElement('link');
            link.id = 'inter-font';
            link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
    }, []);

    const handleLogout = () => {
        // localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div style={styles.page}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.headerLeft}>
                    <div style={styles.logo}>S</div>
                    <span style={styles.brandName}>Snitch</span>
                </div>
                <button onClick={handleLogout} style={styles.logoutBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
                    <span>Logout</span>
                </button>
            </header>

            {/* Main Content */}
            <main style={styles.main}>
                {activeTab === 'home' && (
                    <>
                        {/* Welcome */}
                        <div style={styles.welcomeSection}>
                            <h1 style={styles.welcomeTitle}>Welcome back 👋</h1>
                            <p style={styles.welcomeSubtitle}>Manage your products and profile from here.</p>
                        </div>

                        {/* Action Cards */}
                        <div style={styles.cardsGrid}>
                            {/* Create Product Card */}
                            <button
                                onClick={() => navigate('/seller/create-product')}
                                style={styles.card}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(99, 102, 241, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                                }}
                            >
                                <div style={styles.cardIconWrap}>
                                    <div style={{ ...styles.cardIcon, background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#fff' }}>add_circle</span>
                                    </div>
                                </div>
                                <h2 style={styles.cardTitle}>Create Product</h2>
                                <p style={styles.cardDesc}>Add a new product listing to the marketplace</p>
                                <div style={styles.cardArrow}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#6366f1' }}>arrow_forward</span>
                                </div>
                            </button>

                            {/* My Products Card */}
                            <button
                                onClick={() => navigate('/seller/view-product')}
                                style={styles.card}
                                onMouseEnter={e => {
                                    e.currentTarget.style.transform = 'translateY(-6px)';
                                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.15)';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
                                }}
                            >
                                <div style={styles.cardIconWrap}>
                                    <div style={{ ...styles.cardIcon, background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: '32px', color: '#fff' }}>inventory_2</span>
                                    </div>
                                </div>
                                <h2 style={styles.cardTitle}>My Products</h2>
                                <p style={styles.cardDesc}>View and manage all your product listings</p>
                                <div style={styles.cardArrow}>
                                    <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#10b981' }}>arrow_forward</span>
                                </div>
                            </button>
                        </div>
                    </>
                )}

                {activeTab === 'profile' && (
                    <div style={styles.profileSection}>
                        <div style={styles.profileCard}>
                            <div style={styles.profileAvatar}>
                                <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#6366f1' }}>person</span>
                            </div>
                            <h2 style={styles.profileName}>Seller Account</h2>
                            <p style={styles.profileEmail}>Manage your account settings</p>
                            <div style={styles.profileActions}>
                                <button
                                    onClick={handleLogout}
                                    style={styles.profileLogoutBtn}
                                    onMouseEnter={e => e.currentTarget.style.background = '#dc2626'}
                                    onMouseLeave={e => e.currentTarget.style.background = '#ef4444'}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Navigation */}
            <nav style={styles.bottomNav}>
                <button
                    onClick={() => setActiveTab('home')}
                    style={{
                        ...styles.navItem,
                        color: activeTab === 'home' ? '#6366f1' : '#94a3b8',
                    }}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{
                            fontSize: '24px',
                            fontVariationSettings: activeTab === 'home' ? "'FILL' 1" : "'FILL' 0",
                        }}
                    >
                        home
                    </span>
                    <span style={styles.navLabel}>Home</span>
                </button>

                <button
                    onClick={() => navigate('/seller/create-product')}
                    style={styles.navFab}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: '28px', color: '#fff' }}>add</span>
                </button>

                <button
                    onClick={() => setActiveTab('profile')}
                    style={{
                        ...styles.navItem,
                        color: activeTab === 'profile' ? '#6366f1' : '#94a3b8',
                    }}
                >
                    <span
                        className="material-symbols-outlined"
                        style={{
                            fontSize: '24px',
                            fontVariationSettings: activeTab === 'profile' ? "'FILL' 1" : "'FILL' 0",
                        }}
                    >
                        person
                    </span>
                    <span style={styles.navLabel}>Profile</span>
                </button>
            </nav>
        </div>
    );
};

// ── Styles ──────────────────────────────────────────────

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '88px',
    },

    // Header
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logo: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 800,
        fontSize: '18px',
    },
    brandName: {
        fontWeight: 700,
        fontSize: '20px',
        color: '#1e293b',
        letterSpacing: '-0.5px',
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 16px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        background: '#fff',
        color: '#64748b',
        fontSize: '13px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all 0.2s',
    },

    // Main
    main: {
        flex: 1,
        padding: '32px 24px',
        maxWidth: '560px',
        width: '100%',
        margin: '0 auto',
    },

    // Welcome
    welcomeSection: {
        marginBottom: '32px',
    },
    welcomeTitle: {
        fontSize: '28px',
        fontWeight: 800,
        color: '#0f172a',
        letterSpacing: '-0.5px',
        margin: 0,
    },
    welcomeSubtitle: {
        fontSize: '15px',
        color: '#64748b',
        marginTop: '6px',
    },

    // Cards grid
    cardsGrid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '28px 24px',
        borderRadius: '20px',
        background: '#fff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
        textAlign: 'left',
        width: '100%',
        position: 'relative',
    },
    cardIconWrap: {
        marginBottom: '18px',
    },
    cardIcon: {
        width: '56px',
        height: '56px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
        letterSpacing: '-0.3px',
    },
    cardDesc: {
        fontSize: '14px',
        color: '#64748b',
        marginTop: '6px',
        lineHeight: '1.5',
    },
    cardArrow: {
        position: 'absolute',
        right: '24px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Profile
    profileSection: {
        display: 'flex',
        justifyContent: 'center',
        paddingTop: '24px',
    },
    profileCard: {
        width: '100%',
        background: '#fff',
        borderRadius: '20px',
        padding: '40px 24px',
        textAlign: 'center',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    },
    profileAvatar: {
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        background: '#eef2ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 16px',
    },
    profileName: {
        fontSize: '22px',
        fontWeight: 700,
        color: '#0f172a',
        margin: '0 0 4px',
    },
    profileEmail: {
        fontSize: '14px',
        color: '#64748b',
        margin: '0 0 28px',
    },
    profileActions: {
        display: 'flex',
        justifyContent: 'center',
    },
    profileLogoutBtn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 32px',
        borderRadius: '12px',
        border: 'none',
        background: '#ef4444',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.2s',
    },

    // Bottom Nav
    bottomNav: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: '72px',
        background: '#fff',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 32px',
        zIndex: 100,
    },
    navItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '8px 16px',
        transition: 'color 0.2s',
    },
    navLabel: {
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.3px',
    },
    navFab: {
        width: '52px',
        height: '52px',
        borderRadius: '16px',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        border: 'none',
        boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        transform: 'translateY(-8px)',
    },
};

export default Dashboard;
