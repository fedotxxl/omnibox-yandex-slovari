angular.module('app').
    config(function($translateProvider) {
        var en = {
            lang: {
                ru: "Russian",
                en: "English",
                de: "German",
                fr: "French",
                it: "Italian",
                es: "Spanish",
                uk: "Ukrainian",
                kk: "Kazakh",
                tr: "Turkish"
            },
            omni: {
                settings: {
                    saved: "Saved",
                    menu: {
                        main: 'Main',
                        advanced: 'Other',
                        rateIt: 'Rate it'
                    },
                    main: {
                        label: 'Main settings',
                        text: "Default languages pair"
                    },
                    advanced: {
                        label: "Additional languages pairs",
                        text: "To use additional languages pairs begin your request with appropriate prefix + space (e.g. <code>ru-de привет мир</code>)",
                        placeholder: "Prefix"
                    },
                    buttons: {
                        save: "Save"
                    },
                    otherPlugins: {
                        label: "Our other plugins",
                        hashMem: {
                            link: "hashMem.com",
                            text: "handy and quick access to your bookmarks from Omnibox <br> ★ Optimized for keyboard control<br> ★ 3-5 seconds to open bookmark<br> ★ Cloud synchronization for free"
                        },
                        googleTranslate: {
                            link: "Omnibox Google Translate",
                            text: "access Google Translate from Omnibox.<br>★ Specify default languages <br>★ Translate with opposite languages pair <br>★ Translate pages with simple commands"
                        }
                    },
                    share: {
                        label: "Tell about us",
                        text: "Do you like this plugin? Please spread the word =)",
                        chrome: {
                            message: "Simple plugin for Chrome's Omnibox to translate Russian <-> English words (+ other languages)"
                        },
                        opera: {
                            message: "Simple plugin for Opera's Omnibox to translate Russian <-> English words (+ other languages)"
                        }
                    }
                }
            }
        };

        $translateProvider.translations('en', en);
    });
