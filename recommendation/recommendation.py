from surprise import Dataset
from surprise.model_selection import train_test_split
from surprise import accuracy
from surprise.model_selection import cross_validate
from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
movie_rating = Dataset.load_builtin("ml-100k")

trainset, testset = train_test_split(movie_rating, test_size=0.2)

from surprise import KNNWithMeans

k = 40
sim_option = {
        'name' : 'pearson', 'user_based' : False
}

res = KNNWithMeans(
        k = k, min_k =5, sim_option = sim_option
)

res.fit(trainset)
res.sim

predictions = res.test(testset)
accuracy.rmse(predictions)

cross_validate(res, movie_rating, measures=["RMSE", "MAE"], cv = 5, verbose=True)

def get_recommendation(uid) :
    result = []

    for i in range(1682) :
        iid = str(i)
        pred = res.predict(uid, iid, r_ui = 4, verbose = True)
        result.append({"movieId" : iid, "rating" : pred.est})

    sorted_result = sorted(result, key = lambda d : d["rating"], reverse=True)
    return sorted_result

@app.route("/")
def hello_world():
    return "Recommendation System Works"

@app.route("/recommend/")
def recommend() :
    userId = request.args.get("userId", type=str);
    result = get_recommendation(userId);
    return jsonify(result[:15])

if __name__ == "__main__" :
    app.run(host='0.0.0.0', port="3058")
