var SpeechToText = function(success,error){
    
    this.defLang = "en";
    this.maxAlternatives = 20;
    this.isContinuous = true;
    this.allowInterimResults = false;
    this.lastTranscript = "";

    this.recognition = null;
    this.finalTranscript = null;

    this.error = error;
    this.success = success;
    this.onresult = null;
    this.onerror = null;
    this.onEndFunction = null;

    window.SpeechRecognition = window.SpeechRecognition       ||
                               window.webkitSpeechRecognition || 
                               window.mozSpeechRecognition;
                         

    var self = this;
    setTimeout(function(){
        self.recognition = new window.SpeechRecognition();
        self.recognition.onresult = function(event){
            var result = event.results[event.resultIndex];
            self.onresult && self.onresult(event);
            self._createString(result, event.resultIndex);
        };
        self.recognition.onerror = function(event){
            self.onerror && self.onerror(event);
        };
         if(!self.isSupported()){
            self.error && self.error();
        }else{
            self.success && self.success();
        }
    });
};

SpeechToText.prototype.isSupported = function () {
    return window.SpeechRecognition != null;
};

SpeechToText.prototype.onResult = function(onResult){
    this.onresult = onResult;
};

SpeechToText.prototype.onError = function(onError){
    this.onerror = onError;
};

SpeechToText.prototype.start = function () {
    this.finalTranscript = null;
    this.recognition.lang = this.defLang;
    this.recognition.continuous = this.isContinuous;
    this.recognition.interimResults = this.allowInterimResults;
    this.recognition.maxAlternatives = this.maxAlternatives;
    this.recognition.start();
};

SpeechToText.prototype.stop = function (onStop) {
    this.recognition.stop();
    this.onEndFunction = onStop;
};

SpeechToText.prototype.clearText = function(){
    this.finalTranscript = "";
};

SpeechToText.prototype.getText = function () {
    return this.finalTranscript;
};

//--------------------------------------------
SpeechToText.prototype.setIsContinous = function(isContinuous){
    this.isContinuous = isContinuous
};

SpeechToText.prototype.setAllowInterimResults = function(allowInterimResults){
    this.interimResults = allowInterimResults;
};

SpeechToText.prototype.setMaxAlternatives = function(maxAlternatives){
    this.maxAlternatives = maxAlternatives;
};

SpeechToText.prototype.setLanguage = function(lang){
    this.defLang = lang;
};

//--------------------------------------------

SpeechToText.prototype.getAllSupportedLanguages = function(){
    return [
        {key : "en", value : "English" },
        {key : "fr", value : "Français" },
        {key : "de", value : "Deutsch" },
        {key : "ja", value : "日本語" },
        {key : "zh-cn", value : "中文" },
        {key : "ru", value : "русский" },
        {key : "he", value : "עברית" }
    ];
}

SpeechToText.prototype._createString = function(speechRecognitionResult, resultIndex){
    for(var i = 0; i < speechRecognitionResult.length; i++){
        var alternative = speechRecognitionResult[i];
        if (i == 0) {
          var prefix = _commonPrefix(alternative.transcript, this.lastTranscript);
        } else {
            var prefix = '';
            this.lastTranscript = '';
        }
    }
    var transcript = prefix ?  "" + prefix + "" + alternative.transcript.replace(prefix, "") : alternative.transcript;
    this.lastTranscript = alternative.transcript;
    this.finalTranscript = transcript;
    this.onEndFunction();
}


function _commonPrefix(a, b){
  if (!a || !b){
    return '';
  }
  var result = '';
  for (var i = 0; i < a.length; i++) {
    var ca = a.charAt(i);
    var ba = b.charAt(i);
    if (ca == ba){
      result += ca;
    }
  }
  return result;
}
    