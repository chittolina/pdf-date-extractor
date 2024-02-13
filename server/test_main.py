from fastapi.testclient import TestClient
import main

client = TestClient(main.app)


def test_date_extraction():
    response = client.post(
        "/documents/extract",
        files=[
            (
                "files",
                (
                    "ada_1pg.pdf",
                    open("examples/ada_1pg.pdf", "rb"),
                    "application/pdf",
                ),
            ),
            ("files", ("fw4.pdf", open("examples/fw4.pdf", "rb"), "application/pdf")),
            (
                "files",
                (
                    "InsertMe.pdf",
                    open("examples/InsertMe.pdf", "rb"),
                    "application/pdf",
                ),
            ),
        ],
    )
    assert response.status_code == 200
    for document in response.json():
        assert document in expected_json


expected_json = [
    {
        "file_name": "fw4.pdf",
        "title": "2020 Form W-4",
        "link": "/public/fw4.pdf",
        "extracted_dates": [
            {
                "date": "2021-02-16T00:00:00",
                "snippet": {
                    "text": "t a new Form W-4 by February 16, 2021. Your privacy. If y",
                    "highlight_start": 20,
                    "highlight_end": 37,
                },
            },
            {"date": "2022-07-24T00:00:00", "snippet": None},
        ],
    },
    {
        "file_name": "ada_1pg.pdf",
        "title": "ada_1pg.pdf",
        "link": "/public/ada_1pg.pdf",
        "extracted_dates": [
            {"date": "2021-02-09T00:00:00", "snippet": None},
            {
                "date": "1815-12-10T00:00:00",
                "snippet": {
                    "text": ". Augusta Ada Byron 10 December 1815 London, England D i",
                    "highlight_start": 20,
                    "highlight_end": 36,
                },
            },
            {
                "date": "1852-11-27T00:00:00",
                "snippet": {
                    "text": "on, England D i e d 27 November 1852 (aged 36) Marylebon",
                    "highlight_start": 20,
                    "highlight_end": 36,
                },
            },
            {
                "date": "1815-12-10T00:00:00",
                "snippet": {
                    "text": "elace ( née Byron ; 10 December 1815 – 27 November 1852 ",
                    "highlight_start": 20,
                    "highlight_end": 36,
                },
            },
            {
                "date": "1852-11-27T00:00:00",
                "snippet": {
                    "text": " 10 December 1815 – 27 November 1852 ) was an English ma",
                    "highlight_start": 20,
                    "highlight_end": 36,
                },
            },
        ],
    },
    {
        "file_name": "InsertMe.pdf",
        "title": "InsertMe.pdf",
        "link": "/public/InsertMe.pdf",
        "extracted_dates": [
            {"date": "2020-11-11T00:00:00", "snippet": None},
            {
                "date": "2020-11-11T00:00:00",
                "snippet": {
                    "text": " Visualization Team.11/11/2020 Iterating Over and ",
                    "highlight_start": 20,
                    "highlight_end": 30,
                },
            },
        ],
    },
]
