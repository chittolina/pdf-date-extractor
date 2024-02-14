# PDF Date Extractor 📅

This is the back-end folder of the PDF Date Extractor.

```bash
app/
└── api/
    ├── endpoints - Route definition and handlers
    ├── models - Data models used in the API
    └── parser - Functions for PDF Parsing and date extraction
examples - Sample PDFs for testing.
uploads - Uploaded files live here.
```

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
