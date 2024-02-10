from pdf_parser import parse_pdf
from date_extractor import extract_dates_and_snippets_from_pdf

parsed_pdf = parse_pdf('./pdfs/InsertMe.pdf')
dates_and_snippets = extract_dates_and_snippets_from_pdf(parsed_pdf)
