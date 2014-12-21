angular.module('app').
    config(function($translateProvider) {
        var ru = {
            omni: {
                suggest: {
                    syncNotes: 'Синхронизировать заметки',
                    sendFeedback: 'Обратная связь',
                    help: 'Помощь',
                    openSettings: 'Настройки',
                    checkOtherPlugins: 'Другие плагины',
                    openSite: 'Открыть сайт'
                },
                notification: {
                    invalidKey: 'Неверный ключ. Вы можете использовать цифры, русские/английские символы, -, _ и .',
                    created_keyContent: 'Добавлена: {{key}}\nЗначение: {{content}}',
                    createdEmpty_key: 'Добавлена: {{key}}\nЗначение: <empty>',
                    updated_keyContent: 'Обновлена: {{key}}\nЗначение: {{content}}',
                    deleted_key: 'Удалена: {{key}}',
                    notFound_key: 'Не удается найти заметку с ключом "{{key}}"',
                    unknownCommand: 'Неизвестная команда: {{command}}',
                    syncSuccess: 'Заметки успешно синхронизированы',
                    syncSuccessWithErrors: "Некоторые заметки не были сихнронизированы: {{errors}}",
                    syncErrorKey: {
                        'key.invalid': 'Неверный ключ',
                        'content.too-large': 'Слишком большой размер заметки'
                    },
                    syncFailure: {
                        credentials: "Не удается синхронизировать заметки: неверный логин/пароль",
                        notFound: "Не удается синхронизировать заметки: не удается подключиться к hashMem.com",
                        disabled: "Пожалуйста, включите синхронизацию в настройках плагина, укажите логин и пароль",
                        unknown: "Не удается синхронизировать заметки: неизвестная проблема"
                    }
                },
                settings: {
                    notification: {
                        syncSuccess: "Заметки успешно синхронизированы",
                        loginSuccess: "Логин и пароль верны",
                        loginFailure: {
                            credentials: "Не удается аутентифицироваться: неверный логин/пароль",
                            notFound: "Не удается аутентифицироваться: не удается подключиться к hashMem.com",
                            unknown: "Не удается аутентифицироваться: неизвестная проблема"
                        }
                    },
                    menu: {
                        sync: 'Синхронизация',
                        help: 'Помощь',
                        feedback: 'Обратная связь',
                        rateIt: 'Оценить'
                    },
                    sync: {
                        header: "<small>Настройки синхронизации</small>",
                        isEnabled: "Синхронизировать заметки с hashMem.com",
                        register: "(зарегистрироваться)",
                        username: "Ваш почтовый адрес",
                        password: "Ваш пароль",
                        tryAuthenticate: "Проверить логин/пароль",
                        changeUsernameButton: "Изменить логин",
                        lastSuccess: "Последняя успешная синхронизация",
                        notSyncedDuringThisSession: "В течение текущей сессии ваши заметки ни разу не синхронизировались",
                        save: "Сохранить",
                        saved: "Сохранено!",
                        savedAndRemovedLocalNotes: "Сохранено. Ваши локальные заметки были удалены",
                        stateNotChanged: "Все изменения сохранены",
                        stateChanged: "Нажмите 'Сохранить', чтобы принять изменения",
                        doSync: "Синхронизировать",
                        changeUsername: {
                            text: "Если вы измениете почтовый адрес, то ваши локальные заметки сихнронизируются с новым аккаунтом.<br>" +
                                "Чтобы предотвратить это, нажмите 'Отвязать и удалить локальные заметки'",
                            unlink: "Отвязать",
                            unlinkAndRemoveLocalNotes: "Отвязать и удалить локальные заметки",
                            cancel: "Отмена"
                        }
                    },
                    help: {
                        header: "Помощь"
                    },
                    share: {
                        label: "Вам нравится данный плагин? Расскажите о нас =)",
                        chrome: {
                            message: "Отличный плагин от hashMem.com, при помощи которого можно очень быстро открывать свои bookmark'и в Chrome"
                        },
                        opera: {
                            message: "Отличный плагин от hashMem.com, при помощи которого можно очень быстро открывать свои bookmark'и в Opera"
                        }
                    }
                }
            }
        };

        $translateProvider.translations('ru', ru);
    });
