import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useProduct } from '../products/product.hooks';

const CURRENCIES = ['INR', 'USD', 'GBP', 'JPY'] as const;

const CreateProduct: React.FC = () => {
    const navigate = useNavigate();
    const { createSellerProduct } = useProduct();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [currency, setCurrency] = useState<string>('INR');
    const [images, setImages] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [dragActive, setDragActive] = useState(false);

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

    useEffect(() => {
        const urls = images.map((file) => URL.createObjectURL(file));
        setPreviews(urls);
        return () => urls.forEach((url) => URL.revokeObjectURL(url));
    }, [images]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const total = [...images, ...newFiles].slice(0, 7);
            setImages(total);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragActive(false);
        if (e.dataTransfer.files) {
            const newFiles = Array.from(e.dataTransfer.files).filter((f) =>
                f.type.startsWith('image/')
            );
            const total = [...images, ...newFiles].slice(0, 7);
            setImages(total);
        }
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!name.trim() || !description.trim() || !price.trim()) {
            setError('Please fill in all required fields.');
            return;
        }
        if (images.length === 0) {
            setError('Please upload at least one product image.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('currency', currency);
            images.forEach((img) => formData.append('images', img));

            await createSellerProduct(formData);
            setSuccess(true);
            setName('');
            setDescription('');
            setPrice('');
            setCurrency('INR');
            setImages([]);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err: any) {
            setError(err?.response?.data?.message || 'Failed to create product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const currencySymbol = currency === 'INR' ? '₹' : currency === 'USD' ? '$' : currency === 'GBP' ? '£' : '¥';

    return (
        <div style={styles.page}>
            {/* Simple Header */}
            <header style={styles.header}>
                <button onClick={() => navigate('/seller/dashboard')} style={styles.backBtn}>
                    <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>arrow_back</span>
                </button>
                <h1 style={styles.headerTitle}>Create Product</h1>
                <div style={{ width: '40px' }} />
            </header>

            {/* Content */}
            <main style={styles.main}>
                {/* Success Banner */}
                {success && (
                    <div style={styles.successBanner}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#059669' }}>check_circle</span>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#065f46' }}>Product created successfully!</span>
                    </div>
                )}

                {/* Error Banner */}
                {error && (
                    <div style={styles.errorBanner}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#dc2626' }}>error</span>
                        <span style={{ fontSize: '14px', fontWeight: 500, color: '#991b1b', flex: 1 }}>{error}</span>
                        <button onClick={() => setError('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626' }}>
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>close</span>
                        </button>
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Product Name */}
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Product Name <span style={{ color: '#ef4444' }}>*</span></label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Premium Wireless Headphones"
                            style={styles.input}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Description <span style={{ color: '#ef4444' }}>*</span></label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your product..."
                            rows={4}
                            style={{ ...styles.input, resize: 'none' as const }}
                            required
                        />
                    </div>

                    {/* Price & Currency Row */}
                    <div style={styles.row}>
                        <div style={{ ...styles.fieldGroup, flex: 1 }}>
                            <label style={styles.label}>Price <span style={{ color: '#ef4444' }}>*</span></label>
                            <div style={{ position: 'relative' }}>
                                <span style={styles.currencyPrefix}>{currencySymbol}</span>
                                <input
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder="0.00"
                                    style={{ ...styles.input, paddingLeft: '36px' }}
                                    required
                                />
                            </div>
                        </div>
                        <div style={{ ...styles.fieldGroup, width: '140px' }}>
                            <label style={styles.label}>Currency</label>
                            <select
                                value={currency}
                                onChange={(e) => setCurrency(e.target.value)}
                                style={styles.input}
                            >
                                {CURRENCIES.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div style={styles.fieldGroup}>
                        <label style={styles.label}>Product Images <span style={{ color: '#ef4444' }}>*</span></label>
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                            style={{
                                ...styles.dropzone,
                                borderColor: dragActive ? '#6366f1' : '#d1d5db',
                                background: dragActive ? '#eef2ff' : '#fafafa',
                            }}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleImageChange}
                                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0, cursor: 'pointer' }}
                            />
                            <span className="material-symbols-outlined" style={{ fontSize: '32px', color: dragActive ? '#6366f1' : '#9ca3af' }}>cloud_upload</span>
                            <p style={{ fontSize: '13px', color: '#6b7280', fontWeight: 500, margin: '8px 0 0' }}>
                                {dragActive ? 'Drop images here' : 'Drag & drop or click to upload'}
                            </p>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: '4px 0 0' }}>PNG, JPG, WEBP — max 7 images</p>
                        </div>

                        {/* Previews */}
                        {previews.length > 0 && (
                            <div style={styles.previewGrid}>
                                {previews.map((src, index) => (
                                    <div key={index} style={styles.previewItem}>
                                        <img src={src} alt={`Preview ${index + 1}`} style={styles.previewImg} />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            style={styles.removeImgBtn}
                                        >
                                            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>close</span>
                                        </button>
                                        {index === 0 && (
                                            <span style={styles.coverBadge}>Cover</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{images.length}/7 uploaded</p>
                    </div>

                    {/* Actions */}
                    <div style={styles.actions}>
                        <button type="button" onClick={() => navigate('/dashboard')} style={styles.cancelBtn}>
                            Cancel
                        </button>
                        <button type="submit" disabled={loading} style={{ ...styles.submitBtn, opacity: loading ? 0.6 : 1 }}>
                            {loading ? (
                                <>
                                    <svg style={{ animation: 'spin 1s linear infinite', width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24">
                                        <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                                    </svg>
                                    Publishing...
                                </>
                            ) : (
                                <>
                                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>rocket_launch</span>
                                    Publish Product
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </main>

            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

// ── Styles ──────────────────────────────────────────

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
        transition: 'background 0.2s',
    },
    headerTitle: {
        fontSize: '17px',
        fontWeight: 700,
        color: '#0f172a',
        margin: 0,
        letterSpacing: '-0.3px',
    },
    main: {
        padding: '24px 20px 40px',
        maxWidth: '520px',
        margin: '0 auto',
    },
    successBanner: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 16px',
        borderRadius: '14px',
        background: '#ecfdf5',
        border: '1px solid #a7f3d0',
        marginBottom: '20px',
    },
    errorBanner: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '14px 16px',
        borderRadius: '14px',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    fieldGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '13px',
        fontWeight: 600,
        color: '#374151',
    },
    input: {
        width: '100%',
        padding: '12px 14px',
        borderRadius: '12px',
        border: '1px solid #d1d5db',
        fontSize: '14px',
        color: '#1e293b',
        background: '#fff',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        fontFamily: "'Inter', sans-serif",
        boxSizing: 'border-box' as const,
    },
    row: {
        display: 'flex',
        gap: '12px',
    },
    currencyPrefix: {
        position: 'absolute',
        left: '14px',
        top: '50%',
        transform: 'translateY(-50%)',
        fontSize: '14px',
        color: '#9ca3af',
        fontWeight: 500,
        pointerEvents: 'none',
    },
    dropzone: {
        position: 'relative',
        border: '2px dashed #d1d5db',
        borderRadius: '14px',
        padding: '32px',
        textAlign: 'center' as const,
        transition: 'all 0.2s',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    previewGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        marginTop: '12px',
    },
    previewItem: {
        position: 'relative',
        borderRadius: '10px',
        overflow: 'hidden',
        aspectRatio: '1',
        border: '1px solid #e5e7eb',
    },
    previewImg: {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const,
    },
    removeImgBtn: {
        position: 'absolute',
        top: '4px',
        right: '4px',
        width: '22px',
        height: '22px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.5)',
        border: 'none',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
    },
    coverBadge: {
        position: 'absolute',
        bottom: '4px',
        left: '4px',
        background: '#6366f1',
        color: '#fff',
        fontSize: '9px',
        fontWeight: 700,
        padding: '2px 6px',
        borderRadius: '4px',
        textTransform: 'uppercase' as const,
        letterSpacing: '0.5px',
    },
    actions: {
        display: 'flex',
        gap: '12px',
        paddingTop: '8px',
    },
    cancelBtn: {
        flex: 1,
        padding: '14px',
        borderRadius: '14px',
        border: '1px solid #d1d5db',
        background: '#fff',
        color: '#6b7280',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background 0.2s',
    },
    submitBtn: {
        flex: 2,
        padding: '14px',
        borderRadius: '14px',
        border: 'none',
        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        color: '#fff',
        fontSize: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
        transition: 'opacity 0.2s',
    },
};

export default CreateProduct;
