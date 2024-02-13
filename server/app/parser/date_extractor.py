import re
from dateutil import parser
from app.models.parsed_pdf import ParsedPDF
from app.models.extracted_date import ExtractedDate, ExtractedDateSnippet

extraction_rules = [
    # YYYY-MM-DD
    r"(\d{4})-(\d{1,2})-(\d{1,2})",
    # YYYY/MM/DD
    r"(\d{4})-(\d{1,2})-(\d{1,2})",
    # MM/DD/YYYY
    r"(\d{1,2})/(\d{1,2})/(\d{4})",
    # MM-DD-YYYY
    r"(\d{1,2})-(\d{1,2})-(\d{4})",
    # Month Day, Year
    r"\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)[a-z]* \d{1,2},? \d{4}",
    # Day Month Year
    r"(\d{1,2}\s+\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)\s+\d{4})",
]


def dates_from_pdf(pdf: ParsedPDF) -> list[str]:
    dates_from_text = dates_from_pdf_text(pdf)
    dates_from_form_values = dates_from_pdf_form_values(pdf)

    return dates_from_text + dates_from_form_values


"""
Extract date from the full text of the PDF.
"""


def dates_from_pdf_text(pdf: ParsedPDF) -> list[str]:
    text = remove_trailing_spaces(pdf.text)
    matches = []

    for option in extraction_rules:
        for match in re.finditer(option, text):
            match_group = match.group(0)

            if match_group == "" or match_group is None:
                continue

            parsed_date = None

            try:
                parsed_date = parser.parse(match_group)
            except Exception:
                continue

            text_snippet = text[match.start() - 20 : match.end() + 20]
            extracted_snippet = None

            if len(text_snippet) != 0:
                # Highlight the matched date in the text snippet
                highlight_start = text_snippet.find(match_group)
                highlight_end = highlight_start + len(match_group)
                text_snippet = text_snippet.replace("\n", " ")

                extracted_snippet = ExtractedDateSnippet(
                    text_snippet, highlight_start, highlight_end
                )

            matches.append(ExtractedDate(parsed_date, extracted_snippet))

    return matches


"""
Extract date from filled form values in the PDF.
"""


def dates_from_pdf_form_values(pdf: ParsedPDF) -> list[str]:
    form_values = pdf.form_values
    matches = []

    for option in extraction_rules:
        for value in form_values:
            for match in re.finditer(option, value):
                parsed_date = parser.parse(match.group(0))
                matches.append(ExtractedDate(parsed_date, None))

    return matches


"""
Remove trailing spaces and replace multiple spaces with a single space.
"""


def remove_trailing_spaces(text):
    cleaned_text = " ".join(text.split())
    cleaned_text = re.sub(r"\s+", " ", cleaned_text)
    return cleaned_text
