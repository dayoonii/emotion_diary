import React, { useEffect, useReducer, useRef } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  //배열로 저장하면 알아들을 수 없기때문에 JSON.stringify로 직렬화 시킴
  localStorage.setItem("diary", JSON.stringify(newState));
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

//COMPONENTS
// import MyButton from "./components/MyButton";
// import MyHeader from "./components/MyHeader";

function App() {
  const [data, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const localData = localStorage.getItem("diary");
    if (localData) {
      const diaryList = JSON.parse(localData).sort(
        (a, b) => parseInt(b.id) - parseInt(a.id)
      );
      dataId.current = parseInt(diaryList[0].id) + 1;

      dispatch({ type: "INIT", data: diaryList });
    }
  }, []);

  const dataId = useRef(0);

  //CREATE
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  //EDIT
  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  // process.env가 작동안할 경우 사용되는 코드
  const env = process.env;
  env.PUBLIC_URL = env.PUBLIC_URL || "";

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider
        value={{
          onCreate,
          onEdit,
          onRemove,
        }}
      >
        <BrowserRouter>
          <div className="App">
            {/* { <MyHeader
          headeText={"App"}
          leftChild={
            <MyButton text={"왼쪽 버튼"} onClick={() => alert("왼쪽 클릭")} />
          }
          rightChild={
            <MyButton
              text={"오른쪽 버튼"}
              onClick={() => alert("오른쪽 클릭")}
            />
          }
        /> }
    

        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"positive"}
        />

        <MyButton
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
          type={"negative"}
        />

        <MyButton text={"버튼"} onClick={() => alert("버튼 클릭")} />
        <MyButton
          type={"skdfsdfsdf"}
          text={"버튼"}
          onClick={() => alert("버튼 클릭")}
        /> */}

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

// 페이지 라우팅
// 어떤 네트워크 내에서 통신 데이터를 보낼 경로를 선택하는 일련의 과정
// 데이터의 경로 = ROUTER : 데이터의 경로를 실시간으로 지정해주는 역할을 하는무언가
// ROUTE + ING : 경로를 정해주는 행위 자체와 그런 과정들을 다 포함하여 일컫는 말
// PAGE ROUTING : 단순히 어떠한 요청에 따라서 어떤 페이지를 돌려줄지 결정하는 과정들을 일컫는 말
// MPA(Multipage Application) : web client -> web server <- web client
// SPA(Single Page Application) : 리액트에서 사용하는 방식
// web client -> index.html <- web Server(Node.js)
// CSR(Client Side Rendering) : SPA에서 클라이언트측에서 알아서 페이지를 렌더링 해주는 것을 클라이언트 측이 직접 렌더링 해준다고해서 CSR이라고 한다.
