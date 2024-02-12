import datetime

class ExtractedDateSnippet:
    def __init__(self, text: str, highlight_start: int, highlight_end: int):
        self.text = text
        self.highlight_start = highlight_start
        self.highlight_end = highlight_end
class ExtractedDate:
    def __init__(self, date: datetime, snippet: ExtractedDateSnippet = None):
        self.date = date
        self.snippet = snippet