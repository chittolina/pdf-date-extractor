import { Modal } from "antd";
import Button from "../Button/Button";
import config from "../../config";
import "./ExtractedDateModal.css";
import { ExtractedDateSnippet } from "../DocumentExtractor/DocumentExtractor";

interface Props {
  isOpen: boolean;
  title: string;
  link: string;
  snippet?: ExtractedDateSnippet;
}

const ExtractedDateModal = ({ isOpen, title, link, snippet }: Props) => {
  const getHighlightedText = (snippet: ExtractedDateSnippet) => {
    const leftSide = snippet.text.slice(0, snippet.highlight_start);
    const rightSide = snippet.text.slice(snippet.highlight_end);
    const highlighted = snippet.text.slice(
      snippet.highlight_start,
      snippet.highlight_end
    );

    return (
      <>
        <span>...{leftSide}</span>
        <strong>{highlighted}</strong>
        <span>{rightSide}...</span>
      </>
    );
  };

  return (
    <Modal open={isOpen} centered footer={null} className="modal">
      <div className="flex flex-col items-center">
        <div className="flex items-start flex-col w-full">
          <h4 className="mb-2">{title}</h4>
          <div className="mb-6">
            {snippet ? getHighlightedText(snippet) : "No snippet found"}
          </div>
        </div>

        <div className="w-full">
          <Button
            className="w-full"
            inverted
            onClick={() => {
              window.open(`${config.server}${link}`, "_blank");
            }}
          >
            View PDF
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExtractedDateModal;
