import re
from dateutil import parser
from app.models.parsed_pdf import ParsedPDF
from app.models.extracted_date import ExtractedDate


# extraction_rules = [
#   r'(\d{1,2}/\d{1,2}/\d{4})',
#   r'(\d{1,2}\s+(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4})',
#   r'^(January|February|March|April|May|June|July|August|September|October|November|December) [0-3]?[0-9], [0-9]{4}$'
# ]

extraction_rules = re.compile(
    r'\b(?:'
    r'\d{1,2}[/-]\d{1,2}[/-]\d{2,4}|'  # MM/DD/YYYY or MM-DD-YYYY
    r'\d{2,4}[/-]\d{1,2}[/-]\d{1,2}|'  # YYYY/MM/DD or YYYY-MM-DD
    r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}|'  # Month Day, Year
    r'\d{1,2} (?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{4}'
    r')\b',
    re.IGNORECASE
)

def remove_trailing_spaces(text):
  cleaned_text = re.sub(r'^\s+|\s+$', '', text)
  cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
  return cleaned_text

def dates_from_pdf(pdf: ParsedPDF) -> list[str]:
  dates_from_text = dates_from_pdf_text(pdf)
  dates_from_form_values = dates_from_pdf_form_values(pdf)

  return dates_from_text + dates_from_form_values

def dates_from_pdf_text(pdf: ParsedPDF) -> list[str]:
  text = remove_trailing_spaces(pdf.text)
  print(text)
  matches = []

  # for rule in extraction_rules:
  #   for match in re.finditer(rule, text):
  #     parsed_date = parser.parse(match.group(0))
  #     snippet = '...' + text[match.start() - 20 : match.end() + 20] + '...'
  #     snippet = snippet.replace('\n', ' ')
  #     matches.append(ExtractedDate(parsed_date, snippet))
  
  for match in re.finditer(extraction_rules, text):
    parsed_date = parser.parse(match.group(0))
    snippet = '...' + text[match.start() - 20 : match.end() + 20] + '...'
    snippet = snippet.replace('\n', ' ')
    matches.append(ExtractedDate(parsed_date, snippet))
  return matches

def dates_from_pdf_form_values(pdf: ParsedPDF) -> list[str]:
  form_values = pdf.form_values
  matches = []

  # for rule in extraction_rules:
  #   for value in form_values:
  #     if value is not None:
  #       for match in re.finditer(rule, value):
  #         parsed_date = parser.parse(match.group(0))
  #         matches.append(ExtractedDate(parsed_date, None))
  
  for value in form_values:
    if value is not None:
      for match in re.finditer(extraction_rules, value):
        parsed_date = parser.parse(match.group(0))
        matches.append(ExtractedDate(parsed_date, None))
  return matches



