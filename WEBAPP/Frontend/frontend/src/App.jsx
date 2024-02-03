// App.js
import React, { useState } from 'react';
import axios from 'axios';
import './app.css';

function App() {
  const [base64Url, setBase64Url] = useState('');
  const [error, setError] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setPrompt(inputValue);
    setError(null);
  };

  async function makeURLtoImage() {
    try {
      setLoading(true); // Set loading to true when starting the request

      const result = await axios({
        method: 'post',
        url: 'https://da85-34-121-172-254.ngrok-free.app',
        data: {
          prompt: prompt,
        },
      });

      const base64 = result.data['base64'];

      // Set the base64Url state to trigger a re-render and display the image
      setBase64Url('data:image/png;base64,' + base64);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data or invalid ngrok subdomain');
    } finally {
      setLoading(false); // Set loading to false when the request is completed
    }
  }

  const handleImageLoadError = () => {
    setError('Invalid Base64 URL');
  };

  return (
    <div className="app-container">
      <h1>DeepCache Web Application</h1>
      <h2>Overview</h2>
      <p>
        This web application utilizes the DeepCache model, a training-free and
        almost lossless paradigm designed to accelerate diffusion models.
        DeepCache achieves impressive acceleration for various diffusion models
        while maintaining high-quality outputs.
      </p>

      <div className="input-container">
        <label>
          Enter Your Prompt:
          <input type="text" value={prompt} onChange={handleInputChange} />
        </label>
        <button className="buttonclass" onClick={makeURLtoImage} disabled={loading}>
          {loading ? 'Generating Image...' : 'Generate Image'}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}
      {base64Url && !error && (
        <div className="image-container">
          <img
            src={base64Url}
            alt="Generated Image"
            onError={handleImageLoadError}
          />
        </div>
      )}
    </div>
  );
}

export default App;
