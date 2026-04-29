import { useNavigate } from 'react-router';
import { useAuth } from '../auth/hooks';

const BuyerDashboard = () => {
    const navigate = useNavigate();
    const { user, setLoading } = useAuth() as any;

    const handleLogout = () => {
        // Clear local cookies if needed, or simply navigate to login
        // Assuming backend handles HttpOnly cookie removal via a logout API later
        // For now, redirect and force a refresh or context update
        window.location.href = '/login'; 
    };

    return (
        <div style={styles.page}>
            {/* Header Navigation */}
            <nav style={styles.nav}>
                <div style={styles.navBrand}>
                    <div style={styles.logoMark}>S</div>
                    <span style={styles.logoText}>Snitch</span>
                </div>
                
                <div style={styles.navActions}>
                    <button style={styles.iconBtn}>
                        <span className="material-symbols-outlined">search</span>
                    </button>
                    <button style={styles.iconBtn}>
                        <span className="material-symbols-outlined">shopping_cart</span>
                    </button>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            </nav>

            <main style={styles.main}>
                {/* Hero Section */}
                <section style={styles.hero}>
                    <h1 style={styles.heroTitle}>
                        Welcome back, {user?.fullname?.split(' ')[0] || 'Guest'}
                    </h1>
                    <p style={styles.heroSubtitle}>
                        Discover the latest premium products tailored just for you.
                    </p>
                </section>

                {/* Coming Soon State (Since API to fetch ALL products isn't ready) */}
                <section style={styles.emptyState}>
                    <div style={styles.emptyIconWrapper}>
                        <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#6366f1' }}>
                            storefront
                        </span>
                    </div>
                    <h2 style={styles.emptyTitle}>Explore Products</h2>
                    <p style={styles.emptyDesc}>
                        The marketplace is currently being populated. Check back soon for new arrivals!
                    </p>
                    <button style={styles.primaryBtn} disabled>
                        Browse Catalog
                    </button>
                </section>
            </main>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    page: {
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
    },
    nav: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 32px',
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    },
    navBrand: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
    },
    logoMark: {
        width: '36px',
        height: '36px',
        borderRadius: '10px',
        background: '#6366f1',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        fontWeight: 800,
    },
    logoText: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#0f172a',
        letterSpacing: '-0.5px',
    },
    navActions: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    iconBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: 'transparent',
        color: '#475569',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    logoutBtn: {
        padding: '8px 16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        background: '#fff',
        color: '#334155',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        marginLeft: '8px',
    },
    main: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 32px',
    },
    hero: {
        marginBottom: '60px',
    },
    heroTitle: {
        fontSize: '36px',
        fontWeight: 800,
        color: '#0f172a',
        letterSpacing: '-1px',
        margin: '0 0 12px 0',
    },
    heroSubtitle: {
        fontSize: '18px',
        color: '#64748b',
        margin: 0,
        maxWidth: '600px',
        lineHeight: 1.5,
    },
    emptyState: {
        background: '#fff',
        borderRadius: '24px',
        padding: '80px 20px',
        textAlign: 'center',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    emptyIconWrapper: {
        width: '96px',
        height: '96px',
        borderRadius: '24px',
        background: '#eef2ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '24px',
    },
    emptyTitle: {
        fontSize: '24px',
        fontWeight: 700,
        color: '#1e293b',
        margin: '0 0 12px 0',
    },
    emptyDesc: {
        fontSize: '16px',
        color: '#64748b',
        margin: '0 0 32px 0',
        maxWidth: '400px',
        lineHeight: 1.5,
    },
    primaryBtn: {
        padding: '12px 28px',
        borderRadius: '12px',
        border: 'none',
        background: '#94a3b8',
        color: '#fff',
        fontSize: '15px',
        fontWeight: 600,
        cursor: 'not-allowed',
    },
};

export default BuyerDashboard;
