# Sajt

It is project that is runring your notes in Mardown format into website

Layout might be created in pug or html 

Publishing throught SSH (ftp and dav is planned)

### Initialize project in current directory with default theme

    sajt init
    sajt init "Project name"

### start server

    sajt build 
        --clean # remove local files that are not revelant to the project anymore
        --publish or --serve -p 3000 --watch # Publish or serve with options -p PORT, --watch observe changes and rebuild the page if thare are any 
        --config config.yaml or -c config.yaml
        --private # include private resources as well

    sajt publish 
        --override # default is skip, if file exists, do not change it
        --clean    # remove remote files that not longer exists in the build folder

### Project structure 

.sajt/config.yaml # default config, you can override values pointing secundary file using `--config` flag
.sajt/media  # copy all files as they are
.sajt/layouts # pug files that describes the layout the pages


### Development 

Install local package

npm link sajt