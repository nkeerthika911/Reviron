import React, { useState } from 'react';

export const ProductCard = () => {
  const [liked, setLiked] = useState(false);

  return (
    <div style={styles.card}>
      <img
        src="https://static.wixstatic.com/media/42a32f_404a78c6517b4affb11f491ede019675~mv2.jpg/v1/fill/w_480,h_466,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/42a32f_404a78c6517b4affb11f491ede019675~mv2.jpg" // Replace with your actual image URL
        alt="Fan Motor"
        style={styles.image}
      />
      <div style={styles.content}>
        <div style={styles.titleRow}>
          <h3 style={styles.title}>Fan motor - Working</h3>
          <div
            onClick={() => setLiked(!liked)}
            style={{
              ...styles.heartIconWrapper,
              color: liked ? 'red' : '#6F9674',
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={liked ? 'red' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
        </div>
        <p style={styles.price}>
          ₹150.00 <span style={styles.gst}>(incl. of GST)</span>
        </p>
        <div style={styles.tagsRow}>
          <div style={styles.tag}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
  <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5zm1.294 7.456A2 2 0 0 1 4.732 11h5.536a2 2 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456M12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
</svg>
            Free hassle-free delivery
          </div>
          <div style={styles.tag}>
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
  <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2zm3.564 1.426L5.596 5 8 5.961 14.154 3.5zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464z"/>
</svg>
            In stock: 5
          </div>
        </div>
        <div style={styles.buttonRow}>
          <button style={styles.buyButton}>Buy now</button>
          <button style={styles.cartButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#ffffff"
              width="16"
              height="16"
              viewBox="0 0 24 24"
            >
              <path d="M10 20c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm8-1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM7.16 14.26l.01.01c.26.26.61.4.98.4h7.72c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.3.12-.47 0-.55-.45-1-1-1H6.21l-.94-2H1v2h2l3.6 7.59-.94 1.72C5.23 17.37 6.15 19 7.5 19H19v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.96-1.75z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '294px',
    height: '348px',
    borderRadius: '16px',
    overflow: 'hidden',
    backgroundColor: '#fff',
    boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
    fontFamily: 'Poppins, sans-serif',
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    width: '100%',
    height: '170px',
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#6F9674',
    margin: '0',
  },
  heartIconWrapper: {
    cursor: 'pointer',
    transition: 'color 0.2s ease',
  },
  price: {
    fontSize: '14px',
    fontWeight: '600',
    margin: '8px 0 4px 0',
    color: '#333',
  },
  gst: {
    fontSize: '11px',
    color: '#777',
    fontWeight: 'normal',
  },
  tagsRow: {
    display: 'flex',
    gap: '6px',
    marginTop: '8px',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  tag: {
    fontSize: '9.5px',
    padding: '4px 6px',
    backgroundColor: '#EDF4ED',
    color: '#6F9674',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    whiteSpace: 'nowrap',
    flex: '1',
  },
  buttonRow: {
    width: '280px',
    height: '35px',
    display: 'flex',
    gap: '10px',
    marginTop: '18px',
  },
  buyButton: {
    flex: 1,
    padding: '0px 0',
    backgroundColor: '#6F9674',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: '12px',
  },
  cartButton: {
    marginRight: '15px',
    width: '35px',
    height: '35px',
    backgroundColor: '#6F9674',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
};
