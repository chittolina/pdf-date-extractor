import re
from parser.parsed_pdf import ParsedPdf
from dateutil import parser


# Formats supported for now
# 20/10/2021
# 20 October 2021
extraction_rules = [
  r'(\d{1,2}/\d{1,2}/\d{4})',
  r'(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})'
]

def extract_dates_and_snippets_from_pdf(parsed_pdf: ParsedPdf) -> list[str]:
  dates_and_snippets_from_pdf = extract_dates_and_snippets_from_pdf_text(parsed_pdf)
  dates_from_form_fields = extract_dates_from_pdf_form_fields(parsed_pdf)

  return dates_and_snippets_from_pdf + dates_from_form_fields

def extract_dates_and_snippets_from_pdf_text(parsed_pdf: ParsedPdf) -> list[str]:
  text = parsed_pdf.text
  matches = []

  for match in re.finditer(extraction_rules[0], text):
    parsed_date = parser.parse(match.group(0))
    snippet = '...' + text[match.start() - 20 : match.end() + 20] + '...'
    snippet = snippet.replace('\n', '')
  
    matches.append((parsed_date, snippet))
  
  for match in re.finditer(extraction_rules[1], text):
    parsed_date = parser.parse(match.group(0))
    snippet = '...' + text[match.start() - 20 : match.end() + 20] + '...'
    snippet = snippet.replace('\n', '')
  
    matches.append((parsed_date, snippet))
  
  return matches

def extract_dates_from_pdf_form_fields(parsed_pdf: ParsedPdf) -> list[str]:
  form_fields_values = parsed_pdf.form_fields_values
  matches = []

  for value in form_fields_values:
    if value is not None:
      for match in re.finditer(extraction_rules[0], value):
        parsed_date = parser.parse(match.group(0))
        matches.append((parsed_date, None))

  for value in form_fields_values:
    if value is not None:
      for match in re.finditer(extraction_rules[1], value):
        parsed_date = parser.parse(match.group(0))
        matches.append((parsed_date, None))
  
  return matches



