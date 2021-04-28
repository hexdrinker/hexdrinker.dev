---
title: AWS로 정적 웹 사이트 배포하기
date: 2021-04-25 12:33:00
category: AWS
thumbnail: 'https://images.hexdrinker.dev/thumbnails/aws.png'
description: '블로그 리뉴얼 시행착오 1편'
tags: ['블로그', '리뉴얼', 'AWS', 'netlify']
draft: false
---

## 블로그를 리뉴얼했다.

블로그 리뉴얼에 관한 사항은 [해당 글](https://hexdrinker.dev/diary/blog-renewal)을 참조 바란다.<br />
블로그 UI를 다 다듬고 나서 본격적으로 포스트들을 이전하기 전에 배포를 먼저 하고자 했다.

이전 블로그는 netlify를 이용해서 배포했고 이용 경험이 압도적으로 준수해서 자연스럽게 이번에도 netlify로 배포를 진행했다.<br />
그런데 블로그에 쓰일 이미지 리소스들을 s3에 올려서 따로 관리하고 싶었고 이를 서브도메인을 통해서 접근할 수 있다면 좋겠다는 생각을 했다.

딱히 이유는 없다. ~~있어보이잖아,,,~~ aws s3가 잔뜩 붙은 이미지 주소를 쓰는 것은 너무 지저분하고 블로그 내에서 이미지를 관리하는 것은 그냥 싫었다.

## netlify를 탈옥(?)하다.

이미지 스토리지용 s3 버킷을 하나 팠고 이미지를 저장한 다음에 netlify dns settings를 통해서 cname을 붙여 어찌저찌 서브도메인을 만드려고했으나,,,

<strong style="color: red; font-size:30px;">안된다 !!!</strong>

뭐,, 안된다. 왜 안되는지는 나도 잘 몰랐다. 나는 aws도 잘 모르고 netlify를 이용해서 배포만 했지 도메인 관리까지 해본 적은 없다. 그래도 이런저런 여러 시도를 했지만 결국 서브도메인을 연결하는 것은 실패했다.

뭐 모르면 찾아보고 공부해야지. 이 때부터 netlify support team과의 영문 서포트 메일(~~똥꼬쇼~~)가 시작되었다,,,

[netlify support](https://www.netlify.com/support/)에 접속해서 문의 메일을 하나 보냈다.

![support-request-1](https://images.hexdrinker.dev/aws/static-website-hosting-1/support-request-1.png)

> `hexdrinker` : 뭐 대충 gatsby로 블로그 만들었고 블로그에 쓰일 이미지들 aws s3에 넣었고 서브도메인으로 접근하게 하고싶은데 안됨ㅇㅇ

![support-response-1](https://images.hexdrinker.dev/aws/static-website-hosting-1/support-response-1.png)

> `netlify` : 맞는 거 같은데 안되는 걸 보면 방화벽 문제나 aws 내부 설정 문제같으니 그 쪽 기술 서포터한테 요청ㄱㄱ

결국 netlify에서는 원하는 답을 얻지 못했다. 열심히 구글링했지만 제대로 된 레퍼런스를 찾을 수 없었고 그냥 이 참에 netlify를 쓰지말고 aws로 완전히 갈아타자는 결정을 내렸다.

나는 aws를 제대로 써본 적도 없으니 이 참에 블로그를 샌드박스 삼아서 기본적인 것들을 한 번 활용해보자는 뜻에서,,, 공부해서 남 주는 거 아니니까.

![support-request-2](https://images.hexdrinker.dev/aws/static-website-hosting-1/support-request-2.png)

> `hexdrinker` : 나 너네 서비스 포기하구 aws로 이전할거임. 근데 너네 도메인 어디서 샀냐? 내가 도메인 직접 관리하고싶음ㅇㅇ

![support-response-2](https://images.hexdrinker.dev/aws/static-website-hosting-1/support-response-2.png)

> `netlify` : 우리는 그냥 도메인 리셀러고 도메인은 name.com에 등록되어있음. 도메인 이전 도와줄테니 이대로 한 번 해보삼.

도메인은 [name.com](https://name.com)이란 서비스에 등록이 되어있다고 한다.

name.com에 접속해서 계정을 만들었고 도메인 등록 방법을 찾아봤지만 내 계정으로 직접 구매한 도메인이 아니다보니 인증이 필요했고 또 다시 막막함이 찾아왔다. 뭐 어떡해 모르면 물어야지. ~~(물음표 살인마)~~

![support-request-3](https://images.hexdrinker.dev/aws/static-website-hosting-1/support-request-3.png)

> `hexdrinker` : 나 netlify 통해서 도메인 구매했는데 도메인이 내꺼인 걸 어떻게 인증함? 도움!

![help!](https://images.hexdrinker.dev/aws/static-website-hosting-1/help!.jpeg)

![support-response-3](https://images.hexdrinker.dev/aws/static-website-hosting-1/support-response-3.png)

> `name.com` : 뭐 대충 보니까 아직 netlify에서 도메인 관리 중인듯? netlify에서 도메인 해제하고 이전 요청 해보삼

아,,, name.com에서 준 답변은 다시 netlify에 도움 요청해보라... 이런 말이었다. 그래서 일단 시키는대로 netlify에 등록된 내 도메인을 내리고 다시 문의를 남겼다.

![support-request-4](https://images.hexdrinker.dev/aws/static-website-hosting-1/support-request-4.png)

> `hexdrinker` : 나 netlify 버리고 aws 쓸거고 name.com이 시킨대로 도메인 해제했다 이제 어떡함?

<p><img class="responsible width-80" src="https://images.hexdrinker.dev/aws/static-website-hosting-1/support-response-4.png" alt="support-response-4" /></p>

> `netlify` : 우리가 도메인 이전 시켜줄게 아래의 방법대로 한 번 해보고 다시 연락 주삼!

이제서야 좀 상세하게 만족할만한 답이 도착했다. 친절한 Scott,,, 👍

![last-request](https://images.hexdrinker.dev/aws/static-website-hosting-1/last-support.png)

시키는대로 name.com에서 계정 인증 설정을 몇 개 마치고 답을 보냈다. 그 뒤 netlify에서 도메인 이전에 성공했으니 확인해달라고 답이 왔다. 와 드디어,,

![oh-my-domain](https://images.hexdrinker.dev/aws/static-website-hosting-1/oh-my-domain.png)

아 ㅋㅋㅋ 이거 하려고 며칠 동안 support 메일 보내고 고생했는데 생각보다 할만했다.

netlify와 name.com이 모두 미국 회사라서 답을 빠르게 얻기는 힘들었지만,,, 영어를 쓴다고 해봐야 번역이 안된 레퍼런스 읽는게 전부였는데 오랜만에 영작이란 것도 해보고 재밌는 경험을 했다.
~~(말을 잘해야하는데,,, 영작이 무슨 의미야,,)~~

근데 이제 시작이다 아직 끝이 아니다. 이제 aws를 이용해서 정적 웹사이트 호스팅을 해야하는데,, 이 글은 온통 netlify 탈옥에 대한 내용만 있네,,,

aws의 route53, s3, cloudfront, acm을 이용해서 정적 웹사이트를 호스팅하는 내용에 대해서는 두 번째 포스트에 서술하겠다.
