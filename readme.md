bot to assess comparitive similarity of incoming file with a set of topic model elements
This is used to pre-screen files before submitting them to the filelibrian.

The intent is to create a topic model that is supervise trained to using a set of files that we want to keep for ingestion: eg: we want the fileCrawler to only bring in geotechnical reports. The judgebot is trained
to generate a model using geotechnical reports. Files are passed by the judgebot that then decideds if the file is in fact a geotechnical report if the phenotype match is above a certain threshold.