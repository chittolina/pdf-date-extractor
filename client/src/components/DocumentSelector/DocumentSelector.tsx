import { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import "./DocumentSelector.css";

interface Props {
  extractedCount?: { [key: string]: number };
  onSubmit: (files: File[]) => void;
  onFilesChanged: (files: File[]) => void;
}

export const DocumentSelector = ({ onFilesChanged, extractedCount }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileDrop = (acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.filter(
      (file) => !selectedFiles.some((f) => f.name === file.name)
    );
    const newSelectedFiles = [...selectedFiles, ...newFiles];
    setSelectedFiles(newSelectedFiles);
    onFilesChanged(newSelectedFiles);
  };

  const handleFileRemoved = (file: File) => {
    const newSelectedFiles = selectedFiles.filter((f) => f.name !== file.name);
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
      <h2 className="mb-30">Select documents to extract dates from</h2>
      <div className="document-uploader-drag-drop-container">
        <Dropzone
          onDropAccepted={handleFileDrop}
          accept={{ "application/pdf": [".pdf"] }}
          maxFiles={5}
        >
          {({ getRootProps, getInputProps }) => (
            <div className="document-uploader-drag-drop" {...getRootProps()}>
              <p>Click here to select files or drag and drop.</p>
              <p className="text-xs">
                *Only PDF files are allowed. Up to 5 files.
              </p>
              <input
                className="document-uploader-helper-input"
                {...getInputProps()}
              />
            </div>
          )}
        </Dropzone>

        <section className="document-uploader-selected-files">
          {selectedFiles.length === 0 && (
            <h4 className="mt-2">No files selected.</h4>
          )}
          {selectedFiles.length > 0 && <h4 className="mt-2">Documents</h4>}

          {selectedFiles.map((file) => (
            <div
              key={file.name}
              className="flex justify-between whitespace-nowrap mb-1"
            >
              <span className="document-uploader-file-name">{file.name}</span>
              <span className="text-sm font-bold">
                {extractedCount?.[file.name] !== undefined &&
                  getExtractedCountLabel(extractedCount?.[file.name])}

                <DeleteOutlined
                  className="ml-4"
                  onClick={() => {
                    handleFileRemoved(file);
                  }}
                />
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
};
