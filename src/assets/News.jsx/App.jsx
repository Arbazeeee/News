
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './App.jsx'
import './App.css'
import axios from 'axios';

function App() {
    const [news, setNews] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY');
            setNews(response.data.articles);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleCardClick = (url) => {
        window.location.href = url;
    };

    return (
        <div className="news-container">
            {loading? (
                <p>Loading...</p>
            ) : (
                news.map((article, index) => (
                    <div key={index} className="news-card" onClick={() => handleCardClick(article.url)}>
                        <h2 className="title">{article.title}</h2>
                        <p className="description">{article.description}</p>
                        <p className="source">{article.source.name}</p>
                        <p className="published-at">{article.publishedAt}</p>
                    </div>
                ))
            )}
            {error && <p style={{ color: 'ed' }}>{error}</p>}
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));