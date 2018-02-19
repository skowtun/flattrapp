# Flattr Podcast App

**Quick-start guide**

```
$ git clone git@github.com:skowtun/flattrapp.git
$ cd flattrapp/
$ sudo npm install
$ open http://myflattrpodcast.sergejkowtun.de
```

# Index

- [General](#general)
- [Installation](#installation)


<a name="general"></a>
# General

### URLs

You can reach the project over the following url http://myflattrpodcast.sergejkowtun.de
Please note!!! If you reach the "flattr.com" page via the authorization button to authorize the "myFlattrPodcast" app, 
you have to change the protocol from https:// to http://, otherwise you will get an "invalid csrf token" "Error and you can not authorize the app.

Example:

SSL-URL
**(https://flattr.com/oauth/authorize?client_id=vlp51YdLZfHzaVbrVXOOlo9zV4vZyeMl&response_type=code&redirect_uri=http://myflattrpodcast.sergejkowtun.de/dashboard.html&scope=flattr)**

Please use this one
**(http://flattr.com/oauth/authorize?client_id=vlp51YdLZfHzaVbrVXOOlo9zV4vZyeMl&response_type=code&redirect_uri=http://myflattrpodcast.sergejkowtun.de/dashboard.html&scope=flattr)** 

### SSL

Sorry!! I have no SSL-Certificate for the domain myflattrpodcast.sergejkowtun.de, 
therefore url must be called via the insecure http protocol.


### Breakpoints

The app was designed as a mobile first and that adds to the larger display sizes. Not all display sizes were considered and was primarily focused on "mobile first". Therefore, if the app is called in the browser, it would be advisable to turn on the mobile user-Agrent.


<a name="installation"></a>
# Installation


### Installation

Checkout project:

```
$ git clone git@github.com:skowtun/flattrapp.git
$ cd flattrapp/
```

Installation of required node_modules:

```
$ sudo npm install
```

Project-URL:

**(http://myflattrpodcast.sergejkowtun.de)**


### 3rd Party

- Bootstrap CSS/JS version 4.0.0
- jQuery version 3.3.1
- Google Fonts: Roboto, Poppins