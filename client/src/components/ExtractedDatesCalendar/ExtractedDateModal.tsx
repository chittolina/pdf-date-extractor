import { Modal } from "antd";
import Button from "../Button/Button";
import config from "../../config";
import "./ExtractedDateModal.css";

interface Props {
  isOpen: boolean;
  title: string;
  link: string;
  snippet?: string;
  onClose: () => void;
}

const ExtractedDateModal = ({ isOpen, title, link, snippet }: Props) => {
  return (
    <Modal open={isOpen} centered footer={null} className="modal">
      <div className="flex flex-col items-center">
        <div className="flex items-start flex-col">
          <h4 className="mb-2">{title}</h4>
          <span className="mb-6">{snippet || "No snipped found."}</span>
        </div>

        <div>
          <Button
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
