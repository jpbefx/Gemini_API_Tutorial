// James Bailey first Gemini API app from google tutorials
    // https://ai.google.dev/tutorials/node_quickstart#generate-text-from-text-input

    // imported packages
// import google gemini    
const { GoogleGenerativeAI } = require("@google/generative-ai");
// import API Key
const dotenv = require("dotenv")
// import API Key as an object for process.env
dotenv.config()
// import requirement to read line of text from user as an interface
const readline = require("readline")

// Access your ApI key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// User Interface for text input
const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// prompt for the user in the terminal
userInterface.prompt()

// Event Listener active on prompt line (text-only input, use the gemini-pro model)
userInterface.on("line", async input => {
    // Lines 32-34, 38-40 moved here (prompt > input)

    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // content is generated after completion
// const result = await model.generateContent(input);

    // content is generated in chuncks as it is written by Gemini
        // must place the (input) into and array [ ] then loop through the array
    const result = await model.generateContentStream(input);
    for await(const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText) // replaces lower response and log functions
    }
    // const response = await result.response;
    // const text = response.text();
    // console.log(text);
})

// async function run() {
    // For text-only input, use the gemini-pro model
    // const model = genAI.getGenerativeModel({ model: "gemini-pro"});

    // const prompt = "Write a story about a magic backpack."

    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const text = response.text();
    // console.log(text);
// }

// run();