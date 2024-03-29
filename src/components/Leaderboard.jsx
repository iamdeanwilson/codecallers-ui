import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/user/index')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  users.sort((a, b) => b.score - a.score)

  return (
    <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}>
      <h2>Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>score</th>
            </tr>
          </thead>
          <tbody>
            {users.map((val, key) => {
              return (
                  <tr key={key}>
                      <td>#{key+1}</td>
                      <td>
                        <a href={`/myaccount/${val.username}`}>{val.username}</a>
                        </td>
                      <td>{val.score}</td>
                  </tr>
              )
            })}
          </tbody>
        </table>

      {/* <ul>
        {users.map(user => (
          <li key={user.id}>{user.username}: {user.score}</li>
        ))}
      </ul> */}
    </div>
  );
}

export default Leaderboard;