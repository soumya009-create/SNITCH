import { useState } from 'react';

interface Image {
    url: string;
    alt: string;
}

interface ImageProp {
    images: Image[];
}

const ItemImage = ({ images }: ImageProp) => {
    const [current, setCurrent] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div style={styles.placeholder}>
                <span style={{ fontSize: '32px', color: '#cbd5e1' }}>🖼️</span>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>No image</span>
            </div>
        );
    }

    return (
        <div style={styles.wrapper}>
            {/* Main Image */}
            <img
                src={images[current].url}
                alt={images[current].alt || 'Product'}
                style={styles.mainImage}
            />

            {/* Dots indicator — only if multiple images */}
            {images.length > 1 && (
                <div style={styles.dotsRow}>
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                            style={{
                                ...styles.dot,
                                background: i === current ? '#6366f1' : '#d1d5db',
                                width: i === current ? '16px' : '6px',
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const styles: Record<string, React.CSSProperties> = {
    wrapper: {
        position: 'relative',
        width: '100%',
        aspectRatio: '1',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#f1f5f9',
    },
    mainImage: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
    },
    placeholder: {
        width: '100%',
        aspectRatio: '1',
        borderRadius: '12px',
        background: '#f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
    },
    dotsRow: {
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '4px',
        alignItems: 'center',
        background: 'rgba(255,255,255,0.85)',
        padding: '4px 8px',
        borderRadius: '20px',
        backdropFilter: 'blur(4px)',
    },
    dot: {
        height: '6px',
        borderRadius: '10px',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
        transition: 'all 0.2s',
    },
};

export default ItemImage;