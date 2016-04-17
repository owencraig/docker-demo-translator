# Translation Service

Dummy translation service for a presentation on docker. Translates some words from us english to international english and vice versa.

## Building the image

Run ```docker build -t translator translator``` from within the folder.

## Running the container

After building run ```docker run -p 3000:3000 --name="translator" --label="translator" translator``` which will start the app on port 3000 (and expose it to the host).

## API

Requests take the form of ```{HOST}:{PORT}/{To Language}/{From Language}/{Translation term}```

And will return a JSON object of the form

``` json
{
    "source": "<APP_NAME + start time>",
    "original": "<input term>",
    "translated": "<translated term or input in the case of no translation found>"
}
```

## Environment Variables
Variable | Default | Description
--- | --- | ---
COOL_DOWN | 0 | The time the app will block between requests
APP_PORT | 3000 | The port the application will listen on
APP_NAME | trans | The start of the of source in the response 

## Notes
The app is intentionally serial in its connections to showcase how scaling affects response times in an application.