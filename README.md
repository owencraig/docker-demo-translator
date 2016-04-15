# Translation Service

Dummy translation service for a presentation on docker. Translates some words from us english to international english and vice versa.

## Building the image

Run ```docker build -t translator translator``` from within the folder.

## Running the container

After building run ```docker run -p 3000:3000 --name="translator" --label="translator" translator``` which will start the app on port 3000 (and expose it to the host).

## API

Requests take the form of ```{HOST}:{PORT}/{To Language}/{From Language}/{Translation term}```