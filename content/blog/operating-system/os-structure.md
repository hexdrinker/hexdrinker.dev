---
title: 운영체제 구조
date: 2019-06-22 16:23:31
category: Operating System
thumbnail: 'https://images.hexdrinker.dev/thumbnails/operating-system.jpeg'
description: '운영체제 구조'
tags: ['운영체제', 'OS', '운영체제 구조']
draft: false
---

## 쉘(Shell)

운영체제 개요에서 운영체제는 사용자와 컴퓨터 간의 커뮤니케이션을 중개하는 역할을 한다고 했다. 그렇다면 그 커뮤니케이션은 어떻게 하는 것일까?

그것은 바로 `쉘(Shell)`이란 프로그램을 이용해서 할 수 있다. 쉘은 응용 프로그램의 하나로 운영체제의 기능과 서비스를 조작할 수 있도록 인터페이스를 제공한다.

![shell](https://images.hexdrinker.dev/operating-system/os-structure/shell.png)

위의 이미지는 맥북의 터미널(CLI)인데 CLI 환경말고 GUI 기반의 쉘 또한 존재하지만 보통 쉘이라고 하면 CLI 기반의 쉘을 지칭하는 것이 일반적이다. 사용자는 명령어를 입력하고 쉘은 명령어를 해석하여 그에 맞는 기능을 실행한다.

또한 운영체제는 사용자만이 아니라 응용 프로그램을 위해서도 인터페이스를 제공한다. 이를 `API(Application Programming Interface)`라고 하는데 응용 프로그래밍에 내장된 프로그래밍 코드 형태로 존재한다. 보통 함수로 만들어지며 함수의 종류가 매우 많기 때문에 그것들을 묶어서 `라이브러리` 형태로 제공한다.

쉘 또한 응용 프로그램의 하나이며 운영체제가 제공하는 API를 이용한다.

## 시스템 콜(System Call)

시스템 콜은 운영체제의 기능을 외부(응용 프로그램)에서 사용할 수 있도록 요청에 따라 운영체제에 접근하기 위한 인터페이스이다. 쉽게 말하여 운영체제의 기능을 호출하는 함수라고 생각할 수 있다. 보통 응용 프로그램은 C, C++ 등의 고급 언어로 개발되어서 직접 시스템 콜을 사용할 수 없기 때문에 API를 이용하여 시스템 콜을 한다. API 내부에는 해당 기능을 사용할 수 있도록 시스템 콜을 해준다.

![structure](https://images.hexdrinker.dev/operating-system/os-structure/os-structure-1.png)

그래서 컴퓨터 시스템을 좀 더 계층적으로 나눈다면 위와 같은 그림이라고 볼 수 있다.

시스템 콜 정의의 예로는 좀 더 이식성을 높은 UNIX 응용 프로그램을 만들기 위해 [IEEE](https://www.ieee.org/)에서 `POSIX`라고 불리는 UNIX OS의 공통 API를 정리하여 규격화한 것이 있다. 이 규격을 따르면 UNIX와 직접적인 관련이 없어도 UNIX 호환 운영체제가 된다. 또한 Windows OS에서 사용하는 Windows API도 있다.

## 커널(Kernel)

쉘의 사전적 의미는 "껍데기"이다. 그리고 `커널(Kernel)`의 사전적 의미는 "알맹이"이다. 이런 사전적 의미에서 유추할 수 있듯 커널은 **운영체제의 핵심, 심장**이며 운영체제의 맨 하층에서 돌아가는 소프트웨어를 말한다. 보안과 리소스 관리, 추상화 등의 기능을 한다. 현재 쓰이는 대부분의 운영체제들은 커널 위에 여러 개의 레이어를 올린 것이다. 커널로 운영체제의 정체성을 결정하기에 매우매우 중요하다. 그 중요성과 역할 때문에 러프하게 운영체제 = 커널이라고 말하기도 한다.

## 보호 링(Protection Ring)과 듀얼 모드(Dual Mode)

![cpu-protection-rings](https://images.hexdrinker.dev/operating-system/os-structure/cpu-protection-rings.png)

운영체제는 사용자와 하드웨어와 소프트웨어 리소스를 공유하기 때문에 한 프로그램이 다른 프로그램, 운영체제를 실행하는 오작동이나 결함이나 악성 행동으로부터 데이터와 기능을 보호해야한다. 보호 링은 시스템 아키텍쳐 내에서 둘 이상의 계층으로 권한을 나눈 메커니즘이다. Ring의 숫자가 작아질수록 커널에 가까워지며 권한도 커진다. 인텔 프로세스를 기준으로 4개의 Ring이 있으며 Ring 1과 2는 실제로는 거의 사용되지 않는다. ARMv8의 경우 7가지 모드가 있다. 대부분의 운영체제는 Ring 3와 Ring 0만을 이용하는 듀얼 모드 시스템이다.

Ring 3을 사용자 모드(User mode), Ring 0을 커널 모드(Kernel mode)라고 한다. 커널 모드는 수퍼바이저 모드(Supervisor mode), 시스템 모드(System moded), 특권 모드(Privileged mode)라고도 불린다.

사용자 모드는 사용자가 접근할 수 있는 영역에 제한을 두어 시스템 리소스를 함부로 사용할 수 없다. 응용 프로그램의 코드가 사용자 모드에서 실행되며 개발자는 이 모드에서 코드를 작성하고 프로세스를 실행할 수 있다. 커널 모드는 가장 많은 권한을 지닌 레벨이며 CPU 및 메모리와 같은 하드웨어와 직접적으로 상호작용한다.

![dual-mode-converting](https://images.hexdrinker.dev/operating-system/os-structure/dual-mode-converting.png)

웹 브라우저와 같이 사용자 모드에서 실행되는 응용 프로그램이 커널 모드의 기능을 사용하려면 API 내부의 시스템 콜을 거쳐서 커널 모드로 전환된 후 시스템 콜을 처리하고 다시 사용자 모드로 전환된다.
