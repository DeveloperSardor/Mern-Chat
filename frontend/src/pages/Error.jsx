import React from 'react';
import '../components/styles/error.scss'
const Error = () => {
    return (
        <main className='error'>
        <h1>4<span><i class="fas fa-ghost"></i></span>4</h1>
        <h2>Error: 404 page not found</h2>
        <p>Sorry, the page you're looking for cannot be accessed</p>
      </main>
    );
};

export default Error;