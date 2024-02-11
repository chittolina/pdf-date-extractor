from pypdf import PdfReader
from app.models.parsed_pdf import ParsedPDF


def parse_pdf(pdf_path: str) -> ParsedPDF:
  reader = open_pdf(pdf_path)
  metadata = extract_metadata(reader)
  text = extract_full_text(reader)
  form_fields_values = extract_form_values(reader)

  file_name = pdf_path.split('/')[-1]
  parsed_pdf = ParsedPDF(file_name, metadata, text, form_fields_values)

  return parsed_pdf

def open_pdf(pdf_path: str) -> PdfReader:
  # TODO: Properly close the PDF file
  reader = PdfReader(pdf_path)
  return reader

def extract_metadata(reader: PdfReader) -> dict:
  metadata = reader.metadata
  return metadata

def extract_full_text(reader: PdfReader) -> str:
  text = [page.extract_text() for page in reader.pages]
  joint_text = ''.join(text)
  return joint_text

def extract_form_values(reader: PdfReader) -> list[str]:
  fields = reader.get_form_text_fields()
  values = [fields[field] for field in fields]
  return values