import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData);
      setProposal(response.data.proposal);
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary-600">RFP Processor</h1>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Upload RFP Document</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Select PDF File
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="input-field mt-1"
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`btn-primary ${loading ? 'opacity-50' : ''}`}
            >
              {loading ? 'Processing...' : 'Generate Proposal'}
            </button>
          </form>
        </div>

        {proposal && (
          <div className="card mt-6">
            <h2 className="text-xl font-bold mb-4">Generated Proposal</h2>
            <div className="bg-gray-50 p-4 rounded whitespace-pre-wrap">
              {proposal}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-auto">
        <div className="max-w-4xl mx-auto px-4 py-4 text-center text-gray-500 text-sm">
          Demo app by <a href="https://www.linkedin.com/in/tanmay-khanna-7b939024a" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Tanmay Khannaa</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
