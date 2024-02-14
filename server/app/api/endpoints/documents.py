from fastapi import APIRouter, UploadFile
from app.parser.date_extractor import dates_from_pdf
from app.parser.pdf_parser import parse_pdf
from config import settings

router = APIRouter()


@router.post("/extract")
async def upload_files(files: list[UploadFile]):
    for file in files:
        with open(f"{settings.uploads_folder}/{file.filename}", "wb") as output_file:
            output_file.write(file.file.read())

    parsed_pdfs = [
        parse_pdf(f"{settings.uploads_folder}/{file.filename}") for file in files
    ]

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
