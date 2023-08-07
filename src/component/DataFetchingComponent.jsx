import React, { useEffect, useState } from 'react';

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

const DataFetchingComponent = () => {
  const [loading, setLoading] = useState(true);
  const [todoData, setTodoData] = useState({});
  const [postData, setPostData] = useState({});

  useEffect(() => {
    const fetchDataFromApis = async () => {
      const todoUrl = 'https://jsonplaceholder.typicode.com/todos/1';
      const postUrl = 'https://jsonplaceholder.typicode.com/posts/1';

      try {
        const [todoResponse, postResponse] = await Promise.all([
          fetchData(todoUrl),
          fetchData(postUrl),
        ]);

        setTodoData(todoResponse);
        setPostData(postResponse);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchDataFromApis();
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
        <div>
          <div style={{ border: '1px solid black', padding: '20px', margin: '50px' }}>
            <h3>API1</h3>
            <p>Title: {todoData.title}</p>
            <p>Completed: {todoData.completed ? 'Yes' : 'No'}</p>
          </div>
          <div style={{ border: '1px solid black', padding: '20px', margin: '50px' }}>
            <h3>API2</h3>
            <p>Title: {postData.title}</p>
            <p>Body: {postData.body}</p>
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataFetchingComponent;
