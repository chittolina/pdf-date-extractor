from fastapi import FastAPI, UploadFile
from fastapi.staticfiles import StaticFiles
from parser.date_extractor import extract_dates_and_snippets_from_pdf
from parser.pdf_parser import parse_pdf

app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.post('/upload')
async def upload_file(file: UploadFile):
    with open(f'uploads/{file.filename}', 'wb') as output_file:
        # TODO: Read file asynchronously?
        output_file.write(file.file.read())

    parsed_pdf = parse_pdf(f'uploads/{file.filename}')
    extracted_dates = extract_dates_and_snippets_from_pdf(parsed_pdf)
    print(extracted_dates)
    return {"filename": file.filename, "dates": format_dates_and_snippets(extracted_dates)}

def format_dates_and_snippets(dates_and_snippets):
    formatted_dates_and_snippets = []

    for date, snippet in dates_and_snippets:
        format_dates_and_snippets = {
            "date": date.strftime('%d/%m/%Y'),
            "snippet": snippet
        }
        formatted_dates_and_snippets.append(format_dates_and_snippets)

    return formatted_dates_and_snippets