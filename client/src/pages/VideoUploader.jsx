import { useState } from 'react';
import axios from 'axios';

const VideoUploader = () => {
  const [file, setFile] = useState(null);
  const [videoURL, setVideoURL] = useState('');

  const handleUpload = async () => {
    if (!file) return alert('No file selected');
    const formData = new FormData();
    formData.append('video', file);

    const res = await axios.post('https://one-media-back-end.vercel.app/api/upload/video', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setVideoURL(res.data.url);
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="video/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="bg-blue-600 text-white p-2 rounded">Upload</button>

      {videoURL && (
        <div>
          <p>Uploaded video:</p>
          <video src={videoURL} controls className="w-full max-w-md" />
        </div>
      )}
    </div>
  );
};

export default VideoUploader;
