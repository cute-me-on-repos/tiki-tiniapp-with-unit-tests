
# Unit test in the Tiki Tini App

[![Show off status badge -.-](https://app.travis-ci.com/travis-ci/travis-web.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

## Introduction

Mục đích của bài viết này là đưa ra một ví dụ đơn giản mà tôi đã sử dụng để viết unit test cho [Tiki Tini App](developer.tiki.vn). Hi vọng bài viết giúp các bạn phần nào trong việc tìm tài liệu tham khảo, chọn lựa một đáp án phù hợp với quá trình kiểm thử và phát triển ứng dụng của các bạn.

> _Bài viết mang tính chia sẻ, hi vọng các bạn có thể đóng góp ý kiến của mình phía dưới phần bình luận._

---
## Table of contents

- [Introduction](#Introduction)
- [Table of contents](#Table%20of%20contents)
- [About unit test in Tiki Tini App](#About%20unit%20test%20in%20Tiki%20Tini%20App)
- [Environment setup](#Environment%20setup)
	- Source code structure
	- Setup test dependencies 
- [Example tests](#Example%20tests])
- [Source code](github.com/cute-me-on-repo/tiki-tiniapp-with-unit-tests)
- [Conclusion](#Conclusion)
---
## About unit test in Tiki Tini App

[Unit testing](https://en.wikipedia.org/wiki/Unit_testing#:~:text=In%20computer%20programming%2C%20unit%20testing,they%20are%20fit%20for%20use.) là phương pháp kiểm thử trên từng đơn vị của source code (class, function,..) và được coi là phương pháp cơ bản nhất mà một developer cần biết. Vì vậy sự có mặt của unit test trong dự án phần mềm của bạn thường là một điều hiển nhiên và khá quan trọng.

Đối với các Tini App, tại phía Tiki chưa cung cấp cụ thể một lựa chọn nào để tích hợp Unit testing vào quá trình phát triển Tini app. Bạn cần tự setup phương án sử dụng unit test phù hợp với ứng dụng của bạn.

---
## Environment setup

```JS
// jest.config.js file
module.exports = () => {
	return {
		verbose: true,
		transformIgnorePatterns: ["node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"],
		automock: false,
		setupFiles: ["./mocking/setupJestMock.js"],
		testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.ts?$",
		collectCoverageFrom: ["app/**/*.{js,ts}"],
	};
};
```

---
### Source code structure

Cấu trúc dự án được sắp đặt đơn giản như sau:

```bash 
├── __tests__
│ ├── component.the-button.test.ts
│ └── page.home.test.ts
├── app # Tini App source code
│ ├── package.json
│ # các dependencies phục vụ cho product development
│ ├── src
│ │ ├── app.js
│ │ ├── app.json
│ │ ├── app.tcss
│ │ ├── components
│ │ │ └── the-button
│ │ │ ├── index.js
│ │ │ ├── index.json
│ │ │ ├── index.tcss
│ │ │ └── index.txml
│ │ ├── home
│ │	│ └── index.js
│ │	│ ├── index.json
│ │	│ ├── index.tcss
│ │	│ └── index.txml
│ └── yarn.lock
├── babel.config.js
├── jest.config.js
├── mocking
│ └── setupJestMock.js
├── package.json
│ # các dependencies phục vụ cho local development
└── yarn.lock

```
	
---
### Setup test dependencies

Trong bài chia sẻ này tôi sẽ dùng jest và babel. Các bạn có thể tham khảo dev dependencies dưới đây mà tôi sử dụng:

```JSON
// dev dependencies in ./packages.json
{
	"@babel/core": "^7.15.8",
	"@babel/preset-env": "^7.15.8",
	"@babel/preset-typescript": "^7.15.0",
	"@types/jest": "^27.0.2",
	"babel-jest": "^27.2.5",
	"husky": "^7.0.2",
	"jest": "^27.2.5",
	"typescript": "^4.4.4"
}

```

---
## Example tests

---

## Source code

Source code cho Example từ bài viết này tại repo 
- [github.com/cute-me-on-repo/tiki-tiniapp-with-unit-tests](github.com/cute-me-on-repo/tiki-tiniapp-with-unit-tests)
---
## Conclusion

Tuân thủ nguyên tắc của unit test là test theo đơn vị, các phần còn thiếu thì chúng ta sẽ sử dụng mocks nhiều nhất có thể. Cá nhân tôi thấy nhiều bạn thường muốn test quá nhiều thứ trong unit test và đôi khi nhầm lẫn với [integration testing](https://en.wikipedia.org/wiki/Integration_testing). Việc có nên tách biệt hai khái niệm này hay không không quá quan trọng, điển hình là use case của react:

> _With components, the distinction between a “unit” and “integration” test can be blurry_. If you’re testing a form, should its test also test the buttons inside of it? Or should a button component have its own test suite? Should refactoring a button ever break the form test?
> [( * ⓘ - reactjs/docs/testing)](https://reactjs.org/docs/testing.html#tradeoffs#:~:text=With%20components,%20the%20distinction%20between%20a%20%E2%80%9Cunit%E2%80%9D%20and%20%E2%80%9Cintegration%E2%80%9D%20test%20can%20be%20blurry)


