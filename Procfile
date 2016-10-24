# Procfile for Heroku deployment.
# Usage:
# Create two remote repositories on Heroku, one for the server and one for the client.
# Then on the server set SERVER_DEPLOY=true and on the client set CLIENT_DEPLOY=true.
# Then, each heroku repo will have its own appropriate build commands.

if [ "$SERVER_DEPLOY" == "true" ]; then
	cd server
	web: NODE_ENV=production PORT=80 node app.js
else if [ "$CLINENT_DEPLOY" == "true" ]; then
	cd client
	npm run build
fi