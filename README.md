<h1 align="center">
   <b>
        Multi Signal<br>
    </b>
</h1>

<p align="center">Merge multiple AbortSignals into a single signal</p>

<p align="center">
    <a href="https://dev.to/rashidshamloo/adding-timeout-to-fetch-typescriptreact-5apf"><b>Blog Post</b></a> •
    <a href="https://github.com/rashidshamloo/multi-signal"><b>GitHub Repository</b></a>
</p>

<div align="center">

[![npm version](https://img.shields.io/npm/v/multi-signal.svg?style=flat-square)](https://www.npmjs.org/package/axios)
[![Build status](https://img.shields.io/github/actions/workflow/status/rashidshamloo/multi-signal/ci.yml?branch=main&label=CI&logo=github&style=flat-square)](https://github.com/rashidshamloo/multi-signal/actions/workflows/ci.yaml)
[![install size](https://img.shields.io/badge/dynamic/json?url=https://packagephobia.com/v2/api.json?p=multi-signal&query=$.install.pretty&label=install%20size&style=flat-square)](https://packagephobia.now.sh/result?p=multi-signal)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/multi-signal?style=flat-square)](https://bundlephobia.com/package/multi-signal@latest)
[![npm downloads](https://img.shields.io/npm/dm/multi-signal.svg?style=flat-square)](https://npm-stat.com/charts.html?package=multi-signal)
[![Known Vulnerabilities](https://snyk.io/test/npm/multi-signal/badge.svg)](https://snyk.io/test/npm/multi-signal)
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Features](#features)
- [Browser Support](#browser-support)
- [Installation](#installation)
- [Usage](#usage)
    - [General Use](#general-use)
    - [Using with Fetch](#using-with-fetch)
    - [Using with Axios](#using-with-axios)
    - [Using with addEventListener](#using-with-addeventlistener)
- [Credits](#credits)
- [License](#license)

## Features

- Merges multiple AbortSignals into a single signal.
- Returned signal will be aborted if any of the input signals are aborted.
- Can be used in place of `AbortSignal()` in any function/utility.
- Works with both `AbortController().signal` and `AbortSignal.timeout()`

## Browser Support

![Edge](https://raw.githubusercontent.com/alrra/browser-logos/main/src/edge/edge_48x48.png) | ![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/main/src/chrome/chrome_48x48.png) | ![Safari](https://raw.githubusercontent.com/alrra/browser-logos/main/src/safari/safari_48x48.png) | ![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/main/src/firefox/firefox_48x48.png) | ![Opera](https://raw.githubusercontent.com/alrra/browser-logos/main/src/opera/opera_48x48.png)
--- | --- | --- | --- | --- | --- |
Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ | Latest ✔ |

## Installation

Using npm:

```bash
$ npm install multi-signal
```

Using yarn:

```bash
$ yarn add multi-signal
```

Once the package is installed, you can import the function:

```js
import { multiSignal } from 'multi-signal';
```

You can also use the default export:

```js
import multiSignal from 'multi-signal';
````

## Usage

#### General Use
```js
import multiSignal from 'multi-signal';

// signals
const controller1 = new AbortController();
const controller2 = new AbortController();
const signal1 = controller1.signal;
const signal2 = controller2.signal;
const timeoutSignal = AbortSignal.timeout(2000);

// signals as separate arguments
const signal = multiSignal(signal1, signal2);

// signals as array
const signal = multiSignal([signal1, signal2]);

// different signal types
const signal = multiSignal(signal1, signal2, timeoutSignal);
```

#### Using with Fetch
```js
import multiSignal from 'multi-signal';

const controller1 = new AbortController();
const signal = controller1.signal;
const timeoutSignal = AbortSignal.timeout(2000); // 2 sec

fetch('url', { signal: multiSignal(signal, timeoutSignal) })
```
#### Using with Axios
```js
import multiSignal from 'multi-signal';

const controller1 = new AbortController();
const controller2 = new AbortController();
const signal1 = controller1.signal;
const signal2 = controller1.signal;

axios.get('url', {
  timeout: 2000, // 2 sec
  signal: multiSignal(signal1, signal2)
})
```

#### Using with addEventListener
```js
import multiSignal from 'multi-signal';

const controller = new AbortController();
const signal = controller.signal;
const timeoutSignal = AbortSignal.timeout(2000); // 2 sec


X.addEventListener('event', (e) => { ... }, {
  signal: multiSignal(signal, timeoutSignal)
})
```

> **_Note:_** You can use as many AbortSignals as you want in any order.

## Credits

Inspired by: [Proposal: fetch with multiple AbortSignals](https://github.com/whatwg/fetch/issues/905)

## License

[MIT](LICENSE)