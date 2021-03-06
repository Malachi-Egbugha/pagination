import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Posts from './components/Posts';
import Pagination from './components/Pagination';


const App = ()=>{
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerpage] = useState(10);
    //Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    useEffect(() => {
        const fetchPosts = async () =>{
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
        
            setPosts(res.data);
            setLoading(false);
        }
        fetchPosts();
     

    },[]);
    //Get current posts
    const indexOfLastPost = currentPage * postsPerpage;
    const indexOfFirstPost = indexOfLastPost - postsPerpage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
    
    // {console.log(posts)};
    //{console.log(posts.length)};
    return(
        <div className="container mt-5">
            <h1 className='text-primary mb-3'>welcome to APP</h1>
            <Posts posts={currentPosts} loading={loading}/>
            <Pagination paginate={paginate} postsPerpage={postsPerpage} totalPost={posts.length}/>
        </div>
    )

}
export default App;
