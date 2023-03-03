import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id");
  console.log("id : ", id);

  const mode = searchParams.get("mode");
  console.log("mode : ", mode);

  return (
    <div>
      <h1>Edit</h1>
      <p>이곳은 일기 수정 페이지 입니다.</p>
      <button onClick={() => setSearchParams({ who: "dayoon" })}>
        QS 바꾸기
      </button>

      <button
        onClick={() => {
          navigate("/home");
        }}
      >
        Home으로 가기
      </button>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        뒤로 가기
      </button>
    </div>
  );
};

export default Edit;

// react Router v6
// react에서 csr기반의 페이지 라우팅을 할 수 있게 해주는 라이브러리

// 1. path Variable
//  - 경로의 변수 사용
// 2. Querry String
// - 1번과 비슷하지만 url과 함께 변수를 전달할 수 있는 가장 쉽고 간단한 방법
// - 웹페이지에 데이터를 전달하는 가장 간단한 방법
// 3.Page Moving
// - 페이지 이동
