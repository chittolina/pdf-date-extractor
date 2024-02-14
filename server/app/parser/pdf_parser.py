from pypdf import PdfReader
from ..models.parsed_pdf import ParsedPDF


def parse_pdf(pdf_path: str) -> ParsedPDF:
    reader = PdfReader(pdf_path)
    metadata = extract_metadata(reader)
    text = extract_full_text(reader)
    form_values = extract_form_values(reader)

    file_name = pdf_path.split("/")[-1]
    parsed_pdf = ParsedPDF(file_name, metadata, text, form_values)

    return parsed_pdf


def extract_metadata(reader: PdfReader) -> dict:
    metadata = reader.metadata
    return metadata


def extract_full_text(reader: PdfReader) -> str:
    text = [page.extract_text() for page in reader.pages]
    joint_text = "".join(text)
    return joint_text


def extract_form_values(reader: PdfReader) -> list[str]:
    fields = reader.get_form_text_fields()
    values = [fields[field] for field in fields if fields[field] is not None]
    return values
