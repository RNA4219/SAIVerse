import os
from sqlalchemy import create_engine, event
from sqlalchemy.orm import sessionmaker
from pathlib import Path
from .paths import default_db_path
from .models import Base

# Determine Database URL
# Try to reuse the logic or just point to default path
db_path = default_db_path()
DATABASE_URL = f"sqlite:///{db_path}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} # Needed for SQLite with multiple threads
)


def _set_sqlite_pragmas(dbapi_connection, connection_record):
    """Enable WAL mode and busy_timeout for concurrent read/write safety.

    Without WAL mode, readers block on writers and vice versa,
    causing API endpoints to hang or fail with 'database is locked'
    when background tasks (pulse, polling) are writing simultaneously.
    """
    cursor = dbapi_connection.cursor()
    cursor.execute("PRAGMA journal_mode=WAL")
    cursor.execute("PRAGMA busy_timeout=5000")
    cursor.close()


event.listen(engine, "connect", _set_sqlite_pragmas)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
