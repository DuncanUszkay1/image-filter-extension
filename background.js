let mobilenet

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    predict_all(request.imgs, sendResponse)
    return true;
  }
);

async function loadModel() {
}

async function predict_all(imgs, sendResponse) {
  mobilenet = await tf.loadModel(MOBILENET_MODEL_PATH);
  loadModel()
  .then(function() {
    Promise.all(imgs.map(predict))
    .then(Log)
    .then(function(result) {
      sendResponse({ imgs: result })
    })
  })
}

async function predict(src) {
  return loadImage(src)
  .then(Log)
  .then(toTensor)
  .then(Log)
  .then(runModel)
  .then(Log)
  .then(isAnime)
}

async function isAnime(data) {
  return data[REPLACEMENT_CATEGORY] > PROBABILITY_THRESHOLD
}

async function runModel(tensor) {
  var prediction = mobilenet.predict(tensor)
  return await prediction.data()
}

async function toTensor(image) {
  const tensor = tf.fromPixels(image).toFloat();
  const offset = tf.scalar(TF_OFFSET);
  const modelShape = [1, IMAGE_SIZE, IMAGE_SIZE, 3];
  const normalized = tensor.sub(offset).div(offset);
  const batched = normalized.reshape(modelShape);
  return batched;
}

async function loadImage(src) {
  const image = new Image();
  return new Promise((resolve, reject) => {
    image.onload = function () {
      resolve(image)
    }
    image.width = IMAGE_SIZE
    image.height = IMAGE_SIZE
    image.src = src;
  });
}

async function Log(arg) {
  if(VERBOSE_LOGGING){ console.log(arg) }
  return arg
}

