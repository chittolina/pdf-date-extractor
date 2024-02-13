FROM python:3.12

# Set the working directory in the container
WORKDIR /app

# Copy the Pipfile and Pipfile.lock to the container
COPY Pipfile Pipfile.lock /app/

# Install dependencies
RUN pip install pipenv && pipenv install --deploy --ignore-pipfile

# Copy the local code to the container
COPY . /app/

# Expose the port that your FastAPI app will run on
EXPOSE 8000

# Command to run your application
CMD ["pipenv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
