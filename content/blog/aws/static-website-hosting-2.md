---
title: AWS로 정적 웹 사이트 배포하기 2
date: 2021-05-05 20:14:00
category: AWS
thumbnail: 'https://images.hexdrinker.dev/thumbnails/aws.png'
description: '블로그 리뉴얼 시행착오 2편'
tags: ['블로그', '리뉴얼', 'AWS', 'route 53', 's3', 'cloudfront']
draft: true
---

[이전 포스트](/aws/static-website-hosting-1/)는 사실상 netlify를 탈옥하여 도메인을 따내는 내용을 담은 포스트였다.<br />
그래서 이번 글이 정말 AWS를 이용해서 정적 웹 사이트를 배포하는 내용을 담게 될 것이다.

AWS와 정적 웹 사이트를 키워드로 구글링을 하면 무수히 많은 방법들이 나오고 그것들이 대동소이하지만 도메인 구입이라던가 세세한 부분에서 약간씩 다른 부분이 있었고
여기저기를 찾아서 내게 맞는대로 진행했다. 본 포스트의 순서는 내가 설정한 순서대로 흘러간다.

## S3를 이용한 정적 웹 사이트 배포

## Route53 설정하기

## ACM을 이용한 인증서 발급

## CloudFront 설정하기

## 레퍼런스

- [CloudFront, Route53으로 S3 HTTPS 정적 웹 호스팅하기](https://velog.io/@younge/CloudFront-Route53%EC%9C%BC%EB%A1%9C-S3-HTTPS-%EC%A0%95%EC%A0%81-%EC%9B%B9-%ED%98%B8%EC%8A%A4%ED%8C%85%ED%95%98%EA%B8%B0)
- [CloudFront로 React앱 배포하기](https://velog.io/@_junukim/series/CloudFront%EB%A1%9C-React%EC%95%B1-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0)
- [AWS에 정적 사이트 호스팅하기](https://velog.io/@leejh3224/series/AWS%EC%97%90-%EC%A0%95%EC%A0%81-%EC%82%AC%EC%9D%B4%ED%8A%B8-%ED%98%B8%EC%8A%A4%ED%8C%85%ED%95%98%EA%B8%B0)
- [정적 페이지 웹 호스팅 - 1. S3로 정적 웹 호스팅하기](https://www.sunny-son.space/AWS/S3%20%EC%A0%95%EC%A0%81%20%EC%9B%B9%20%ED%98%B8%EC%8A%A4%ED%8C%85%20%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0/)
