### Create a Slack app
1. Go to [https://api.slack.com/apps]
2. Click on 'Create New App' (Give App name and slack Workspace) and Create App.


### Basic Information
1. Click on your newly created App.
2. Go to 'Basic Information' and Add features and functionality for your app.
3. Go to 'Bots or App home' and may change bot settings like(display name/presence).
4. Add a Slash command (See **Add Slash Command** section below)
5. Enable Interactive components (See **Enable Interactive Components** below)
6. Navigate to the **OAuth & Permissions** page and select the following bot token scopes:
    * `commands`
    * `chat:write`
    * `users:read`
    * `im:write`
7. Click 'Save Changes' and install the app (You should get an OAuth access token after the installation)
8. Add Event Subscriptions and subscribe to 'app_mention' bot user event.


### Add Slash Command
1. Go back to the app settings and click on Slash Commands.
2. Click the 'Create New Command' button and fill in the following:
    * Command: `/report`
    * Request URL:To your server + `/command` or ngrok url(See **ngrok** section below)
    * Short description: `Report an Issue`
3. Click the 'Create New Command' button and fill in the following:
    * Command: `/severity`
    * Request URL:To your server + `/command` or ngrok url

### Enable Interactive Components
1. Go back to the app settings and click on Interactive Components.
2. Request URL:To your server + `/interactive` or ngrok url
3. Save the change.

### Set Your Credentials
1. Set the following environment variables to `.env`
    * `SLACK_ACCESS_TOKEN`: Copy from **OAuth & Permissions**
    * `SLACK_SIGNING_SECRET`: Copy from **Basic Information** 
2. Fetch them as process.env.SLACK_ACCESS_TOKEN/ process.env.SLACK_SIGNING_SECRET in your code.
2. Run the app using `npm start`.

### ngrok
1. npm i -g ngrok
2. ngrok http `your local port number in which your app is running`
3. ngrok will make your locally-hosted web server appear to be hosted on a subdomain of ngrok.com
4. Copy and paste the url provided by ngrok in Slack Api Request Url wherever needed as mentioed above.