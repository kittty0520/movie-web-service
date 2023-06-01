# ReactJS - 🎬영화 웹 서비스

<br/>

## React Element

React JS : 어플리케이션이 interactive하도록 만들어주는 라이브러리

React-dom : library 혹은 package로서, 모든 React element들을 HTML body에 둘 수 있도록 함.

### 예제

React.createElement(”태그이름”,{태그의 속성: ”속성값”,}, “text”)

```jsx
const root = document.getElementById('root');
*const span = React.createElement('span',{
				id:"sexy-span",
				style:{color:'black'}
		}, "hello im span");
const btn = React.createElement("button",{
        // onClick:()=>console.log("im clicked")
        onMouseEnter:()=>console.log('mouse enter')
    },"click me")
const container = React.createElement('div',null,[Title,Button]);*
```

ReactDOM.render(해당 요소, 부모요소) : react element를 HTML 요소로 만들어 배치한다. 사용자에게 해당 요소를 보여줌.

```jsx
ReactDOM.render(container, root);
```

<br/>

## JSX

Javascript를 확장한 문법, React요소를 만듦.

Babel : JSX로 적은 코드를 브라우저가 이해할 수 있는 형태로 변환해줌

```jsx
const root = document.getElementById('root');
function Title() {
	return (
		<h3 id='title' onMouseEnter={() => console.log('mouse enter')}>
			hello im a title
		</h3>
	);
}
const Button = () => {
	return (
		<button
			style={{
				backgroundColor: 'tomato',
			}}
			onMouseEnter={() => console.log('mouse enter')}
		>
			click me
		</button>
	);
};
const Container = () => (
	<div>
		<Title />
		<Button />
	</div>
);
ReactDOM.render(<Container />, root);
```

리액트가 아닌 경우, 일반 자바스크립트를 쓴 브라우저는 노드정보가 바뀔때마다 노드트리를 처음부터 다시 생성함 . 그러나 리액트는 Virtual DOM을 써서 달라진 부분만 수정해서 보여줌.
<br/>

## React.useState(초기값)

데이터값과 데이터를 바꿀 수 있는 함수를 제공

함수를 이용해 state값이 바뀌면 컴포넌트는 리렌더링(새로운 값으로 재생성)되어 업데이트 됨

state는 직접적으로 수정 불가능하고 setState함수로만 수정 가능 (예 : state = “” xxx)

```jsx
const [state, setState] = useState(initial value)
```

### state를 세팅하는 법

1. 직접 할당

   ```jsx
   setState(768);
   ```

2. 함수를 할당

   ```jsx
   setState((state) => state + 1);
   //함수의 첫번째 인자는 현재 state
   ```

### 리렌더링 조건

1. props이 바뀔때
2. state가 바뀔때
3. 부모 컴포넌트가 리렌더링 될 때

### Inputs과 State

```jsx
function App() {
	const [amount, setAmount] = React.useState(0);
	const [flipped, setFlipped] = React.useState(false);

	const onChange = (event) => {
		setAmount(event.target.value);
	};

	const reset = () => setAmount(0);
	const onFlip = () => {
		setFlipped((current) => !current);
		reset();
	};

	return (
		<div>
			<h3>Super Converter</h3>
			<div>
				<label htmlFor='minutes'>Minutes</label>
				<input
					value={flipped ? amount * 60 : amount}
					onChange={onChange}
					type='number'
					id='minutes'
					placeholder='Minutes'
					disabled={flipped}
				/>
			</div>
			<div>
				<label htmlFor='hours'>Hours</label>
				<input
					value={flipped ? amount : Math.round(amount / 60)}
					type='number'
					id='hours'
					placeholder='Hours'
					onChange={onChange}
					disabled={!flipped}
				/>
			</div>
			<button onClick={reset}>Reset</button>
			<button onClick={onFlip}>Flipped</button>
		</div>
	);
}
```

<br/>

## Props

prop : 부모 컴포넌트에서 자식 컴포넌트로 데이터(인자,argument)를 전송하는 방식,

부모에 props를 사용하면 자식 컴포넌트의 인자로 props객체가 전달된다.

전달하는 prop의 형태

- 문자열 ⇒ text=”string” or text={”string”}
- 숫자 ⇒ fontSize={number}
- 함수 ⇒ onClick={handleClick}

```jsx
function Btn({ text, onClick, big = false }) {
			console.log(text, 'are rended!');
			return (
				<button
					onClick={onClick}
					style={{
						backgroundColor: 'tomato',
						color: 'white',
						padding: '10px 20px',
						border: 0,
						borderRadius: 10,
						fontSize: big ? '18px' : '16px',
					}}
				>
					{text}
				</button>
			);
		}
		const MemorizedBtn = **React.memo(Btn)**;

		**Btn.propTypes** = {
			text: PropTypes.string.isRequired,
			big: PropTypes.bool,
			onClick: PropTypes.func,
		};

		function App() {
			const [value, setValue] = **React.useState**('Save Changes');
			const changeValue = () => setValue('Revert Changes');
			return (
				<div>
					<MemorizedBtn text={value} onClick={changeValue} big={false} />
					<MemorizedBtn text={'Continue'} big={true} />
				</div>
			);
		}
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);
```

### React.memo(컴포넌트)

컴포넌트가 React.memo()로 wrapping될 때, React는 컴포넌트를 렌더링하고 결과를 Memoizing한다.그리고 다음 렌더링이 일어날 때 props가 같다면, React는 메모이징(Memoizing)된 내용을 재사용한다.

부모 컴포넌트의 state를 변경하면 그 자식 컴포넌트들도 리렌더링이 일어남. 그때마다 자식 컴포넌트들 중 prop이 변경된 컴포넌트만 리렌더링 되도록 하는 방법임.

```jsx
const MemorizedBtn = React.memo(Btn);
```

### Prop Types

prop의 타입을 명시함으로써, 잘못된 prop이 전달되지 않도록 방지함

- ~.isRequired: 필수값

```
Btn.**propTypes** = {
			text: PropTypes.string.isRequired,
			big: PropTypes.number,
			onClick: PropTypes.object,
		};
```

- prop의 타입 이름 확인하기

[Typechecking With PropTypes – React](https://legacy.reactjs.org/docs/typechecking-with-proptypes.html)

## CRA(Create-React-App)

1. nodejs 설치하기(홈페이지)
2. 터미널(혹은 git bash)에서 `node -v` 로 설치됐는지 확인하기
3. `npx` 명령어를 입력하여 사용할 수 있는지 확인하기
4. `npx create-react-app 폴더명`
5. `cd 폴더명`
6. `code .`
7. yarn.lock 파일 삭제하기(없을수도 있음)
8. `npm i prop-types`
   <br/>

## CSS Module

1. CSS 파일명을 컴포넌트명.module.css로 설정한다.
2. 컴포넌트 파일에서 해당 CSS파일을 import한다.
3. 태그의 클래스 이름에 `import한 변수명.식별자명`을 쓴다.

   ⇒실제 DOM에는 랜덤한 클래스명이 적용된다.

```css
//Button.module.css
.btn {
	color: white;
	background-color: black;
}
```

```jsx
//Button.jsx
import **styles** from './Button.module.css'

export default function Button() {
		return (
				<button class={**styles.btn**}>Click Me</button>
```

<br/>

## useEffect(()⇒{},[])

state가 변경될 때 마다 컴포넌트는 리렌더링된다. 하지만 항상 렌더링 될 필요가 없는 코드가 있을 수 있다. 그럴 때는 useEffect()를 사용!

```jsx
useEffect(() => {
	//컴포넌트가 mount될 때 실행되는 코드
	//혹은 dependency value가 바뀔때마다 실행되는 코드
	return () => {
		//컴포넌트가 unmount될때 실행되는 코드
	};
}, [dependency]);
```

dependency가 빈 배열일 경우 처음 렌더링될때만 콜백함수가 실행된다. dependency value가 바뀔때마다 등록된 함수가 실행된다.

cleanup 함수 : 컴포넌트가 unmount될 때 실행되는 함수

### render가 두번씩 실행된다면?

index.js에 React.StrictMode태그는 코드의 문제를 감지하고 경고하기 위해서 구성요소를 두 번 렌더링한다. 원하지 않는다면 해당 태그를 지울것!

### 참고 문서

[16. useEffect를 사용하여 마운트/언마운트/업데이트시 할 작업 설정하기 · GitBook](https://react.vlpt.us/basic/16-useEffect.html)
<br/>

## Coin Tracker 만들기

### select태그

- 특정 option을 선택할 시 select요소의 value값이 바뀌는 것을 감지하기 위해 onChange이벤트를 사용
- 또한 option태그 안에는 무조건 value 속성값을 설정해야 특정값을 select의 value값에서 얻어낼 수 있다.
- 첫 option은 value값이 없고 선택하라는 문구만 넣고 싶을 때
  ```jsx
  <option value='' selected disabled hidden></option>
  ```

### **최종 코드**

⇒ 아쉬운 점은 변수값이 너무 많이 쓰이고 있다.

```jsx
export default function CoinTracker() {
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState([]);
	const [money, setMoney] = useState(0);
	const [price, setPrice] = useState(0);
	const [unit, setUnit] = useState('');
	const handleInput = (e) => {
		setMoney(e.target.value);
	};
	const handleSelect = (e) => {
		const value = e.target.value;
		const getCoin = coins.find((coin) => coin.id === value);
		console.log(getCoin);
		setUnit(getCoin.symbol);
		setPrice(getCoin.quotes.USD.price);
	};
	useEffect(() => {
		fetch('https://api.coinpaprika.com/v1/tickers')
			.then((res) => res.json())
			.then((json) => {
				setCoins(json);
				setLoading(false);
			});
	}, []);
	return (
		<div>
			<h1>Coin Tracker</h1>
			<h2>The Coins! {!loading && coins.length}</h2>
			{loading ? (
				<strong>Loading</strong>
			) : (
				<select onChange={handleSelect}>
					<option value='none' selected disabled hidden>
						--- please select coin ---
					</option>
					{coins.map((coin) => (
						<option key={coin.id} value={coin.id}>
							{coin.name} ({coin.symbol}) : $ {coin.quotes.USD.price} USD
						</option>
					))}
				</select>
			)}
			<div>
				<label htmlFor='money'>your money : </label>
				<input
					id='money'
					value={money}
					onChange={handleInput}
					type='number'
					placeholder='please input your money'
				/>
				<p>You can get {price !== 0 ? money / price + ' ' + unit : 'nothing'} !</p>
			</div>
		</div>
	);
}
```

### **참고 문서**

[[html] 셀렉트박스 기본값에 관해](https://euntori7.tistory.com/329)
<br/>

## React-Router

노마드코더에서는 Router Components(그중에서도 BrowserRouter) 방식으로, 나의 경우는 Routers(그중에서도 createBrowerRouter) 방식을 사용했다.

### createBroswerRouter

**Client Side Routing**

- 한 페이지씩
- Router안에 독립적인 route들이 존재
- **예시 코드**

  ```jsx
  import * as React from "react";
  import { createRoot } from "react-dom/client";
  import {
    createBrowserRouter,
    RouterProvider,
    Route,
    Link,
  } from "react-router-dom";

  const **router** = **createBrowserRouter**([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </div>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

  createRoot(document.getElementById("root")).render(
    **<RouterProvider router={router} />**
  );
  ```

**Nested Routes**

- 한 페이지 안에 nav가 있고, list를 선택하면 그에 맞게 서브 페이지?를 보여줌
- Router안에 독립적인 route들이 존재하고 각 route안에는 자식 route들이 존재
- **예시코드**
  - 컴포넌트 내부에서 routes 작성하는 경우
    ```jsx
    // Configure nested routes with JSX
    **createBrowserRouter**(
      createRoutesFromElements(
        <Route path="/" element={<Root />}>
          <Route path="contact" element={<Contact />} />
          <Route
            path="dashboard"
            element={<Dashboard />}
            loader={({ request }) =>
              fetch("/api/dashboard.json", {
                signal: request.signal,
              })
            }
          />
          <Route element={<AuthLayout />}>
            <Route
              path="login"
              element={<Login />}
              loader={redirectIfUser}
            />
            <Route path="logout" action={logoutUser} />
          </Route>
        </Route>
      )
    );
    ```
  - 최상위 부모 컴포넌트에서 하나의 객체로 router를 설정
    ```jsx
    // Or use plain objects
    // index.js? 혹은 app.js?에서 작성
    **createBrowserRouter**([
      {
        path: "/",
        element: <Root />,
        children: [
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: ({ request }) =>
              fetch("/api/dashboard.json", {
                signal: request.signal,
              }),
          },
          {
            element: <AuthLayout />,
            children: [
              {
                path: "login",
                element: <Login />,
                loader: redirectIfUser,
              },
              {
                path: "logout",
                action: logoutUser,
              },
            ],
          },
        ],
      },
    ]);
    ```

### Parameters

**useParms()**

url에서 사용할 변수의 값을 얻을 수 있음

```jsx
// http://localhost:3001/movie/**51899**
// path: '/movie/:**id**'
const params = useParams();
console.log(params); //{ id : 51899 }
```

### 참고 문서

[Feature Overview v6.11.2](https://reactrouter.com/en/main/start/overview#client-side-routing)
<br/>

## 배포하기

### **github를 통해 배포하기**

1. `npm i gh-pages`
2. (선택) `npm run build` ⇒ 웹사이트의 production ready code(압축 및 최적화)를 생성하여 build 폴더가 생성되지만 deploy까지 되지는 않음.
3. package.json파일에 아래 코드를 추가함

   ```json
   {
   	"scripts" : {
   		“deplay” : “gh-pages -d build”,
   		"predeplay" : "npm run build"
   	},
   	“homepage”: “https://<깃허브username>.github.io/<레포지이름>”,
   }
   ```

4. `npm run deplay` ⇒ predeploy실행한 후 deploy작동함
5. build 폴더가 생성되고 배포됨

## Breaking Change

버전을 업데이트하면서 코드가 깨져서 수정해야 되는 경우를 말함.

하지만 React.js에서는 발생하지 않음.

왜냐하면 React.js가 코드를 깨뜨리지 않고 새로운 기능을 추가하여 업데이트했기 때문.

하지만 예전 방식도 작동하기 때문에 다른 사람의 코드를 수정해야 될때 과거 버전을 맞닥뜨릴수 있으므로 공부하는 것도 not bad! ⇒ class로 만든 컴포넌트

## 결과물

<img src="https://github.com/kittty0520/movie-web-service/assets/105909450/190b99f8-8ae1-4e32-8008-9940de426c6b" alt="영화웹">
