import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { fetchEveryProduct } from '../products/product.api';
import Item from './Item';
import { useAuth } from '../auth/hooks';

const Home = () => {
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth() as any;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetchEveryProduct();
                if (res.success && res.products) {
                    setAllProducts(res.products);
                }
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const navigateToDashboard = () => {
        if (user) {
            if (user.role === 'buyer') navigate('/buyer/dashboard');
            else if (user.role === 'seller') navigate('/seller/dashboard');
        } else {
            navigate('/login');
        }
    };

    return (
        <div style={styles.page}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.navBrand}>
                    <div style={styles.logoMark}>S</div>
                    <span style={styles.logoText}>Snitch</span>
                </div>

                <div style={styles.navActions}>
                    {!user ? (
                        <>
                            <button onClick={() => navigate('/login')} style={styles.textBtn}>
                                Log in
                            </button>
                            <button onClick={() => navigate('/register')} style={styles.primaryBtn}>
                                Sign up
                            </button>
                        </>
                    ) : (
                        <button onClick={navigateToDashboard} style={styles.primaryBtn}>
                            Dashboard
                        </button>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main style={styles.main}>
                <div style={styles.hero}>
                    <h1 style={styles.heroTitle}>Discover amazing products</h1>
                    <p style={styles.heroSubtitle}>Explore items crafted by sellers from all around the world.</p>
                </div>

                {loading ? (
                    <div style={styles.loadingWrapper}>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        <p>Loading catalog...</p>
                    </div>
                ) : allProducts.length === 0 ? (
                    <div style={styles.empty}>
                        <div style={styles.emptyIcon}>
                            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#cbd5e1' }}>inventory_2</span>
                        </div>
                        <h2 style={styles.emptyTitle}>Store is Empty</h2>
                        <p style={styles.emptyText}>There are no products listed right now. Check back soon!</p>
                    </div>
                ) : (
                    <div style={styles.grid}>
                        {allProducts.map((product) => (
                            <Item key={product._id} product={product} />
                        ))}
                    </div>
                )}
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
    header: {
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
    textBtn: {
        background: 'transparent',
        border: 'none',
        fontSize: '15px',
        fontWeight: 600,
        color: '#475569',
        cursor: 'pointer',
    },
    primaryBtn: {
        padding: '10px 20px',
        borderRadius: '8px',
        background: '#6366f1',
        color: '#fff',
        border: 'none',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
    },
    main: {
        padding: '40px 32px',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    hero: {
        marginBottom: '40px',
        textAlign: 'center',
    },
    heroTitle: {
        fontSize: '32px',
        fontWeight: 800,
        color: '#0f172a',
        margin: '0 0 12px 0',
        letterSpacing: '-1px',
    },
    heroSubtitle: {
        fontSize: '18px',
        color: '#64748b',
        margin: 0,
    },
    loadingWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 0',
        color: '#64748b',
        gap: '16px',
    },
    spinner: {
        width: '30px',
        height: '30px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
    },
    empty: {
        textAlign: 'center' as const,
        padding: '60px 20px',
    },
    emptyIcon: {
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        background: '#eef2ff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
    },
    emptyTitle: {
        fontSize: '20px',
        fontWeight: 700,
        color: '#1e293b',
        margin: '0 0 6px',
    },
    emptyText: {
        fontSize: '14px',
        color: '#94a3b8',
        margin: 0,
    },
};

export default Home;
