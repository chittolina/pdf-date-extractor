# PDF Date Extractor 📅

This is the front-end folder of the PDF date extractor.

```bash
src/
├── assets/
│ └── fonts - Font used in the project
├── components/
│ ├── DocumentExtractor - Main page for date extraction
│ ├── DocumentSelector - Component to select PDF files
│ ├── ExtractedDatesCalendar - Component to render the calendar with extracted dates
│ ├── Button - Custom button implementation
│ └── ErrorAlert - Component to show an error indication in case the API fails
├── services/
│ └── documents - Abstraction wrapper around the /documents API
└── utils - Utilitary functions
```

## Local development

### Install dependencies using `npm`

```bash
npm install
```

### Run the server

```bash
npm run dev
```

### Run as a docker container

```bash
# Build the image
docker build -t pdf-date-extractor .
# Run the container
docker run -p 8000:8000 pdf-date-extractor
```

### (Optional) Compile for deployment

```bash
npm run build
```
