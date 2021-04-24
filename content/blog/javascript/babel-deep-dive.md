---
title: 바벨 파헤치기
date: 2020-03-16 12:32:01
category: Javascript
thumbnail: 'https://images.hexdrinker.dev/thumbnails/babel-deep-dive.png'
description: '바벨을 파해쳐보자'
tags: ['babel', '바벨', 'transpiler', '트랜스파일러']
draft: false
---

바벨이라고 들어본 적 있는가?

![babels](https://images.hexdrinker.dev/javascript/babel-deep-dive/babels.png)

일단 얘네 둘은 아니다. ~~우측의 인물을 모르는 사람을 위해 잠깐 소개하자면 리버풀 FC에서 뛰었던 라이언 바벨이다.~~

![babel-tower](https://images.hexdrinker.dev/javascript/babel-deep-dive/babel-tower.jpeg)

그리고 바벨탑도 아니다. ~~(그래도 이름은 빌려줬..)~~

이번 포스트에서 다룰 것은 바로 바벨탑의 이름을 따서 만들어진 자바스크립트 트랜스파일러(transpiler) 바벨에 대해서 이야기하고자 한다.

![babel-logo](https://images.hexdrinker.dev/javascript/babel-deep-dive/babel-logo.png)

(얘다 !)

## 1. 이름의 유래

창세기 11장에 따르면, 인간들은 천국에 닿기 위해 바벨탑을 쌓았다. 그 오만함에 분노한 예수는 모든 인간의 말을 제각각으로 만들고 사람들을 온 땅으로 흩어지도록 만들었고 결국 바벨탑의 건축은 실패하고 만다. 이 때문에 붙은 의미인지는 모르겠지만 바벨은 히브리어로 **'혼돈'** 이라는 뜻을 갖고 있다. ~~(케이아스)~~

본론으로 돌아오자. 위의 상황처럼 웹 페이지의 개발에 이용된 자바스크립트의 버전은 다 다르다. 그렇기 때문에 스펙이 제각각이고 브라우저 또한 이를 모두 다 지원할 수 없다. 당장에 예시를 하나 들자면 인터넷 익스플로러는 프로미스를 이해하지 못한다.

그렇다면 프로미스가 포함된 프론트엔드 코드는 인터넷 익스플로러에서 작동할 수 없을까? **아니다, 이를 위해서 바벨이란 것이 존재한다.**

## 2. 기능 및 동작원리

바벨은 특정 버전의 ECMAScript 코드를 하위 버전의 ECMAScript 코드로 **변환**해주고 이 변환하는 것을 **트랜스파일**한다고 한다. 브라우저마다 지원하는 ECMAScript의 버전과 스펙이 제각각인데 바벨을 이용한다면 작성한 프론트엔드 코드를 모든 브라우저 동작할 수 있도록 만들어준다.

![babel-official](https://images.hexdrinker.dev/javascript/babel-deep-dive/babel-official.png)

예시를 하나 보도록 하자. 아래의 코드를 [바벨 공식홈페이지](https://babeljs.io/) 메인의 트랜스파일 기능을 통해서 변환하도록 하겠다.

```javascript
const foo = (a, b) => a + b
```

아래와 같은 결과가 출력된다.

```javascript
var foo = function foo(a, b) {
  return a + b
}
```

그럼 어떤 식으로 이렇게 변하는걸까? 위처럼 코드가 변하는 과정은 크게 세 가지 순서로 나눌 수 있다.

1. 파싱(Parsing)
2. 변환(Transform)
3. 출력(Print)

### 2.1 파싱

파싱은 코드를 읽고 추상 구문 트리(AST, Abstract Syntax Tree)로 변환하는 단계를 말한다.

### 2.2 변환

추상 구문 트리를 세팅한 설정에 맞는 코드로 변환한다.

### 2.3 출력

변환된 코드를 출력한다!

## 3. 플러그인과 프리셋

그럼 이번에는 바벨을 직접 설치해서 이용해보자. 우선 폴더 하나를 만들고 `npm init`을 통해 해당 디렉토리에 package.json을 설치한다. 그 뒤 바벨 코어와 커맨드라인을 설치한다.

```bash
npm install @babel/core @babel/cli
```

그 뒤 app.js를 만들어서 우리가 변환시킬 코드를 작성해보자. 본인은 아까 위에 썼던 코드를 그대로 이용했다.
이 코드가 인터넷 익스플로러에서도 작동할 수 있도록 변환하는 게 목표다.

```javascript
// app.js
const foo = (a, b) => a + b
```

그리고 커맨드라인에서 `npx babel app.js`를 입력해보자. 결과는 아래와 같다. 아까처럼 변환이 변환이 이뤄지진 않았다.

```javascript
// 출력 결과
const foo = (a, b) => a + b
```

### 3.1 플러그인

왜 코드가 변하지 않았을까? 그 이유는 바벨은 파싱과 출력을 담당하고 **변환은 플러그인들이 담당**하기 때문이다. 플러그인들은 추상 구문 트리를 실제로 동작하는 코드로 변환한다. 우리는 아무 플러그인을 쓰지 않았기 때문에 당연히 원래 코드가 그대로 출력된다.

그렇다면 우리는 플러그인을 하나하나 만들어야할까? No! 바벨엔 이미 많은 플러그인들이 존재한다. 우리는 원하는 플러그인을 설치해서 이용하기만 하면 된다.

하지만 플러그인이 어떻게 쓰이는지 알기 위해서 커스텀 플러그인을 만들어서 한 번 사용해보독 하자.

```javascript
// customPlugin.js
// https://babeljs.io/docs/en/plugins#plugin-development 참조
module.exports = function() {
  return {
    visitor: {
      Identifier(path) {
        const name = path.node.name
        // reverse the name: JavaScript -> tpircSavaJ
        path.node.name = name
          .split('')
          .reverse()
          .join('')
      },
    },
  }
}
```

그리고 플러그인을 적용해서 바벨을 실행해보자. `npx babel app.js --plugins ./customPlugin.js`를 입력하면 아래와 같은 결과가 나온다.

```javascript
// 출력 결과
const oof = (a, b) => a + b
```

foo가 oof로 반전되었다. 아주 작은 변환이지만 이처럼 바벨을 이용하면 코드를 원하는대로 변환할 수 있다. 이제 본론으로 돌아가서 우리가 원하는대로 인터넷 익스플로러에서도 동작할 수 있도록 플러그인을 설치해서 변환해보자.

```bash
npm install @babel/plugin-transform-arrow-functions @babel/plugin-transform-block-scoping
```

`@babel/plugin-transform-arrow-functions` 이 플러그인은 애로우 펑션을 일반 함수로 변환해주는 플러그인이다. `@babel/plugin-transform-block-scoping`은 const, let처럼 블록 스코프를 따르는 키워드를 var로 변환한다.

설치를 완료했다면 `npx babel app.js --plugins @babel/plugin-transform-arrow-functions --plugins @babel/plugin-transform-block-scoping`를 입력하여 변환을 해보자.

```javascript
// 출력 결과
var foo = function(a, b) {
  return a + b
}
```

원하는대로 변환이 되었다! 지금은 두 개의 플러그인만을 적용해서 바벨을 실행했다. 근데 플러그인이 세 개, 아니 그 이상으로 많아진다면 일일이 입력하기 힘들다. 그렇기 때문에 바벨 설정파일을 생성해서 플러그인을 관리해준다.

```javascript
// babel.config.js
module.exports = {
  plugins: [
    '@babel/plugin-transform-arrow-functions',
    '@babel/plugin-transform-block-scoping',
    // ... 플러그인 추가
  ],
}
```

설정 파일을 만들었다면 다시 바벨을 실행해보자. `npx babel app.js`을 입력하면 위와 똑같은 결과를 볼 수 있을 것이다.

### 3.2 프리셋

그렇다면 우리는 필요한 플러그인을 모두 설치하여 전부 다 설정 파일에 등록하는 번거로움을 겪어야하는걸까? ㄴㄴㄴㄴㄴ절대 아니다 귀찮음을 이기기 위해 부지런한 사람들이 개발자다.

바벨은 아주 친절하게도 특정 목적에 필요한 플러그인셋을 모아둔 프리셋이란 것을 제공한다. 우리는 프리셋을 이용하여 쉽게 바벨 환경 설정을 할 수 있다.

```javascript
// customPreset.js
module.exports = function customPreset() {
  return {
    plugins: [
      '@babel/plugin-transform-arrow-functions',
      '@babel/plugin-transform-block-scoping',
    ],
  }
}
// babel.config.js
module.exports = {
  presets: ['./customPreset.js'],
}
```

위처럼 커스텀 프리셋을 이용할 수도 있겠지만 이미 제공하는 프리셋을 이용하는게 일반적이다. 프리셋 패키지를 다운로드 하고 프리셋을 설정 파일에 추가한 뒤 바벨을 실행해보자.

```bash
npm install @babel/preset-env
```

```javascript
// babel.config.js
module.exports = {
  presets: ['@babel/preset-env'],
}
```

아래와 같은 결과가 나온다. 프리셋이 잘 적용되었다.

```javascript
// 출력 결과
'use strict'

var foo = function foo(a, b) {
  return a + b
}
```

위에 설치된 패키지 외에도 프리셋 패키지는 많기 때문에 목적에 따라 사용하면 된다. 이제 다 끝난걸까? 아직 아니다. 프리셋은 타겟 브라우저를 설정하는 옵션이 있다. 타겟 브라우저를 한 번 설정해보도록 하겠다.

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '80',
        },
      },
    ],
  ],
}
```

위의 코드는 크롬 최신 버전을 타겟 브라우저로 삼았다. 출력 결과는 어떻게 나올까?

```javascript
// 출력 결과
const foo = (a, b) => a + b
```

아주 당연하게도 크롬만을 지원한다면 코드 변환이 불필요하기 때문에 코드 변환이 이뤄지지 않고 출력된다. 그렇다면 우리의 목적인 인터넷 익스플로러도 타겟 옵션에 추가해보자.

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: 80,
          ie: 11,
        },
      },
    ],
  ],
}
```

```javascript
// 출력 결과
'use strict'

var foo = function foo(a, b) {
  return a + b
}
```

IE 옵션을 추가했더니 타겟 브라우저를 설정하지 않았을 때와 동일하게 출력된다.

## 4. 폴리필

이제 인터넷 익스플로러에서 위의 코드가 작동할까? 그렇다 타겟 브라우저까지 설정했으니 작동한다. 바벨은 그렇다면 모든 코드를 완벽하게 변환할 수 있는걸까? 안타깝게도 그것은 아니다.

바벨의 플러그인이나 프리셋을 통해서 변환을 했음에도 IE나 낮은 버전의 브라우저에서는 지원하지 않는 구문이 존재할 수도 있다. 이를 위해 폴리필이란 것을 적용해야한다~~(할 게 많다)~~.

폴리필이란 단어가 생소할 수도 있겠지만 그리 어려운 개념이 아니다. 그냥 브라우저에서 지원하지 않는 구문의 작동을 위해서 추가하는 코드 조각 정도로 생각하면 편하다.

```javascript
// app.js
new Promise()
```

app.js의 코드를 promise로 바꾸고 바벨을 실행해보자.

```javascript
// 출력 결과
new Promise()
```

타겟 브라우저가 인터넷 익스플로러를 지원하지만 여전히 코드는 그대로이다. 이 코드를 IE에서 작동시킨다면 여전히 에러를 뱉을 것이다. 그래서 우리는 폴리필을 적용하여 프로미스 또한 작동할 수 있도록 해보겠다.

```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: {
          version: 2,
        },
      },
    ],
  ],
}
```

바벨 설정 파일에서 타겟 브라우저 옵션을 제거하고 `useBuiltIns` 옵션을 추가해준다. 이는 `@babel/preset-env` 패키지가 폴리필을 어떻게 다룰 것인지 폴리필의 사용 방식을 지정하는 옵션이다. 값으로는 `usage`, `entry`, `false`가 있고 default가 false이다.

`entry`는 지정된 환경에서 필요로 하는 폴리필은 모두 내장한다. 그러나 실제 코드 상에서 사용되는 폴리필만 적용하는 것이 좋기 때문에 `usage`로 설정한다. `usage`는 따로 코드를 건드릴 필요없이 사용되는 폴리필만 각 파일의 최상단에 포함시켜준다.

출력 결과는 아래와 같다. 상단부에 폴리필이 내장되어 있어서 인터넷 익스플로러에서도 잘 작동한다.

```javascript
// 출력 결과
'use strict'

require('core-js/modules/es6.promise')
require('core-js/modules/es6.object.to-string')

new Promise()
```

이상, 바벨에 대해서 알아봤다. 바벨은 웹팩과 같은 번들러와 함께 사용되며 프론트엔드 개발 환경을 구성하는데 필수적이다. 리액트는 cra, 뷰는 vue-cli를 통해서 개발을 시작한다면 웹팩과 바벨 설정이 기본적으로 내장되어 굳이 건드릴 필요가 없다.

그러나 웹팩과 바벨이 어떻게 쓰이고 어떤 방식으로 동작하는지는 알아야 나중에 개발 환경을 커스텀하거나 구성할 때 고생하지 않을 것이다. 나 또한 cra로 시작한 리액트 프로젝트를 빌드/배포 환경 설정 때문에 eject할지 말지 고민하고 공부하면서 그 중요성에 대해 깨닫고 이 글을 쓴다.

<!-- 웹팩과 관련된 포스트는 [이 글](https://gracieuxyh/web/webpack-deep-dive)을 참조바란다. -->
