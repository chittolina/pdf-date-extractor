from fastapi import APIRouter, HTTPException, UploadFile
from app.parser.date_extractor import dates_from_pdf
from app.parser.pdf_parser import parse_pdf
from app.models.parsed_pdf import ParsedPDF
from config import settings

router = APIRouter()


@router.post("/extract")
async def upload_files(files: list[UploadFile]):
    try:
        return handle_request(files)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing files")


# As the app grows, these functions should be separated in a different file
# For sake of simplicity, I'm keeping it here for now
def handle_request(files: list[UploadFile]):
    parsed_pdfs = parse_pdfs(files)
    extracted_documents = extract_dates(parsed_pdfs)

    return extracted_documents

def parse_pdfs(files: list[UploadFile]):
    for file in files:
        with open(f"{settings.uploads_folder}/{file.filename}", "wb") as output_file:
            output_file.write(file.file.read())

    parsed_pdfs = [
        parse_pdf(f"{settings.uploads_folder}/{file.filename}") for file in files
    ]

    return parsed_pdfs

def extract_dates(parsed_pdfs: list[ParsedPDF]):
    extracted_documents = []

    for parsed_pdf in parsed_pdfs:
        extracted_data = dates_from_pdf(parsed_pdf)
        title = parsed_pdf.metadata.title or parsed_pdf.file_name
        extracted_documents.append(
            {
                "file_name": parsed_pdf.file_name,
                "title": title,
                "link": f"/{settings.uploads_folder}/{parsed_pdf.file_name}",
                "extracted_dates": extracted_data,
            }
        )

    return extracted_documents