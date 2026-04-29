import { useProduct } from '../products/product.hooks';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Item from './Item';

const Viewproduct = () => {
    const { getAllProducts, products } = useProduct();
    const navigate = useNavigate();

    useEffect(() => {
        getAllProducts();
    }, []);

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

    return (
        <div style={styles.page}>
            {/* Header */}
            <header style={styles.header}>
                <button onClick={() => navigate('/seller/dashboard')} style={styles.backBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>arrow_back</span>
                </button>
                <h1 style={styles.headerTitle}>My Products</h1>
                <button onClick={() => navigate('/seller/create-product')} style={styles.addBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>add</span>
                </button>
            </header>

            {/* Content */}
            <main style={styles.main}>
                {products.length === 0 ? (
                    <div style={styles.empty}>
                        <div style={styles.emptyIcon}>
                            <span className="material-symbols-outlined" style={{ fontSize: '48px', color: '#cbd5e1' }}>inventory_2</span>
                        </div>
                        <h2 style={styles.emptyTitle}>No products yet</h2>
                        <p style={styles.emptyText}>Start by creating your first product listing</p>
                        <button onClick={() => navigate('/seller/create-product')} style={styles.emptyBtn}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>add</span>
                            Create Product
                        </button>
                    </div>
                ) : (
                    <>
                        <p style={styles.count}>{products.length} product{products.length !== 1 ? 's' : ''}</p>
                        <div style={styles.grid}>
                            {products.map((product: any) => (
                                <Item key={product._id} product={product} />
                            ))}
                        </div>
                    </>
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
        padding: '14px 20px',
        background: '#fff',
        borderBottom: '1px solid #e2e8f0',
        position: 'sticky',
        top: 0,
        zIndex: 50,
    },
    backBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        border: 'none',
        background: '#f1f5f9',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#334155',
    },
    headerTitle: {
        fontSize: '17px',
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
        letterSpacing: '-0.3px',
    },
    addBtn: {
        width: '40px',
        height: '40px',
        borderRadius: '12px',
        border: 'none',
        background: '#6366f1',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    main: {
        padding: '24px 32px',
        maxWidth: '1400px',
        margin: '0 auto',
    },
    count: {
        fontSize: '14px',
        color: '#94a3b8',
        fontWeight: 500,
        margin: '0 0 20px 4px',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '24px',
    },

    // Empty state
    empty: {
        textAlign: 'center' as const,
        padding: '60px 20px',
    },
    emptyIcon: {
        width: '88px',
        height: '88px',
        borderRadius: '50%',
        background: '#f1f5f9',
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
        margin: '0 0 24px',
    },
    emptyBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '12px 24px',
        borderRadius: '12px',
        border: 'none',
        background: '#6366f1',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
    },
};

export default Viewproduct;