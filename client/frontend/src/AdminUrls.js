import React , {useEffect , useState} from 'react';

function AdminUrls(){
    const [urls , setUrls] = useState([]);
    const [loading , setLoading] = useState(true);


useEffect(() => {
    fetch('/urls')
    .then(res => res.json())
    .then(data => {
        setUrls(data);
        setLoading(false);
    })
    .catch(() => setLoading(false));
    
} , []);

return (
    <div style={{padding: 24}}>
      <h2>Admin: All Shortened URLs</h2>
      {loading ? <p>Loading...</p> : (
        <table style={{borderCollapse: 'collapse', width: '100%'}}>
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Visits</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {urls.map(u => (
              <tr key={u._id}>
                <td>
                  <a href={`/${u.shortCode}`} target="_blank" rel="noopener noreferrer">
                    /{u.shortCode}
                  </a>
                </td>
                <td>{u.originalUrl}</td>
                <td>{u.visitCount}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && urls.length === 0 && <p>No shortened URLs found.</p>}
    </div>
  );

}

export default AdminUrls;