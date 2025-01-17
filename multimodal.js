// James Bailey sample code from 
    // https://ai.google.dev/tutorials/node_quickstart#generate-text-from-text-and-image-input

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

// Add the API key securely
const dotenv = require('dotenv').config()

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  // this is the prompt
  const prompt = "Describe this image. From where is it most likely this image was taken?";

  const imageParts = [
    fileToGenerativePart("image1.jpg", "image/jpeg"),
    // fileToGenerativePart("image2.jpg", "image/jpg"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();