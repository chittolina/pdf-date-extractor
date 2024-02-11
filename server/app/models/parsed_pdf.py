class ParsedPDF:
  def __init__(self, file_name, metadata, text, form_fields_values):
    self.file_name = file_name
    self.metadata = metadata
    self.text = text
    self.form_fields_values = form_fields_values
