---
title: 블로그를 리뉴얼했다.
date: 2021-04-23 23:11:38
category: Diary
thumbnail: 'https://images.hexdrinker.dev/thumbnails/blog-renewal.jpeg'
description: '블로그 진짜 열심히 한다 이번엔 진짜다 진짜,,, 진짜,,,really,,'
tags: ['블로그', '리뉴얼']
draft: false
---

방치된 블로그가 너무 안타깝고 슬퍼서(?) 열심히 살자는 의지도 다질 겸 다시 살리려고 새로 만들었다.

Jbee님의 [gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee) 템플릿을 이용했고 velopert님의 [velog](https://velog.io) 포스트 카드 UI를 ~~표절~~했다.<br />두 개를 짬뽕하니까 적절히 내가 원하는 느낌의 블로그 UI가 구성되어서 만족스럽다.

그리고 습관적으로 netlify 이용해서 배포했는데 블로그에 쓰일 이미지 리소스를 서브도메인으로 붙이고 싶었다.

그래서 aws s3에 이미지를 올리고 그거를 netlify dns managing을 통해서 서브도메인을 붙이려고 했으나 잘 안되더라,,,

그도 그럴게 netlify는 도메인 리셀러일 뿐 직접적으로 도메인을 컨트롤하는 것도 아니고 내 블로그 최상위 도메인인 .dev는 구글 소속이라서 aws route53에서 등록이 안되더라,,

그래서 이참에 aws 직접 쓰면서 공부도 할겸 netlify를 과감하게 버리고 aws로 이전하기로 했다.

결국 했냐고? 했지... 고생 좀 했다,,, 팔자에도 없는 영문 서포트 메일 주고 받으면서,,, 이제 그 시행착오들을 시리즈로 쓸 것이다.

블로그 진짜 열심히 하자,,, 제발제발제발제발제발 제~발!
