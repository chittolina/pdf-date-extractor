# PDF Date Extractor 📅

This is the back-end folder of the PDF Date Extractor.

app/
├── api/
│ ├── endpoints/
│ │ ├── documents.py - Defines the routes for /documents
│ │ └── documents_handler.py - Route handler to separate the logic
│ └── api.py - Initializes the /documents router
├── models/
│ ├── extracted_date.py - Data model for extracted dates
│ └── parsed_pdf.py - Data model for the parsed PDF (ParsedPDF). Library agnostic.
└── parser/
├── date_extractor.py - Functions to extract dates from the PDF.
└── pdf_parser.py - Functions to parse the PDF into a ParsedPDF.
examples - Sample PDFs for testing
uploads - Uploaded files live here

## Local development

There are two ways to run the API. Either by using pipenv and installing the dependencies manually, or by creating a docker image and running as a container.

### Run manually

```bash
# Install dependencies
pipenv install
# Run the server
pipenv run uvicorn main:app
```

### Run as a docker container

```bash
# Build the image
docker build -t pdf-date-extractor .
# Run the container
docker run -p 8000:8000 pdf-date-extractor
```

### Tests

```bash
pipenv run pytest
```
