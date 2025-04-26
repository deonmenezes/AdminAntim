// Script to create a Cloudinary upload preset
require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with credentials
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
});

// Create a new upload preset
cloudinary.api.create_upload_preset({
  name: "clientAntim", // This should match NEXT_PUBLIC_CLOUDINARY_PRESET in .env.local
  folder: "antimImages", // Folder where uploaded images will be stored
  allowed_formats: "jpg,png,webp", // Allow JPG, PNG and WebP formats
  unsigned: true, // Set to true for client-side uploads
  tags: "client,antimImages"
})
  .then(result => console.log("Upload preset created successfully:", result))
  .catch(error => console.error("Error creating upload preset:", error));