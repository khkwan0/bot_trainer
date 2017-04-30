Bot trainer for Naive Bayes Classifier.

Listens for HTTP on port 3500.  Change port in bin/www

Manual entry for labels.  Store in ./lib

mkdir -p ./lib  
echo "{}" > ./lib/training_data.json  
echo "{}" > ./lib/response_data.json  
npm install  
npm start  
