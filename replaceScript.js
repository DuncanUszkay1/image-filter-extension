const REPLACEMENT_IMAGE = 'https://pbs.twimg.com/profile_images/1061335246702923776/CKaye4xX_400x400.jpg'
var imgs = document.getElementsByTagName("img")
var img_src = [...imgs].map(img => img.src)
chrome.runtime.sendMessage({imgs: img_src}, function(response) {
  for(var i = 0; i < imgs.length; i++){
    if(response.imgs[i]){
      imgs[i].src = REPLACEMENT_IMAGE
    }
  }
});
