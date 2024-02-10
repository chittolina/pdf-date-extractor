class ParsedPdf:
  def __init__(self, metadata, text, form_fields_values):
    self.metadata = metadata
    self.text = text
    self.form_fields_values = form_fields_values
