import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import User from "./User";

// 1. useState() 를 통한 요청 상태 관리

// function Users() {
//   const [users, setUsers] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const fetchUsers = async () => {
//     try {
//       // 요청이 시작할 때 error, users 초기화
//       setError(null);
//       setUsers(null);
//       // loading 상태를 true로 바꾸기
//       setLoading(true);
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/users"
//       );
//       setUsers(response.data); // 데이터는 response.data 안에 들어있다.
//     } catch (e) {
//       setError(e);
//     }
//     setLoading(false);
//   };

// 2. useReducer() 를 통한 요청 상태 관리

// function reducer(state, action) {
//   switch (action.type) {
//     case "LOADING":
//       return {
//         loading: true,
//         data: null,
//         error: null,
//       };
//     case "SUCCESS":
//       return {
//         loading: false,
//         data: action.data,
//         error: null,
//       };
//     case "ERROR":
//       return {
//         loading: false,
//         data: null,
//         error: action.error,
//       };
//     default:
//       throw new Error(`Unhandled action type:${action.type}`);
//   }
// }

// function Users() {
//   const [state, dispatch] = useReducer(reducer, {
//     loading: false,
//     data: null,
//     error: null,
//   });

//   const fetchUsers = async () => {
//     dispatch({ type: "LOADING" });
//     try {
//       const response = await axios.get(
//         "https://jsonplaceholder.typicode.com/users"
//       );
//       dispatch({ type: "SUCCESS", data: response.data });
//     } catch (e) {
//       dispatch({ type: "ERROR", error: e });
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const { loading, data: users, error } = state;
// if (loading) return <div>로딩중..</div>;
// if (error) return <div>에러가 발생했습니다</div>;
// if (!users) return null;
// return (
//   <>
//     <ul>
//       {users.map((user) => (
//         <li key={user.id}>
//           {user.username}({user.name})
//         </li>
//       ))}
//     </ul>
//     <button onClick={fetchUsers}>다시 불러오기</button>
//   </>
// );
// }

// 3. useAsync() - 커스텀 Hook 을 통한 요청 상태 관리

// import useAsync from "./useAsync";

// // useAsync에서는 Promise의 결과를 바로 data에 담기 때문에
// // 요청을 한 이후 response에서 data를 추출하여 반환하는 함수를 따로 만듦
// async function getUsers() {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );
//   return response.data;
// }

// function Users() {
//   const [userId, setUserId] = useState(null);
//   const [state, refetch] = useAsync(getUsers, [], true);

//   const { loading, data: users, error } = state; // state.data를 users 키워드로 조회

//   if (loading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!users) return <button onClick={refetch}>불러오기</button>;
//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => setUserId(user.id)}
//             style={{ cursor: "pointer" }}
//           >
//             {user.username}({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={refetch}>다시 불러오기</button>
//       {userId && <User id={userId} />}
//     </>
//   );
// }

// 4. useAsync() - react-async 를 통한 요청 상태 관리(reload를 통한 자동 불러오기)

// import { useAsync } from "react-async";

// async function getUsers() {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );
//   return response.data;
// }

// function Users() {
//   const [userId, setUserId] = useState(null);
//   const { data: users, error, isLoading, reload } = useAsync({
//     promiseFn: getUsers,
//   });

//   if (isLoading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!users) return <button onClick={reload}>불러오기</button>; // reload : 자동 불러오기
//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => setUserId(user.id)}
//             style={{ cursor: "pointer" }}
//           >
//             {user.username}({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={reload}>다시 불러오기</button>
//       {userId && <User id={userId} />}
//     </>
//   );
// }

// 5. useAsync() - react-async 를 통한 요청 상태 관리(run을 통한 특정 시점에 불러오기)

// import { useAsync } from "react-async";

// async function getUsers() {
//   const response = await axios.get(
//     "https://jsonplaceholder.typicode.com/users"
//   );
//   return response.data;
// }

// function Users() {
//   const [userId, setUserId] = useState(null);
//   const { data: users, error, isLoading, run } = useAsync({
//     deferFn: getUsers,
//   });

//   if (isLoading) return <div>로딩중..</div>;
//   if (error) return <div>에러가 발생했습니다</div>;
//   if (!users) return <button onClick={run}>불러오기</button>; // run : 원하는 시점에 불러오기
//   return (
//     <>
//       <ul>
//         {users.map((user) => (
//           <li
//             key={user.id}
//             onClick={() => setUserId(user.id)}
//             style={{ cursor: "pointer" }}
//           >
//             {user.username}({user.name})
//           </li>
//         ))}
//       </ul>
//       <button onClick={run}>다시 불러오기</button>
//       {userId && <User id={userId} />}
//     </>
//   );
// }

// 6. Context 연결
import { useUsersState, useUsersDispatch, getUsers } from "./UsersContext";

function Users() {
  const [userId, setUserId] = useState(null);
  const state = useUsersState();
  const dispatch = useUsersDispatch();

  const { data: users, loading, error } = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  };

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return <button onClick={fetchData}>불러오기</button>; // run : 원하는 시점에 불러오기

  return (
    <>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            onClick={() => setUserId(user.id)}
            style={{ cursor: "pointer" }}
          >
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchData}>다시 불러오기</button>
      {userId && <User id={userId} />}
    </>
  );
}

export default Users;
