import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "../../utils/date";
import { ExtractedDocument } from "../DocumentExtractor/DocumentExtractor";
import Popover from "../Popover/Popover";
import "./index.css";
import Button from "../Button/Button";
import config from "../../config";

interface Props {
  extractedDocuments: ExtractedDocument[];
  isLoading?: boolean;
}
const ExtractedDatesCalendar = ({ extractedDocuments }: Props) => {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [isDetailPopoverOpen, setIsDetailPopoverOpen] = useState<string>("");
  const [popoverDetails, setPopoverDetails] = useState<{
    title: string;
    snippet: string;
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
    setIsDetailPopoverOpen("");
    setCurrentDate(oldestDate);
  };

  const jumpToLatest = () => {
    const dates = getFlattenedDates();
    if (dates.length === 0) {
      return;
    }
    const latestDate = dates.sort((a, b) => b.getTime() - a.getTime())[0];
    setIsDetailPopoverOpen("");
    setCurrentDate(latestDate);
  };

  const getFlattenedDates = () => {
    const extractedDates = extractedDocuments.flatMap(
      (doc) => doc.extracted_dates
    );
    const dates = extractedDates.map((extraction) => new Date(extraction.date));

    return dates;
  };

  const updateHoveredExtraction = (activeStartDate: Date) => {
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

    setPopoverDetails({
      title: document.title,
      snippet: extractedDate?.snippet || "No snippet found.",
      link: document.link,
    });
  };

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
                    onMouseOver={() => {
                      updateHoveredExtraction(date);
                      setIsDetailPopoverOpen(
                        `${date.getMonth()}-${date.getDate()}`
                      );
                    }}
                    onMouseOut={() => {
                      setIsDetailPopoverOpen("");
                      setPopoverDetails(null);
                    }}
                  >
                    {isDetailPopoverOpen ===
                      `${date.getMonth()}-${date.getDate()}` &&
                      popoverDetails && (
                        <Popover>
                          <div className="flex items-start flex-col">
                            <h4 className="mb-2">{popoverDetails.title}</h4>
                            <span className="mb-6">
                              {popoverDetails.snippet}
                            </span>
                          </div>
                          <Button
                            inverted
                            onClick={() => {
                              window.open(
                                `${config.server}${popoverDetails.link}`,
                                "_blank"
                              );
                            }}
                          >
                            View PDF
                          </Button>
                        </Popover>
                      )}
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
