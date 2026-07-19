import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const newsProps = { pageSize: 6 };

function NewsPage({ category }) {
  const location = useLocation();
  return <News key={location.pathname} {...newsProps} category={category} />;
}

export default class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          
          <Routes>
            <Route path="/" element={<NewsPage category="general" />} />
            <Route path="/business" element={<NewsPage category="business" />} />
            <Route path="/entertainment" element={<NewsPage category="entertainment" />} />
            <Route path="/general" element={<NewsPage category="general" />} />
            <Route path="/health" element={<NewsPage category="health" />} />
            <Route path="/science" element={<NewsPage category="science" />} />
            <Route path="/sports" element={<NewsPage category="sports" />} />
            <Route path="/technology" element={<NewsPage category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
