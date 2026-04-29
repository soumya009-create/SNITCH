import ItemImage from './ItemImage';

interface Product {
    _id?: string;
    name: string;
    description: string;
    price: {
        amount: number;
        currency: string;
    };
    category: string;
    images: { url: string; alt: string }[];
}

interface Itemprop {
    product: Product;
}

const getCurrencySymbol = (c: string) => {
    switch (c) {
        case 'INR': return '₹';
        case 'USD': return '$';
        case 'GBP': return '£';
        case 'JPY': return '¥';
        default: return c;
    }
};

const Item = ({ product }: Itemprop) => {
    return (
        <div
            style={styles.card}
            onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
            }}
        >
            <ItemImage images={product.images} />

            <div style={styles.info}>
                <h3 style={styles.name}>{product.name}</h3>

                <p style={styles.description}>
                    {product.description.length > 60
                        ? product.description.slice(0, 60) + '...'
                        : product.description}
                </p>

                <div style={styles.bottomRow}>
                    <span style={styles.price}>
                        {getCurrencySymbol(product.price.currency)}{product.price.amount}
                    </span>
                    {product.category && (
                        <span style={styles.category}>{product.category}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    card: {
        background: '#fff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
    },
    info: {
        padding: '14px 16px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    name: {
        fontSize: '15px',
        fontWeight: 600,
        color: '#0f172a',
        margin: 0,
        lineHeight: '1.3',
        letterSpacing: '-0.2px',
    },
    description: {
        fontSize: '12px',
        color: '#64748b',
        margin: 0,
        lineHeight: '1.4',
    },
    bottomRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '6px',
    },
    price: {
        fontSize: '17px',
        fontWeight: 700,
        color: '#6366f1',
        letterSpacing: '-0.3px',
    },
    category: {
        fontSize: '10px',
        fontWeight: 600,
        color: '#6366f1',
        background: '#eef2ff',
        padding: '3px 8px',
        borderRadius: '6px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
    },
};

export default Item;