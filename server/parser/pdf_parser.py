from pypdf import PdfReader
from parser.parsed_pdf import ParsedPdf


def parse_pdf(pdf_path: str) -> ParsedPdf:
  reader = open_pdf(pdf_path)
  metadata = pdf_metadata(reader)
  text = extract_text_from_pdf(reader)
  form_fields_values = pdf_form_fields_values_to_list(reader)
  parsed_pdf = ParsedPdf(metadata, text, form_fields_values)
  return parsed_pdf

def open_pdf(pdf_path: str) -> PdfReader:
  # TODO: Properly close the PDF file
  reader = PdfReader(pdf_path)
  return reader

def pdf_metadata(reader: PdfReader) -> dict:
  metadata = reader.metadata
  return metadata

def extract_text_from_pdf(reader: PdfReader) -> str:
  text = [page.extract_text() for page in reader.pages]
  joint_text = ''.join(text)
  return joint_text
 
def pdf_form_fields_values_to_list(reader: PdfReader) -> list[str]:
  fields = reader.get_form_text_fields()
  values = [fields[field] for field in fields]
  return values
