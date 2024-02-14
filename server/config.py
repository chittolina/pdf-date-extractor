from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "PDF Date Extraction API"
    app_description: str = "API to extract dates from PDF files"

    author_name: str = "Gabriel Chittolina"
    author_email: str = "gabrielchittolina1@gmail.com"

    uploads_folder: str = "uploads"
    origins: list[str] = ["*"]


settings = Settings()
