import React, { useState } from "react";
import Calendar, { MonthView } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { isSameDay } from "../../utils/date";
import { ExtractedDocument } from "../DocumentExtractor/DocumentExtractor";
import Popover from "../Popover/Popover";
import "./index.css";

interface Props {
  extractedDocuments: ExtractedDocument[];
}
const ExtractedDatesCalendar = ({ extractedDocuments }: Props) => {
  const [isDetailPopoverOpen, setIsDetailPopoverOpen] = useState(false);
  const [popoverDetails, setPopoverDetails] =
    useState<ExtractedDocument | null>(null);

  const hasMatchingExtractedDate = (activeStartDate: Date) => {
    return extractedDocuments.some((doc) => {
      return doc.extracted_dates.some((extraction) => {
        return isSameDay(new Date(extraction.date), activeStartDate);
      });
    });
  };

  return (
    <>
      <Calendar
        locale="en-US"
        value={null}
        tileContent={(activeStartDate) => {
          if (hasMatchingExtractedDate(activeStartDate.date)) {
            return (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                onMouseEnter={() => {
                  console.log("entered");
                  setIsDetailPopoverOpen(true);
                }}
                onMouseLeave={() => {
                  console.log("left");
                  setIsDetailPopoverOpen(false);
                }}
              >
                <Popover />
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
    </>
  );
};

export default ExtractedDatesCalendar;
