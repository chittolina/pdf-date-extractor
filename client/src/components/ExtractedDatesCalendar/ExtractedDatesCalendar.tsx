import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "../../utils/date";
import "./ExtractedDatesCalendar.css";
import {
  Button,
  ExtractedDateSnippet,
  ExtractedDocument,
  ExtractedDateModal,
} from "../";

interface Props {
  extractedDocuments: ExtractedDocument[];
}

export const ExtractedDatesCalendar = ({ extractedDocuments }: Props) => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [modalDetails, setModalDetails] = useState<{
    title: string;
    snippet?: ExtractedDateSnippet;
    link: string;
  } | null>(null);

  useEffect(() => {
    jumpToLatest();
  }, [extractedDocuments]);

  useEffect(() => {
    if (currentDate) {
      updateModalDetails(currentDate);
    }
  }, [currentDate]);

  const hasMatchingExtractedDate = (activeStartDate: Date) =>
    extractedDocuments.some((doc) =>
      doc.extracted_dates.some((extraction) =>
        isSameDay(extraction.date, activeStartDate)
      )
    );

  const jumpToOldest = () => {
    const dates = getFlattenedDates();
    if (dates.length === 0) {
      return;
    }
    const oldestDate = dates.sort((a, b) => a.getTime() - b.getTime())[0];
    setCurrentDate(oldestDate);
  };

  const jumpToLatest = () => {
    const dates = getFlattenedDates();
    if (dates.length === 0) {
      return;
    }
    const latestDate = dates.sort((a, b) => b.getTime() - a.getTime())[0];
    setCurrentDate(latestDate);
  };

  const getFlattenedDates = () => {
    const extractedDates = extractedDocuments.flatMap(
      (doc) => doc.extracted_dates
    );
    const dates = extractedDates.map((extraction) => extraction.date);
    return dates;
  };

  const updateModalDetails = (activeStartDate: Date) => {
    const document = extractedDocuments.find((doc) =>
      doc.extracted_dates.some((extraction) =>
        isSameDay(extraction.date, activeStartDate)
      )
    );

    if (!document) {
      return;
    }

    const extractedDate = document.extracted_dates.find((extraction) =>
      isSameDay(extraction.date, activeStartDate)
    );

    setModalDetails({
      title: document.title,
      snippet: extractedDate?.snippet,
      link: document.link,
    });
  };

  return (
    <>
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
                    updateModalDetails(date);
                  }}
                />
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

        {modalDetails && (
          <ExtractedDateModal
            isOpen={!!modalDetails}
            title={modalDetails?.title || ""}
            snippet={modalDetails?.snippet}
            link={modalDetails?.link || ""}
            onCancel={() => setModalDetails(null)}
          />
        )}
      </>
    </>
  );
};
