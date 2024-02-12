import { useState } from "react";
import Dropzone from "react-dropzone";
import "./index.css";

interface Props {
  extractedCount?: { [key: string]: number };
  onSubmit: (files: File[]) => void;
  onFilesChanged: (files: File[]) => void;
}

const DocumentSelector = ({ onFilesChanged, extractedCount }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.filter(
      (file) => !selectedFiles.some((f) => f.name === file.name)
    );
    const newSelectedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(newSelectedFiles);
    onFilesChanged(newSelectedFiles);
  };

  const getExtractedCountLabel = (extractedCount: number) => {
    return (
      <>
        <span className="font-bold">{extractedCount} date(s)</span>
        <span className="font-normal"> extracted</span>
      </>
    );
  };

  return (
    <div className="document-uploader">
      <h2 className="mb-30">Select your documents</h2>
      <div className="document-uploader-drag-drop-container">
        <Dropzone
          onDropAccepted={handleFileDrop}
          accept={{ "application/pdf": [".pdf"] }}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="document-uploader-drag-drop" {...getRootProps()}>
              <p>Click here to select files or drag and drop.</p>
              <p>*Only PDF files are allowed.</p>
              <input
                className="document-uploader-helper-input"
                {...getInputProps()}
              />
            </div>
          )}
        </Dropzone>

        {selectedFiles.length > 0 && (
          <section className="document-uploader-selected-files">
            <h4 className="mt-2">Selected documents</h4>

            {selectedFiles.map((file) => (
              <div
                key={file.name}
                className="flex justify-between whitespace-nowrap"
              >
                <span className="document-name">{file.name}</span>
                <span className="text-sm font-bold">
                  {extractedCount?.[file.name] !== undefined &&
                    getExtractedCountLabel(extractedCount?.[file.name])}
                </span>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default DocumentSelector;
