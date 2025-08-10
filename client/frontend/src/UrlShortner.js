import React, { useState } from 'react';

function UrlShortner() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrl, setShortUrl] = useState('');
    const [error, setError] = useState('');
    
    // ✅ New state for admin panel data
    const [urls, setUrls] = useState([]);

    // ✅ New function to fetch all URLs for admin panel
    const fetchAllUrls = async () => {
        try {
            const res = await fetch('/urls');
            const data = await res.json();
            setUrls(data);
        } catch (err) {
            console.error("Error fetching URLs:", err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setShortUrl('');

        try {
            const res = await fetch('/shorten', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ originalUrl }),
            });
            const data = await res.json();
            if (res.ok) {
                setShortUrl(data.shortUrl);
                
                // ✅ Fetch updated admin data after shortening
                fetchAllUrls();
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Network Error');
        }
    };

    return (
         <div style={{ maxWidth: 480, margin: 'auto', padding: 24 }}>
            <h2>URL Shortener</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    value={originalUrl}
                    onChange={e => setOriginalUrl(e.target.value)}
                    placeholder="Enter a long URL"
                    required
                    style={{ width: "70%", padding: 8, marginRight: 8 }}
                />
                <button type="submit" style={{ padding: 8 }}>Shorten</button>
            </form>
            {shortUrl && (
                <div style={{ marginTop: 12 }}>
                    <strong>Short URL:</strong>&nbsp;
                    <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                </div>
            )}
            {error && (
                <div style={{ marginTop: 12, color: 'red' }}>
                    {error}
                </div>
            )}
        </div>
    );
}

export default UrlShortner;
