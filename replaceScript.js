const REPLACEMENT_IMAGE = 'https://wp-media.patheos.com/blogs/sites/348/2016/02/Put-to-death-therefore.jpg'
var imgs = document.getElementsByTagName("img")
var img_src = [...imgs].map(img => img.src)
chrome.runtime.sendMessage({imgs: img_src}, function(response) {
  for(var i = 0; i < imgs.length; i++){
    if(response.imgs[i]){
      imgs[i].src = REPLACEMENT_IMAGE
    }
  }
});
