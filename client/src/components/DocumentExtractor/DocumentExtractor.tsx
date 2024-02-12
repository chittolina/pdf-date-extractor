import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import documentsService from "../../services/documents";
import DocumentSelector from "../DocumentSelector/DocumentSelector";
import ExtractedDatesCalendar from "../ExtractedDatesCalendar/ExtractedDatesCalendar";
import Button from "../Button/Button";
import ErrorAlert from "../ErrorAlert/ErrorAlert";
import "./index.css";

export interface ExtractedDate {
  date: Date;
  snippet: string;
}
export interface ExtractedDocument {
  file_name: string;
  title: string;
  link: string;
  extracted_dates: ExtractedDate[];
}

const DocumentExtractor = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [selectedDocuments, setSelectedDocuments] = useState<File[]>([]);
  const [extractedCount, setExtractedCount] = useState<{
    [fileName: string]: number;
  }>({});
  const [extractedDocuments, setExtractedDocuments] = useState<
    ExtractedDocument[]
  >([]);

  const handleSubmit = async (files: File[]) => {
    setHasError(false);
    setIsLoading(true);

    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }

    try {
      const extractedDocuments =
        await documentsService.extractDatesFromDocuments(formData);
      setExtractedDocuments(extractedDocuments);
    } catch (err) {
      setHasError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    parseExtractCount(extractedDocuments);
  }, [extractedDocuments]);

  const parseExtractCount = (extractedDocuments: ExtractedDocument[]) => {
    const extractedCount: { [key: string]: number } = {};

    extractedDocuments.forEach((doc) => {
      extractedCount[doc.file_name] = doc.extracted_dates.length;
    });

    setExtractedCount(extractedCount);
  };

  return (
    <div className="document-extractor-container">
      <div>
        <DocumentSelector
          extractedCount={extractedCount}
          onSubmit={(files: File[]) => {
            handleSubmit(files);
          }}
          onFilesChanged={(files: File[]) => {
            setSelectedDocuments(files);
          }}
        />
        <div className="w-full">
          {selectedDocuments.length > 0 && (
            <Button
              isLoading={isLoading}
              className="w-full my-4"
              onClick={() => handleSubmit(selectedDocuments)}
            >
              {isLoading ? "Extracting dates..." : "Extract dates"}
            </Button>
          )}
          {hasError && (
            <ErrorAlert
              text="Something went wrong. Please try again."
              className="mt-5 px-5"
            />
          )}
          {!hasError && extractedDocuments.length > 0 && (
            <div className="mt-24">
              <ExtractedDatesCalendar extractedDocuments={extractedDocuments} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentExtractor;
