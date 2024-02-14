from fastapi import APIRouter, HTTPException, UploadFile
from .documents_handler import handle_request

router = APIRouter()

@router.post("/extract")
async def upload_files(files: list[UploadFile]):
    try:
        return handle_request(files)
    except Exception as e:
        raise HTTPException(status_code=500, detail="Error processing files")
