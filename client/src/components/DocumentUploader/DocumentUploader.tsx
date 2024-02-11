import React, { useState } from "react";
// TODO: Move this import somewhere else
import "./index.css";

interface Props {
  onSubmit: (files: File[]) => void;
  onFilesChanged: (files: File[]) => void;
}

const DocumentUploader = ({ onSubmit, onFilesChanged }: Props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const fileNames = Array.from(files).filter(
        (file) => !selectedFiles.some((f) => f.name === file.name)
      );

      const newFileList = [...selectedFiles, ...fileNames];
      setSelectedFiles(newFileList);
      onFilesChanged(newFileList);
    }
  };

  return (
    <div className="document-uploader">
      <h2 className="mb-30">Select your documents</h2>

      <div className="document-uploader-drag-drop-container">
        <div className="document-uploader-drag-drop">
          <p>Click here to select files or drag and drop.</p>
          <p>*Only PDF files are allowed.</p>
          <input
            type="file"
            accept="application/pdf"
            multiple
            onChange={handleFileUpload}
            className="document-uploader-helper-input"
          />
        </div>

        {selectedFiles.length > 0 && (
          <section className="document-uploader-selected-files">
            <h4 className="mt-2">Selected documents</h4>

            {selectedFiles.map((file) => (
              <div key={file.name}>
                <span>{file.name}</span>
              </div>
            ))}
            <button
              className="button mt-8"
              onClick={() => onSubmit(selectedFiles)}
            >
              Extract dates
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;
