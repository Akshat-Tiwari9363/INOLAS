import json
import os
from pathlib import Path
from threading import Lock

from dotenv import load_dotenv
from bson import ObjectId
from pymongo import MongoClient
from pymongo.errors import PyMongoError

load_dotenv()

MONGODB_URL = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
DB_NAME = os.getenv("DB_NAME", "inolas")
MONGO_TIMEOUT_MS = int(os.getenv("MONGO_TIMEOUT_MS", "2000"))
LOCAL_DB_PATH = Path(os.getenv("LOCAL_DB_PATH", Path(__file__).with_name("local_db.json")))

_client = None
_local_lock = Lock()


class LocalInsertOneResult:
    def __init__(self, inserted_id: ObjectId):
        self.inserted_id = inserted_id


class LocalUsersCollection:
    def __init__(self, path: Path):
        self.path = path

    def _read_users(self) -> list[dict]:
        if not self.path.exists():
            return []

        with self.path.open("r", encoding="utf-8") as file:
            data = json.load(file)

        users = data.get("users", [])
        for user in users:
            if "_id" in user and isinstance(user["_id"], str) and ObjectId.is_valid(user["_id"]):
                user["_id"] = ObjectId(user["_id"])
        return users

    def _write_users(self, users: list[dict]) -> None:
        serializable_users = []
        for user in users:
            serializable_user = dict(user)
            serializable_user["_id"] = str(serializable_user["_id"])
            serializable_users.append(serializable_user)

        self.path.parent.mkdir(parents=True, exist_ok=True)
        with self.path.open("w", encoding="utf-8") as file:
            json.dump({"users": serializable_users}, file, indent=2)

    def find_one(self, query: dict) -> dict | None:
        with _local_lock:
            users = self._read_users()
            for user in users:
                if all(user.get(key) == value for key, value in query.items()):
                    return dict(user)
        return None

    def insert_one(self, document: dict) -> LocalInsertOneResult:
        with _local_lock:
            users = self._read_users()
            inserted_id = ObjectId()
            stored_document = {"_id": inserted_id, **document}
            users.append(stored_document)
            self._write_users(users)
        return LocalInsertOneResult(inserted_id)


class LocalDatabase:
    def __getitem__(self, name: str) -> LocalUsersCollection:
        if name != "users":
            raise KeyError(f"Unsupported local collection: {name}")
        return LocalUsersCollection(LOCAL_DB_PATH)


def get_client() -> MongoClient:
    global _client
    if _client is None:
        _client = MongoClient(
            MONGODB_URL,
            serverSelectionTimeoutMS=MONGO_TIMEOUT_MS,
            connectTimeoutMS=MONGO_TIMEOUT_MS,
            socketTimeoutMS=MONGO_TIMEOUT_MS,
        )
    return _client


def get_db():
    return get_client()[DB_NAME]


def get_database():
    try:
        db = get_db()
        get_client().admin.command("ping")
        return db
    except PyMongoError:
        return LocalDatabase()
