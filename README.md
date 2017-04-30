Manual Corpus Creator/Manual Creation Training Data  
and  
Manual Response Input Tool

This simple app allows a user to manual enter training data.  Meant for training a Naive Bayes Classifier, there is no reason why the data cannot be used for other purposes.

In addition, a response input tool was created to create responses depending on the label/classification of the input (i.e. sentence).  Aiding in chatbot creation.

Listens for HTTP on port 3500.  Change port in bin/www

Manual entry for labels.  Store in ./lib

mkdir -p ./lib  
echo "{}" > ./lib/training_data.json  
echo "{}" > ./lib/response_data.json  
npm install  
npm start  
