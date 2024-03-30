import React, { useEffect, useState } from 'react';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';

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
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{backgroundColor: '#42a5f5'}}>
            <TableCell align="justify">Rank</TableCell>
            <TableCell align="justify">Username</TableCell>
            <TableCell align="justify">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((val, key) => (
            <TableRow
              key={key}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="justify">#{key+1}</TableCell>
              <TableCell align="justify">
                <a href={`/myaccount/${val.username}`} style={{ color: 'blue', fontWeight: 'bold'  }} >{val.username} </a>
              </TableCell>
              <TableCell align="justify">{val.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>




    // <div style={{border: '5px solid rgba(0, 0, 0, 0.96)', padding: '50px', borderRadius: '25px'}}>
    //   <h2>Leaderboard</h2>
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>Rank</th>
    //           <th>Username</th>
    //           <th>score</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {users.map((val, key) => {
    //           return (
    //               <tr key={key}>
    //                   <td>#{key+1}</td>
    //                   <td>
    //                     <a href={`/myaccount/${val.username}`}>{val.username}</a>
    //                     </td>
    //                   <td>{val.score}</td>
    //               </tr>
    //           )
    //         })}
    //       </tbody>
    //     </table>
    // </div>
  );
}

export default Leaderboard;