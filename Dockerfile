# Базовый образ
FROM python:3.10-slim

# Устанавливаем системные зависимости
RUN apt-get update && apt-get install -y \
    build-essential \
    default-libmysqlclient-dev \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости и проект
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

# Переменные окружения (лучше через docker-compose)
ENV FLASK_APP=run.py

# Открываем порт
EXPOSE 5000

CMD ["sh", "-c", "flask run --host=0.0.0.0 --port=5000"]
