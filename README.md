# PDF Date Extractor 📅

Welcome to PDF Date Extractor! This tool helps you effortlessly extract dates from your PDF documents. It's powered by FastAPI on the backend and ReactJS on the frontend, making it a breeze to use.

![App in action](app-in-action.png)

## Demo ✨

If you want to play around and get a quick demo, the app is deployed [here](https://pdf-date-extractor.vercel.app/).

## Features 🚀

- **Easy Extraction:** Quickly extract dates from your PDF files.
- **User-Friendly Interface:** An intuitive web interface for hassle-free PDF uploads. Either select them via browser file picker or drag and drop them!
- **Clear Display:** View your extracted dates in a calendar widget with a link to the real PDF file.

## How to Use 📝

1. **Access the Web Interface:** Visit [PDF Date Extractor](http://localhost:3000) in your browser.
2. **Upload Your PDF:** Use the provided interface to upload your PDF file.
3. **Instant Results:** Your extracted dates will be displayed on the webpage.

## Getting Started 🏁

### Backend Setup

1. Install dependencies:
   ```bash
   pipenv install
   ```
2. Run the server:
   ```bash
   pipenv run uvicorn main:app
   ```

### Frontend setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Run the server:
   ```bash
   npm run dev
   ```
3. (Optional) - Compilation
   ```bash
   npm run compile
   ```
