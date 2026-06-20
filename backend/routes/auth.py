from fastapi import APIRouter, HTTPException, status

try:
    from ..database import get_database
    from .. import schemas, utils
except ImportError:
    from database import get_database
    import schemas, utils

router = APIRouter()

@router.post("/signup", response_model=schemas.Token)
def signup(user: schemas.UserCreate):
    db = get_database()
    existing_user = db["users"].find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    hashed_password = utils.get_password_hash(user.password)
    print(user.password)
    new_user = {
        "name": user.name,
        "email": user.email,
        "role": user.role,
        "hashed_password": hashed_password
    }
    result = db["users"].insert_one(new_user)
    user_doc = db["users"].find_one({"_id": result.inserted_id})

    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="User was created but could not be loaded.",
        )

    access_token = utils.create_access_token(subject=str(user_doc["_id"]))
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": user_doc
    }

@router.post("/login", response_model=schemas.Token)
def login(credentials: schemas.UserLogin):
    db = get_database()
    user_doc = db["users"].find_one({"email": credentials.email})
    
    if not user_doc or not utils.verify_password(credentials.password, user_doc["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
        
    access_token = utils.create_access_token(subject=str(user_doc["_id"]))
    return {"access_token": access_token, "token_type": "bearer", "user": user_doc}
