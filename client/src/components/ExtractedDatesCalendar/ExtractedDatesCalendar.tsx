import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "../../utils/date";
import {
  ExtractedDateSnippet,
  ExtractedDocument,
} from "../DocumentExtractor/DocumentExtractor";
import "./ExtractedDatesCalendar.css";
import Button from "../Button/Button";
import ExtractedDateModal from "./ExtractedDateModal";

interface Props {
  extractedDocuments: ExtractedDocument[];
  isLoading?: boolean;
}
const ExtractedDatesCalendar = ({ extractedDocuments }: Props) => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [currentOpenModal, setCurrentOpenModal] = useState<string>("");
  const [modalDetails, setModalDetails] = useState<{
    title: string;
    snippet?: ExtractedDateSnippet;
    link: string;
  } | null>(null);

  useEffect(() => {
    jumpToLatest();
  }, [extractedDocuments]);

  const hasMatchingExtractedDate = (activeStartDate: Date) => {
    return extractedDocuments.some((doc) => {
      return doc.extracted_dates.some((extraction) => {
        return isSameDay(new Date(extraction.date), activeStartDate);
      });
    });
  };

  const jumpToOldest = () => {
    const dates = getFlattenedDates();
    if (dates.length === 0) {
      return;
    }
    const oldestDate = dates.sort((a, b) => a.getTime() - b.getTime())[0];
    setCurrentOpenModal("");
    setCurrentDate(oldestDate);
  };

  const jumpToLatest = () => {
    const dates = getFlattenedDates();
    if (dates.length === 0) {
      return;
    }
    const latestDate = dates.sort((a, b) => b.getTime() - a.getTime())[0];
    setCurrentOpenModal("");
    setCurrentDate(latestDate);
  };

  const getFlattenedDates = () => {
    const extractedDates = extractedDocuments.flatMap(
      (doc) => doc.extracted_dates
    );
    const dates = extractedDates.map((extraction) => new Date(extraction.date));

    return dates;
  };

  const updateModalDetails = (activeStartDate: Date) => {
    const document = extractedDocuments.find((doc) => {
      return doc.extracted_dates.some((extraction) => {
        return isSameDay(new Date(extraction.date), activeStartDate);
      });
    });

    if (!document) {
      return;
    }

    const extractedDate = document.extracted_dates.find((extraction) => {
      return isSameDay(new Date(extraction.date), activeStartDate);
    });

    setModalDetails({
      title: document.title,
      snippet: extractedDate?.snippet,
      link: document.link,
    });
  };

  const getModalOpenKey = (date: Date) =>
    `${date.getMonth()}-${date.getDate()}`;

  return (
    <>
      {currentDate && (
        <>
          <Calendar
            locale="en-US"
            // Workaround to force re-render (see https://github.com/wix/react-native-calendars/issues/1450)
            key={currentDate + ""}
            value={currentDate}
            tileContent={({ date }) => {
              if (hasMatchingExtractedDate(date)) {
                return (
                  <div
                    className="w-full h-full absolute top-0 left-0 text-black"
                    onClick={() => {
                      setCurrentOpenModal(
                        currentOpenModal === getModalOpenKey(date)
                          ? ""
                          : getModalOpenKey(date)
                      );
                      updateModalDetails(date);
                    }}
                  >
                    <ExtractedDateModal
                      isOpen={currentOpenModal === getModalOpenKey(date)}
                      title={modalDetails?.title || ""}
                      snippet={modalDetails?.snippet}
                      link={modalDetails?.link || ""}
                    />
                  </div>
                );
              }
            }}
            tileClassName={(activeStartDate) => {
              if (hasMatchingExtractedDate(activeStartDate.date)) {
                return "react-calendar__tile--active";
              }
            }}
          ></Calendar>

          <div className="flex mt-6">
            <Button className="w-1/2" onClick={jumpToOldest}>
              Jump to oldest
            </Button>
            <Button className="w-1/2 ml-2" onClick={jumpToLatest}>
              Jump to latest
            </Button>
          </div>
        </>
      )}
    </>
  );
};

export default ExtractedDatesCalendar;
