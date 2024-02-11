import re
from dateutil import parser
from app.models.parsed_pdf import ParsedPDF
from app.models.extracted_date import ExtractedDate


"""
Formats supported for now
- 20/10/2021
- 20 October 2021
"""
extraction_rules = [
  r'(\d{1,2}/\d{1,2}/\d{4})',
  r'(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})'
]

def dates_from_pdf(pdf: ParsedPDF) -> list[str]:
  dates_from_text = dates_from_pdf_text(pdf)
  dates_from_form_values = dates_from_pdf_form_values(pdf)

  return dates_from_text + dates_from_form_values

def dates_from_pdf_text(pdf: ParsedPDF) -> list[str]:
  text = pdf.text
  matches = []

  for rule in extraction_rules:
    for match in re.finditer(rule, text):
      parsed_date = parser.parse(match.group(0))
      snippet = '...' + text[match.start() - 20 : match.end() + 20] + '...'
      snippet = snippet.replace('\n', ' ')
      matches.append(ExtractedDate(parsed_date, snippet))
  
  return matches

def dates_from_pdf_form_values(pdf: ParsedPDF) -> list[str]:
  form_values = pdf.form_values
  matches = []

  for rule in extraction_rules:
    for value in form_values:
      if value is not None:
        for match in re.finditer(rule, value):
          parsed_date = parser.parse(match.group(0))
          matches.append(ExtractedDate(parsed_date, None))
  
  return matches



