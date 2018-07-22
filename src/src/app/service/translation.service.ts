import { Injectable } from '@angular/core';

export class TranslationSet {
  public languange: string;
  public values: { [key: string]: string } = {};
}

@Injectable()
export class TranslationService {
  public languages = ['hun', 'eng'];
  public language = 'hun';

  private dictionary: { [key: string]: TranslationSet } = {
    'hun': {
      languange: 'hun',
      values: {
        'login': 'Bejelentkezés',
        'un': 'Felhaználónév',
        'exit': 'Kilépés',
        'qs': 'Kérdések',
        'q': 'Kérdés',
        'new_q': 'Új Kérdés',
        'send': 'Beküldés',
        'askedby': 'Kérdezte',
        'when': 'ekkor,',
        'cim': 'Cím',
        'leir': 'Leírás',
        'ans': 'Válaszok',
        'an': 'Válasz',
        'qatitle': 'Katt rám, hogy visszamenj a kérdésekhez.',
        'good': 'Elfogad',
        'bad': 'Elutasít',
        'newans': 'Új válasz beküldése',
        'nemjo': 'Ez nem feltétlen jó',
        'lepjbe': 'Elöbb lépj be, hogy használni tudd ezt',
        'enged': 'Ehez nincs engedélyed, csak a kérdezőnek.',
        'udv': 'Üdv újra itt',
      }
    },
    'eng': {
      languange: 'eng',
      values: {
        'login': 'Logging In',
        'un': 'Username',
        'exit': 'Log Out',
        'qs': 'Questions',
        'q': 'Question',
        'new_q': 'New Question',
        'send': 'Send',
        'askedby': 'Asked by',
        'when': 'at this time,',
        'cim': 'Title',
        'leir': 'About',
        'ans': 'Answers',
        'an': 'Answer',
        'qatitle': 'Click me to navigate back to the questions.',
        'good': 'Accept',
        'bad': 'Deny',
        'newans': 'Send a new answer',
        'nemjo': "That doesn't look valid",
        'lepjbe': 'You must log in to use that',
        'enged': "You're not allowed to do that, only the asker is.",
        'udv': 'Welcome back',
      }
    }
  };

  constructor() { }

  translate(value: string): string {
    //console.log('translate called with value ' + value + ' and language ' + this.language);
    if (this.dictionary[this.language] != null) {
      return this.dictionary[this.language].values[value];
    }
  }
}