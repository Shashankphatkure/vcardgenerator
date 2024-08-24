'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ImageVCF() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [image, setImage] = useState(null);
  const [vcfData, setVcfData] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const generateVCF = () => {
    if (!name || !phoneNumber || !image) {
      alert('Please fill in all fields and upload an image.');
      return;
    }

    const vcf = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phoneNumber}
PHOTO;ENCODING=b;TYPE=JPEG:${image.split(',')[1]}
END:VCARD`;

    setVcfData(vcf);
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
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="border p-2"
        />
      </div>
      <button
        onClick={generateVCF}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generate VCF
      </button>
      {image && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Uploaded Image:</h2>
          <Image src={image} alt="Uploaded" width={200} height={200} />
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
