angular.module('app').
    config(function($translateProvider) {
        var ru = {
            lang: {
                ru: "Русский",
                en: "Английский",
                de: "Немецкий",
                fr: "Французский",
                it: "Итальянский",
                es: "Испанский",
                uk: "Украинский",
                kk: "Казахский",
                tr: "Турецкий"
            },
            omni: {
                settings: {
                    saved: "Сохранено",
                    menu: {
                        main: 'Основные',
                        advanced: 'Дополнительные',
                        rateIt: 'Оценить'
                    },
                    main: {
                        label: 'Основные настройки',
                        text: "Укажите пару языков по-умолчанию"
                    },
                    advanced: {
                        label: "Дополнительные пары языков",
                        text: "Чтобы использовать одную из дополнительных комбинаций, ваш запрос должен начинаться с соответствующего прификса (например <code>ru-de мир</code>)",
                        placeholder: "Префикс"
                    },
                    buttons: {
                        save: "Сохранить"
                    },
                    otherPlugins: {
                        label: "Другие наши плагины",
                        hashMem: {
                            link: "hashMem.com",
                            text: "удобный доступ к вашим закладкам / заметкам прямо из Omnibox <br> ★ Оптимизировано под клавиатуру<br> ★ Открытие закладки за 3-5 секунд<br> ★ Бесплатная синхронизация с hashMem.com"
                        },
                        googleTranslate: {
                            link: "Omnibox Google Translate",
                            text: "доступ к Google Translate из Omnibox.<br>★ Возможность задать пару языков по-умолчанию (например, ru -> en)<br> ★ Перевод c обратной кобинацией языков (en -> ru)<br> ★ Перевод текущей страницы"
                        }
                    },
                    share: {
                        label: "Расскажите о нас",
                        text: "Вам нравится данный плагин? Расскажите о нас =)",
                        chrome: {
                            message: "Удобный плагин для Chrome, который позволяет быстро переводить слова Русский <-> Английский (+другие языки)"
                        },
                        opera: {
                            message: "Удобный плагин для Opera, который позволяет быстро переводить слова Русский <-> Английский (+другие языки)"
                        }
                    }
                }
            }
        };

        $translateProvider.translations('ru', ru);
    });
