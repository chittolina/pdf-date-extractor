# PDF Date Extractor 📅

This is the front-end folder of the PDF date extractor.

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
