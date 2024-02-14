import { useEffect, useState } from "react";
import documentsService from "../../services/documents";
import { DocumentSelector } from "../DocumentSelector/index";
import { ExtractedDatesCalendar } from "../ExtractedDatesCalendar";
import { Button } from "../Button";
import { ErrorAlert } from "../ErrorAlert";
import "./DocumentExtractor.css";

export interface ExtractedDateSnippet {
  text: string;
  highlight_start: number;
  highlight_end: number;
}
export interface ExtractedDate {
  date: Date;
  snippet?: ExtractedDateSnippet;
}
export interface ExtractedDocument {
  file_name: string;
  title: string;
  link: string;
  extracted_dates: ExtractedDate[];
}

export const DocumentExtractor = () => {
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

    const payload = buildSubmitRequestPayload(files);

    try {
      const extractedDocuments =
        await documentsService.extractDatesFromDocuments(payload);
      setExtractedDocuments(extractedDocuments);
    } catch (err) {
      setHasError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    calculateExtractedCount(extractedDocuments);
  }, [extractedDocuments]);

  useEffect(() => {
    const remainingExtractedDocuments = extractedDocuments.filter((doc) =>
      selectedDocuments.some((file) => file.name === doc.file_name)
    );
    setExtractedDocuments(remainingExtractedDocuments);
  }, [selectedDocuments]);

  const buildSubmitRequestPayload = (files: File[]) => {
    const formData = new FormData();
    for (const file of files) {
      formData.append("files", file);
    }
    return formData;
  };

  const calculateExtractedCount = (extractedDocuments: ExtractedDocument[]) => {
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
          <Button
            disabled={selectedDocuments.length === 0}
            isLoading={isLoading}
            className="w-full my-4"
            onClick={() => handleSubmit(selectedDocuments)}
          >
            {isLoading ? "Extracting dates..." : "Extract dates"}
          </Button>
          {hasError && (
            <ErrorAlert
              text="Something went wrong. Please try again."
              className="mt-5 px-5"
            />
          )}
          {extractedDocuments.length > 0 && (
            <div className="mt-12">
              <ExtractedDatesCalendar extractedDocuments={extractedDocuments} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentExtractor;
