## SpeechToTextJs

Single Library for Client Side Speech Detection

This library is based on html5's [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), Currently following browsers support [SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)

* Chrome


### Usage
* NPM : `npm install speechtotextjs --save`
* Bower : `bower install speechtotextjs --save`

Or linking script files

```html
<script type="text/javascript" src="../dist/SpeechToTextJs.min.js"></script>
```

###Sample Code
Please see the `demo` folder for working solution

```

    var speecht2text = new SpeechToText(function(){
        speecht2text.setIsContinous(true);
        speecht2text.setAllowInterimResults(false);
        speecht2text.setMaxAlternatives(20);
        var lang = speecht2text.getAllSupportedLanguages();
        speecht2text.setLanguage((lang[0]).key);  // english

        speecht2text.start();
        setTimeout(function(){
            speecht2text.stop(function(){
                console.log(speecht2text.getText());
            });
        },5000);
    });

```


## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing
**Bug fixes** and **new features** can be proposed using [pull requests](https://github.com/imalhasaranga/SpeechToTextJs/pulls).
Please read the [contribution guidelines](CONTRIBUTION.md) before submitting a pull request.

## Credits

- [Imal Hasaranga Perera](https://github.com/imalhasaranga)
- [All Contributors](../../contributors)


## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
