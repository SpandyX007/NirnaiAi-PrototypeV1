from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import os

app = Flask(__name__)
CORS(app)

# MongoDB Setup
uri = "mongodb+srv://codesrisha:Zygf4fUYScWteOWk@cluster0.my38l.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(uri)
db = client["abdsa"]
collection = db["casess"]

def serialize_case(case):
    return {
        "id": str(case["_id"]),
        "petitioner": case.get("petitioner", ""),
        "respondent": case.get("respondent", ""),
        "dateOfJudgment": case.get("date_of_judgment", ""),
        "citationNumber": case.get("citation", ""),
        "judgeName": case.get("judge_name", ""),
        "court": case.get("court", ""),
        "bench": case.get("bench", "")
    }

@app.route("/cases/search", methods=["GET"])
def search_cases():
    query = {}

    # Full-text fields
    if "petitioner" in request.args:
        query["petitioner"] = {"$regex": request.args["petitioner"], "$options": "i"}
    if "respondent" in request.args:
        query["respondent"] = {"$regex": request.args["respondent"], "$options": "i"}
    if "citation" in request.args:
        query["citation"] = {"$regex": request.args["citation"], "$options": "i"}
    if "bench" in request.args:
        query["bench"] = {"$regex": request.args["bench"], "$options": "i"}

    # Date filtering
    date_query = {}
    if "date_from" in request.args:
        date_query["$gte"] = request.args["date_from"]
    if "date_to" in request.args:
        date_query["$lte"] = request.args["date_to"]
    if date_query:
        query["date_of_judgment"] = date_query

    # Pagination
    limit = int(request.args.get("limit", 50))
    skip = int(request.args.get("skip", 0))

    try:
        results = collection.find(query).skip(skip).limit(limit)
        return jsonify([serialize_case(case) for case in results])
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/cases/details/<string:citation>", methods=["GET"])
def get_case_details(citation):
    try:
        normalized_citation = citation.replace("%20", " ")
        case = db["casess"].find_one({"citation": normalized_citation})
        if not case:
            return jsonify({"error": "Case not found"}), 404
        case["_id"] = str(case["_id"])  # Convert ObjectId to string
        return jsonify({
            "citation": case.get("citation", ""),
            "petitioner": case.get("petitioner", ""),
            "respondent": case.get("respondent", ""),
            "date_of_judgment": case.get("date_of_judgment", ""),
            "court": case.get("court", ""),
            "bench": case.get("bench", ""),
            "judgment": case.get("judgment", "No judgment available")
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/cases/fields", methods=["GET"])
def get_random_document():
    try:
        # Fetch a random document from the collection
        sample_document = collection.aggregate([{"$sample": {"size": 1}}])
        random_document = next(sample_document, None)
        
        if not random_document:
            return jsonify({"error": "No documents found in the collection"}), 404

        # Convert ObjectId to string for JSON serialization
        random_document["_id"] = str(random_document["_id"])
        return jsonify(random_document)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
