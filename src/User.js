import React, { useEffect } from "react";
import axios from "axios";

// useAsync - 커스텀 Hook

// import useAsync from "./useAsync";

// async function getUser(id) {
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );
//   return response.data;
// }

// function User({ id }) {
//   const [state] = useAsync(() => getUser(id), [id]);
//   const { loading, data: user, error } = state;

//   if (loading) return <div>loading...</div>;
//   if (error) return <div>error...</div>;
//   if (!user) return null;
//   return (
//     <div>
//       <h2>{user.username}</h2>
//       <p>
//         <b>Email:</b>
//         {user.email}
//       </p>
//     </div>
//   );
// }

// export default User;

// useAsync - react-async

// import { useAsync } from "react-async";

// async function getUser({ id }) {
//   // id 가 아니라 {id} << 객체형태
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );
//   return response.data;
// }

// function User({ id }) {
//   const { data: user, error, isLoading } = useAsync({
//     promiseFn: getUser,
//     id,
//     watch: id, // watch값에 특정 값을 넣으면, 값이 바뀔 때마다 promiseFn에 넣은 함수 호출
//   });

//   if (isLoading) return <div>loading..</div>;
//   if (error) return <div>error...</div>;
//   if (!user) return null;

//   return (
//     <div>
//       <h2>{user.username}</h2>
//       <p>
//         <b>Email:</b> {user.email}
//       </p>
//     </div>
//   );
// }

// context 연결

import { useUsersState, useUsersDispatch, getUser } from "./UsersContext";

function User({ id }) {
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  // useEffect() 를 사용해서 id가 바뀔 때마다 getUser() 호출
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);

  const { data: user, loading, error } = state.user;

  if (loading) return <div>loading..</div>;
  if (error) return <div>error...</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
      <p>
        <b>Email:</b> {user.email}
      </p>
    </div>
  );
}

export default User;
