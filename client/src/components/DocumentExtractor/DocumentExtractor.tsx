import React, { useState, useEffect } from "react";

import DocumentUploader from "../DocumentUploader/DocumentUploader";
import ExtractedDatesCalendar from "../ExtractedDatesCalendar/ExtractedDatesCalendar";

export interface ExtractedDocument {
  file_name: string;
  title: string;
  extracted_dates: Array<{
    date: Date;
    snippet: string;
  }>;
}

const DocumentExtractor = () => {
  const [hasSelectedFiles, setHasSelectedFiles] = useState(false);
  const [extractedDocuments, setExtractedDocuments] = useState<
    ExtractedDocument[]
  >([]);

  const handleSubmit = async (files: File[]) => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const res = await fetch("http://localhost:8000/documents/extract", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setExtractedDocuments(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(extractedDocuments);
  return (
    <div className="app-container">
      <DocumentUploader
        onSubmit={(files: File[]) => {
          handleSubmit(files);
        }}
        onFilesChanged={(files: File[]) => {
          setHasSelectedFiles(files.length > 0);
        }}
      />
      {extractedDocuments.length > 0 && (
        <ExtractedDatesCalendar extractedDocuments={extractedDocuments} />
      )}
    </div>
  );
};

export default DocumentExtractor;
