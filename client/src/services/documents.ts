import { ExtractedDocument } from "../components";
import config from "../config";

const service = {
  async extractDatesFromDocuments(formData: FormData) {
    const res = await fetch(`${config.server}/documents/extract`, {
      method: "POST",
      body: formData,
    });

    let data = await res.json();

    // Convert dates to Date objects to simplify use across the board
    data = data.map((doc: ExtractedDocument) => {
      doc.extracted_dates = doc.extracted_dates.map((dateSnippet) => ({
        ...dateSnippet,
        date: new Date(dateSnippet.date),
      }));

      return doc;
    });

    return data;
  },
};

export default service;
