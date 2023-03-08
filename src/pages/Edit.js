import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import DiaryEditor from "../components/DiaryEditor";

const Edit = () => {
  const [orignData, setOriginData] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  const diaryList = useContext(DiaryStateContext);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - ${id}번 일기 수정`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
      const targetDiary = diaryList.find(
        (it) => parseInt(it.id) === parseInt(id)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [id, diaryList]);
  // const [searchParams, setSearchParams] = useSearchParams();

  // const id = searchParams.get("id");
  // console.log("id : ", id);

  // const mode = searchParams.get("mode");
  // console.log("mode : ", mode);

  return (
    <div>
      {orignData && <DiaryEditor isEdit={true} orignData={orignData} />}
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
