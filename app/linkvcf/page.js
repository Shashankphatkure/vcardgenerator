'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageVCF() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageData, setImageData] = useState(null);
  const [vcfData, setVcfData] = useState(null);
  const [error, setError] = useState('');

  const validateAndFetchImage = async () => {
    setError('');
    if (!imageUrl) {
      setError('Please enter an image URL');
      return false;
    }

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Failed to fetch image');
      
      const contentType = response.headers.get('content-type');
      if (!['image/jpeg', 'image/png', 'image/gif'].includes(contentType)) {
        setError('Invalid image format. Please use JPEG, PNG, or GIF.');
        return false;
      }

      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => setImageData(reader.result);
      reader.readAsDataURL(blob);
      return true;
    } catch (error) {
      setError('Error fetching image: ' + error.message);
      return false;
    }
  };

  const generateVCF = async () => {
    if (!name || !phoneNumber) {
      setError('Please fill in all fields.');
      return;
    }

    const imageValid = await validateAndFetchImage();
    if (!imageValid) return;

    // Wait for imageData to be set
    setTimeout(() => {
      if (!imageData) {
        setError('Image data not available. Please try again.');
        return;
      }

      const imageType = imageData.split(';')[0].split('/')[1];
      const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phoneNumber}
PHOTO;ENCODING=b;TYPE=${imageType.toUpperCase()}:${imageData.split(',')[1]}
END:VCARD`;

      setVcfData(vcf);
    }, 100);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate VCF Card with Image</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="border p-2 mr-2"
        />
        <input
          type="url"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border p-2"
        />
      </div>
      <button
        onClick={generateVCF}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate VCF
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {imageData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Image Preview:</h2>
          <Image src={imageData} alt="Preview" width={200} height={200} />
        </div>
      )}
      {vcfData && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Generated VCF:</h2>
          <pre className="bg-gray-100 p-4 rounded">{vcfData}</pre>
          <a
            href={`data:text/vcard;charset=utf-8,${encodeURIComponent(vcfData)}`}
            download="contact.vcf"
            className="bg-green-500 text-white px-4 py-2 rounded inline-block mt-2"
          >
            Download VCF
          </a>
        </div>
      )}
    </div>
  );
}