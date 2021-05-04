---
title: 클라우드프론트 도메인 네임 설정 이슈
date: 2021-05-04 10:30:21
category: AWS
thumbnail: 'https://images.hexdrinker.dev/thumbnails/aws.png'
description: '아 왜 안되냐고 ㅋㅋㅋㅋㅋㅋㅋㅋㅋ'
tags: ['블로그', 'AWS', '클라우드프론트', 'cloudfront']
draft: false
---

블로그를 리뉴얼했고 도메인 이전까지 성공해서 이제 큰 문제가 없을 줄 알았다. ~~엄청난 착각이었지만,,,~~

그러나 모바일 기기에서는 접근 자체가 아예 안될 때가 있었고 접근이 되더라도 아주 잠깐동안 비춰지는 404 페이지가 나를 고통스럽게 했다,,, 대체 왜 안되는걸까?

처음엔 gatsby의 문제인 줄 알고 gatsby 내에서 리다이렉트, 404 페이지 렌더링 방지 등을 시도해봤으나 결국 해결이 되지 않았다. 블로그 게시글마다 Open Graph Data를 심어놨는데 게시글의 URL에 접근할 때 처음에 404를 띄워서 OG Data 자체를 인식하지 못했다.

크롬 개발자 도구에서는 단서를 찾기가 좀 어려워서 잘 쓰지 않는 사파리와 파이어폭스까지 대동했다. 확인해보니까 페이지를 로드할 때 페이지의 URL에 해당하는 리소스를 찾지 못해서 404가 잠깐 뜨다가 데이터가 로드되면서 정상적으로 보이는 문제였다.

<p><img class="responsible width-50" src="https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/safari-404.png" alt="safari-404"/></p>
<p><img class="responsible width-50" src="https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/firefox-404.png" alt="firefox-404"/></p>

골머리를 싸매던 중 문득 내가 netlify에서 도메인 연결만 해제했고 아직 앱 자체는 남아있다는 사실이 생각나서 netlify domain 주소를 카카오톡에 쳐봤다. OG Data가 잘 뜬다. 404가 뜨지 않는다는 말이다.

혹시 몰라서 블로그 데이터를 배포한 s3 버킷 도메인 주소로도 접근해봤다. OG Data가 역시 잘 뜬다. 호스팅한 도메인의 주소만 OG Data를 인식하지 못했다.

![kakaotalk](https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/kakaotalk.png)

카카오톡으로 검증을 했으니 페이스북에서도 한 번 시도해봤다.

<p><img class="responsible width-50" src="https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/facebook.png" alt="facebook"/></p>

역시나 호스팅한 도메인 주소는 OG Data를 인식하지 못했고 나머지 두 주소는 잘 나온다. 그러면 클라우드프론트 문제인가? 라는 자연스러운 의심이 생겼다. 호스팅한 주소를 배포할 때 클라우드프론트를 이용했으니까,,,

클라우드프론트에 접속해서 내가 설정한 정보를 이리저리 뜯어봤다. 음,,, 뭔가 문제 없어보이는데,,, 추가 설정해줘야할 게 있나 싶어서 Edit 버튼을 눌렀다.

![prev-domain](https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/prev-domain.png)

음,,, origin domain name이 좀 이상해보인다. 저 주소로는 블로그에 접근할 수 없다. 근데 내가 일부러 저 주소를 입력한 것은 아니고 cloudfront를 설정할 때 준 선택지 중 하나를 고른 것이다.

![help](https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/help.png)

분명 옆에 뜨는 도움말에도 origin domain name은 `<bucket-name>.s3.<aws-region>.amazonaws.com` 라 입력하라고 뜬다.

내 기억이 잘못되었을까봐 origin domain name을 지워봤다. 그러니까 아래처럼 뜬다. 역시 저 중에 고르라고 선택지를 준거다.

![domain-name-list](https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/domain-name-list.png)

이 부분이 좀 이상하다 싶어서 s3 버킷 도메인 주소로 다시 고쳐줬다.

![now-domain](https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/now-domain.png)

그리고 배포를 다시 해봤다. 이래도 안되면 어쩔 수 없지란 마음으로,,,

<p><img class="responsible width-50" src="https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/success1.png" alt="success1"/></p>

![success2](https://images.hexdrinker.dev/aws/cloudfront-origin-domain-name-issue/success2.png)

아 ㅋㅋㅋ 너무 잘 뜨고~

일주일 정도 고민했던 이슈를 해결한거 같다. 클라우드프론트 문제인건가? 어렴풋히 추측은 하고 있었지만 전혀 예상치 못했던 부분에서 문제가 있었다. aws는 왜 선택할 수 있는 도메인 네임 리스트를 저렇게 보여줘가지구 잘 선택했는데 안되게 하는건지 ㅡㅡ;; 이 문제 때문에 포스트 쓰지도 못하고 있었는데,,, 속이 시원하다.

앞으론 도움말 잘 읽어봐야겠다...
