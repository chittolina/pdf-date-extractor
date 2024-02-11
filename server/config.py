from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    app_name: str = "PDF Date Extraction API"
    app_description: str = "API to extract dates from PDF files"
    # api_version: str = "0.1.0",

    author_name: str = "Gabriel Chittolina"
    author_email: str = "gabrielchittolina1@gmail.com"

    public_folder: str = "public"
    origins: list[str] = ["*"]

settings = Settings()