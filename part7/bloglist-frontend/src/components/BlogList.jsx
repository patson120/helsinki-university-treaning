import React from "react"
import Blog from "./Blog"
import { useSelector } from "react-redux"


const BlogList = () => {
    const blogs = useSelector(state => state.blogs);
    return  <div className="mt-4">
        <h2 className="h1 mb-3">Blogs app</h2>
        {blogs.map(blog =><Blog key={`${blog.id}`} blog={blog}/>)}
    </div>
}
export default BlogList