# image-filter-extension
Plugging in TFJS into a chrome extension to replace images if they meet a certain classification. 

Right now it's replacing pictures of geese with that bible verse image because that's easy to do with mobilenet, but it should work with any model if you configure it.

You can configure what model is being used, what category to report, the probability threshold to filter at, and some other model parameters in config.js.

You can change what the replacement image is by changing the first line of replaceScript.js.
